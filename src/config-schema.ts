"use strict";

import * as Joi from "joi";

export interface Config {
  badges: Array<{
    id: string;
    details?: string;
    display?: string;
    to?: string;
  }>;
  style?: string;
  about?: unknown;
  plugins: Array<string>;
}

export const configSchema = Joi.object({
  badges: Joi.array().items(
    Joi.object({
      id: Joi.string().required(),
      details: Joi.string(),
      display: Joi.string(),
      to: Joi.string(),
      about: Joi.object().unknown(),
    }).required()
  ),
  about: Joi.object().unknown(),
  style: Joi.string(),
  plugins: Joi.array(),
});
