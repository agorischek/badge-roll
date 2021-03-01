import { Config, RunContext, Target, Printer, BadgeSection } from "..";

export class Run {
  original: string;
  modified: string;
  filePath?: string;
  matches: boolean;
  constructor(source?: string, config?: Config) {
    const run = new RunContext(config);
    const target = new Target(run.settings, source);
    const printer = new Printer(run.printers, target.printer);
    const section = new BadgeSection(run);
    const markup = printer.print(
      section.badges,
      run.settings,
      target.originalContent
    );
    const matches = target.originalContent === markup;
    return {
      original: target.originalContent,
      modified: markup,
      filePath: target.path,
      matches: matches,
    };
  }
}
