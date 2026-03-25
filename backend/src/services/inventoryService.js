import Inventory from "../models/Inventory.js";

export const createInventoryItemService = async (data) => {
  return await Inventory.create(data);
};

export const getInventoryService = async () => {
  return await Inventory.find().sort({ createdAt: -1 });
};

export const updateInventoryItemService = async (id, data) => {
  const item = await Inventory.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!item) {
    const error = new Error("Inventory item not found");
    error.statusCode = 404;
    throw error;
  }

  return item;
};

export const deleteInventoryItemService = async (id) => {
  const item = await Inventory.findByIdAndDelete(id);

  if (!item) {
    const error = new Error("Inventory item not found");
    error.statusCode = 404;
    throw error;
  }

  return item;
};