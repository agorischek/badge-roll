import { affix } from "..";

const placeholderBadge =
  '[![Example](https://img.shields.io/example)](https://www.npmjs.com/example "Example")';

const expectedBadge =
  '[![Version](https://img.shields.io/npm/v/badge-roll)](https://www.npmjs.com/package/badge-roll "Version")';

describe("Affix function", () => {
  test("should affix one badge with simple badge definition", () => {
    const config = { badges: [{ id: "npm/v" }] };
    const source = `# Title\n\n${placeholderBadge}`;
    const modified = affix(source, config);
    const expected = `# Title\n\n${expectedBadge}`;
    expect(modified).toBe(expected);
  });
  test("should affix one badge with object badge definition", () => {
    const config = { badges: ["npm/v"] };
    const source = `# Title\n\n${placeholderBadge}`;
    const modified = affix(source, config);
    const expected = `# Title\n\n${expectedBadge}`;
    expect(modified).toBe(expected);
  });
  test("should render a badge with no target content", () => {
    const config = { badges: [{ id: "npm/v" }] };
    const modified = affix("", config);
    const expected = `${expectedBadge}`;
    expect(modified).toBe(expected);
  });

  test("should render two badges with no target content", () => {
    const config = {
      badges: [{ id: "npm/v" }, { id: "npm/v" }],
    };
    const modified = affix("", config);
    const expected = `${expectedBadge} ${expectedBadge}`;
    expect(modified).toBe(expected);
  });

  test("should render two badges using different ID notation", () => {
    const config = {
      badges: ["npm/v", { id: "npm/v" }],
    };
    const modified = affix("", config);
    const expected = `${expectedBadge} ${expectedBadge}`;
    expect(modified).toBe(expected);
  });

  test("should render two badges with newline separator and no target content", () => {
    const config = {
      badges: [{ id: "npm/v" }, { id: "npm/v" }],
      settings: { separator: "newline" },
    };
    const modified = affix("", config);
    const expected = `${expectedBadge}\n${expectedBadge}`;
    expect(modified).toBe(expected);
  });

  test("should render two badges with space separator and no target content", () => {
    const config = {
      badges: [{ id: "npm/v" }, { id: "npm/v" }],
      settings: { separator: "space" },
    };
    const modified = affix("", config);
    const expected = `${expectedBadge} ${expectedBadge}`;
    expect(modified).toBe(expected);
  });

  test("should throw if position is current but there are no badges", () => {
    const config = {
      badges: [{ id: "npm/v" }],
      settings: { position: "current" },
    };
    expect(() => {
      affix("# Title\n\nTest content", config);
    }).toThrow();
  });

  test("should affix using the alternate `md` printer", () => {
    const config = { badges: [{ id: "npm/v" }], settings: { printer: "md" } };
    const source = `# Title\n\n${placeholderBadge}`;
    const modified = affix(source, config);
    const expected = `# Title\n\n${expectedBadge}`;
    expect(modified).toBe(expected);
  });
});
