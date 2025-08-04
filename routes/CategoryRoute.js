import express from "express";
import { createCategory, deleteCategoryById, getAllCategory, getCategoryById, updateCategoryById } from "../controller/CategoryController.js";
import protect from "../middleware/authMiddleware.js";
const route=express.Router();

route.post("/create-category",protect,createCategory);
route.get("/:categoryId",getCategoryById);
route.get("/",getAllCategory);
route.put("/:categoryId",protect,updateCategoryById);
route.delete("/:categoryId",protect,deleteCategoryById);

export default route;