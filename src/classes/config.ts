import { About } from ".";
import { BadgeConfig, Plugins, Settings } from "../declarations";
import { loadConfig } from "../loaders";

export class Config {
  about?: About;
  badges?: Array<BadgeConfig>;
  plugins?: Plugins;
  settings?: Settings;

  constructor() {
    return loadConfig();
  }
}
