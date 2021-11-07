import { Badge, PrinterList, SettingsData } from "../index.js";

export class Printer {
  print: (
    badgeSection: Array<Badge>,
    settings: SettingsData,
    target?: string
  ) => string;
  constructor(printers: PrinterList, printerId: string) {
    if (printers[printerId]) {
      this.print = printers[printerId];
    } else {
      new Error("No printer found for ${printerId}.");
    }
  }
}
