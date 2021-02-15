import { cosmiconfigSync } from "cosmiconfig";

import { filePaths, packageProperty } from "../options";
import { configSchema } from "../schemas";
import { Config } from "../classes";

const explorer = cosmiconfigSync(packageProperty, {
  searchPlaces: filePaths,
});

export function findConfig() {
  const config = explorer.search();
  return config;
}

export function validateConfig(config: Config) {
  const { error, value } = configSchema.validate(config);
  if (error) {
    throw error;
  } else {
    return value;
  }
}
