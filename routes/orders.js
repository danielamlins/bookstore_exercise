const express = require("express");
const router = express.Router();
const {
  getOrder,
  addOrder,
  getOrderById,
  updateOrder,
  removeOrder,
} = require("../controller/ordersController");
const { validateId } = require("../middleware/validateId");

// Routes

router
  .route("/")
  .get((req, res) => {
    getOrder(req, res);
  })
  .post((req, res) => {
    addOrder(req, res);
  });

router
  .route("/:id")
  .get(
    (req, res, next) => validateId(req, res, next, "orders"),
    (req, res) => {
      getOrderById(req, res);
    }
  )
  .put(
    (req, res, next) => validateId(req, res, next, "orders"),
    (req, res) => {
      updateOrder(req, res);
    }
  )
  .delete(
    (req, res, next) => validateId(req, res, next, "orders"),
    (req, res) => {
      removeOrder(req, res);
    }
  );

module.exports = router;
