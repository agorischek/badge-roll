import { is } from "unist-util-is";

import { Node } from "unist";
import { Parent } from "mdast";

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
  if (!node) return false;
  if (isParent(node)) {
    const firstChild = getFirstChild(node);

    if (!hasExactlyOneChild(node)) return false;
    if (isBadgeImg(firstChild)) return true;
    if (isLink(firstChild) && isParent(firstChild))
      return (
        hasExactlyOneChild(firstChild) && isBadgeImg(getFirstChild(firstChild))
      );
  }

  return false;
}

export function hasExactlyOneChild(node: Parent): boolean {
  return node && node.children ? [].concat(node.children).length === 1 : null;
}

export function hasNoGrandchildren(node: Parent): boolean {
  return node ? getFirstGrandchildren(node).length === 0 : null;
}

function isProviderImage(node: Node, providerUrl: string): boolean {
  const image = node as Node & { url?: string; children?: unknown[] };
  return (
    is(node, "image") &&
    typeof image.url === "string" &&
    image.url.startsWith(providerUrl) &&
    (!image.children || image.children.length === 0)
  );
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
  return node ? isProviderImage(node, "https://img.shields.io") : null;
}
export function isAzureDevopsImg(node: Node): boolean {
  return node ? isProviderImage(node, "https://dev.azure.com/") : null;
}

export function isGithubImg(node: Node): boolean {
  return node ? isProviderImage(node, "https://github.com") : null;
}

export function isGitterImg(node: Node): boolean {
  return node ? isProviderImage(node, "https://badges.gitter.im") : null;
}

export function isAppveyorImg(node: Node): boolean {
  return node ? isProviderImage(node, "https://ci.appveyor.com/api") : null;
}

export function isLink(node: Node): boolean {
  return node ? is(node, "link") : null;
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
