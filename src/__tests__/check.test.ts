import { check } from "../index.js";

const placeholderBadge =
  '[![Example](https://img.shields.io/example)](https://www.npmjs.com/example "Example")';

const expectedBadge =
  '[![Version](https://img.shields.io/npm/v/badge-roll)](https://www.npmjs.com/package/badge-roll "Version")';

const config = {
  badges: [{ id: "npm/v" }],
};

describe("Check function", () => {
  test("should return true for a correct source string", async () => {
    const source = `# Title\n\n${expectedBadge}`;
    const matched = await check(source, config);
    expect(matched).toBe(true);
  });
  test("should return false for a correct target file", async () => {
    const source = `# Title\n\n${placeholderBadge}`;
    const matched = await check(source, config);
    expect(matched).toBe(false);
  });
});
