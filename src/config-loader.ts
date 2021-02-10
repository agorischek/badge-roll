"use strict";

import { cosmiconfigSync } from "cosmiconfig";
import { configLocations, packageProperty } from "./config-locations";
import { configSchema } from "./config-schema";

const explorer = cosmiconfigSync(packageProperty, {
  searchPlaces: configLocations,
});

function findConfig() {
  const config = explorer.search();
  return config;
}

function validateConfig(config: any) {
  const { error, value } = configSchema.validate(config);
  if (error) {
    throw error;
  } else {
    return value;
  }
}

export function loadConfig() {
  const result = findConfig();
  const config = result.config;
  validateConfig(config);
  return config;
}
