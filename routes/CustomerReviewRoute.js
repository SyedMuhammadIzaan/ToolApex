import express from "express";
import { createReview, deleteReviewById, getAllReview, updateReviewById } from "../controller/CustomerReviewController";

const route=express.Router();

route.post("/create-review",createReview);
route.get("/",getAllReview);
route.get("/:reviewId",getSingleReview);
route.put("/:reviewId",updateReviewById);
route.delete("/:reviewId",deleteReviewById)

export default route;