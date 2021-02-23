import { BadgeSection, ContributionSet, SettingsData } from "../";

import merge from "lodash.merge";

export class PrinterList {
  [printer: string]: (
    badgeSection: BadgeSection,
    settings: SettingsData,
    target?: string
  ) => string;

  constructor(contributions: ContributionSet) {
    const printers = contributions.printers.reduce(
      (printers: PrinterList, contribution) => {
        return merge(printers, contribution);
      },
      {}
    );

    return printers;
  }
}
