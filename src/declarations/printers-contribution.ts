import { BadgeSection, Settings } from "../declarations";

export type PrintersContribution = {
  [format: string]: (
    badgeSection: BadgeSection,
    settings: Settings,
    target?: string
  ) => string;
};
