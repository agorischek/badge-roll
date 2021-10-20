import { Config, RunContext, Target, Printer, BadgeSection } from "../index.js";

export class Run {
  original: string;
  modified: string;
  filePath?: string;
  matches: boolean;

  private config?: Config;

  public async exec() {
    const context = new RunContext(this.config);
    await context.compute();
    const target = new Target(context.settings, this.original);
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

  constructor(source?: string, config?: Config) {
    this.original = source;
    this.config = config;
  }
}
