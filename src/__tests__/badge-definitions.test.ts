import { badgeDefinitionSchema } from "../schemas";
import { loadModule } from "../loaders";

describe("Badge definition schema", () => {
  test("should detect totally invalid schema", () => {
    expect(() => {
      expect({ valid: false }).toMatchSchema(badgeDefinitionSchema);
    }).toThrow();
  });
  test("should detect schema with invalid type", () => {
    expect(() => {
      expect({ details: 2 }).toMatchSchema(badgeDefinitionSchema);
    }).toThrow();
  });
  test("should detect partially valid schema", () => {
    expect(() => {
      expect({
        details: "example/path",
        notAProperty: true,
      }).toMatchSchema(badgeDefinitionSchema);
    }).toThrow();
  });
});

describe("Badge definitions", () => {
  test("should be valid", () => {
    const providerShields = loadModule("provider-shields", true);
    for (const provider in providerShields.providers) {
      for (const badge in providerShields.providers[provider].badges) {
        const badgeDefinition =
          providerShields.providers[provider].badges[badge];
        expect(badgeDefinition).toMatchSchema(badgeDefinitionSchema);
      }
    }
  });
});
