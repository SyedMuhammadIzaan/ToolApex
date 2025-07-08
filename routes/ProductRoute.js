import express from "express"
import { createProduct, deleteProductById, getAllProduct, getSingleProduct, updateProduct } from "../controller/ProductController.js";
import protect from "../middleware/authMiddleware.js";
const route=express.Router();

route.post("/admin/create-product",protect,createProduct);
route.get("/",getAllProduct);
route.get("/product/:productName",getSingleProduct);
route.put("/product/:productId",protect,updateProduct);
route.delete("/product/:productId",protect,deleteProductById);

export default route