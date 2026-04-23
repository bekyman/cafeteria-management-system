import { body } from "express-validator";


export const validateEmployeeRegister = [
  body("name")
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .isEmail()
    .withMessage("Valid email required"),

  body("employeeId")
    .notEmpty()
    .withMessage("Employee ID is required"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];



export const validateLogin = [
  body("username")
    .notEmpty()
    .withMessage("Username is required"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];