import Order, { ORDER_STATUSES } from "../models/Order.js";

const STATUS_FLOW = {
  Pending: ["Preparing"],
  Preparing: ["Ready"],
  Ready: ["Served"],
  Served: [],
};

export const listOrders = async (req, res) => {
  try {
    const { status, search } = req.query;
    const filters = {};

    if (status && ORDER_STATUSES.includes(status)) {
      filters.status = status;
    }

    if (search) {
      filters.customerName = { $regex: search, $options: "i" };
    }

    const orders = await Order.find(filters).sort({ createdAt: -1 });

    res.json({
      items: orders,
      statuses: ORDER_STATUSES,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { customerName, items } = req.body;

    if (!customerName || !items?.length) {
      return res.status(400).json({ message: "Customer and items are required" });
    }

    const order = await Order.create({ customerName, items });

    return res.status(201).json(order);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!ORDER_STATUSES.includes(status)) {
      return res.status(400).json({ message: "Invalid order status" });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const isAllowedTransition = STATUS_FLOW[order.status]?.includes(status);

    if (!isAllowedTransition) {
      return res.status(400).json({
        message: `Status can only move forward from ${order.status}`,
      });
    }

    order.status = status;
    await order.save();

    return res.json(order);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
