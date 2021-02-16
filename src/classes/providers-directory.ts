import { ContributionSet } from "../classes";
import { ProviderDefinition } from "../declarations";

import merge from "lodash.merge";

export class ProvidersDirectory {
  [provider: string]: ProviderDefinition;

  constructor(contributions: ContributionSet) {
    const providers = contributions.providers.reduce(
      (providers: ProvidersDirectory, contribution) => {
        return merge(providers, contribution);
      },
      {}
    );

    return providers;
  }
}
