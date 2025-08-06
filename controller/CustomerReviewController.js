import { accessAllReview, editReviewById, fetchReviewById , newReview, removeReviewById, reviewById } from "../services/CustomerReviewService.js";
import customerReviewSchemaValidation from "../validators/ReviewValidation.js";

export const createReview=async (req,res)=>{
    try {
        const {error,value}=customerReviewSchemaValidation.validate(req.body);
        if(error){
            return res.status(400).json({error:error.details[0].message});
        }
        const review=await newReview(value);
        res.status(201).json(review); 
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
}
export const getReviewById=async (req,res)=>{
    try {
        const {reviewId}=req.params;
        const review=await fetchReviewById(reviewId);
        res.status(201).json({success:true,data:review})
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
}
export const getSingleReview=async (req,res)=>{
    try {
        const {reviewId}=req.params;
        const review=await reviewById(reviewId);
        return res.status(200).json({ success: true, message: "Review Found Successfully", data: review });
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
}

export const getAllReview=async (req,res)=>{
    try {
        const allReview=await accessAllReview();
        return res.status(200).json({success:true,message:"Successfully Found Review",data:allReview});
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
}

export const updateReviewById=async (req,res)=>{
    try {
        const {reviewId}=req.params;
        const { error, value } = customerReviewSchemaValidation.validate(req.body);
        console.log("Value",value)
        if(error){
            return res.status(400).json({error:error.details[0].message});           
        }
        console.log("Value")
        const updatedReview=await editReviewById(reviewId,value);
        res.status(201).json({data:updatedReview});
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
}

export const deleteReviewById=async (req,res)=>{
    try {
        const {reviewId}=req.params;
        const response=await removeReviewById(reviewId);
        res.status(200).json({message:"Successfully Deleted Review"})
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
}