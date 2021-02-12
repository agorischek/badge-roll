import { About, BadgeConfig, Settings } from ".";
import { resolveBadge } from "../resolvers";

export class Badge {
  basePath: string;
  details: string;
  display: string;
  id: string;
  provider: string;
  style: string;
  to: string;
  url: string;

  constructor(
    badgeConfig: BadgeConfig,
    settings: Settings,
    globalAbout: About
  ) {
    Object.assign(this, resolveBadge(badgeConfig, settings, globalAbout));
  }
}
