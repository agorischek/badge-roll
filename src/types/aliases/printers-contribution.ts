import { Badge, SettingsData } from "..";

export type PrintersContribution = {
  [format: string]: (
    badgeSection: Array<Badge>,
    settings: SettingsData,
    target?: string
  ) => string;
};
