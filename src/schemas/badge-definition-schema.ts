import Joi from "joi";
const { object, string } = Joi.types();

export const badgeDefinitionSchema = object.keys({
  details: string,
  to: string,
  display: string,
  path: string,
  variations: object.pattern(
    /.+/,
    object.keys({
      details: string,
      query: object.unknown(),
      path: string,
      to: string,
      display: string,
    })
  ),
});
