import { Badge, RunContext, Settings } from "../types";

describe("Badge", () => {
  test("should resolve display string", () => {
    const config = { badges: [{ id: "npm/v" }] };
    const context = new RunContext();

    const badge = new Badge(
      config.badges[0],
      context.settings,
      context.about,
      context.providers
    );
    expect(badge.display).toBe("Version");
  });
  test("should render a style query param", () => {
    const config = { badges: [{ id: "npm/v" }], settings: { style: "flat" } };
    const context = new RunContext(config);

    const badge = new Badge(
      config.badges[0],
      context.settings,
      context.about,
      context.providers
    );
    expect(badge.url).toBe(
      "https://img.shields.io/npm/v/badge-roll?style=flat"
    );
  });

  test("should override a global style", () => {
    const config = { badges: [{ id: "npm/v", style: "flat" }] };
    const settings: Settings = {
      style: "plastic",
      provider: "shields",
    };

    const context = new RunContext();

    const badge = new Badge(
      config.badges[0],
      settings,
      context.about,
      context.providers
    );
    expect(badge.style).toBe("flat");
  });

  test("should handle query params", () => {
    const config = {
      badges: [
        {
          id: "npm/v",
          query: {
            failed_label: "bad",
            passed_label: "good",
            skipped_label: "meh",
          },
        },
      ],
    };
    const context = new RunContext();
    const badge = new Badge(
      config.badges[0],
      context.settings,
      context.about,
      context.providers
    );
    expect(badge.queryString).toBe(
      "failed_label=bad&passed_label=good&skipped_label=meh"
    );
  });
  test("should handle a variation", () => {
    const config = {
      badges: [
        {
          id: "appveyor/build",
          variation: "branch",
          about: {
            branch: "my-branch",
          },
        },
      ],
    };
    const context = new RunContext();
    const badge = new Badge(
      config.badges[0],
      context.settings,
      context.about,
      context.providers
    );
    expect(badge.url).toBe(
      "https://img.shields.io/appveyor/build/agorischek/badge-roll/my-branch"
    );
  });
});
