import { Run } from "../types/index";
import { writeFile } from "../utilities/index";

export function affixCmd(): void {
  const run = new Run();
  const modified = run.modified;
  writeFile(run.filePath, modified);
}
