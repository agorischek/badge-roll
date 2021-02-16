import {
  AboutContribution,
  PrintersContribution,
  ProvidersContribution,
} from "../declarations";
import { contributions } from "../options";
import { loadModule } from "../utilities";

export class ContributionSet {
  about: Array<AboutContribution>;
  printers: Array<PrintersContribution>;
  providers: Array<ProvidersContribution>;

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
  }
}
