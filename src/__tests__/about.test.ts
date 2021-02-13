import { assert } from "chai";

import { About } from "../classes";

describe("About Resolver", () => {
  it("should correctly retrieve the package name", () => {
    const about = new About({});
    assert.strictEqual(about.packageName, "badge-roll");
  });
  it("should correctly retrieve the user name", () => {
    const about = new About({});
    assert.strictEqual(about.user, "agorischek");
  });
  it("should correctly overwrite a value", () => {
    const config = { about: { name: "wrong-name" } };
    const about = new About(config);
    assert.strictEqual(about.packageName, "badge-roll");
  });
  it("should pass through an arbitrary property", () => {
    const config = { about: { arbitraryProperty: "something" } };
    const about = new About(config);
    assert.strictEqual(about.arbitraryProperty, "something");
  });
});
