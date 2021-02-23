import {
  About,
  Badge,
  Config,
  ContributionSet,
  PrinterList,
  ProvidersDirectory,
  Settings,
  Target,
} from "./types";

export function affix(source: string, configData: Config): string {
  const config = new Config(configData);
  const contributions = new ContributionSet();
  const settings = new Settings(config, contributions);
  const about = new About(config, contributions);
  const providers = new ProvidersDirectory(contributions);
  const printers = new PrinterList(contributions);
  const target = new Target(settings, source);

  const printer = printers[target.printer];
  const badges = config.badges.map(
    (badge) => new Badge(badge, settings, about, providers)
  );
  const markup = printer(badges, settings, target.originalContent);
  return markup;
}

export function check(source: string, config: Config): boolean {
  const affixed = affix(source, config);
  const match = affixed === source;
  return match;
}
