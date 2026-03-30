import express from "express";
import { protect } from "../middleware/protect.js";
import { enforceWorkingHours } from "../middleware/workingHours.js";
import { canUseCafeteria, getMe } from "../controllers/userController.js";

const router = express.Router();

router.get("/me", protect, getMe);
router.get(
  "/cafeteria/access",
  protect,
  enforceWorkingHours({ startHour: 8, endHour: 17, allowedWeekdays: [1, 2, 3, 4, 5] }),
  canUseCafeteria
);

export default router;
