import { loadPackage } from "../loaders/package-loader";

import { Config, Context } from "../declarations";

import pkg from "../modules/about-package";
import repo from "../modules/about-repo";
import registry from "../modules/about-registry";

const modules = [pkg, repo, registry];
export class About {
  [property: string]: string;
  constructor(config: Config) {
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
}
