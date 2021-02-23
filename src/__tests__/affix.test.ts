import { affix } from "..";

describe("Affix function", () => {
  test("should affix one badge", () => {
    const config = { badges: [{ id: "npm/v" }] };
    const source =
      '# Title\n\n[![Example](https://img.shields.io/npm/v/badge-roll)](https://example.org "Version")';
    const modified = affix(source, config);
    const expected = `# Title\n\n[![Version](https://img.shields.io/npm/v/badge-roll)](https://www.npmjs.com/package/badge-roll "Version")`;
    expect(modified).toBe(expected);
  });
  test("should render a badge with no target content", () => {
    const config = { badges: [{ id: "npm/v" }] };
    const modified = affix("", config);
    const expected =
      '[![Version](https://img.shields.io/npm/v/badge-roll)](https://www.npmjs.com/package/badge-roll "Version")';
    expect(modified).toBe(expected);
  });
  test("should render two badges with no target content", () => {
    const config = { badges: [{ id: "npm/v" }, { id: "npm/v" }] };
    const modified = affix("", config);
    const expected = `[![Version](https://img.shields.io/npm/v/badge-roll)](https://www.npmjs.com/package/badge-roll "Version") [![Version](https://img.shields.io/npm/v/badge-roll)](https://www.npmjs.com/package/badge-roll "Version")`;
    expect(modified).toBe(expected);
  });

  test("should render two badges with custom separator and no target content", () => {
    const config = {
      badges: [{ id: "npm/v" }, { id: "npm/v" }],
      settings: { separator: " / " },
    };
    const modified = affix("", config);
    const expected = `[![Version](https://img.shields.io/npm/v/badge-roll)](https://www.npmjs.com/package/badge-roll "Version") / [![Version](https://img.shields.io/npm/v/badge-roll)](https://www.npmjs.com/package/badge-roll "Version")`;
    expect(modified).toBe(expected);
  });
});
