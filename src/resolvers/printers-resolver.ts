import merge from "lodash.merge";

import { PrinterList } from "../declarations";

import md from "../modules/printer-markdown";

const modules = [md];

export function resolvePrinters(): PrinterList {
  const printers = modules.reduce((providers: PrinterList, module) => {
    return merge(providers, module.printers);
  }, {});

  return printers;
}
