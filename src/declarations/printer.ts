import { BadgeSection, Settings } from ".";

export type Printer = (
  badgeSection: BadgeSection,
  settings: Settings,
  target: string
) => string;
