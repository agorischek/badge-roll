import { Run } from "../types";

describe("Run", () => {
  test("Should resolve context without any inputs", () => {
    const run = new Run();
    expect(
      run.original && run.modified && run.filePath && run.matches
    ).toBeTruthy();
  });
});
