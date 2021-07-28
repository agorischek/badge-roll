import { evaluatePath, parsePath, Path } from "../types/classes/path";

describe("Path Resolver", () => {
  test("should parse a path", () => {
    const parsed = parsePath("abc/:def/ghi/:jkl");
    expect(parsed[0].kind).toBe("literal");
    expect(parsed[1].kind).toBe("variable");
    expect(parsed.length).toBe(4);
  });
  test("should parse a path with a suffixed variable", () => {
    const parsed = parsePath("abc/:def+ghi/");
    expect(parsed[0].kind).toBe("literal");
    expect(parsed[1].kind).toBe("variable");
    expect(parsed[1].suffixes.length).toBe(1);
  });
  test("should parse a path with a multiply suffixed variable", () => {
    const parsed = parsePath("abc/:def+ghi+jkl/");
    expect(parsed[0].kind).toBe("literal");
    expect(parsed[1].kind).toBe("variable");
    expect(parsed[1].suffixes.length).toBe(2);
  });
  test("should evaluate a path", () => {
    const parsed = parsePath("abc/:def/ghi");
    const about = { def: "123" };
    const evaluated = evaluatePath(parsed, about);
    expect(evaluated).toBe("abc/123/ghi");
  });
  test("should evaluate a path with a suffixed variable and defined suffix", () => {
    const parsed = parsePath(":abc+def");
    const about = { "abc:ghi": "123", def: "ghi" };
    const evaluated = evaluatePath(parsed, about);
    expect(evaluated).toBe("123");
  });
  test("should evaluate a path with a suffixed variable but no defined suffix", () => {
    const parsed = parsePath(":abc+def");
    const about = { abc: "123" };
    const evaluated = evaluatePath(parsed, about);
    expect(evaluated).toBe("123");
  });
  test("should resolve a path", () => {
    const about = { def: "123", jkl: "456" };
    const resolved = new Path("abc/:def/ghi/:jkl", about).evaluated;
    expect(resolved).toBe("abc/123/ghi/456");
  });
});
