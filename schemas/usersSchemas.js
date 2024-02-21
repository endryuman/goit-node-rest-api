import Joi from "joi";

export const signupUserSchema = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    })
    .validate(data);

export const verificationEmailSchema = (data) =>
  Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Email must be a valid address",
      "any.required": "Missing required email field",
    }),
  }).validate(data);
