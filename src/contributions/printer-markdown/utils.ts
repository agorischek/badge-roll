import select from "unist-util-select";

import { Node } from "unist";

export function getFirstChild(node: Node): Node {
  const firstChild: Node = select.select(":first-child", node);
  return firstChild;
}
export function getFirstGrandchildren(node: Node): Array<Node> {
  const firstChild: Node = getFirstChild(node);
  const grandchildren: Array<Node> = firstChild
    ? [].concat(firstChild.children)
    : [];
  return grandchildren;
}

export function removeTrailingNewLine(markup: string): string {
  const stringWithOutTrailingNewLine = markup.match(/^(.*)\n$/)[1];
  return stringWithOutTrailingNewLine;
}
