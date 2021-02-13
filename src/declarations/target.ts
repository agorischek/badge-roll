import { Settings } from "../declarations";
import { loadTarget } from "../loaders";

export class Target {
  content: string;
  path: string;
  extension: string;
  constructor(settings: Settings) {
    const target = loadTarget(settings.target);
    this.content = target.content;
    this.path = target.path;
    this.extension = target.extension;
  }
}
