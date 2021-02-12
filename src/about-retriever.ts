"use strict";

import readPackageDetails from "read-pkg";

import { About, Config, Context, Package } from "./declarations";

import * as pkg from "./modules/about-package";
import * as repo from "./modules/about-repo";

const modules = [pkg, repo];

export function retrieveAbout(config: Config): About {
  let about: About = config.about;

  const packageDetails: Package = readPackageDetails.sync();

  const context: Context = {
    package: packageDetails,
  };

  about = modules.reduce((about: About, module) => {
    return module.about(about, context);
  }, about);

  return about;
}
