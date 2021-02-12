import readPackageDetails from "read-pkg";

import { Package } from "../declarations";

export function loadPackage(): Package {
  const packageDetails: Package = readPackageDetails.sync();
  return packageDetails;
}
