import { assert } from "chai";

import { About, ContributionSet } from "../types/classes";

describe("About Resolver", () => {
  const contributions = new ContributionSet();

  it("should correctly retrieve the package name", () => {
    const about = new About({}, contributions);
    assert.strictEqual(about.packageName, "badge-roll");
  });
  it("should correctly retrieve the user name", () => {
    const about = new About({}, contributions);
    assert.strictEqual(about.user, "agorischek");
  });
  it("should correctly overwrite a value", () => {
    const config = { about: { name: "wrong-name" } };
    const about = new About(config, contributions);
    assert.strictEqual(about.packageName, "badge-roll");
  });
  it("should pass through an arbitrary property", () => {
    const config = { about: { arbitraryProperty: "something" } };
    const about = new About(config, contributions);
    assert.strictEqual(about.arbitraryProperty, "something");
  });
});
