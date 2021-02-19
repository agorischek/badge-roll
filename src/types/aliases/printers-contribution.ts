import { BadgeSection, SettingsData } from "../";

export type PrintersContribution = {
  [format: string]: (
    badgeSection: BadgeSection,
    settings: SettingsData,
    target?: string
  ) => string;
};
