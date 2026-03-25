import {
  createInventoryItemService,
  getInventoryService,
  updateInventoryItemService,
  deleteInventoryItemService,
} from "../services/inventoryService.js";

export const createInventoryItem = async (req, res, next) => {
  try {
    const item = await createInventoryItemService(req.body);

    res.status(201).json({
      success: true,
      data: item,
    });
  } catch (err) {
    next(err);
  }
};

export const getInventory = async (req, res, next) => {
  try {
    const items = await getInventoryService();

    res.status(200).json({
      success: true,
      data: items,
    });
  } catch (err) {
    next(err);
  }
};

export const updateInventoryItem = async (req, res, next) => {
  try {
    const updatedItem = await updateInventoryItemService(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      data: updatedItem,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteInventoryItem = async (req, res, next) => {
  try {
    await deleteInventoryItemService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Inventory item deleted",
    });
  } catch (err) {
    next(err);
  }
};