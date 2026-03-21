import FoodItem from "../models/FoodItem.js";

export const getFoods = async (req, res) => {
  const foods = await FoodItem.find();
  res.json(foods);
};

export const createFood = async (req, res) => {
  const food = new FoodItem(req.body);
  const saved = await food.save();
  res.status(201).json(saved);
};

export const deleteFood = async (req, res) => {
  await FoodItem.findByIdAndDelete(req.params.id);
  res.json({ message: "Food deleted" });
};