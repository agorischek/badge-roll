import { combine, concat, stringifyQuery } from "../../utilities";

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
    const provider = badge.provider || settings.provider;
    const style = badge.style || settings.style;
    const variation = badge.variation || null;

    const providerDefinition = providers[provider];
    if (!providerDefinition)
      throw new Error(`Provider "${provider}" is not registered.`);
    const basePath = providerDefinition.baseUrl;

    const badgeDefinition = providerDefinition.badges[id];
    if (!badgeDefinition)
      throw new Error(`Badge "${id}" is not defined for provider ${provider}.`);

    const badgeSpec = new BadgeSpec(badgeDefinition, variation, id);

    const badgePath = badgeSpec.path || id;
    const to = new Path(badge.to || badgeSpec.to, about).evaluated;
    const display = badgeSpec.display || badge.display;
    const queryParams = combine(
      badgeSpec.options,
      badge.options,
      style ? { style: style } : null
    );
    const queryString = stringifyQuery(queryParams);

    const details = badgeSpec.details || badge.details || null;
    const detailsPath = details ? new Path(details, about).evaluated : null;

    const url = concat(
      `${basePath}`,
      `/${badgePath}`,
      details ? `/${detailsPath}` : "",
      queryString ? `?${queryString}` : ""
    );

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
