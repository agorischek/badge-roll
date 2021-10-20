import { affix } from "../index.js";

const config = {
  badges: [{ id: "npm/v" }],
  settings: { position: "" },
};

const placeholderBadge =
  '[![Version](https://img.shields.io/npm/v/badge-roll)](https://www.npmjs.com/package/badge-roll "Version")';

describe("`affix` should insert a badge into documents without any badges", () => {
  const source =
    "# Title\n\nFirst paragraph.\n\nSecond paragraph.\n\nThird paragraph.\n\n## Subheader";

  test("at the `below-title` position", () => {
    config.settings.position = "below-title";
    const modified = affix(source, config);
    const expected = `# Title\n\n${placeholderBadge}\n\nFirst paragraph.\n\nSecond paragraph.\n\nThird paragraph.\n\n## Subheader`;
    expect(modified).toBe(expected);
  });

  test("at the `below-lead` position", () => {
    config.settings.position = "below-lead";
    const modified = affix(source, config);
    const expected = `# Title\n\nFirst paragraph.\n\n${placeholderBadge}\n\nSecond paragraph.\n\nThird paragraph.\n\n## Subheader`;
    expect(modified).toBe(expected);
  });

  test("at the `top` position", () => {
    config.settings.position = "top";
    const modified = affix(source, config);
    const expected = `${placeholderBadge}\n\n# Title\n\nFirst paragraph.\n\nSecond paragraph.\n\nThird paragraph.\n\n## Subheader`;
    expect(modified).toBe(expected);
  });
});

describe("`affix` should insert a badge into documents with one existing badge", () => {
  const exampleBadge = `[![Example](https://img.shields.io/example)](https://www.example.org "Example")`;

  test("at the `below-title` position", () => {
    config.settings.position = "below-title";
    const source = `# Title\n\n${exampleBadge}\n\nFirst paragraph.\n\nSecond paragraph.\n\nThird paragraph.\n\n## Subheader`;
    const modified = affix(source, config);
    const expected = `# Title\n\n${placeholderBadge}\n\nFirst paragraph.\n\nSecond paragraph.\n\nThird paragraph.\n\n## Subheader`;
    expect(modified).toBe(expected);
  });

  test("at the `below-lead` position", () => {
    config.settings.position = "below-lead";
    const source = `# Title\n\nFirst paragraph.\n\n${exampleBadge}\n\nSecond paragraph.\n\nThird paragraph.\n\n## Subheader`;
    const modified = affix(source, config);
    const expected = `# Title\n\nFirst paragraph.\n\n${placeholderBadge}\n\nSecond paragraph.\n\nThird paragraph.\n\n## Subheader`;
    expect(modified).toBe(expected);
  });

  test("at the `top` position", () => {
    config.settings.position = "top";
    const source = `${exampleBadge}\n\n# Title\n\nFirst paragraph.\n\nSecond paragraph.\n\nThird paragraph.\n\n## Subheader`;
    const modified = affix(source, config);
    const expected =
      '[![Version](https://img.shields.io/npm/v/badge-roll)](https://www.npmjs.com/package/badge-roll "Version")\n\n# Title\n\nFirst paragraph.\n\nSecond paragraph.\n\nThird paragraph.\n\n## Subheader';
    expect(modified).toBe(expected);
  });

  test("at the `current` position, when below first paragraph", () => {
    config.settings.position = "current";
    const source = `# Title\n\nFirst paragraph.\n\n${exampleBadge}\n\nSecond paragraph.\n\nThird paragraph.\n\n## Subheader`;
    const modified = affix(source, config);
    const expected = `# Title\n\nFirst paragraph.\n\n${placeholderBadge}\n\nSecond paragraph.\n\nThird paragraph.\n\n## Subheader`;
    expect(modified).toBe(expected);
  });

  test("at the `current` position, when below second paragraph", () => {
    config.settings.position = "current";
    const source = `# Title\n\nFirst paragraph.\n\nSecond paragraph.\n\n${exampleBadge}\n\nThird paragraph.\n\n## Subheader`;
    const modified = affix(source, config);
    const expected = `# Title\n\nFirst paragraph.\n\nSecond paragraph.\n\n${placeholderBadge}\n\nThird paragraph.\n\n## Subheader`;
    expect(modified).toBe(expected);
  });

  test("at the `current` position, when below subheader", () => {
    config.settings.position = "current";
    const source = `# Title\n\nFirst paragraph.\n\nSecond paragraph.\n\nThird paragraph.\n\n## Subheader\n\n${exampleBadge}`;
    const modified = affix(source, config);
    const expected = `# Title\n\nFirst paragraph.\n\nSecond paragraph.\n\nThird paragraph.\n\n## Subheader\n\n${placeholderBadge}`;
    expect(modified).toBe(expected);
  });
});

describe("`affix` should insert a badge into documents with multiple existing badges", () => {
  const exampleBadge = `[![Example](https://img.shields.io/example)](https://www.example.org "Example")`;

  test("at the `below-title` position", () => {
    config.settings.position = "below-title";
    const source = `# Title\n\n${exampleBadge} ${exampleBadge} ${exampleBadge}\n\nFirst paragraph.\n\nSecond paragraph.\n\nThird paragraph.\n\n## Subheader`;
    const modified = affix(source, config);
    const expected = `# Title\n\n${placeholderBadge}\n\nFirst paragraph.\n\nSecond paragraph.\n\nThird paragraph.\n\n## Subheader`;
    expect(modified).toBe(expected);
  });

  test("at the `below-lead` position", () => {
    config.settings.position = "below-lead";
    const source = `# Title\n\nFirst paragraph.\n\n${exampleBadge} ${exampleBadge} ${exampleBadge}\n\nSecond paragraph.\n\nThird paragraph.\n\n## Subheader`;
    const modified = affix(source, config);
    const expected = `# Title\n\nFirst paragraph.\n\n${placeholderBadge}\n\nSecond paragraph.\n\nThird paragraph.\n\n## Subheader`;
    expect(modified).toBe(expected);
  });

  test("at the `top` position", () => {
    config.settings.position = "top";
    const source = `${exampleBadge} ${exampleBadge} ${exampleBadge}\n\n# Title\n\nFirst paragraph.\n\nSecond paragraph.\n\nThird paragraph.\n\n## Subheader`;
    const modified = affix(source, config);
    const expected =
      '[![Version](https://img.shields.io/npm/v/badge-roll)](https://www.npmjs.com/package/badge-roll "Version")\n\n# Title\n\nFirst paragraph.\n\nSecond paragraph.\n\nThird paragraph.\n\n## Subheader';
    expect(modified).toBe(expected);
  });

  test("at the `current` position, when below first paragraph", () => {
    config.settings.position = "current";
    const source = `# Title\n\nFirst paragraph.\n\n${exampleBadge} ${exampleBadge} ${exampleBadge}\n\nSecond paragraph.\n\nThird paragraph.\n\n## Subheader`;
    const modified = affix(source, config);
    const expected = `# Title\n\nFirst paragraph.\n\n${placeholderBadge}\n\nSecond paragraph.\n\nThird paragraph.\n\n## Subheader`;
    expect(modified).toBe(expected);
  });

  test("at the `current` position, when below second paragraph", () => {
    config.settings.position = "current";
    const source = `# Title\n\nFirst paragraph.\n\nSecond paragraph.\n\n${exampleBadge} ${exampleBadge} ${exampleBadge}\n\nThird paragraph.\n\n## Subheader`;
    const modified = affix(source, config);
    const expected = `# Title\n\nFirst paragraph.\n\nSecond paragraph.\n\n${placeholderBadge}\n\nThird paragraph.\n\n## Subheader`;
    expect(modified).toBe(expected);
  });

  test("at the `current` position, when below subheader", () => {
    config.settings.position = "current";
    const source = `# Title\n\nFirst paragraph.\n\nSecond paragraph.\n\nThird paragraph.\n\n## Subheader\n\n${exampleBadge} ${exampleBadge} ${exampleBadge}`;
    const modified = affix(source, config);
    const expected = `# Title\n\nFirst paragraph.\n\nSecond paragraph.\n\nThird paragraph.\n\n## Subheader\n\n${placeholderBadge}`;
    expect(modified).toBe(expected);
  });
});
