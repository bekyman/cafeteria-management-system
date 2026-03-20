import Food from "../models/Food.js";

export const getFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createFood = async (req, res) => {
  try {
    const { name, price } = req.body;

    const food = new Food({ name, price });
    const savedFood = await food.save();

    res.status(201).json(savedFood);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};