const lowDB = require("lowdb");
const bcrypt = require("bcrypt");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = lowDB(adapter);
db.defaults({ books: [], users: [], orders: [] }).write();

const { nanoid } = require("nanoid");

exports.getOrder = function (req, res) {
  const item = db.get("orders").value();
  res.json(item);
};

exports.addOrder = function (req, res) {
  const order = req.query;
  const book = db.get("books").find({ id: order.itemId }).value();

  if (!book) {
    return res.json({
      error: {
        message: "Item not found",
      },
    });
  } else {
    order.price = book.Price;
    order.totalPrice = order.price * order.qtt;
    db.get("orders")
      .push({ ...order, id: nanoid() })
      .write();
    res.json({ success: true });
  }
};

exports.getOrderById = function (req, res) {
  const item = db.get("orders").find({ id: req.params.id });
  res.json(item);
};

exports.removeOrder = function (req, res) {
  db.get("orders").remove({ id: req.params.id }).write();
  return res.json({ success: true });
};

exports.updateOrder = function (req, res) {
  if (req.query.qtt === "0"){
    return module.exports.removeOrder(req, res)
    // db.get("orders").remove({ id: req.params.id }).write();
    // return res.json({ success: true });
  }
  
  const order = db.get("orders").find({ id: req.params.id }).value();
  const updatedOrder = {
    itemId: req.params.id || order.itemId,
    qtt: req.query.qtt || order.qtt,
    price: order.price,
    id: order.id,
  };
  updatedOrder.totalPrice = updatedOrder.qtt * updatedOrder.price;
  db.get("orders").find({ id: req.params.id }).assign(updatedOrder).write();
  res.json({ success: true });
};

