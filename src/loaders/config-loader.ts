import { cosmiconfigSync } from "cosmiconfig";

import { filePaths, packageProperty } from "../options";
import { configSchema } from "../schemas";
import { Config } from "../types/classes";

const explorer = cosmiconfigSync(packageProperty, {
  searchPlaces: filePaths,
});

export function findConfig(): unknown {
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
