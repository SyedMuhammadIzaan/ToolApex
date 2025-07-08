import express from "express";
import { createBlog, deleteBlogById, getAllBlog, updateBlogById } from "../controller/BlogController.js";
import protect from "../middleware/authMiddleware.js";
const route=express.Router();

route.post("/admin/create-blog",protect,createBlog);
route.get("/",getAllBlog);
route.put("/blog/:blogId",protect,updateBlogById);
route.delete("/blog/:blogId",protect,deleteBlogById);

export default route