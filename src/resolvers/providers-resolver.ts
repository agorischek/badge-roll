import merge from "lodash.merge";

import { ProviderDirectory } from "../declarations";

import * as shields from "../modules/provider-shields";

const modules = [shields];

export function resolveProviders(): ProviderDirectory {
  const providers = modules.reduce((providers: ProviderDirectory, module) => {
    return merge(providers, module.providers);
  }, {});

  return providers;
}
