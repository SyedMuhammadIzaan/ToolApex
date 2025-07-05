import express from "express";
import { createCategory, deleteCategoryById, getAllCategory, updateCategoryById } from "../controller/CategoryController.js";
const route=express.Router();

route.post("/create-category",createCategory);
route.get("/",getAllCategory);
route.put("/:categoryId",updateCategoryById);
route.delete("/:categoryId",deleteCategoryById);

export default route;