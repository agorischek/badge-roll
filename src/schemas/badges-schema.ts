import Joi from "joi";
const { alternatives, array, object, string } = Joi.types();

export const badgesSchema = array.items(
  alternatives.try(
    string,
    object
      .keys({
        id: string.required(),
        details: string,
        display: string,
        to: string,
        about: object.unknown(),
      })
      .required()
  )
);
