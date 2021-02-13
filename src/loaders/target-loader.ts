import { readFile } from "../utilities";
import { Target } from "../declarations";

export function loadTarget(path: string): Target {
  const content = readFile(path);
  const extension = path.match(/\.([^\.]+?)$/)[1];
  return {
    content: content,
    path: path,
    extension: extension,
  };
}
