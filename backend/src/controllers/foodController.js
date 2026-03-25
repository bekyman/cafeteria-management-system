import {
  createFoodService,
  getAllFoodsService,
  deleteFoodService,
} from "../services/foodService.js";

export const createFood = async (req, res, next) => {
  try {
    const food = await createFoodService(req.body);

    res.status(201).json({
      success: true,
      data: food,
    });
  } catch (err) {
    next(err);
  }
};

export const getFoods = async (req, res, next) => {
  try {
    const foods = await getAllFoodsService();

    res.status(200).json({
      success: true,
      data: foods,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteFood = async (req, res, next) => {
  try {
    await deleteFoodService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Food deleted",
    });
  } catch (err) {
    next(err);
  }
};