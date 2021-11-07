import { readPackageSync } from "read-pkg";

import { Package } from "../types/index.js";

export function loadPackage(): Package {
  const packageDetails: Package = readPackageSync();
  return packageDetails;
}
