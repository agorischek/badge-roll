import { QueryParams } from "../types/index";

export function stringifyQuery(queryParams: QueryParams): string {
  return Object.keys(queryParams).reduce((acc, key) => {
    const value = queryParams[key];
    const stringified = value === true ? key : `${key}=${value}`;
    return value === false
      ? acc
      : acc
      ? `${acc}&${stringified}`
      : `${stringified}`;
  }, "");
}
