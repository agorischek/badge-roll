import { About, ContributionSet } from "../types";

describe("About", () => {
  const contributions = new ContributionSet();

  test("should correctly retrieve the package name", () => {
    const about = new About({}, contributions);
    expect(about.packageName).toBe("badge-roll");
  });
  test("should correctly retrieve the user name", () => {
    const about = new About({}, contributions);
    expect(about.user).toBe("agorischek");
  });
  test("should correctly overwrite a value", () => {
    const config = { about: { name: "wrong-name" } };
    const about = new About(config, contributions);
    expect(about.packageName).toBe("badge-roll");
  });
  test("should pass through an arbitrary property", () => {
    const config = { about: { arbitraryProperty: "something" } };
    const about = new About(config, contributions);
    expect(about.arbitraryProperty).toBe("something");
  });
});
