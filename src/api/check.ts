import { Config, Run } from "../types/index.js";

export async function check(source: string, config?: Config): Promise<boolean> {
  const run = new Run(source, config);
  await run.exec();
  const matches = run.matches;
  return matches;
}
