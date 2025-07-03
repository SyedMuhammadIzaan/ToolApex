import mongoose from "mongoose";

const {Schema}= mongoose;

const CategorySchema=new Schema({
    name:{
        type:String,
        unique:true,
        required:true,
    },
    image:{
        tyep:String,
        required:true,
    },
    products:[{
        type:mongoose.Schema.ObjectId,
        ref:"Product"
    }]

},{timestamps:true})

const Category=mongoose.model("Category",CategorySchema);

export default Catgeory;