import merge from "lodash.merge";

import { Config, Settings } from "../declarations";
import { defaultSettings } from "../options/default-settings";

export function resolveSettings(config: Config): Settings {
  const configSettings: Settings = config.settings ? config.settings : {};

  const settings = merge({}, defaultSettings, configSettings);

  return settings;
}
