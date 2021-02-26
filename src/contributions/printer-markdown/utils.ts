import select from "unist-util-select";

import { Node } from "unist";

export function getFirstChild(node: Node): Node {
  const firstChild: Node = select.select(":first-child", node);
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
