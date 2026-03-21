import express from "express";
import {
  getDashboard,
  getRevenueReport,
  getTopFoods,
} from "../controllers/reportController.js";

import authMiddleware, {
  adminOnly,
  staffOrAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/dashboard", authMiddleware, staffOrAdmin, getDashboard);

router.get("/revenue", authMiddleware, adminOnly, getRevenueReport);

router.get("/top-foods", authMiddleware, staffOrAdmin, getTopFoods);

export default router;