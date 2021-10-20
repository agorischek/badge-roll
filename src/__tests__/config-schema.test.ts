import { configSchema } from "../schemas/index.js";

describe("Config schema", () => {
  test("should require a badges property", () => {
    const config: unknown = { notBadges: "ABC" };
    expect(config).not.toMatchSchema(configSchema);
  });
  test("should require a badges items to have ids", () => {
    const config: unknown = { badges: [{ notID: "ABC" }] };
    expect(config).not.toMatchSchema(configSchema);
  });

  test("should not allow an arbitrary property", () => {
    const config: unknown = { notARealProperty: "ABC" };
    expect(config).not.toMatchSchema(configSchema);
  });

  test("should accept a valid config", () => {
    const config: unknown = { badges: [{ id: "ABC" }, { id: "DEF" }] };
    expect(config).toMatchSchema(configSchema);
  });
});
