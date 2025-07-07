import axios from "axios";
import {
	editProductById,
	newProduct,
	productByName,
	removeProductById,
} from "../services/ProductService.js";
import productSchemaValidation from "../validators/ProductValidation.js";

export const createProduct = async (req, res) => {
	try {
		const { error, value } = productSchemaValidation.validate(req.body);
		if (error) {
			console.log("Error", error);
			return res.status(400).json({ error: error.details[0].message });
		}
		const convertedImages = await Promise.all(
			value.images.map(async (img) => {
				// CASE 1: already a base64 image with prefix
				if (img.startsWith("data:image")) {
					return img;
				}
				// CASE 2: image is a public URL
				else if (img.startsWith("http")) {
					const response = await axios.get(img, {
						responseType: "arraybuffer",
					});
					const buffer = Buffer.from(response.data, "binary");
					const contentType = response.headers["content-type"];
					return `data:${contentType};base64,${buffer.toString("base64")}`;
				}
				// CASE 3: raw base64 string
				else {
					return `data:image/jpeg;base64,${img}`;
				}
			})
		);
		const productData = {
			...value,
			images: convertedImages,
		};

		const product = await newProduct(productData);
		res.status(201).json(product);
		// const {name,price,originalPrice,discount,rating,reviewCount,inStock,sku,images,description,features,specification,included}=req.body;
	} catch (error) {
		res.status(500).json({ error: "Server error", details: error.message });
	}
};

export const getSingleProduct = async (req, res) => {
	try {
		const { productName } = req.params;
		// const {error,value}=productSchemaValidation(productName);
		if (error) {
			return res.status(400).json({ error: error.details[0].message });
		}
		const product = await productByName(productName);
		return res
			.status(200)
			.json({
				success: true,
				message: "Product Found Successfully",
				data: product,
			});
	} catch (error) {
		res.status(500).json({ error: "Server error", details: err.message });
	}
};

export const getAllProduct = async (req, res) => {
	try {
		const allProduct = await accessAllProduct();
		return res
			.status(200)
			.json({
				success: true,
				message: "Products Found Successfully",
				data: allProduct,
			});
	} catch (error) {
		res.status(500).json({ error: "Server error", details: err.message });
	}
};

export const updateProduct = async (req, res) => {
	try {
		const { pId } = req.params;
		const { error, value } = productSchemaValidation.validate(req.body);
		if (error) {
			return res.status(400).json({ error: error.details[0].message });
		}
		// Convert each image in the images array to base64
		const convertedImages = await Promise.all(
			value.images.map(async (img) => {
				// CASE 1: already a base64 image with prefix
				if (img.startsWith("data:image")) {
					return img;
				}
				// CASE 2: image is a public URL
				else if (img.startsWith("http")) {
					const response = await axios.get(img, {
						responseType: "arraybuffer",
					});
					const buffer = Buffer.from(response.data, "binary");
					const contentType = response.headers["content-type"];
					return `data:${contentType};base64,${buffer.toString("base64")}`;
				}
				// CASE 3: raw base64 string
				else {
					return `data:image/jpeg;base64,${img}`;
				}
			})
		);
		const updateProductData = {
			...value,
			image: convertedImages,
		};

		const updatedProduct = await editProductById(pId, updateProductData);
		return res.status(201).json({ data: updatedProduct });
	} catch (error) {
		res.status(500).json({ error: "Server error", details: err.message });
	}
};

export const deleteProductById = async (req, res) => {
	try {
		const { productId } = req.params;
		const response = await removeProductById(productId);
		return res.status(200).json({ message: "Successfully Deleted Product" });
	} catch (error) {
		res.status(500).json({ error: "Server error", details: err.message });
	}
};
