import Joi from "joi";

export const badgeDefinitionSchema = Joi.object({
  details: Joi.string(),
  to: Joi.string(),
  display: Joi.string(),
  path: Joi.string(),
  variations: Joi.object().pattern(
    /.+/,
    Joi.object({
      details: Joi.string(),
      query: Joi.object().unknown(),
      path: Joi.string(),
      to: Joi.string(),
      display: Joi.string(),
    })
  ),
});
