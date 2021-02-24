import { BadgeDefinition } from "../";

export type ProviderDefinition = {
  baseUrl: string;
  badges: {
    [badge: string]: BadgeDefinition;
  };
};
