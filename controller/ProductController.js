import axios from "axios";
import {
	accessAllProduct,
	editProductById,
	newProduct,
	productById,
	productByName,
	removeProductById,
} from "../services/ProductService.js";
import productSchemaValidation from "../validators/ProductValidation.js";

export const createProduct = async (req, res) => {
	try {
		const { error, value } = productSchemaValidation.validate(req.body);
		// console.log("Customer Review",value)
		if (error) {
			console.log("Error", error);
			return res.status(400).json({ error: error.details[0].message });
		}
		// let base64Image;
		// if (value.mainImage?.startsWith("data:mainImage")) {
		// 	base64Image = value.mainImage;
		// } else if (value.mainImage?.startsWith("http")) {
		// 	const response = await axios.get(value.mainImage, {
		// 		responseType: "arraybuffer",
		// 	});
		// 	const buffer = Buffer.from(response.data, "binary");
		// 	const contentType = response.headers["content-type"];
		// 	base64Image = `data:${contentType};base64,${buffer.toString("base64")}`;
		// } else if (value.mainImage) {
		// 	base64Image = `data:image/jpeg;base64,${value.mainImage}`;
		// }

		// const convertedImages = await Promise.all(
		// 	value.images.map(async (img) => {
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
		// const productData = {
		// 	...value,
		// 	mainImage:base64Image || value.mainImage,
		// 	images: convertedImages,
		// };

		const product = await newProduct(value);
		res.status(201).json(product);
		// const {name,price,originalPrice,discount,rating,reviewCount,inStock,sku,images,description,features,specification,included}=req.body;
	} catch (error) {
		res.status(500).json({ error: "Server error", details: error.message });
	}
};

export const getSingleProduct = async (req, res) => {
	try {
		const { productName } = req.params;
		const product = await productByName(productName);
		return res.status(200).json({
			success: true,
			message: "Product Found Successfully",
			data: product,
		});
	} catch (error) {
		res.status(500).json({ error: "Server error", details: error.message });
	}
};
export const getProductById=async (req,res)=>{
	try{
		const {productId}=req.params;
		const product=await productById(productId);
		return res.status(200).json({
			success: true,
			message: "Product Found Successfully",
			data: product,
		});
	}catch(error){
		res.status(500).json({ error: "Server error", details: error.message });
	}
}
export const getAllProduct = async (req, res) => {
	try {
		const allProduct = await accessAllProduct();
		return res.status(200).json({
			success: true,
			message: "Products Found Successfully",
			data: allProduct,
		});
	} catch (error) {
		res.status(500).json({ error: "Server error", details: error.message });
	}
};

export const updateProduct = async (req, res) => {
	try {
		const { productId } = req.params;
		const { error, value } = productSchemaValidation.validate(req.body);
		if (error) {
			return res.status(400).json({ error: error.details[0].message });
		}
		
		// let base64Image;

		// if (value.image?.startsWith("data:mainImage")) {
		// 	base64Image = value.mainImage;
		// } else if (value.mainImage?.startsWith("http")) {
		// 	const response = await axios.get(value.mainImage, { responseType: "arraybuffer" });
		// 	const buffer = Buffer.from(response.data, "binary");
		// 	const contentType = response.headers["content-type"];
		// 	base64Image = `data:${contentType};base64,${buffer.toString("base64")}`;
		// } else if (value.image) {
		// 	base64Image = `data:image/jpeg;base64,${value.mainImage}`;
		// }


		// const convertedImages = await Promise.all(
		// 	value.images.map(async (img) => {
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
		// const updateProductData = {
		// 	...value,
		// 	mainImage:base64Image || value.mainImage,
		// 	image: convertedImages,
		// };

		const updatedProduct = await editProductById(productId, value);
		return res.status(201).json({ message:"Successfully Data Updated",data: updatedProduct });
	} catch (error) {
		res.status(500).json({ error: "Server error", details: error.message });
	}
};

export const deleteProductById = async (req, res) => {
	try {
		const { productId } = req.params;
		const response = await removeProductById(productId);
		return res.status(200).json({ message: "Successfully Deleted Product" });
	} catch (error) {
		res.status(500).json({ error: "Server error", details: error.message });
	}
};
