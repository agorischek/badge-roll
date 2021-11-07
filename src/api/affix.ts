import { Config, Run } from "../types/index.js";

export async function affix(source: string, config?: Config): Promise<string> {
  const run = new Run(source, config);
  await run.exec();
  const modified = run.modified;
  return modified;
}
