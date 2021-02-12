import merge from "lodash.merge";

import { About, BadgeConfig, Settings } from ".";
import * as providers from "../providers";
import { resolvePath } from "../resolvers";
import { lookUpProvider } from "../utilities";
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
    const about = merge({}, globalAbout, badgeConfig.about);
    const id = badgeConfig.id;
    const provider = badgeConfig.provider || settings.provider;
    const style = badgeConfig.style || settings.style;

    const providerDefinition = lookUpProvider(provider, providers);
    const basePath = providerDefinition.baseUrl;

    const badgeDefinition = providerDefinition.badges[id];
    const to = resolvePath(badgeConfig.to || badgeDefinition.to, about);
    const display = badgeDefinition.display || badgeConfig.display;

    const details = badgeDefinition.details || badgeConfig.details;
    const path = resolvePath(details, about);
    const url = `${basePath}/${id}/${path}`;

    this.id = id;
    this.provider = provider;
    this.style = style;
    this.basePath = basePath;
    this.to = to;
    this.display = display;
    this.url = url;
  }
}
