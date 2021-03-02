import { BadgeDefinition, QueryParams } from "..";
import merge from "lodash.merge";

export class BadgeSpec {
  details: string;
  to: string;
  display: string;
  query?: QueryParams;
  constructor(rootDefinition: BadgeDefinition, variation: string) {
    const variationDefinition = variation
      ? rootDefinition.variations[variation]
      : null;
    const badgeDefinition = merge(rootDefinition, variationDefinition);
    delete badgeDefinition.variations;
    return badgeDefinition;
  }
}
