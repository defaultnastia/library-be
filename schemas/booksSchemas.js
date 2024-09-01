import Joi from "joi";

export const createBookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  isbn: Joi.string().required(),
  isBorrowed: Joi.boolean(),
});

export const updateBookSchema = Joi.object({
  title: Joi.string(),
  author: Joi.string(),
  isBorrowed: Joi.boolean(),
});

export const updateBookStatusSchema = Joi.object({
  isBorrowed: Joi.boolean(),
});
