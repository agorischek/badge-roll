import merge from "lodash.merge";

import { appveyor, badgeRoll, github, jsdelivr, npm } from "./services";

export const badges = merge({}, appveyor, badgeRoll, github, jsdelivr, npm);
