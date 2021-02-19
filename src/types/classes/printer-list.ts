import { ContributionSet, Printer } from "../";

import merge from "lodash.merge";

export class PrinterList {
  [printer: string]: Printer;

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
