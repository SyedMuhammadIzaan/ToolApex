import CustomerReview from "../models/CustomerReviewModel.js";
import Product from "../models/ProductModel.js";

export const newReview = async (data) => {
	try {
		console.log("Data of Review",data)
		const addReview = new CustomerReview(data);
		const response = await addReview.save();
		await Product.findByIdAndUpdate(
  			data.product,                       // filter (product ID)
  			{ $push: { customerReview: response._id } }, // update
  			{ new: true }                        
);
		return response;
	} catch (error) {
		throw error;
	}
};
export const fetchReviewById=async (reviewId)=>{
	try {
		const response=await CustomerReview.findById({_id:reviewId}).populate("product");
		if(!response) return null;
		return response;
	} catch (error) {
		throw error;
	}
}
export const accessAllReview =async ()=>{
    try {
        const response=await CustomerReview.find().populate("product");
        return response;
    } catch (error) {
        throw error;
    }
}
export const reviewById = async (reviewId) => {
	try {
		const review = await CustomerReview.findById({ _id: reviewId }).populate("product");
		if (!review) {
			return null;
		}
		return review;
	} catch (error) {
		throw error;
	}
};

export const editReviewById = async (reviewId, data) => {
	try {
		const review = await CustomerReview.findById({ _id: reviewId },data,{ new: true });
		if (!review) {
			return null;
		}
		const response = await CustomerReview.findByIdAndUpdate(review._id, data, { new: true }).populate("product");
		return response;
	} catch (error) {
		throw error;
	}
};


export const removeReviewById=async (reviewId)=>{
    try{
        const review= await CustomerReview.findById({_id:reviewId});
        if(!review){
            return null;
        }
        const response=await CustomerReview.findByIdAndDelete(review._id);
        return response;
    } catch(error){
        throw error;
    }
}