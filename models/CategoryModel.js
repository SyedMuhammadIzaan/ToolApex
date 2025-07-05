import mongoose from "mongoose";

const {Schema}= mongoose;

const CategorySchema=new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    image:{
        type:[String],
        required:true,
    },
    products:[{
        type:mongoose.Schema.ObjectId,
        ref:"Product"
    }]

},{timestamps:true})

const Category=mongoose.model("Category",CategorySchema);

export default Category;