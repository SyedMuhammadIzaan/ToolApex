import mongoose from "mongoose";

const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true, // okay
  },
  price: {
    type: Number,
    required: true,
  },
  originalPrice: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  reviewCount: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
  sku: {
    type: String,
    required: true,
    unique: true, // makes sense for unique product code
  },
  images: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  features: {
    type: [String],
    required: true,
  },
  specification: {
    type: Map,
    of: String,
    required: true,
  },
  included: {
    type: [String],
    required: true,
  },
  customerReview:{
    type:mongoose.Schema.ObjectId,
    ref:"CustomerReview",
  }
}, { timestamps: true });

const Product = mongoose.model("Product", ProductSchema);

export default Product;
