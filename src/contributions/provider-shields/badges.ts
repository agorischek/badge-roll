import merge from "lodash.merge";

import {
  appveyor,
  azureDevops,
  badgeRoll,
  bitbucket,
  buildkite,
  circleci,
  cirrus,
  codecov,
  codeship,
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
  buildkite,
  circleci,
  cirrus,
  codecov,
  codeship,
  github,
  jsdelivr,
  npm
);
