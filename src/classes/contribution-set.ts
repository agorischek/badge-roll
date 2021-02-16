import { AboutContribution, PrintersContribution } from "../declarations";
import { contributions } from "../options";
import { loadModule } from "../utilities";

export class ContributionSet {
  about: Array<AboutContribution>;
  printers: Array<PrintersContribution>;

  constructor() {
    this.about = contributions.about.map((name: string) => {
      return loadModule(name, true).about;
    });
    this.printers = contributions.printers.map((name: string) => {
      return loadModule(name, true).printers;
    });
  }
}
