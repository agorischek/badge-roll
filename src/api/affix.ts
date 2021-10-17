import { Config, Run } from "../types/index";

export function affix(source: string, config?: Config): string {
  const run = new Run(source, config);
  const modified = run.modified;
  return modified;
}
