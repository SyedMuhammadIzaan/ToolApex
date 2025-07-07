import axios from "axios";
import {
	accessAllBlog,
	editBlogById,
	newBlog,
	removeBlogById,
} from "../services/BlogService.js";
import blogSchemaValidation from "../validators/BlogValidation.js";

export const createBlog = async (req, res) => {
	try {
		console.log("Req Body", req.body);
		const { error, value } = blogSchemaValidation.validate(req.body);
		if (error) {
			return res.status(400).json({ error: error.details[0].message });
		}

		// const convertedImages = await Promise.all(
		// 	value.image.map(async (img) => {
		// 		// CASE 1: already a base64 image with prefix
		// 		if (img.startsWith("data:image")) {
		// 			return img;
		// 		}
		// 		// CASE 2: image is a public URL
		// 		else if (img.startsWith("http")) {
		// 			const response = await axios.get(img, {
		// 				responseType: "arraybuffer",
		// 			});
		// 			const buffer = Buffer.from(response.data, "binary");
		// 			const contentType = response.headers["content-type"];
		// 			return `data:${contentType};base64,${buffer.toString("base64")}`;
		// 		}
		// 		// CASE 3: raw base64 string
		// 		else {
		// 			return `data:image/jpeg;base64,${img}`;
		// 		}
		// 	})
		// );

		
		// const blogData = {
		// 	...value,
		// 	image: convertedImages,
		// };
		const blog = await newBlog(value);
		return res.status(201).json({ success: true, data: blog });
	} catch (error) {
		res.status(500).json({ error: "Server error", details: error.message });
	}
};

export const getAllBlog = async (req, res) => {
	try {
		const blogs = await accessAllBlog();
		if (!blogs) return res.status(204).json({ data: blogs });

		return res.status(200).json(blogs);
	} catch (error) {
		res.status(500).json({ error: "Server error", details: error.message });
	}
};

export const updateBlogById = async (req, res) => {
	try {
		const { blogId } = req.params;
		const { error, value } = blogSchemaValidation.validate(req.body);
		if (error) {
			return res.status(400).json({ error: error.details[0].message });
		}
		// const convertedImages = await Promise.all(
		// 	value.image.map(async (img) => {
		// 		// CASE 1: already a base64 image with prefix
		// 		if (img.startsWith("data:image")) {
		// 			return img;
		// 		}
		// 		// CASE 2: image is a public URL
		// 		else if (img.startsWith("http")) {
		// 			const response = await axios.get(img, {
		// 				responseType: "arraybuffer",
		// 			});
		// 			const buffer = Buffer.from(response.data, "binary");
		// 			const contentType = response.headers["content-type"];
		// 			return `data:${contentType};base64,${buffer.toString("base64")}`;
		// 		}
		// 		// CASE 3: raw base64 string
		// 		else {
		// 			return `data:image/jpeg;base64,${img}`;
		// 		}
		// 	})
		// );
		// const updatedData = {
		// 	...value,
		// 	image: convertedImages || value.image,
		// };

		const updatedBlog = await editBlogById(blogId, value);
		return res.status(201).json({ data: updatedBlog });
	} catch (error) {
		res.status(500).json({ error: "Server error", details: error.message });
	}
};

export const deleteBlogById = async (req, res) => {
	try {
		const { blogId } = req.params;
		const response = await removeBlogById(blogId);
		return res.status(200).json({ message: "Successfully Deleted Blog" });
	} catch (error) {
		res.status(500).json({ error: "Server error", details: err.message });
	}
};
