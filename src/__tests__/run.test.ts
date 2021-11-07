import { Config, Run } from "../types/index.js";

import { runSchema } from "../schemas/index.js";

describe("Run", () => {
  test("should resolve context without any inputs", async () => {
    const run = new Run();
    await run.exec();
    expect(run).toMatchSchema(runSchema);
  });

  test("should throw with null badges", async () => {
    const source = "";
    const config: Config = { badges: null };
    const run = new Run(source, config);

    expect.assertions(1);
    await expect(run.exec()).rejects.toThrow('"badges" must be an array');
  });

  test("should throw with empty badges", async () => {
    const source = "";
    const config: Config = { badges: [] };
    const run = new Run(source, config);
    expect.assertions(1);
    await expect(run.exec()).rejects.toThrow("No badges specified.");
  });
});
