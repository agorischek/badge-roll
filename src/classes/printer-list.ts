import { ContributionSet } from "../classes";
import { Printer } from "../declarations";

import merge from "lodash.merge";

export class PrinterList {
  [printer: string]: Printer;

  constructor(contributions: ContributionSet) {
    const printers = contributions.printers.reduce(
      (providers: PrinterList, module) => {
        return merge(providers, module);
      },
      {}
    );

    return printers;
  }
}
