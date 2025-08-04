import express from "express";
import { createBlog, getBlogById, deleteBlogById, getAllBlog, updateBlogById } from "../controller/BlogController.js";
import protect from "../middleware/authMiddleware.js";
const route=express.Router();

route.post("/admin/create-blog",protect,createBlog);
route.get("/",getAllBlog);
route.get("/:blogId",getBlogById);
route.put("/blog/:blogId",protect,updateBlogById);
route.delete("/blog/:blogId",protect,deleteBlogById);

export default route