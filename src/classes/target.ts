import { Settings } from "../declarations";
import { loadTarget } from "../loaders";
import { writeFile } from "../utilities";

export class Target {
  originalContent: string;
  modifiedContent: string;
  path: string;
  extension: string;

  constructor(settings: Settings) {
    const target = loadTarget(settings.target);
    this.originalContent = target.content;
    this.path = target.path;
    this.extension = target.extension;
  }

  write(modifiedContent: string): void {
    writeFile("./README.md", modifiedContent);
    this.modifiedContent = modifiedContent;
  }
}
