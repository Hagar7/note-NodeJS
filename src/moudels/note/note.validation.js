import Joi from "joi";

export const addSchema = Joi.object({
  title: Joi.string().min(2).max(10).required().messages({
    "string.max": "length must be less than or equal to 10 characters long",
  }),
  desc: Joi.string().min(2).required(),
}).required();

export const deleteSchema = Joi.object({
  noteId: Joi.string().hex().length(24).required(),
});

export const updateSchema = Joi.object({
  noteId: Joi.string().hex().length(24).required(),
  title: Joi.string().min(2).max(10).messages({
    "string.max": "length must be less than or equal to 10 characters long",
  }),
  desc: Joi.string().min(2),
});
