import { Run } from "../types/index.js";
import { log } from "../utilities/index.js";

export async function checkCmd(): Promise<void> {
  log("Checking badges...");

  const run = new Run();
  await run.exec();

  const matches = run.matches;

  if (matches) console.log("Target file badges matched config!");
  else {
    console.error(
      "Target file badges did not match config. Run `badge-roll affix` to fix."
    );
    process.exitCode = 1;
  }
}
