import { combine, stringifyQuery } from "../../utilities";

import {
  About,
  BadgeConfig,
  BadgeSpec,
  Path,
  ProvidersDirectory,
  QueryParams,
  SettingsData,
} from "..";
export class Badge {
  basePath: string;
  details: string;
  display: string;
  id: string;
  provider: string;
  queryParams: QueryParams;
  queryString: string;
  style: string;
  to: string;
  url: string;
  variation: string;

  constructor(
    badgeConfig: BadgeConfig,
    settings: SettingsData,
    globalAbout: About,
    providers: ProvidersDirectory
  ) {
    const badge: BadgeConfig =
      typeof badgeConfig === "string" ? { id: badgeConfig } : badgeConfig;

    const about = combine(globalAbout, badge.about);
    const id = badge.id;
    const badgePath = badge.path || id;
    const provider = badge.provider || settings.provider;
    const style = badge.style || settings.style;
    const variation = badge.variation;

    const providerDefinition = providers[provider];
    const basePath = providerDefinition.baseUrl;

    const badgeSpec = new BadgeSpec(providerDefinition.badges[id], variation);

    const to = new Path(badge.to || badgeSpec.to, about).evaluated;
    const display = badgeSpec.display || badge.display;
    const queryParams = combine(
      badgeSpec.query,
      badge.query,
      style ? { style: style } : null
    );
    const queryString = stringifyQuery(queryParams);

    const details = badgeSpec.details || badge.details;
    const detailsPath = new Path(details, about).evaluated;
    const url = queryString
      ? `${basePath}/${badgePath}/${detailsPath}?${queryString}`
      : `${basePath}/${badgePath}/${detailsPath}`;

    return {
      basePath,
      details,
      display,
      id,
      provider,
      queryParams,
      queryString,
      style,
      to,
      url,
      variation,
    };
  }
}
