import { affix } from "../index.js";

const placeholderBadge =
  '[![Example](https://img.shields.io/example)](https://www.npmjs.com/example "Example")';

const expectedBadge =
  '[![Version](https://img.shields.io/npm/v/badge-roll)](https://www.npmjs.com/package/badge-roll "Version")';

describe.skip("Affix function", () => {
  test("should affix one badge with simple badge definition", async () => {
    const config = { badges: ["npm/v"] };
    const source = `# Title\n\n${placeholderBadge}`;
    const modified = await affix(source, config);
    const expected = `# Title\n\n${expectedBadge}`;
    expect(modified).toBe(expected);
  });

  test("should affix one badge with object badge definition", async () => {
    const config = { badges: [{ id: "npm/v" }] };
    const source = `# Title\n\n${placeholderBadge}`;
    const modified = await affix(source, config);
    const expected = `# Title\n\n${expectedBadge}`;
    expect(modified).toBe(expected);
  });

  test("should render a badge with no target content", async () => {
    const config = { badges: [{ id: "npm/v" }] };
    const modified = await affix("", config);
    const expected = `${expectedBadge}`;
    expect(modified).toBe(expected);
  });

  test("should render two badges with no target content", async () => {
    const config = {
      badges: [{ id: "npm/v" }, { id: "npm/v" }],
    };
    const modified = await affix("", config);
    const expected = `${expectedBadge} ${expectedBadge}`;
    expect(modified).toBe(expected);
  });

  test("should render two badges using different ID notation", async () => {
    const config = {
      badges: ["npm/v", { id: "npm/v" }],
    };
    const modified = await affix("", config);
    const expected = `${expectedBadge} ${expectedBadge}`;
    expect(modified).toBe(expected);
  });

  test("should render two badges with newline separator and no target content", async () => {
    const config = {
      badges: [{ id: "npm/v" }, { id: "npm/v" }],
      settings: { separator: "newline" },
    };
    const modified = await affix("", config);
    const expected = `${expectedBadge}\n${expectedBadge}`;
    expect(modified).toBe(expected);
  });

  test("should render two badges with space separator and no target content", async () => {
    const config = {
      badges: [{ id: "npm/v" }, { id: "npm/v" }],
      settings: { separator: "space" },
    };
    const modified = await affix("", config);
    const expected = `${expectedBadge} ${expectedBadge}`;
    expect(modified).toBe(expected);
  });

  test("should detect various badge providers", async () => {
    const source = `[![Example](https://badges.gitter.im/user/Lobby.svg)](https://example.org "Example")
    [![Example](https://github.com/project/repo/workflows/main/badge.svg)](https://example.org "Example")
    [![Example](https://img.shields.io/example)](https://example.org "Example")
    [![Example](https://dev.azure.com/user/packages/_apis/build/status/project/pipeline?branchName=master)](https://example.org "Example")`;
    const config = {
      badges: [{ id: "npm/v" }],
      settings: { position: "current" },
    };
    const modified = await affix(source, config);
    const expected = expectedBadge;
    expect(modified).toBe(expected);
  });

  // test.skip("should throw if position is current but there are no badges", async () => {
  //   const config = {
  //     badges: [{ id: "npm/v" }],
  //     settings: { position: "current" },
  //   };
  //   expect(async () => {
  //     await affix("# Title\n\nTest content", config);
  //   }).toThrow();
  // });

  test("should affix using the alternate `md` printer", async () => {
    const config = { badges: [{ id: "npm/v" }], settings: { printer: "md" } };
    const source = `# Title\n\n${placeholderBadge}`;
    const modified = await affix(source, config);
    const expected = `# Title\n\n${expectedBadge}`;
    expect(modified).toBe(expected);
  });

  // test.skip("should throw when requesting a provider that doesn't exist", async () => {
  //   const config = {
  //     badges: [{ id: "npm/v", provider: "not-a/real-provider" }],
  //   };
  //   const source = "";
  //   expect(async () => await affix(source, config)).toThrow();
  // });

  // test.skip("should throw when requesting a badge that doesn't exist", async () => {
  //   const config = { badges: [{ id: "not-a/real-badge" }] };
  //   const source = "";
  //   expect(async () => await affix(source, config)).toThrow();
  // });
});
