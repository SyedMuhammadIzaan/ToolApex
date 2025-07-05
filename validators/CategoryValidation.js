import Joi from "joi";
import joiObjectId from "joi-objectid";

Joi.objectId = joiObjectId(Joi);

const categorySchemaValidation=Joi.object({
    name:Joi.string().min(3).max(100).required(),
    products:Joi.objectId(),
    image:Joi.array().items(Joi.string()).min(1).required(),
})

export default categorySchemaValidation;