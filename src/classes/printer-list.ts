import { ContributionSet } from "../classes";
import { Printer } from "../declarations";

import merge from "lodash.merge";

export class PrinterList {
  [printer: string]: Printer;

  constructor(contributions: ContributionSet) {
    const printers = contributions.printers.reduce(
      (providers: PrinterList, contribution) => {
        return merge(providers, contribution);
      },
      {}
    );

    return printers;
  }
}
