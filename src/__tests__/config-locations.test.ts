import { assert } from "chai";

import * as configLocations from "../config-locations";

describe("Config loader", () => {
  it("has a package property", () => {
    assert(configLocations.packageProperty);
  });
  it("has config locations", () => {
    assert(configLocations.filePaths);
  });
});
