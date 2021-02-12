import { ProviderDirectory, ProviderDefinition } from "../declarations";

export function lookUpProvider(
  provider: keyof ProviderDirectory,
  providers: ProviderDirectory
): ProviderDefinition {
  return providers[provider];
}
