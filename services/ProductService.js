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
    console.log(":",pName)
    const response = await Product.findOne({name:pName}).populate("category");
    console.log("res",response)
    return response;
  } catch (error) {
    throw error;
  }
};

export const editProductById = async (pId, updatedData) => {
  try {
    // console.log("Pid",pId)
    const response = await Product.findByIdAndUpdate(pId, updatedData, { new: true }).populate("category");
    // console.log("Update Product Response",response)
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
