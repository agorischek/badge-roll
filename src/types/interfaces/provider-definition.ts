import { BadgeDefinition } from ".";

export interface ProviderDefinition {
  baseUrl: string;
  badges: {
    [badge: string]: BadgeDefinition;
  };
}
