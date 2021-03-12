import { Printer, RunContext } from "../types";

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
  test("should throw if unavailable printer is requested", () => {
    const run = new RunContext();
    const printer = new Printer(run.printers, "not-a-real-printer");
    expect(() => {
      printer.print(section.badges, run.settings);
    }).toThrow();
  });
});
