import { configSchema } from "../schemas";

describe("Config schema", () => {
  test("should require a badges property", () => {
    const config: unknown = { notBadges: "ABC" };
    expect(()=>{
      expect(config).toMatchSchema(configSchema)
    }).toThrow();

  });
  test("should require a badges items to have ids", () => {
    const config: unknown = { badges: [{ notID: "ABC" }] };
    expect(()=>{
      expect(config).toMatchSchema(configSchema)
    }).toThrow();
  });

  test("should not allow an arbitrary property", () => {
    const config: unknown = { notARealProperty: "ABC" };
    expect(()=>{
      expect(config).toMatchSchema(configSchema)
    }).toThrow();  });

  test("should accept a valid config", () => {
    const config: unknown = { badges: [{ id: "ABC" }, { id: "DEF" }] };
    expect(config).toMatchSchema(configSchema)
  });
});
