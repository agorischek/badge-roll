import { Config } from "../types/index.js";

export function loadConfigCmd(): Config {
  const config = new Config();
  return config;
}
