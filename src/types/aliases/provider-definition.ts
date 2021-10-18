import { BadgeDefinition } from "../index.js";

export type ProviderDefinition = {
  baseUrl: string;
  badges: {
    [badge: string]: BadgeDefinition;
  };
};
