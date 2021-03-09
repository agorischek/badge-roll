import { Run } from "../types";

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
