import { About, BadgeConfig, Settings } from ".";
import * as providers from "../providers";
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
    const id = badgeConfig.id;
    const provider = badgeConfig.provider || settings.provider;
    const style = badgeConfig.style || settings.style;

    const providerDefinition = lookUpProvider(provider, providers);
    const basePath = providerDefinition.baseUrl;

    const badgeDefinition = providerDefinition.badges[id];
    const to = badgeDefinition.to || badgeConfig.to;
    const display = badgeDefinition.display || badgeConfig.display;
    const url =
      basePath + "/" + (badgeDefinition.details || badgeConfig.details);

    globalAbout;

    this.id = id;
    this.provider = provider;
    this.style = style;
    this.basePath = basePath;
    this.to = to;
    this.display = display;
    this.url = url;
  }
}
