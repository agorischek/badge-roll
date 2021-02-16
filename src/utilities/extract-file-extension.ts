import pathParser from "path";

export function extractFileExtension(path: string): string {
  return pathParser.extname(path).match(/^\.(.*)$/)[1];
}
