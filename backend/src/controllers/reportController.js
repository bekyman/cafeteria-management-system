import {
  getDashboardSummary,
  getRevenueByDateRange,
  getTopSellingFoods,
  getOrderStatusStats,
  getDailyOrders,
} from "../services/reportService.js";

export const getDashboard = async (req, res) => {
  try {
    const summary = await getDashboardSummary();
    const topFoods = await getTopSellingFoods(5);
    const orderStats = await getOrderStatusStats();
    const dailyOrders = await getDailyOrders();

    res.json({
      summary,
      topFoods,
      orderStats,
      dailyOrders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRevenueReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ message: "startDate and endDate are required" });
    }

    const data = await getRevenueByDateRange(startDate, endDate);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTopFoods = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;

    const data = await getTopSellingFoods(limit);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};