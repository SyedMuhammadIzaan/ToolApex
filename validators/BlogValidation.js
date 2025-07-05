import Joi from "joi";
import joiObjectId from "joi-objectid";

Joi.objectId = joiObjectId(Joi);

const blogSchemaValidation = Joi.object({
  title: Joi.string().min(5).max(255).required(),
  excerpt: Joi.string().min(10).required(),
  image: Joi.string().uri().required(), // assuming you're storing image URLs
  category: Joi.objectId().required(), // reference to Category
  author: Joi.string().min(3).max(100).required(),
  date: Joi.date().optional(), // can be skipped (defaulted)
  readTime: Joi.string().required(), // e.g. "3 min read"
  href: Joi.string().uri().required() // assuming it's a URL
});

export default blogSchemaValidation;
