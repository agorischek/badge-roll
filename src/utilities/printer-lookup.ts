import { Printer, PrinterList, Target } from "../declarations";

export function lookUpPrinter(
  printer: keyof PrinterList,
  printers: PrinterList
): Printer {
  return printers[printer];
}
