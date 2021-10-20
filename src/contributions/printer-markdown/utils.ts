import { Node } from "unist";
import { Parent } from "mdast";

import nav from "./tree-navigator.js";
import { isParent } from "./node-tests.js";

export function getFirstChild(node: Parent): Node {
  if (isParent(node)) {
    const firstChild: Node = nav.select(":first-child", node);
    return firstChild ? firstChild : null;
  } else null;
}
export function getFirstGrandchildren(node: Parent): Array<Node> {
  if (isParent(node)) {
    const firstChild: Node = getFirstChild(node);
    if (isParent(firstChild)) {
      const grandchildren: Array<Node> = firstChild
        ? [].concat(firstChild.children)
        : [];
      return grandchildren;
    } else null;
  } else null;
}

export function removeTrailingNewLine(markup: string): string {
  const trailingNewlinePattern = /^([^]*?)\n*$/s;
  if (markup.match(trailingNewlinePattern)) {
    const markupWithOutTrailingNewLine = markup.match(
      trailingNewlinePattern
    )[1];
    return markupWithOutTrailingNewLine;
  } else {
    return markup;
  }
}

export function concat(first: string, ...rest: Array<string>): string {
  return first.concat(...rest);
}

export function before(endingOffset: number): { in: (doc: string) => string } {
  return {
    in: (document: string): string => {
      return document.substring(0, endingOffset);
    },
  };
}

export function after(beginningOffset: number): {
  in: (doc: string) => string;
} {
  return {
    in: (document: string): string => {
      return document.substring(beginningOffset);
    },
  };
}
