import Joi from "joi";
const { object, string } = Joi.types();

export const settingsSchema = object.keys({
  style: string,
  provider: string,
  position: string,
  separator: string,
});
