"use strict";

import * as Joi from "joi";

export interface Config {
  badges: Array<{
    id: string;
  }>;
  style?: string;
}

export const configSchema = Joi.object({
  badges: Joi.array().items(
    Joi.object({ id: Joi.string().required() }).required()
  ),
  style: Joi.string(),
});
