import merge from "lodash.merge";

export function combine(
  ...objects: Array<Record<string, unknown>>
): Record<string, unknown> {
  const combined = merge({}, ...objects);
  return combined;
}

combine({ a: "b" }, { c: "d" });
combine;
