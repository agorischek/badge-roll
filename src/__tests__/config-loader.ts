import * as assert from "assert";
import * as configLoader from "../config-locations";

describe("Config loader", () => {
  it("has a package property", () => {
    assert(configLoader.packageProperty);
  });
  it("has config locations", () => {
    assert(configLoader.configLocations);
  });
});
