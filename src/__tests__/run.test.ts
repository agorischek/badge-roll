import { Config, Run } from "../types/index.js";

import { runSchema } from "../schemas/index.js";

describe("Run", () => {
  test("should resolve context without any inputs", () => {
    const run = new Run();
    expect(run).toMatchSchema(runSchema);
  });

  test("should throw with null badges", () => {
    const source = "";
    const config: Config = { badges: null };
    expect(() => {
      new Run(source, config);
    }).toThrow();
  });

  test("should throw with empty badges", () => {
    const source = "";
    const config: Config = { badges: [] };
    expect(() => {
      new Run(source, config);
    }).toThrow();
  });
});
