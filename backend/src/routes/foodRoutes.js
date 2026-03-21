import express from "express";
import {
  getFoods,
  createFood,
  deleteFood
} from "../controllers/foodController.js";

const router = express.Router();

router.get("/", getFoods);
router.post("/", createFood);
router.delete("/:id", deleteFood);

export default router;