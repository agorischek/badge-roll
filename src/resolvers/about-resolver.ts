import { loadPackage } from "../loaders/package-loader";
import { About, Config, Context } from "../declarations";

import * as pkg from "../modules/about-package";
import * as repo from "../modules/about-repo";

const modules = [pkg, repo];

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
