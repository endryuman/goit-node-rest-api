import Joi from "joi";

export const createContactSchema = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(2).max(15).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      favorite: Joi.boolean(),
    })
    .validate(data);

export const updateContactSchema = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(2).max(15),
      email: Joi.string().email(),
      phone: Joi.string(),
    })
    .validate(data);

export const updateStatusContactSchema = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      favorite: Joi.boolean().required(),
    })
    .validate(data);
