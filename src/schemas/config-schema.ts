import Joi from "joi";
const { object } = Joi.types();

import { aboutSchema } from "./about-schema";
import { badgesSchema } from "./badges-schema";
import { pluginsSchema } from "./plugins-schema";
import { settingsSchema } from "./settings-schema";

export const configSchema = object.keys({
  badges: badgesSchema,
  about: aboutSchema,
  settings: settingsSchema,
  plugins: pluginsSchema,
});
