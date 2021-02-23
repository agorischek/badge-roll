import { configSchema } from "../schemas";

describe("Config schema", () => {
  test("should require a badges property", () => {
    const config: unknown = { notBadges: "ABC" };
    const { error } = configSchema.validate(config);
    expect(error).toBeTruthy();
  });
  test("should require a badges items to have ids", () => {
    const config: unknown = { badges: [{ notID: "ABC" }] };
    const { error } = configSchema.validate(config);
    expect(error).toBeTruthy();
  });

  test("should not allow an arbitrary property", () => {
    const config: unknown = { notARealProperty: "ABC" };
    const { error } = configSchema.validate(config);
    expect(error).toBeTruthy();
  });

  test("should accept a valid config", () => {
    const config: unknown = { badges: [{ id: "ABC" }, { id: "DEF" }] };
    const { error } = configSchema.validate(config);
    expect(error).toBeFalsy();
  });
});
