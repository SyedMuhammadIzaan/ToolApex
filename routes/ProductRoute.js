import express from "express"
import { createProduct, deleteProductById, getAllProduct, getSingleProduct, updateProduct } from "../controller/ProductController.js";

const route=express.Router();

route.post("/admin/create-product",createProduct);
route.get("/",getAllProduct);
route.get("/product/:productName",getSingleProduct);
route.put("/product/:productId",updateProduct);
route.delete("/product/:productId",deleteProductById);

export default route