import fs from "fs";

export function writeFile(path: string, content: string): void {
  fs.writeFileSync(path, content, "utf8");
}
