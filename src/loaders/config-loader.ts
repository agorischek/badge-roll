import { cosmiconfigSync } from "cosmiconfig";
import { CosmiconfigResult } from "cosmiconfig/dist/types";

import { filePaths, packageProperty } from "../options/index.js";
import { configSchema } from "../schemas/index.js";
import { Config } from "../types/classes/index.js";

const explorer = cosmiconfigSync(packageProperty, {
  searchPlaces: filePaths,
});

export function findConfig(): CosmiconfigResult {
  const config = explorer.search();
  return config;
}

export function validateConfig(config: Config): unknown {
  const { error, value } = configSchema.validate(config);
  if (error) {
    throw error;
  } else {
    return value;
  }
}
