import {
  BadgeConfig,
  Config,
  ContributionSet,
  Settings,
  About,
  ProvidersDirectory,
  PrinterList,
} from "../index.js";

export class RunContext {
  settings: Settings;
  about: About;
  providers: ProvidersDirectory;
  printers: PrinterList;
  badges: Array<BadgeConfig>;

  private config: Config;

  public async compute() {
    const contributions = new ContributionSet();
    await contributions.load();
    this.settings = new Settings(this.config, contributions);
    this.about = new About(this.config, contributions);
    this.providers = new ProvidersDirectory(contributions);
    this.printers = new PrinterList(contributions);
    this.badges = this.config.badges;
    if (!this.badges || this.badges.length < 1)
      throw new Error("No badges specified.");
  }

  constructor(configData?: Config) {
    this.config = new Config(configData);
  }
}
