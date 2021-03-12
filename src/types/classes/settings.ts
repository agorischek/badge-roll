import { Config, ContributionSet, SettingsData } from "..";

import { merge } from "lodash";

export class Settings {
  style?: string;
  provider?: string;
  printer?: string;
  position?: string;
  file?: string;
  baseUrl?: string;
  separator?: string;

  constructor(config: Config, contributions: ContributionSet) {
    const contributedSettings = contributions.settings.reduce(
      (settings: SettingsData, contribution) => {
        return merge(settings, contribution);
      },
      {}
    );
    const settings = merge(contributedSettings, config.settings);
    return settings;
  }
}
