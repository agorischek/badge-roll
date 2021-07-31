import { badgeDefinitionSchema } from "../schemas";
import { loadModule } from "../loaders";

describe("Badge definition schema", () => {
  test("should be a schema",()=>{
    expect(badgeDefinitionSchema).toBeSchema();
  })
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
