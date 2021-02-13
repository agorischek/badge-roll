import { loadPackage } from "../loaders/package-loader";
import { About, Config, Context } from "../declarations";

import pkg from "../modules/about-package";
import repo from "../modules/about-repo";
import registry from "../modules/about-registry";

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
