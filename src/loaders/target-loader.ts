import { readFile } from "../utilities/index.js";
import { extractFileExtension } from "../utilities/index.js";

export function loadTarget(path: string): {
  content: string;
  path: string;
  extension: string;
} {
  const content = readFile(path);
  const extension = extractFileExtension(path);
  return {
    content: content,
    path: path,
    extension: extension,
  };
}
