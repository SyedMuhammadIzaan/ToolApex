import Joi from "joi";
import joiObjectid from "joi-objectid";

Joi.objectId=joiObjectid(Joi);

const productSchemaValidation = Joi.object({
	name: Joi.string().min(3).max(100).required(),
	mainImage:Joi.string().required(),
	price: Joi.number().positive().required(),
	originalPrice: Joi.number().positive().required(),
	discount: Joi.number().min(0).max(100).positive().required(),
	rating: Joi.number().min(0).max(5).required(),
	reviewCount: Joi.number().integer().min(0).required(true),
	inStock: Joi.boolean().required(),
	sku: Joi.string().required(),
	images: Joi.array().items(Joi.string()).min(1).required(),
	description: Joi.string().min(10).required(),
	features: Joi.array().items(Joi.string()).min(1).required(),
	specification: Joi.object().pattern(Joi.string(), Joi.string()).required(),
	included: Joi.array().items(Joi.string()).min(1).required(),
	category:Joi.objectId(),
	customerReview:Joi.objectId(),
});

export default productSchemaValidation;
