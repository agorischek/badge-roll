import { Config, Run } from "../types";
import { writeFile } from "../utilities";

export function affix(source: string, config?: Config): string {
  const run = new Run(source, config);
  const modified = run.modified;
  return modified;
}

export function affixCmd(): void {
  const run = new Run();
  const modified = run.modified;
  writeFile(run.filePath, modified);
}
