import express from "express";
import { login, registerEmployee } from "../controllers/authController.js";

const router = express.Router();

router.post("/register/employee", registerEmployee);
router.post("/login", login);

export default router;