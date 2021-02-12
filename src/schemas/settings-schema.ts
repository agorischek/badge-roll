import Joi from "joi";

export const settingsSchema = Joi.object({
  style: Joi.string(),
  provider: Joi.string(),
});
