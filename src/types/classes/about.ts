import { loadPackage } from "../../loaders/package-loader.js";

import { Config, Context, ContributionSet } from "../index.js";

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
