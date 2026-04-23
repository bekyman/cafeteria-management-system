import express from "express";
import { login, registerEmployee } from "../controllers/authController.js";
import {
  validateEmployeeRegister,
  validateLogin,
} from "../validators/authValidator.js";
import validate from "../middleware/validate.js";

const router = express.Router();

router.post(
  "/register/employee",
  validateEmployeeRegister,
  validate,
  registerEmployee
);

router.post(
  "/login",
  validateLogin,
  validate,
  login
);

export default router;