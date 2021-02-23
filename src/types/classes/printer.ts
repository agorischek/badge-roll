import { BadgeSection, PrinterList, SettingsData } from "..";

export class Printer {
  print: (
    badgeSection: BadgeSection,
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
