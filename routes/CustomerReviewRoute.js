import express from "express";
import { createReview, deleteReviewById, getAllReview, getSingleReview, updateReviewById } from "../controller/CustomerReviewController.js";

const route=express.Router();

route.post("/create-review",createReview);
route.get("/",getAllReview);
route.get("/:reviewId",getSingleReview);
route.put("/:reviewId",updateReviewById);
route.delete("/:reviewId",deleteReviewById)

export default route;