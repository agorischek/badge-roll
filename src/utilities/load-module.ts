import { contribution } from "../declarations";
import { contributionsPath } from "../options";

export function loadModule(name: string, isInternal: boolean): contribution {
  if (isInternal) {
    return require(`${contributionsPath}/${name}`).default;
  } else {
    throw new Error("External plugins not yet supported.");
  }
}