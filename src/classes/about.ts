import { loadPackage } from "../loaders/package-loader";

import { ContributionSet } from "../classes";
import { Config, Context } from "../declarations";

export class About {
  [property: string]: string;

  constructor(config: Config, contributions: ContributionSet) {
    let about: About = config.about ? config.about : {};

    const packageDetails = loadPackage();

    const context: Context = {
      package: packageDetails,
    };

    contributions.about.forEach((contribution) => {
      about = contribution(about, context);
    });

    return about;
  }
}
