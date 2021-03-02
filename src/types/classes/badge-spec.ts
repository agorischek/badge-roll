import { BadgeDefinition, QueryParams } from "..";
import merge from "lodash.merge";

export class BadgeSpec {
  details: string;
  to: string;
  display: string;
  query?: QueryParams;
  constructor(rootDefinition: BadgeDefinition, variation: string) {
    const coreDefinition = {
      details: rootDefinition.details,
      to: rootDefinition.to,
      display: rootDefinition.display,
      query: rootDefinition.query,
    };
    const variationDefinition = variation
      ? rootDefinition.variations[variation]
      : null;
    const badgeDefinition = merge(coreDefinition, variationDefinition);
    return badgeDefinition;
  }
}
