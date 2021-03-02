import { Config } from "../types";

export function loadConfigCmd(): Config {
  const config = new Config();
  return config;
}
