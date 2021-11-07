import { About, BadgeConfig, Plugins, SettingsData } from "../index.js";
import { findConfig, validateConfig } from "../../loaders/index.js";

export class Config {
  about?: About;
  badges?: Array<BadgeConfig>;
  plugins?: Plugins;
  settings?: SettingsData;

  constructor(configData?: Config) {
    const config = configData || findConfig().config;
    validateConfig(config);
    return config;
  }
}
