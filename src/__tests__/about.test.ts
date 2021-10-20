import { About, ContributionSet } from "../types/index.js";

describe("About", () => {
  // test.only("duh", () => {
  //   expect(true).toBe(false);
  // });
  test.only("should correctly retrieve the package name", async () => {
    const contributions = new ContributionSet();
    await contributions.load();
    const config = {};
    const about = new About(config, contributions);
    console.log("package name is" + about.packageName);
    expect(about.packageName).toBe("badge-roll");
  });
  test("should correctly retrieve the user name", async () => {
    const contributions = new ContributionSet();
    await contributions.load();
    const config = {};
    const about = new About(config, contributions);
    expect(about.user).toBe("agorischek");
  });
  test("should correctly overwrite a value", async () => {
    const contributions = new ContributionSet();
    await contributions.load();
    const config = { about: { name: "wrong-name" } };
    const about = new About(config, contributions);
    expect(about.packageName).toBe("badge-roll");
  });
  test("should pass through an arbitrary property", async () => {
    const contributions = new ContributionSet();
    await contributions.load();
    const config = { about: { arbitraryProperty: "something" } };
    const about = new About(config, contributions);
    expect(about.arbitraryProperty).toBe("something");
  });
});
