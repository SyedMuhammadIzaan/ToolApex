import Product from "../models/ProductModel.js";

export const newProduct = async (data) => {
  try {
    const addProduct = new Product(data);
    const response = await addProduct.save();
    return response;
  } catch (error) {
    throw error;
  }
};

export const productByName = async (pName) => {
  try {
    const response = await Product.findOne({ name: pName }).populate("category");
    return response;
  } catch (error) {
    throw error;
  }
};

export const editProductById = async (pId, updatedData) => {
  try {
    const response = await Product.findByIdAndUpdate(pId, updatedData, { new: true }).populate("category");
    return response;
  } catch (error) {
    throw error;
  }
};

export const accessAllProduct = async () => {
  try {
    const response = await Product.find().populate("category");
    return response;
  } catch (error) {
    throw error;
  }
};

export const removeProductById = async (pId) => {
  try {
    const product = await Product.findById(pId);
    if (!product) return null;
    return await Product.findByIdAndDelete(pId);
  } catch (error) {
    throw error;
  }
};
