import CustomerReview from "../models/CustomerReviewModel.js";

export const newReview = async (data) => {
	try {
		const addReview = new CustomerReview(data);
		const response = await addReview.save();
		return response;
	} catch (error) {
		throw error;
	}
};
export const fetchReviewById=async (reviewId)=>{
	try {
		const response=await CustomerReview.findById({_id:reviewId});
		if(!response) return null;
		return response;
	} catch (error) {
		throw error;
	}
}
export const accessAllReview =async ()=>{
    try {
        const response=await CustomerReview.find();
        return response;
    } catch (error) {
        throw error;
    }
}
export const reviewById = async (reviewId) => {
	try {
		const review = await CustomerReview.findById({ _id: reviewId });
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
		const response = await CustomerReview.findByIdAndUpdate(review._id, data, { new: true });
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