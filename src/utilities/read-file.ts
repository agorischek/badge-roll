import fs from "fs";

export function readFile(path: string): string {
  const file = fs.readFileSync(path, "utf8");
  return file;
}
