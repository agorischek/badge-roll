import { Config, Run } from "../types";

export function check(source: string, config?: Config): boolean {
  const run = new Run(source, config);
  const matches = run.matches;
  return matches;
}

export function checkCmd(): void {
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
