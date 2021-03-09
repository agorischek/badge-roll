import Joi from "joi";
const { alternatives, boolean, number, object, string } = Joi.types();

import { any } from "./patterns";

export const badgeSpecSchema = object.keys({
  details: string,
  display: string,
  path: string,
  to: string,
  options: object.pattern(any, alternatives.try(string, boolean, number)),
});
