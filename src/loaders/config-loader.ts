import { cosmiconfigSync } from "cosmiconfig";

import { filePaths, packageProperty } from "../options/config-locations";
import { configSchema } from "../schemas";
import { Config } from "../declarations";

const explorer = cosmiconfigSync(packageProperty, {
  searchPlaces: filePaths,
});

function findConfig() {
  const config = explorer.search();
  return config;
}

function validateConfig(config: Config) {
  const { error, value } = configSchema.validate(config);
  if (error) {
    throw error;
  } else {
    return value;
  }
}

export function loadConfig(): Config {
  const result = findConfig();
  const config = result.config;
  validateConfig(config);
  return config;
}
