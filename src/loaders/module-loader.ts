import { Plugin } from "../types";
import { contributionsPath } from "../options";

export function loadModule(name: string, isInternal: boolean): Plugin {
  if (isInternal) {
    return require(`${contributionsPath}/${name}`).default;
  } else {
    throw new Error("External plugins not yet supported.");
  }
}
