import { combine } from "../utilities";

import { About } from "../classes";
import { BadgeConfig, Settings } from "../declarations";
import { resolvePath, resolveProviders } from "../resolvers";
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
    const providers = resolveProviders();
    const about = combine(globalAbout, badgeConfig.about);
    const id = badgeConfig.id;
    const provider = badgeConfig.provider || settings.provider;
    const style = badgeConfig.style || settings.style;

    const providerDefinition = providers[provider];
    const basePath = providerDefinition.baseUrl;

    const badgeDefinition = providerDefinition.badges[id];
    const to = resolvePath(badgeConfig.to || badgeDefinition.to, about);
    const display = badgeDefinition.display || badgeConfig.display;

    const details = badgeDefinition.details || badgeConfig.details;
    const path = resolvePath(details, about);
    const url = `${basePath}/${id}/${path}`;

    return {
      basePath,
      details,
      display,
      id,
      provider,
      style,
      to,
      url,
    };
  }
}
