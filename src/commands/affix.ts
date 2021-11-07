import { Run } from "../types/index.js";
import { log, writeFile } from "../utilities/index.js";

export async function affixCmd(): Promise<void> {
  log("Affixing badges...");

  const run = new Run();
  await run.exec();
  const { filePath, modified } = run;

  writeFile(filePath, modified);

  log("Done!");
}
