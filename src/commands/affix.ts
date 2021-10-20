import { Run } from "../types/index.js";
import { log, writeFile } from "../utilities/index.js";

export function affixCmd(): void {
  log("Affixing badges...");

  const run = new Run();
  const modified = run.modified;

  writeFile(run.filePath, modified);

  log("Done!");
}
