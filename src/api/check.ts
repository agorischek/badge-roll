import { Config, Run } from "../types";

export function check(source: string, config?: Config): boolean {
  const run = new Run(source, config);
  const matches = run.matches;
  return matches;
}
