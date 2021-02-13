import { loadPackage } from "../loaders/package-loader";

import { About } from "../classes";
import { Config, Context } from "../declarations";

import pkg from "../contributions/about-package";
import repo from "../contributions/about-repo";
import registry from "../contributions/about-registry";

const modules = [pkg, repo, registry];

export function resolveAbout(config: Config): About {
  let about: About = config.about ? config.about : {};

  const packageDetails = loadPackage();

  const context: Context = {
    package: packageDetails,
  };

  about = modules.reduce((about: About, module) => {
    return module.about(about, context);
  }, about);

  return about;
}
