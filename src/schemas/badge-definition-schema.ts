import Joi from "joi";
const { alternatives, boolean, object, string } = Joi.types();

import { any } from "./any";

export const badgeDefinitionSchema = object.keys({
  details: string,
  to: string,
  display: string,
  path: string,
  variations: object.pattern(
    any,
    object.keys({
      details: string,
      options: object.pattern(any, alternatives.try(string, boolean)),
      path: string,
      to: string,
      display: string,
    })
  ),
});
