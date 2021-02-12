import { assert } from "chai";

import { resolveAbout } from "../resolvers/about-resolver";

describe("About Collector", () => {
  it("should correctly retrieve the package name", () => {
    const about = resolveAbout({});
    assert.strictEqual(about.packageName, "badge-roll");
  });
  it("should correctly retrieve the user name", () => {
    const about = resolveAbout({});
    assert.strictEqual(about.user, "agorischek");
  });
  it("should correctly overwrite a value", () => {
    const config = { about: { name: "wrong-name" } };
    const about = resolveAbout(config);
    assert.strictEqual(about.packageName, "badge-roll");
  });
  it("should pass through an arbitrary property", () => {
    const config = { about: { arbitraryProperty: "something" } };
    const about = resolveAbout(config);
    assert.strictEqual(about.arbitraryProperty, "something");
  });
});
