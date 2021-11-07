import {
  AboutContribution,
  PrintersContribution,
  ProvidersContribution,
  SettingsContribution,
} from "../index.js";
import { contributions } from "../../options/index.js";
import { loadModule } from "../../loaders/index.js";
import { Plugin } from "../../types/index.js";

export class ContributionSet {
  private aboutLoader: Array<Promise<Plugin>>;
  private printersLoader: Array<Promise<Plugin>>;
  private providersLoader: Array<Promise<Plugin>>;
  private settingsLoader: Array<Promise<Plugin>>;

  about: Array<AboutContribution>;
  printers: Array<PrintersContribution>;
  providers: Array<ProvidersContribution>;
  settings: Array<SettingsContribution>;

  public async load() {
    const aboutPlugins = await Promise.all(this.aboutLoader);
    const printerPlugins = await Promise.all(this.printersLoader);
    const providersPlugins = await Promise.all(this.providersLoader);
    const settingsPlugins = await Promise.all(this.settingsLoader);

    this.about = aboutPlugins.map((plugin) => plugin.about);
    this.printers = printerPlugins.map((plugin) => plugin.printers);
    this.providers = providersPlugins.map((plugin) => plugin.providers);
    this.settings = settingsPlugins.map((plugin) => plugin.settings);
  }

  constructor() {
    this.aboutLoader = contributions.about.map((name: string) => {
      return loadModule(name, true);
    });
    this.printersLoader = contributions.printers.map((name: string) => {
      return loadModule(name, true);
    });
    this.providersLoader = contributions.providers.map((name: string) => {
      return loadModule(name, true);
    });
    this.settingsLoader = contributions.settings.map((name: string) => {
      return loadModule(name, true);
    });
  }
}
