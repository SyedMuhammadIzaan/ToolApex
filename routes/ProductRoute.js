import express from "express"

const route=express.Router();

route.post("/admin/create-product");
route.get("/");
route.get("/product/:productName")
route.put("/product/:productId")
route.delete("/product/:productId");

export default route