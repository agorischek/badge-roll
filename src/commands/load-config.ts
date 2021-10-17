import { Config } from "../types/index";

export function loadConfigCmd(): Config {
  const config = new Config();
  return config;
}
