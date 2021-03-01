import { Config, Run } from "./types";
import { writeFile } from "./utilities";

export function affix(source: string, config?: Config): string {
  const run = new Run(source, config);
  const modified = run.modified;
  return modified;
}

export function check(source: string, config?: Config): boolean {
  const run = new Run(source, config);
  const matches = run.matches;
  return matches;
}

export function affixFile() {
  const run = new Run();
  const modified = run.modified;
  writeFile(run.filePath, modified);
}

export function checkFile(): void {
  const run = new Run();
  const matches = run.matches;

  if (matches) console.log("Target file badges matched config!");
  else {
    console.error(
      "Target file badges did not match config. Run `badge-roll affix` to fix."
    );
    process.exitCode = 1;
  }
}

export function loadConfig(): Config {
  const config = new Config();
  return config;
}
