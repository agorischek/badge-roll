import { badgeDefinitionSchema } from "../schemas/index.js";
import { loadModule } from "../loaders/index.js";

describe("Badge definition schema", () => {
  test("should be a schema", () => {
    expect(badgeDefinitionSchema).toBeSchema();
  });
  test("should detect totally invalid schema", () => {
    const badgeDefinition = { valid: false };
    expect(badgeDefinition).not.toMatchSchema(badgeDefinitionSchema);
  });
  test("should detect schema with invalid type", () => {
    const badgeDefinition = { details: 2 };
    expect(badgeDefinition).not.toMatchSchema(badgeDefinitionSchema);
  });
  test("should detect partially valid schema", () => {
    const badgeDefinition = {
      details: "example/path",
      notAProperty: true,
    };
    expect(badgeDefinition).not.toMatchSchema(badgeDefinitionSchema);
  });
});

describe("Shields badge definitions", () => {
  test("Should be valid", async () => {
    const providerName = "shields";
    const data = await loadModule("provider-" + providerName, true);
    const badges = data.providers[providerName].badges;
    for (const name in badges) {
      expect(badges[name]).toMatchSchema(badgeDefinitionSchema);
    }
  });
});
