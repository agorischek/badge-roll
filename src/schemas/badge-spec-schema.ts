import Joi from "joi";
const { alternatives, boolean, object, string } = Joi.types();

import { any } from "./any";

export const badgeSpecSchema = object.keys({
  details: string,
  display: string,
  path: string,
  to: string,
  options: object.pattern(any, alternatives.try(string, boolean)),
});
