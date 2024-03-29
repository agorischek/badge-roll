import { Settings } from "./index.js";
import { loadTarget } from "../../loaders/index.js";
import { writeFile } from "../../utilities/index.js";

export class Target {
  originalContent: string;
  modifiedContent: string;
  path?: string;
  extension: string;
  printer: string;

  constructor(settings: Settings, source?: string) {
    if (source !== undefined) {
      this.originalContent = source;
      this.printer = settings.printer;
    } else {
      const target = loadTarget(settings.file);
      this.originalContent = target.content;
      this.path = target.path;
      this.extension = target.extension;
      this.printer = this.extension;
    }
  }

  write(modifiedContent: string): void {
    writeFile(this.path, modifiedContent);
    this.modifiedContent = modifiedContent;
  }
}
