import { BadgeSection, Config, Printer, Target } from "./types";
import { RunContext } from "./types/classes/run-context";
import { writeFile } from "./utilities";

export function affix(source: string, config: Config): string {
  const run = new RunContext(config);
  const target = new Target(run.settings, source);
  const printer = new Printer(run.printers, target.printer);
  const section = new BadgeSection(run);
  const markup = printer.print(
    section.badges,
    run.settings,
    target.originalContent
  );
  return markup;
}

export function check(source: string, config: Config): boolean {
  const affixed = affix(source, config);
  const match = affixed === source;
  return match;
}

export function affixFile() {
  const run = new RunContext();
  const target = new Target(run.settings);
  const printer = new Printer(run.printers, target.printer);
  const section = new BadgeSection(run);
  const markup = printer.print(
    section.badges,
    run.settings,
    target.originalContent
  );
  writeFile(target.path, markup);
}
affixFile();
