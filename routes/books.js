const express = require("express");
const router = express.Router();
const {
  addBook,
  getBooks,
  getBookById,
  updateBook,
  removeBook,
} = require("../controller/booksController");
const { validateId } = require("../middleware/validateId");

// Routes

router
  .route("/")
  .get((req, res) => {
    getBooks(req, res);
  })
  .post((req, res) => {
    addBook(req, res);
  });

router
  .route("/:id")
  .get(
    (req, res, next) => validateId(req, res, next, "books"),
    (req, res) => {
      getBookById(req, res);
    }
  )
  .put(
    (req, res, next) => validateId(req, res, next, "books"),
    (req, res) => {
      updateBook(req, res);
    }
  )
  .delete(
    (req, res, next) => validateId(req, res, next, "books"),
    (req, res) => {
      removeBook(req, res);
    }
  );

// https://stackoverflow.com/questions/22463299/express-middleware-access-to-req-params/43992902
module.exports = router;
