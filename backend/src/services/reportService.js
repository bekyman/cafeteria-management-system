import Order from "../models/Order.js";
import FoodItem from "../models/FoodItem.js";

export const getDashboardSummary = async () => {
  const totalOrders = await Order.countDocuments();

  const revenueResult = await Order.aggregate([
    { $match: { paymentStatus: "paid" } },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalPrice" },
      },
    },
  ]);

  const totalRevenue = revenueResult[0]?.totalRevenue || 0;

  const pendingOrders = await Order.countDocuments({ status: "pending" });
  const completedOrders = await Order.countDocuments({ status: "completed" });

  return {
    totalOrders,
    totalRevenue,
    pendingOrders,
    completedOrders,
  };
};

export const getRevenueByDateRange = async (startDate, endDate) => {
  return await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
        paymentStatus: "paid",
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          day: { $dayOfMonth: "$createdAt" },
        },
        revenue: { $sum: "$totalPrice" },
        orders: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
  ]);
};

export const getTopSellingFoods = async (limit = 5) => {
  return await Order.aggregate([
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.food",
        totalSold: { $sum: "$items.quantity" },
        revenue: {
          $sum: { $multiply: ["$items.quantity", "$items.price"] },
        },
      },
    },
    { $sort: { totalSold: -1 } },
    { $limit: limit },
    {
      $lookup: {
        from: "fooditems", 
        localField: "_id",
        foreignField: "_id",
        as: "foodDetails",
      },
    },
    { $unwind: "$foodDetails" },
    {
      $project: {
        _id: 0,
        foodId: "$foodDetails._id",
        name: "$foodDetails.name",
        totalSold: 1,
        revenue: 1,
      },
    },
  ]);
};

export const getOrderStatusStats = async () => {
  return await Order.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);
};

export const getUserOrderStats = async (userId) => {
  const totalOrders = await Order.countDocuments({ user: userId });

  const totalSpentResult = await Order.aggregate([
    { $match: { user: userId, paymentStatus: "paid" } },
    {
      $group: {
        _id: null,
        totalSpent: { $sum: "$totalPrice" },
      },
    },
  ]);

  const totalSpent = totalSpentResult[0]?.totalSpent || 0;

  return {
    totalOrders,
    totalSpent,
  };
};

export const getDailyOrders = async () => {
  return await Order.aggregate([
    {
      $group: {
        _id: {
          date: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
        },
        orders: { $sum: 1 },
      },
    },
    { $sort: { "_id.date": 1 } },
  ]);
};