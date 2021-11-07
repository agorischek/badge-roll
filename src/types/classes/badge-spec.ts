import lodash from "lodash";
const { merge } = lodash;

import { badgeSpecSchema } from "../../schemas/index.js";
import { BadgeDefinition, QueryParams } from "../index.js";

export class BadgeSpec {
  details: string;
  display: string;
  path: string;
  to: string;
  options?: QueryParams;
  constructor(rootDefinition: BadgeDefinition, variation: string, id: string) {
    const coreSpec = {
      details: rootDefinition.details,
      display: rootDefinition.display,
      path: rootDefinition.path,
      options: rootDefinition.options,
      to: rootDefinition.to,
    };
    const variationSpec = variation
      ? rootDefinition.variations[variation]
      : null;
    const resolvedSpec = merge(coreSpec, variationSpec);

    const result = badgeSpecSchema.validate(resolvedSpec);
    if (result.error) {
      if (variation)
        throw new Error(
          `Definition for badge "${id}" variation "${variation}" is invalid. ${result.error}`
        );
      else
        throw new Error(
          `Definition for badge "${id}" is invalid. ${result.error}`
        );
    }

    return resolvedSpec;
  }
}
