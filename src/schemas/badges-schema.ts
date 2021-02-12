import Joi from "joi";

export const badgesSchema = Joi.array().items(
  Joi.object({
    id: Joi.string().required(),
    details: Joi.string(),
    display: Joi.string(),
    to: Joi.string(),
    about: Joi.object().unknown(),
  }).required()
);
