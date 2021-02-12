import { About, BadgeConfig, Plugins, Settings } from ".";

export interface Config {
  about?: About;
  badges?: Array<BadgeConfig>;
  plugins?: Plugins;
  settings?: Settings;
}
