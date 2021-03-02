import { QueryParams } from "../types";

export function stringifyQuery(queryParams: QueryParams): string {
  return Object.keys(queryParams).reduce((acc, key) => {
    const value = queryParams[key];
    const stringified = value === true ? key : `${key}=${value}`;
    return acc ? `${acc}&${stringified}` : `?${stringified}`;
  }, "");
}
