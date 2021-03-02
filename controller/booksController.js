const lowDB = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = lowDB(adapter);
db.defaults({ books: [], users: [], orders: [] }).write();

const { nanoid } = require("nanoid");

exports.getBooks = function (req, res) {
  const books = db.get("books").value();
  res.json(books);
};

exports.addBook = function (req, res) {
  const book = req.query;
  db.get("books")
    .push({ ...book, id: nanoid() })
    .write();
  res.json({ success: true });
};

exports.getBookById = function (req, res) {
  // validateId(req.params.id)
  // const book = db.get("books").value().filter(el => el.id = req.params.id);
  const book = db.get("books").find({ id: req.params.id });
  res.json(book);
};

exports.updateBook = function (req, res) {
  const book = db.get("books").find({ id: req.params.id }).value();
  const updatedBook = {
    Author: req.query.Author || book.Author,
    Name: req.query.Name || book.Name,
    Year: req.query.Year || book.Year,
    Price: req.query.Price || book.Price,
    id: book.id,
  };
  db.get("books").find({ id: req.params.id }).assign(updatedBook).write();
  res.json(updatedBook);
};

exports.removeBook = function (req, res) {
  db.get("books").remove({ id: req.params.id }).write();
  res.json(db.get('books'));
};
