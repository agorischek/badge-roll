import { About, Badge, Plugins, Settings } from ".";

export interface Config {
  about?: About;
  badges?: Array<Badge>;
  plugins?: Plugins;
  settings?: Settings;
}
