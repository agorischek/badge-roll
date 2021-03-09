import Joi from "joi";
const { object, string } = Joi.types();

export const settingsSchema = object.keys({
  file: string,
  position: string,
  printer: string,
  provider: string,
  separator: string,
  style: string,
});
