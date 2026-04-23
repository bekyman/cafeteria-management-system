import express from "express";
import {
  createOrder,
  listOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

router.get("/", );

router.get("/", listOrders);
router.post("/", createOrder);
router.patch("/:id/status", updateOrderStatus);

export default router;
