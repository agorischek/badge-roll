import merge from "lodash.merge";

import { ProviderDirectory } from "../declarations";

import shields from "../contributions/provider-shields";

const modules = [shields];

export function resolveProviders(): ProviderDirectory {
  const providers = modules.reduce((providers: ProviderDirectory, module) => {
    return merge(providers, module.providers);
  }, {});

  return providers;
}
