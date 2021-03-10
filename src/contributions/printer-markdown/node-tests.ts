import select from "unist-util-select";
import is from "unist-util-is";

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
  isRoot,
};

export function isBadge(node: Node): boolean {
  if (node === null) return null;

  const firstChild = getFirstChild(node);

  // isLink(node);
  // hasNoGrandchildren(node);

  return hasExactlyOneChild(node) && isBadgeImg(firstChild);
}

export function hasExactlyOneChild(node: Node): boolean {
  return node && node.children ? [].concat(node.children).length === 1 : null;
}

export function hasNoGrandchildren(node: Node): boolean {
  return node ? getFirstGrandchildren(node).length === 0 : null;
}

function badgeSelector(providerUrl: string) {
  return `image[url^=${providerUrl}]:empty`;
}

export function isBadgeImg(node: Node) {
  return (
    isShieldsImg(node) ||
    isAzureDevopsImg(node) ||
    isGithubImg(node) ||
    isGitterImg(node)
  );
}

export function isShieldsImg(node: Node): boolean {
  return node
    ? select.matches(badgeSelector("https://img.shields.io"), node)
    : null;
}
export function isAzureDevopsImg(node: Node): boolean {
  return node
    ? select.matches(badgeSelector("https://dev.azure.com/"), node)
    : null;
}

export function isGithubImg(node: Node): boolean {
  return node
    ? select.matches(badgeSelector("https://github.com"), node)
    : null;
}

export function isGitterImg(node: Node): boolean {
  return node
    ? select.matches(badgeSelector("https://badges.gitter.im"), node)
    : null;
}

export function isLink(node: Node): boolean {
  return node ? is("link", node) : null;
}

function isRoot(node: Node): boolean {
  return node
    ? is(node, {
        type: "root",
      })
    : null;
}

function isSpace(node: Node): boolean {
  return node
    ? is(node, {
        type: "text",
        value: " ",
      })
    : null;
}

export function isNewline(node: Node): boolean {
  return node
    ? is(node, {
        type: "text",
        value: "\n",
      })
    : null;
}

export function isSpecificText(node: Node, specificText: string): boolean {
  return node
    ? is(node, {
        type: "text",
        value: specificText,
      })
    : null;
}
