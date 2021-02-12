import { BadgeDefinition } from ".";

export interface ProviderDefinition {
  baseUrl: string;
  badges: Record<string, BadgeDefinition>;
}
