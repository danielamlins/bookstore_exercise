const express = require("express");
const router = express.Router();

const { validateId } = require("../middleware/validateId");

const {
  addUser,
  getUser,
  getUserById,
  updateUser,
  removeUser,
} = require("../controller/usersController");
const morgan = require("morgan");


// Routes
router
  .route("/")
  .get((req, res) => {
    getUser(req, res, "users");
  })
  .post((req, res) => {
    addUser(req, res, "users");
  });

  router
  .route("/:id")
  .get((req, res, next) => validateId(req, res, next, 'users'), (req, res) => {
    getUserById(req, res);
  })
  .put((req, res, next) => validateId(req, res, next, 'users'), (req, res) => {
    updateUser(req, res);
  })
  .delete((req, res, next) => validateId(req, res, next, 'users'), (req, res) => {
    removeUser(req, res);
  });



module.exports = router;
