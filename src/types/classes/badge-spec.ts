import { BadgeDefinition, QueryParams } from "..";
import merge from "lodash.merge";

export class BadgeSpec {
  details: string;
  display: string;
  path: string;
  to: string;
  query?: QueryParams;
  constructor(rootDefinition: BadgeDefinition, variation: string) {
    const coreDefinition = {
      details: rootDefinition.details,
      display: rootDefinition.display,
      path: rootDefinition.path,
      query: rootDefinition.query,
      to: rootDefinition.to,
    };
    const variationDefinition = variation
      ? rootDefinition.variations[variation]
      : null;
    const badgeDefinition = merge(coreDefinition, variationDefinition);
    return badgeDefinition;
  }
}
