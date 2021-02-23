import {
  BadgeConfig,
  Config,
  ContributionSet,
  Settings,
  About,
  ProvidersDirectory,
  PrinterList,
} from "..";

export class RunContext {
  settings: Settings;
  about: About;
  providers: ProvidersDirectory;
  printers: PrinterList;
  badges: Array<BadgeConfig>;
  constructor(configData?: Config) {
    const config = new Config(configData);
    const contributions = new ContributionSet();
    const settings = new Settings(config, contributions);
    const about = new About(config, contributions);
    const providers = new ProvidersDirectory(contributions);
    const printers = new PrinterList(contributions);
    const badges = config.badges;
    return {
      about,
      settings,
      providers,
      printers,
      badges,
    };
  }
}
