import { accessAllBlog, editBlogById, newBlog, removeBlogById } from "../services/BlogService.js";
import blogSchemaValidation from "../validators/BlogValidation.js";

export const createBlog=async (req,res)=>{
    try {
        console.log("Req Body",req.body)
        const {error,value}=blogSchemaValidation.validate(req.body);
        if(error){
            return res.status(400).json({error:error.details[0].message});
        }
        const blog=await newBlog(value);
        return res.status(201).json({success:true,data:blog});
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }    
}

export const getAllBlog=async (req,res)=>{
    try {
        const blogs=await accessAllBlog();
        if(!blogs) return res.status(204).json({data:blogs});

        return res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
}

export const updateBlogById=async (req,res)=>{
    try {
        const {blogId}=req.params;
        const {error,value}=blogSchemaValidation.validate(req.body);
        const updatedBlog=await editBlogById(blogId,value);
        return res.status(201).json({data:updatedBlog});
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
}

export const deleteBlogById=async (req,res)=>{
    try {
        const {blogId}=req.params;
        const response=await removeBlogById(blogId);
        return res.status(200).json({message:"Successfully Deleted Blog"})
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
}