import { merge } from "lodash";

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
  depfu,
  github,
  jsdelivr,
  npm,
  runkit,
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
  depfu,
  github,
  jsdelivr,
  npm,
  runkit
);
