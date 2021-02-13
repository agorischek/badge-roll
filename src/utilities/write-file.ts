import fs from "fs";

export function writeFile(path: string, content: string) {
  const file = fs.writeFileSync(path, content, "utf8");
  return file;
}
