import Joi from "Joi";
const { boolean, object, string } = Joi.types();

export const runSchema = object.keys({
  original: string,
  modified: string,
  filePath: string,
  matches: boolean,
});