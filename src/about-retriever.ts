"use strict";

import readPackageDetails from "read-pkg";
import { NormalizedPackageJson } from "read-pkg";

import * as repo from "./modules/about-repo";
import * as pkg from "./modules/about-package";

export type About = Record<string, string>;
export type Context = {
  package: NormalizedPackageJson;
};

export function retrieveAbout(): About {
  const packageDetails: NormalizedPackageJson = readPackageDetails.sync();

  let about = {};
  const context = {
    package: packageDetails,
  };

  about = repo.about(about, context);
  about = pkg.about(about, context);
  about;
  return about;
}
