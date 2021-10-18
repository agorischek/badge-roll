import { Plugin } from "../types/index.js";
import { contributionsPath } from "../options/index.js";

export function loadModule(name: string, isInternal: boolean): Promise<Plugin> {
  if (isInternal) {
    return import(`${contributionsPath}/${name}`);
  } else {
    throw new Error("External plugins not yet supported.");
  }
}
