import { Config } from "../classes";
import { Dictionary, Settings } from "../declarations";
import { defaultSettings } from "../options";
import { combine } from "../utilities";

export function resolveSettings(config: Config): Settings {
  const configSettings: Settings = config.settings ? config.settings : {};

  const settings = combine(
    defaultSettings as Dictionary,
    configSettings as Dictionary
  );

  return settings;
}
