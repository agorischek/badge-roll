"use strict";

import readPackageDetails from "read-pkg";
import { NormalizedPackageJson } from "read-pkg";

import { Config } from "./config-schema";

import * as pkg from "./modules/about-package";
import * as repo from "./modules/about-repo";

export type About = Record<string, string>;
export type Context = {
  package: NormalizedPackageJson;
};

const modules = [pkg, repo];

export function retrieveAbout(config: Config): About {
  let about: About = config.about;

  const packageDetails: NormalizedPackageJson = readPackageDetails.sync();

  const context: Context = {
    package: packageDetails,
  };

  about = modules.reduce((about: About, module) => {
    return module.about(about, context);
  }, about);

  return about;
}
