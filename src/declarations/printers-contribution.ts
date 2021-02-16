import { BadgeSection, SettingsData } from "../declarations";

export type PrintersContribution = {
  [format: string]: (
    badgeSection: BadgeSection,
    settings: SettingsData,
    target?: string
  ) => string;
};
