import merge from "lodash.merge";

import { Dictionary } from "../declarations";

// Merges an arbitrary number of flat objects into a new object
export function combine(...objects: Array<Dictionary>): Dictionary {
  const combined = merge({}, ...objects);
  return combined;
}
