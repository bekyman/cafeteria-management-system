import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  const order = new Order(req.body);
  const saved = await order.save();
  res.status(201).json(saved);
};

export const getOrders = async (req, res) => {
  const orders = await Order.find().populate("items.food");
  res.json(orders);
};