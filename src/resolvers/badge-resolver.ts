import { About, BadgeConfig, Settings } from "../declarations";
import * as providers from "../providers";
import { lookUpProvider } from "../utilities";

export function resolveBadge(
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
  const url = basePath + "/" + (badgeDefinition.details || badgeConfig.details);

  return {
    id,
    provider,
    style,
    basePath,
    to,
    display,
    url,
  };
}