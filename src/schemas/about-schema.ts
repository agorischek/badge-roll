import Joi from "joi";
const { object } = Joi.types();

export const aboutSchema = object.unknown();
