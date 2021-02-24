import { combine } from "../../utilities";

import {
  About,
  BadgeConfig,
  Path,
  ProvidersDirectory,
  SettingsData,
} from "../";
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
    settings: SettingsData,
    globalAbout: About,
    providers: ProvidersDirectory
  ) {
    const badge =
      typeof badgeConfig === "string" ? { id: badgeConfig } : badgeConfig;

    const about = combine(globalAbout, badge.about);
    const id = badge.id;
    const provider = badge.provider || settings.provider;
    const style = badge.style || settings.style;

    const providerDefinition = providers[provider];
    const basePath = providerDefinition.baseUrl;

    const badgeDefinition = providerDefinition.badges[id];
    const to = new Path(badge.to || badgeDefinition.to, about).evaluated;
    const display = badgeDefinition.display || badge.display;

    const details = badgeDefinition.details || badge.details;
    const path = new Path(details, about).evaluated;
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
