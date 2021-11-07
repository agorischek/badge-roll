// import { Config } from "../types/index.js";
import { Run } from "../types/index.js";

import { runSchema } from "../schemas/index.js";

describe("Run", () => {
  test("should resolve context without any inputs", async () => {
    const run = new Run();
    await run.exec();
    expect(run).toMatchSchema(runSchema);
  });

  // test.skip("should throw with null badges", async () => {
  //   const source = "";
  //   const config: Config = { badges: null };
  //   expect(async () => {
  //     const run = new Run(source, config);
  //     await run.exec();
  //   }).toThrow();
  // });

  // test.skip("should throw with empty badges", async () => {
  //   const source = "";
  //   const config: Config = { badges: [] };
  //   return expect(async () => {
  //     const run = new Run(source, config);
  //     await run.exec();
  //   }).toThrow();
  // });
});
