import mongoose from "mongoose";

const {Schema}=mongoose;

const CustomerReviewSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    comment:{
        type:String,
        required:true,
    }
})

const CustomerReview=mongoose.model("CustomerReview",CustomerReviewSchema);

export default CustomerReview;