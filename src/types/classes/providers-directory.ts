import { ContributionSet, ProviderDefinition } from "../index.js";

import lodash from "lodash";
const { merge } = lodash;

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
