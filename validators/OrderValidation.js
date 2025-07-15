import Joi from 'joi';

export const orderSchemaValidation = Joi.object({
  cartItems: Joi.array().items(
    Joi.object({
      productName: Joi.string().required(),
      originalPrice: Joi.number().required(),
      discountPrice: Joi.number().required(),
      quantity: Joi.number().integer().min(1).required(),
    })
  ).required(),

  subTotal: Joi.number().required(),
  shipping: Joi.string().required(),
  tax: Joi.number().required(),
  total: Joi.number().required(),

  contactInfo: Joi.object({
    fullName: Joi.string().required(),
    emailAddress: Joi.string().email().required(),
    phoneNo1: Joi.number().required(),
    phoneNo2: Joi.number().required(),
  }).required(),

  shippingAddress: Joi.object({
    address1: Joi.string().required(),
    address2: Joi.string().required(),
    city: Joi.string().required(),
    postalCode: Joi.string().required(),
    nearestLandMark: Joi.string().required(),
  }).required(),

  paymentResult:Joi.object({
    id:Joi.string().required(),
    status:Joi.string().required(),
    payerName:Joi.string().required(),
    email:Joi.string().required(),
  })
});
