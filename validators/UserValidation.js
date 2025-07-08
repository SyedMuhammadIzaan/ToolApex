import Joi from "joi";

export const signupValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  currentPassword: Joi.string().min(6).required(),
});

export const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const forgotPasswordValidation =Joi.object({
  email:Joi.string().email().required(),
  password:Joi.string(),
})