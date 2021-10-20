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
    this.original = target.originalContent;
    this.filePath = target.path;

    const printer = new Printer(context.printers, target.printer);
    const section = new BadgeSection(context);

    this.modified = printer.print(
      section.badges,
      context.settings,
      this.original
    );
    this.matches = this.original === this.modified;
  }

  constructor(source?: string, config?: Config) {
    this.original = source;
    this.config = config;
  }
}
