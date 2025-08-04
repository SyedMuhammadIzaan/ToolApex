import Blog from "../models/BlogModel.js";


export const newBlog = async (data) => {
  try {
    const addCategory = new Blog(data);
    const response = await addCategory.save();
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchBlogById=async(blogId)=>{
  try {
    const response=await Blog.findById({_id:blogId});
    if(!response) return null;
    return response;
  } catch (error) {
    throw error;
  }
}
export const editBlogById = async (blogId, updatedData) => {
  try {
    const response = await Blog.findByIdAndUpdate(blogId, updatedData, { new: true }).populate("category");
    return response;
  } catch (error) {
    throw error;
  }
};

export const accessAllBlog = async () => {
  try {
    const response = await Blog.find().populate("category");
    return response;
  } catch (error) {
    throw error;
  }
};

export const removeBlogById = async (blogId) => {
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) return null;
    return await Blog.findByIdAndDelete(blogId);
  } catch (error) {
    throw error;
  }
};
