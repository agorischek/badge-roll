import { Run } from "../types";

import { runSchema } from "../schemas";

describe("Run", () => {
  test("should resolve context without any inputs", () => {
    const run = new Run();
    expect(run).toMatchSchema(runSchema);
  });
});
