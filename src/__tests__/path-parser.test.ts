import { assert } from "chai";

import { parsePath } from "../path-parser";

describe("Path Parser", () => {
  it("should parse a path", () => {
    const parsed = parsePath("abc/:def/ghi/:jkl");
    assert.strictEqual(parsed[0].kind, "literal");
    assert.strictEqual(parsed[1].kind, "variable");
    assert.strictEqual(parsed.length, 4);
  });
});
