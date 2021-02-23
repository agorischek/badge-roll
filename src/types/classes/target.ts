import { Settings } from ".";
import { loadTarget } from "../../loaders";
import { writeFile } from "../../utilities";

export class Target {
  originalContent: string;
  modifiedContent: string;
  path?: string;
  extension: string;
  printer: string;

  constructor(settings: Settings, source?: string) {
    if (source) {
      this.originalContent = source;
      this.printer = settings.printer;
    } else {
      const target = loadTarget(settings.target);
      this.originalContent = target.content;
      this.path = target.path;
      this.extension = target.extension;
    }
  }

  write(modifiedContent: string): void {
    writeFile(this.path, modifiedContent);
    this.modifiedContent = modifiedContent;
  }
}
