import { Config, Run } from "../types/index.js";

export async function affix(source: string, config?: Config): Promise<string> {
  const run = new Run(source, config);
  await run.exec();
  console.log(run);
  const modified = run.modified;
  console.log(modified);
  return modified;
}
