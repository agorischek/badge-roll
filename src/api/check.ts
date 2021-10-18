import { Config, Run } from "../types/index.js";

export function check(source: string, config?: Config): boolean {
  const run = new Run(source, config);
  const matches = run.matches;
  return matches;
}
