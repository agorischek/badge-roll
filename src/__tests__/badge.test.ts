import { Badge, RunContext } from "../types";

const config = { badges: [{ id: "npm/v" }] };
const run = new RunContext();

describe("Badge", () => {
  test("should resolve display string", () => {
    const badge = new Badge(
      config.badges[0],
      run.settings,
      run.about,
      run.providers
    );
    expect(badge.display).toBe("Version");
  });
});
