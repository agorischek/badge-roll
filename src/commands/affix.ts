import { Run } from "../types";
import { writeFile } from "../utilities";

export function affixCmd(): void {
  const run = new Run();
  const modified = run.modified;
  writeFile(run.filePath, modified);
}
