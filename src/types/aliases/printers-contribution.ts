import { Badge, SettingsData } from "../index.js";

export type PrintersContribution = {
  [format: string]: (
    badgeSection: Array<Badge>,
    settings: SettingsData,
    target?: string,
  ) => string;
};
