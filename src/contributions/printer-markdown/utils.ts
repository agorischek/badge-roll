import nav from "./tree-navigator";

import { Node } from "unist";

export function getFirstChild(node: Node): Node {
  const firstChild: Node = nav.select(":first-child").in(node);
  return firstChild ? firstChild : null;
}
export function getFirstGrandchildren(node: Node): Array<Node> {
  const firstChild: Node = getFirstChild(node);
  const grandchildren: Array<Node> = firstChild
    ? [].concat(firstChild.children)
    : [];
  return grandchildren;
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

export function concat(first: string, ...rest: Array<string>) {
  return first.concat(...rest);
}

export function before(endingOffset: number) {
  return {
    in: (document: string): string => {
      return document.substring(0, endingOffset);
    },
  };
}

export function after(beginningOffset: number) {
  return {
    in: (document: string): string => {
      return document.substring(beginningOffset);
    },
  };
}
