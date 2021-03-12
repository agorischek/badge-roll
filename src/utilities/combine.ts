import { merge } from "lodash";

export function combine<T>(
  ...objects: Array<Record<string, T>>
): Record<string, T> {
  const combined = merge({}, ...objects);
  return combined;
}
