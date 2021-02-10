"use strict";

import { assert } from "chai";

import { configSchema } from "../config-schema";

describe("Config schema", () => {
  it("should require a badges property", () => {
    const config: unknown = { notBadges: "ABC" };
    const { error } = configSchema.validate(config);
    assert(error);
  });
  it("should require a badges items to have ids", () => {
    const config: unknown = { badges: [{ notID: "ABC" }] };
    const { error } = configSchema.validate(config);
    assert(error);
  });

  it("should not allow an arbitrary property", () => {
    const config: unknown = { notARealProperty: "ABC" };
    const { error } = configSchema.validate(config);
    assert(error);
  });

  it("should accept a valid config", () => {
    const config: unknown = { badges: [{ id: "ABC" }, { id: "DEF" }] };
    const { error } = configSchema.validate(config);
    assert(!error);
  });
});
