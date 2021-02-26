import nav from "./tree-navigator";

import { Node } from "unist";

import { getFirstChild, getFirstGrandchildren } from "./utils";

export default {
  isSpace,
  isNewline,
  isSpecificText,
  isBadge,
  hasExactlyOneChild,
  hasNoGrandchildren,
  isLink,
};

export function isBadge(node: Node): boolean {
  if (node === null) return null;

  const firstChild = getFirstChild(node);

  // isLink(node);
  // hasNoGrandchildren(node);

  return hasExactlyOneChild(node) && isShieldsImg(firstChild);
}

export function hasExactlyOneChild(node: Node): boolean {
  return node && node.children ? [].concat(node.children).length === 1 : null;
}

export function hasNoGrandchildren(node: Node): boolean {
  return node ? getFirstGrandchildren(node).length === 0 : null;
}

export function isShieldsImg(node: Node): boolean {
  return node
    ? nav.matches("image[url^=https://img.shields.io]:empty", node)
    : null;
}

export function isLink(node: Node): boolean {
  return node ? nav.is("link", node) : null;
}

function isSpace(node: Node) {
  return node
    ? nav.is(node, {
        type: "text",
        value: " ",
      })
    : null;
}

export function isNewline(node: Node) {
  return node
    ? nav.is(node, {
        type: "text",
        value: "\n",
      })
    : null;
}

export function isSpecificText(node: Node, specificText: string) {
  return node
    ? nav.is(node, {
        type: "text",
        value: specificText,
      })
    : null;
}
