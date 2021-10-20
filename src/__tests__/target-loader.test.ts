import { loadTarget } from "../loaders/target-loader.js";

describe("Target Loader", () => {
  test("Should load the default target", () => {
    const target = loadTarget("./package.json");
    expect(target.content && target.path && target.extension).toBeTruthy();
  });
});
