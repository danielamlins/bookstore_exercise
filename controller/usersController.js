const lowDB = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = lowDB(adapter);
db.defaults({ books: [], users: [], orders: [] }).write();

const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");

exports.getUser = function (req, res) {
  const item = db.get("users").value();
  res.json(item);
};

exports.addUser = function (req, res) {
  bcrypt
    .hash(req.query.password, 10)
    .then((hash) => {
      const newUser = {
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        email: req.query.email,
        password: hash,
      };
      db.get("users")
        .push({ ...newUser, id: nanoid() })
        .write();
      res.json({ success: true });
    })
    .catch((err) => {
      console.log(err.message);
      res.json({
        error: {
          message: err.message,
        },
      });
    });
};

exports.getUserById = function (req, res) {
  const item = db.get("users").find({ id: req.params.id });
  res.json(item);
};

exports.updateUser = function (req, res) {
  const user = db.get("users").find({ id: req.params.id }).value();

  if (req.query.password) {
    bcrypt
      .hash(req.query.password, 10)
      .then((hash) => {
        console.log(hash);
        const newUser = {
          firstName: req.query.firstName || user.firstName,
          lastName: req.query.lastName || user.lastName,
          email: req.query.email || user.email,
          id: user.id,
          password: hash,
        };
        db.get("users").find({ id: req.params.id }).assign(newUser).write();
        return res.json({ success: true });
      })
      .catch((err) => {
        console.log(err);
        return res.json({
          error: {
            message: err.message,
          },
        });
      });
  } else {
    const newUser = {
      firstName: req.query.firstName || user.firstName,
      lastName: req.query.lastName || user.lastName,
      email: req.query.email || user.email,
      password: user.password,
      id: user.id,
    };
    db.get("users").find({ id: req.params.id }).assign(newUser).write();
    return res.json({ success: true });
  }
};

exports.removeUser = function (req, res) {
  db.get("users").remove({ id: req.params.id }).write();
  return res.json({ success: true });
};
