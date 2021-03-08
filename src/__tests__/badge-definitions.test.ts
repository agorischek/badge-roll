import { badgeDefinitionSchema } from "../schemas/badge-definition-schema";
import shields from "../contributions/provider-shields";

import { loadModule } from "../loaders";

const definition = shields.providers.shields.badges["appveyor/tests"];

describe("Badge definition schema", () => {
  test("should detect totally invalid schema", () => {
    expect(badgeDefinitionSchema.validate({ valid: false }).error).toBeTruthy();
  });
  test("should detect schema with invalid type", () => {
    expect(badgeDefinitionSchema.validate({ details: 2 }).error).toBeTruthy();
  });
  test("should detect partially valid schema", () => {
    expect(
      badgeDefinitionSchema.validate({
        details: "example/path",
        notAProperty: true,
      }).error
    ).toBeTruthy();
  });
});

describe("Badge definitions", () => {
  test("should be valid", () => {
    const providerShields = loadModule("provider-shields", true);
    for (const provider in providerShields.providers) {
      for (const badge in providerShields.providers[provider].badges) {
        const badgeDefinition =
          providerShields.providers[provider].badges[badge];
        const result = badgeDefinitionSchema.validate(badgeDefinition);
        expect(result.error).toBeFalsy();
      }
    }
  });
});
