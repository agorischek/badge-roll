import Joi from "joi";

export const configSchema = Joi.object({
  badges: Joi.array().items(
    Joi.object({
      id: Joi.string().required(),
      details: Joi.string(),
      display: Joi.string(),
      to: Joi.string(),
      about: Joi.object().unknown(),
    }).required()
  ),
  about: Joi.object().unknown(),
  settings: Joi.object({
    style: Joi.string(),
    provider: Joi.string(),
  }),
  style: Joi.string(),
  plugins: Joi.array(),
});
