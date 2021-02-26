import { affix } from "..";

describe("Affix function", () => {
  test("should affix one badge with simple badge definition", () => {
    const config = { badges: [{ id: "npm/v" }] };
    const source =
      '# Title\n\n[![Example](https://img.shields.io/npm/v/badge-roll)](https://example.org "Version")';
    const modified = affix(source, config);
    const expected = `# Title\n\n[![Version](https://img.shields.io/npm/v/badge-roll)](https://www.npmjs.com/package/badge-roll "Version")`;
    expect(modified).toBe(expected);
  });
  test("should affix one badge with object badge definition", () => {
    const config = { badges: ["npm/v"] };
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
    const config = {
      badges: [{ id: "npm/v" }, { id: "npm/v" }],
    };
    const modified = affix("", config);
    const expected = `[![Version](https://img.shields.io/npm/v/badge-roll)](https://www.npmjs.com/package/badge-roll "Version") [![Version](https://img.shields.io/npm/v/badge-roll)](https://www.npmjs.com/package/badge-roll "Version")`;
    expect(modified).toBe(expected);
  });

  test("should render two badges using different ID notation", () => {
    const config = {
      badges: ["npm/v", { id: "npm/v" }],
    };
    const modified = affix("", config);
    const expected = `[![Version](https://img.shields.io/npm/v/badge-roll)](https://www.npmjs.com/package/badge-roll "Version") [![Version](https://img.shields.io/npm/v/badge-roll)](https://www.npmjs.com/package/badge-roll "Version")`;
    expect(modified).toBe(expected);
  });

  test("should render two badges with newline separator and no target content", () => {
    const config = {
      badges: [{ id: "npm/v" }, { id: "npm/v" }],
      settings: { separator: "newline" },
    };
    const modified = affix("", config);
    const expected = `[![Version](https://img.shields.io/npm/v/badge-roll)](https://www.npmjs.com/package/badge-roll "Version")\n[![Version](https://img.shields.io/npm/v/badge-roll)](https://www.npmjs.com/package/badge-roll "Version")`;
    expect(modified).toBe(expected);
  });
});

test("should render two badges with space separator and no target content", () => {
  const config = {
    badges: [{ id: "npm/v" }, { id: "npm/v" }],
    settings: { separator: "space" },
  };
  const modified = affix("", config);
  const expected = `[![Version](https://img.shields.io/npm/v/badge-roll)](https://www.npmjs.com/package/badge-roll "Version") [![Version](https://img.shields.io/npm/v/badge-roll)](https://www.npmjs.com/package/badge-roll "Version")`;
  expect(modified).toBe(expected);
});

test("should throw if position is current but there are no badges", () => {
  const config = {
    badges: [{ id: "npm/v" }],
    settings: { position: "current" },
  };
  const expected = `# Title\n\n[![Version](https://img.shields.io/npm/v/badge-roll)](https://www.npmjs.com/package/badge-roll "Version")\n\nTest content`;
  expect(() => {
    affix("# Title\n\nTest content", config);
  }).toThrow();
});

// test.only("should render a badge below the title", () => {
//   const config = {
//     badges: [{ id: "npm/v" }],
//     settings: { position: "below-title" },
//   };
//   const modified = affix("# Title\n\nSome body content", config);
//   const expected = `# Title\n\n[![Version](https://img.shields.io/npm/v/badge-roll)](https://www.npmjs.com/package/badge-roll "Version")\n\nSome body content`;
//   expect(modified).toBe(expected);
// });
