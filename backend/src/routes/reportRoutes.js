import express from "express";

const router = express.Router();

router.get("/dashboard", (req, res) => {
  res.json({
    totalOrders: 0,
    totalSales: 0,
    message: "Report routes placeholder",
  });
});

export default router;
