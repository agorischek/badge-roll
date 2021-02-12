import { assert } from "chai";

import { collectAbout } from "../about-collecter";

describe("About Collector", () => {
  it("should correctly retrieve the package name", () => {
    const about = collectAbout({});
    assert.strictEqual(about.packageName, "badge-roll");
  });
  it("should correctly retrieve the user name", () => {
    const about = collectAbout({});
    assert.strictEqual(about.user, "agorischek");
  });
  it("should correctly overwrite a value", () => {
    const config = { about: { name: "wrong-name" } };
    const about = collectAbout(config);
    assert.strictEqual(about.packageName, "badge-roll");
  });
  it("should pass through an arbitrary property", () => {
    const config = { about: { arbitraryProperty: "something" } };
    const about = collectAbout(config);
    assert.strictEqual(about.arbitraryProperty, "something");
  });
});
