import {
  combine,
  concat,
  extractFileExtension,
  isLast,
  readFile,
  stringifyQuery,
} from "../utilities";

describe("Combine", () => {
  test("should merge two objects", () => {
    const combined = combine({ a: 1, b: 2 }, { a: 3, c: 4 });
    expect(combined).toStrictEqual({ a: 3, b: 2, c: 4 });
  });
});

describe("Concat", () => {
  test("should concatenate multiple strings", () => {
    const concatenated = concat("123", "456", "789");
    expect(concatenated).toBe("123456789");
  });
});

describe("Extract File Extension", () => {
  test("should extract a file extension", () => {
    const extension = extractFileExtension("package.json");
    expect(extension).toBe("json");
  });
});

describe("Is Last", () => {
  test("should return true when at last index in array", () => {
    const index = 2;
    const array = ["a", "b", "c"];
    expect(isLast(index, array)).toBe(true);
  });
  test("should return false when not at last index in array", () => {
    const index = 1;
    const array = ["a", "b", "c"];
    expect(isLast(index, array)).toBe(false);
  });
});

describe("Read File", () => {
  test("should read a file", () => {
    const file = readFile("package.json");
    expect(file).toBeTruthy();
  });
});

describe("Stringify Query", () => {
  test("should stringify a simple string", () => {
    const options = {
      a: "b",
    };
    const string = stringifyQuery(options);
    expect(string).toBe("a=b");
  });
  test("should stringify a true boolean", () => {
    const options = {
      a: true,
    };
    const string = stringifyQuery(options);
    expect(string).toBe("a");
  });
  test("should stringify a false boolean", () => {
    const options = {
      a: false,
    };
    const string = stringifyQuery(options);
    expect(string).toBe("");
  });
  test("should stringify a number", () => {
    const options = {
      a: 2,
    };
    const string = stringifyQuery(options);
    expect(string).toBe("a=2");
  });
  test("should stringify multiple options together", () => {
    const options = {
      a: "b",
      c: 3,
      d: false,
      e: true,
    };
    const string = stringifyQuery(options);
    expect(string).toBe("a=b&c=3&e");
  });
});
