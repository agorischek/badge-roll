import {
  AboutContribution,
  PrintersContribution,
  ProvidersContribution,
  SettingsContribution,
} from "..";
import { contributions } from "../../options";
import { loadModule } from "../../loaders";

export class ContributionSet {
  about: Array<AboutContribution>;
  printers: Array<PrintersContribution>;
  providers: Array<ProvidersContribution>;
  settings: Array<SettingsContribution>;

  constructor() {
    this.about = contributions.about.map((name: string) => {
      return loadModule(name, true).about;
    });
    this.printers = contributions.printers.map((name: string) => {
      return loadModule(name, true).printers;
    });
    this.providers = contributions.providers.map((name: string) => {
      return loadModule(name, true).providers;
    });
    this.settings = contributions.settings.map((name: string) => {
      return loadModule(name, true).settings;
    });
  }
}
