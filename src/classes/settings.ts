import { Config, ContributionSet } from "../classes";
import { SettingsData } from "../declarations";

import merge from "lodash.merge";

export class Settings {
  style?: string;
  provider?: string;
  printer?: string;
  target?: string;
  baseUrl?: string;

  constructor(config: Config, contributions: ContributionSet) {
    const a = config;
    const b = contributions;
    const settings = contributions.settings.reduce(
      (settings: SettingsData, contribution) => {
        return merge(settings, contribution);
      },
      {}
    );

    return settings;
  }
}
