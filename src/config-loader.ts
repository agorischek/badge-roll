"use strict";

import { cosmiconfigSync } from "cosmiconfig";
import { configLocations, packageProperty } from "./config-locations";

const explorer = cosmiconfigSync(packageProperty, {
  searchPlaces: configLocations,
});

export function loadConfig() {
  const config = explorer.search();
  return config;
}
