const lowDB = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = lowDB(adapter);
db.defaults({ books: [], users: [] }).write();

exports.validateId = function (req, res, next, key) {
    console.log(db.get(key).find({id: req.params.id}).value())
    if (!db.get(key).find({id: req.params.id}).value()){
        res.statusCode = 404;
        return res.json({
            error: {
                message: "ID Not Found"
            }
        })
    }
    next();
  };