import Joi from "joi";

export const pluginsSchema = Joi.array().items(Joi.string());
