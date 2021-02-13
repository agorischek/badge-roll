import { Printer, PrinterList } from "../declarations";

export function lookUpPrinter(
  printer: keyof PrinterList,
  printers: PrinterList
): Printer {
  return printers[printer];
}
