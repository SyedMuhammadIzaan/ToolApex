import mongoose from "mongoose";

const {Schema}=mongoose;

const BlogSchema=new Schema({
    title:{
        type:String,
        required:true,
        unique:true,
    },
    excerpt:{
        type:String,
        required:true,
    },
    tag:{
        type:[String],
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
        unique:true,
    },
    category:{
        type:mongoose.Schema.ObjectId,
        ref:"Category",
    },
    author:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    readTime:{
        type:String,
        required:true,
    },
    href:{
        type:String,
        required:true,
    }
},{timestamps:true});

const Blog=mongoose.model("Blog",BlogSchema);

export default Blog;