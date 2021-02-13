import { contribution } from "../declarations";

export function loadModule(
  moduleName: string,
  isInternal: boolean
): contribution {
  if (isInternal) {
    const internalModulePath = "../contributions/";
    return require(`${internalModulePath}${moduleName}`).default;
  } else {
    throw new Error("External plugins not yet supported.");
  }
}
