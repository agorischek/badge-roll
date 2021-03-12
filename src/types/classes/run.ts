import { Config, RunContext, Target, Printer, BadgeSection } from "..";

export class Run {
  original: string;
  modified: string;
  filePath?: string;
  matches: boolean;
  constructor(source?: string, config?: Config) {
    const context = new RunContext(config);
    const target = new Target(context.settings, source);
    const printer = new Printer(context.printers, target.printer);
    const section = new BadgeSection(context);
    const markup = printer.print(
      section.badges,
      context.settings,
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
