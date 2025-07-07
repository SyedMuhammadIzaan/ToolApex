import Category from "../models/CategoryModel.js";


export const newCategory = async (data) => {
  try {
    const addCategory = new Category(data);
    const response = await addCategory.save();
    return response;
  } catch (error) {
    throw error;
  }
};

export const editCategoryById = async (cId, updatedData) => {
  try {
    const response = await Category.findByIdAndUpdate(cId, updatedData, { new: true }).populate("products");
    return response;
  } catch (error) {
    throw error;
  }
};

export const accessAllCategory = async () => {
  try {
    const response = await Category.find().populate("products");
    return response;
  } catch (error) {
    throw error;
  }
};

export const removeCategoryById = async (pId) => {
  try {
    const category = await Category.findById(pId);
    if (!category) return null;
    return await Category.findByIdAndDelete(pId);
  } catch (error) {
    throw error;
  }
};
