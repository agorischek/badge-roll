import Joi from "joi";
const { boolean, object, string } = Joi.types();

import { configSchema } from "./config-schema.js";

export const runSchema = object.keys({
  original: string,
  modified: string,
  filePath: string,
  matches: boolean,
  config: configSchema,
});
