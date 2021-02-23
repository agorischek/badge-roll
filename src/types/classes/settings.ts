import { Config, ContributionSet, SettingsData } from "../";

import merge from "lodash.merge";

export class Settings {
  style?: string;
  provider?: string;
  printer?: string;
  file?: string;
  baseUrl?: string;

  constructor(config: Config, contributions: ContributionSet) {
    const settings = contributions.settings.reduce(
      (settings: SettingsData, contribution) => {
        return merge(settings, contribution);
      },
      {}
    );

    return settings;
  }
}
