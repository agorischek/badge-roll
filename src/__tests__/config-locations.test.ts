import * as configLocations from "../options/index.js";

describe("Config locations", () => {
  test("has a package property", () => {
    expect(configLocations.packageProperty).toBeTruthy();
  });
  it("has config locations", () => {
    expect(configLocations.filePaths).toBeTruthy();
  });
});
