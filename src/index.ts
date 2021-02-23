import {
  About,
  Badge,
  Config,
  ContributionSet,
  Printer,
  PrinterList,
  ProvidersDirectory,
  Settings,
  Target,
} from "./types";
import { RunContext } from "./types/classes/run-context";

export function affix(source: string, configData: Config): string {
  const run = new RunContext(configData);

  const target = new Target(run.settings, source);
  const printer = new Printer(run.printers, target.printer);

  const badges = run.badges.map(
    (badge) => new Badge(badge, run.settings, run.about, run.providers)
  );
  const markup = printer.print(badges, run.settings, target.originalContent);
  return markup;
}

export function check(source: string, config: Config): boolean {
  const affixed = affix(source, config);
  const match = affixed === source;
  return match;
}
