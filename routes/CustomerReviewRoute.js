import express from "express";
import { createReview, deleteReviewById, getAllReview, getSingleReview, updateReviewById } from "../controller/CustomerReviewController.js";
import protect from "../middleware/authMiddleware.js";
const route=express.Router();

route.post("/create-review",protect,createReview);
route.get("/",getAllReview);
route.get("/:reviewId",getSingleReview);
route.put("/:reviewId",protect,updateReviewById);
route.delete("/:reviewId",protect,deleteReviewById)

export default route;