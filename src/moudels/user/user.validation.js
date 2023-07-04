import Joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const signupSchema = Joi.object({
  name: Joi.string().min(2).max(10).required().messages({
    "string.max": "length must be less than or equal to 10 characters long",
  }),
  email: generalFields.email.required(),
  password: generalFields.password.required().messages({
    "string.pattern.base": "password must contains number and symbols",
  }),
  phone: Joi.number().required(),
}).required();



export const loginSchema = Joi.object({
    email: generalFields.email.required(),
    password: generalFields.password.required().messages({
      "string.pattern.base": "password must contains number and symbols",
    }),
}).required()