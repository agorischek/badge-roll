import pathParser from "path";

export function extractFileExtension(path: string) {
  return pathParser.extname(path).match(/^\.(.*)$/)[1];
}
