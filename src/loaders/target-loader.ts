import { readFile } from "../utilities";

export function loadTarget(path: string) {
  const content = readFile(path);
  const extension = path.match(/\.([^\.]+?)$/)[1];
  return {
    content: content,
    path: path,
    extension: extension,
  };
}
