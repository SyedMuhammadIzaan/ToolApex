import Product from "../models/ProductModel";
import productSchemaValidation from "../validators/ProductValidation";

export const createProduct=(req,res)=>{
    try {
        const {error,value}=productSchemaValidation(req.body);
        if(error){
            console.log("Error",error);
            return res.status(400).json({error:error.details[0].message});
        }
        const newProduct=new Product(value);
        const saveProduct=await newProduct.save()
        res.status(201).json(saveProduct)
        // const {name,price,originalPrice,discount,rating,reviewCount,inStock,sku,images,description,features,specification,included}=req.body;
        
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
}