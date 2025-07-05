import Joi from "joi";

const customerReviewSchemaValidation = Joi.object({
	name: Joi.string().min(3).max(25).required(),
	rating: Joi.number().min(0).max(5).required(),
	date: Joi.date().optional(),
	comment: Joi.string().min(1).required(),
});

export default customerReviewSchemaValidation;