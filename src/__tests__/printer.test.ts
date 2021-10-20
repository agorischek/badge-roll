import { Printer, RunContext } from "../types/index.js";

const section = {
  badges: [
    {
      basePath: "https://img.shields.io",
      details: ":packageName",
      display: "Version",
      id: "npm/v",
      provider: "shields",
      queryParams: {},
      queryString: "",
      style: "flat",
      to: "https://www.npmjs.com/package/badge-roll",
      url: "https://img.shields.io/npm/v/badge-roll",
      variation: "branch",
    },
  ],
};

describe("Printer", () => {
  test("should throw if unavailable printer is requested", async () => {
    const context = new RunContext();
    await context.compute();
    const printer = new Printer(context.printers, "not-a-real-printer");
    expect(() => {
      printer.print(section.badges, context.settings);
    }).toThrow();
  });
});
