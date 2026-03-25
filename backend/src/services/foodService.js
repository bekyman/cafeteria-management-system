import Food from "../models/FoodItem.js";

export const createFoodService = async (data) => {
  const food = await Food.create(data);
  return food;
};

export const getAllFoodsService = async () => {
  return await Food.find();
};

export const deleteFoodService = async (id) => {
  const food = await Food.findByIdAndDelete(id);
  if (!food) {
    throw new Error("Food not found");
  }
  return food;
}; 