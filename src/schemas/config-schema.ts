import Joi from "joi";

import { aboutSchema } from "./about-schema";
import { badgesSchema } from "./badges-schema";
import { pluginsSchema } from "./plugins-schema";
import { settingsSchema } from "./settings-schema";

export const configSchema = Joi.object({
  badges: badgesSchema,
  about: aboutSchema,
  settings: settingsSchema,
  plugins: pluginsSchema,
});
