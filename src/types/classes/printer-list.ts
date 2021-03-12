import { Badge, ContributionSet, SettingsData } from "..";

import { merge } from "lodash";

export class PrinterList {
  [printer: string]: (
    badgeSection: Array<Badge>,
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
