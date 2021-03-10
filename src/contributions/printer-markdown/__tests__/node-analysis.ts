import { Node } from "unist";

import { NodeAnalysis } from "../types";

import unified from "unified";
import markdown from "remark-parse";

import { getFirstChild } from "../utils";

const parse = unified().use(markdown).parse;

describe("Node Analysis", () => {
  test("should detect a node from empty content", () => {
    const source = "";
    const parsed = parse(source);
    const analysis = new NodeAnalysis(parsed);
    expect(analysis.exists).toBeTruthy();
    expect(analysis.isBadge).toBeFalsy();
    expect(analysis.isRoot).toBeTruthy();
  });
  test("should detect a paragraph", () => {
    const source = "ABC";
    const parsed = parse(source);
    const child = getFirstChild(parsed);
    const analysis = new NodeAnalysis(child);
    expect(analysis.exists).toBeTruthy();
    expect(analysis.isBadge).toBeFalsy();
    expect(analysis.isParagraph).toBeTruthy();
    expect(analysis.isRoot).toBeFalsy();
  });
  test("should detect a badge", () => {
    const source = `[![Example](https://img.shields.io/example)](https://example.org "Example")`;
    const parsed = parse(source);
    const grandChild = getFirstChild(getFirstChild(parsed));
    const analysis = new NodeAnalysis(grandChild);
    expect(analysis.isBadge).toBeTruthy();
  });

  test("should detect a GitHub badge", () => {
    const source = `[![Example](https://github.com)](https://example.org "Example")`;
    const parsed = parse(source);
    const grandChild = getFirstChild(getFirstChild(parsed));
    const analysis = new NodeAnalysis(grandChild);
    expect(analysis.isBadge).toBeTruthy();
  });

  test("should detect a Gitter badge", () => {
    const source = `[![Example](https://badges.gitter.im)](https://example.org "Example")`;
    const parsed = parse(source);
    const grandChild = getFirstChild(getFirstChild(parsed));
    const analysis = new NodeAnalysis(grandChild);
    expect(analysis.isBadge).toBeTruthy();
  });

  test("should detect an Azure DevOps badge", () => {
    const source = `[![Example](https://dev.azure.com/)](https://example.org "Example")`;
    const parsed = parse(source);
    const grandChild = getFirstChild(getFirstChild(parsed));
    const analysis = new NodeAnalysis(grandChild);
    expect(analysis.isBadge).toBeTruthy();
  });

  test("should not detect a random image as a badge", () => {
    const source = `[![Example](https://example.org)](https://example.org "Example")`;
    const parsed = parse(source);
    const grandChild = getFirstChild(getFirstChild(parsed));
    const analysis = new NodeAnalysis(grandChild);
    expect(analysis.isBadge).toBeFalsy();
  });
});
