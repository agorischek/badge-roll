import Joi from "joi";
const { object } = Joi.types();

import { aboutSchema } from "./about-schema.js";
import { badgesSchema } from "./badges-schema.js";
import { pluginsSchema } from "./plugins-schema.js";
import { settingsSchema } from "./settings-schema.js";

export const configSchema = object.keys({
  badges: badgesSchema,
  about: aboutSchema,
  settings: settingsSchema,
  plugins: pluginsSchema,
});
