import Joi from "joi";
const { array, string } = Joi.types();

export const pluginsSchema = array.items(string);
