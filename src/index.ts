import { Command } from "commander";

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

export function checkFile(): void {
  const run = new RunContext();
  const target = new Target(run.settings);
  const printer = new Printer(run.printers, target.printer);
  const section = new BadgeSection(run);
  const markup = printer.print(
    section.badges,
    run.settings,
    target.originalContent
  );
  const match = markup === target.originalContent;
  if (match) console.log("Target file badges matched config!");
  else {
    console.log(
      "Target file badges did not match config. Run `badge-roll` affix to fix."
    );
    process.exitCode = 1;
  }
}

export function loadConfig(): Config {
  const config = new Config();
  return config;
}

// const program = new Command();

// program
//   .command("affix")
//   .description("Affix badges to the target file")
//   .action(() => {
//     console.log("Affixing badges...");
//     affixFile();
//   });

// program
//   .command("check")
//   .description("Check whether badges in target file match config")
//   .action(() => {
//     console.log("Checking badges...");
//     checkFile();
//   });

// program
//   .command("load-config")
//   .description("Check whether badges in target file match config")
//   .action(() => {
//     console.log("Loading config...");
//     const config = loadConfig();
//     console.log(config);
//   });

// program.parse(process.argv);
