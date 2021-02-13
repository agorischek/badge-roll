import { AboutContribution } from "../declarations";
import { contributions } from "../options";
import { loadModule } from "../utilities";

export class ContributionSet {
  about: Array<AboutContribution>;

  constructor() {
    this.about = contributions.about.map((name: string) => {
      return loadModule(name, true).about;
    });
  }
}
