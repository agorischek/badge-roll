import readPackageDetails from "read-pkg";

import { Package } from "../types";

export function loadPackage(): Package {
  const packageDetails: Package = readPackageDetails.sync();
  return packageDetails;
}
