import { assert } from "chai";

import { evaluatePath, parsePath, Path } from "../types/classes/Path";

describe("Path Resolver", () => {
  it("should parse a path", () => {
    const parsed = parsePath("abc/:def/ghi/:jkl");
    assert.strictEqual(parsed[0].kind, "literal");
    assert.strictEqual(parsed[1].kind, "variable");
    assert.strictEqual(parsed.length, 4);
  });
  it("should evaluate a path", () => {
    const parsed = parsePath("abc/:def/ghi");
    const about = { def: "123" };
    const evaluated = evaluatePath(parsed, about);
    assert.strictEqual(evaluated, "/abc/123/ghi");
  });
  it("should resolve a path", () => {
    const about = { def: "123", jkl: "456" };
    const resolved = new Path("abc/:def/ghi/:jkl", about).evaluated;
    assert.strictEqual(resolved, "/abc/123/ghi/456");
  });
});
