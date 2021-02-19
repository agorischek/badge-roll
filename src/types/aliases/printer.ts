import { BadgeSection, SettingsData } from "../";

export type Printer = (
  badgeSection: BadgeSection,
  settings: SettingsData,
  target?: string
) => string;
