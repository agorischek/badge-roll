import { About } from ".";
import { Context } from "../declarations";
import { contributions } from "../options";

export class ContributionSet {
  about: Array<(about: About, context: Context) => About>;

  constructor() {
    this.about = [];
    const contributionsPath = "../contributions/";
    contributions.about.map((contributionName: string): void => {
      this.about.push(
        require(`${contributionsPath}${contributionName}`).default.about
      );
    });
  }
}
