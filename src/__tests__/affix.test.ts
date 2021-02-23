import { affix } from "..";

describe("Affix function", () => {
  it("should affix!", () => {
    const config = { badges: [{ id: "npm/v" }] };
    const source =
      '# Title\n\n[![Example](https://img.shields.io/npm/v/badge-roll)](https://example.org "Version")';
    const modified = affix(source, config);
    const expected =
      '# Title\n\n[![Version](https://img.shields.io/npm/v/badge-roll)](https://www.npmjs.com/package/badge-roll "Version")';
    expect(modified).toBe(expected);
  });
});
