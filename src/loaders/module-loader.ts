import { Plugin } from "../types/index.js";
import { contributionsPath } from "../options/index.js";

export async function loadModule(
  name: string,
  isInternal: boolean
): Promise<Plugin> {
  if (isInternal) {
    const module = await import(`${contributionsPath}/${name}/index.js`).catch(
      (e) => "Error loading plugin: " + e
    );
    return module.default;
  } else {
    throw new Error("External plugins not yet supported.");
  }
}
