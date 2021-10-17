import { Settings } from "./index";
import { loadTarget } from "../../loaders";
import { writeFile } from "../../utilities";

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
