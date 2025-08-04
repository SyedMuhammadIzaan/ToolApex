import { accessAllCategory, categoryById, editCategoryById, newCategory, removeCategoryById } from "../services/CategoryService.js";
import categorySchemaValidation from "../validators/CategoryValidation.js";

export const createCategory=async (req,res)=>{
    try {
        // console.log("Req Body",req.body)
        const {error,value}=categorySchemaValidation.validate(req.body);
        if(error){
            return res.status(400).json({error:error.details[0].message});
        }
        const category=await newCategory(value);
        return res.status(201).json({success:true,data:category});
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }    
}

export const getAllCategory=async (req,res)=>{
    try {
        const categories=await accessAllCategory();
        if(!categories) return res.status(204).json({data:categories});

        return res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: err.message });
}
    }

export const getCategoryById=async (req,res)=>{
    try {
        const {categoryId}=req.params;
        const category=await categoryById(categoryId);
        if(category){
            return res.status(200).json({success:true,data:category})
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
} 
export const updateCategoryById=async (req,res)=>{
    try {
        const {categoryId}=req.params;
        const {error,value}=categorySchemaValidation.validate(req.body);
        const updatedCategory=await editCategoryById(categoryId,value);
        return res.status(201).json({data:updatedCategory});
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
}

export const deleteCategoryById=async (req,res)=>{
    try {
        const {categoryId}=req.params;
        const response=await removeCategoryById(categoryId);
        return res.status(200).json({message:"Successfully Deleted Category"})
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
}