import { Run } from "../types/index.js";
import { writeFile } from "../utilities/index.js";

export function affixCmd(): void {
  const run = new Run();
  const modified = run.modified;
  writeFile(run.filePath, modified);
}
