import { matches } from "unist-util-select";
import { is } from "unist-util-is";

import { Node } from "unist";
import { Parent, Element, Text } from "hast";

import { PossibleParent } from "./types/interfaces/index.js";

import { getFirstChild, getFirstGrandchildren } from "./utils.js";

export default {
  isSpace,
  isNewline,
  isSpecificText,
  isBadge,
  hasExactlyOneChild,
  hasNoGrandchildren,
  isLink,
  isParent,
  isRoot,
};

export function isBadge(node: PossibleParent): boolean {
  if (node === null) return null;
  if (isParent(node)) {
    const firstChild = getFirstChild(node);

    return hasExactlyOneChild(node) && isBadgeImg(firstChild);
  } else null;
}

export function hasExactlyOneChild(node: Parent): boolean {
  return node && node.children ? [].concat(node.children).length === 1 : null;
}

export function hasNoGrandchildren(node: Parent): boolean {
  return node ? getFirstGrandchildren(node).length === 0 : null;
}

function badgeSelector(providerUrl: string) {
  return `img[src^=${providerUrl}]`;
}

export function isBadgeImg(node: Node): boolean {
  return (
    isShieldsImg(node) ||
    isAzureDevopsImg(node) ||
    isGithubImg(node) ||
    isGitterImg(node) ||
    isAppveyorImg(node)
  );
}

export function isShieldsImg(node: Node): boolean {
  return node ? matches(badgeSelector("https://img.shields.io"), node) : null;
}
export function isAzureDevopsImg(node: Node): boolean {
  return node ? matches(badgeSelector("https://dev.azure.com/"), node) : null;
}

export function isGithubImg(node: Node): boolean {
  return node ? matches(badgeSelector("https://github.com"), node) : null;
}

export function isGitterImg(node: Node): boolean {
  return node ? matches(badgeSelector("https://badges.gitter.im"), node) : null;
}

export function isAppveyorImg(node: Node): boolean {
  return node
    ? matches(badgeSelector("https://ci.appveyor.com/api"), node)
    : null;
}

export function isLink(node: Node): boolean {
  return node ? is("element", node) && (node as Element).tagName === "a" : null;
}

export function isParent(node: PossibleParent): node is Parent {
  return !!node?.children;
}

function isRoot(node: Node): boolean {
  return node
    ? is(node, {
        type: "root",
      })
    : null;
}

function isSpace(node: Node): boolean {
  if (is("text", node)) {
    const textNode = node as Text;
    return textNode.value === " ";
  }
  return false;
}

export function isNewline(node: Node): boolean {
  if (is("text", node)) {
    const textNode = node as Text;
    return textNode.value === "\n";
  }
  return false;
}

export function isSpecificText(node: Node, specificText: string): boolean {
  if (is("text", node)) {
    const textNode = node as Text;
    return textNode.value === specificText;
  }
  return false;
}
