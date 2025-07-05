import express from "express";
import { createBlog, deleteBlogById, getAllBlog, updateBlogById } from "../controller/BlogController.js";
const route=express.Router();

route.post("/admin/create-blog",createBlog);
route.get("/",getAllBlog);
route.put("/blog/:blogId",updateBlogById);
route.delete("/blog/:blogId",deleteBlogById);

export default route