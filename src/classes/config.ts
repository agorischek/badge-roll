import { About } from ".";
import { BadgeConfig, Plugins, Settings } from "../declarations";
import { findConfig, validateConfig } from "../loaders";

export class Config {
  about?: About;
  badges?: Array<BadgeConfig>;
  plugins?: Plugins;
  settings?: Settings;

  constructor() {
    const result = findConfig();
    const config = result.config;
    validateConfig(config);
    return config;
  }
}
