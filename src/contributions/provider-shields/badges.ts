import merge from "lodash.merge";

import {
  appveyor,
  azureDevops,
  badgeRoll,
  bitbucket,
  github,
  jsdelivr,
  npm,
} from "./services";

export const badges = merge(
  {},
  appveyor,
  azureDevops,
  badgeRoll,
  bitbucket,
  github,
  jsdelivr,
  npm
);
