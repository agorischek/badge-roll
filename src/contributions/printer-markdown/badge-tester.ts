import select from "unist-util-select";
import is from "unist-util-is";

import { Node } from "unist";

import { getFirstChild, getFirstGrandchildren } from "./utils";

import { WrappedNode } from "./types";

export function badgePatternTest(wrappedNode: WrappedNode): boolean {
  const node = (wrappedNode.node as unknown) as Node;
  const matches = nodeMatchesPattern(node);
  return matches;
}

export function nodeMatchesPattern(node: Node): boolean {
  const firstChild = getFirstChild(node);

  const isLink: boolean = nodeIsLink(node);
  const hasExactlyOneChild: boolean = nodeHasExactlyOneChild(node);
  const childIsShieldsImg: boolean = nodeIsShieldsImg(firstChild);
  const hasNoGrandChildren: boolean = nodeHasNoGrandchildren(node);

  const matchesPattern = childIsShieldsImg && hasExactlyOneChild;
  return matchesPattern;
}

export function nodeHasExactlyOneChild(node: Node): boolean {
  const children: Array<Node> = [].concat(node.children);
  return children && children.length === 1;
}

export function nodeHasNoGrandchildren(node: Node): boolean {
  const grandchildren = getFirstGrandchildren(node);
  const hasNoGrandchildren = grandchildren.length === 0;

  return hasNoGrandchildren;
}

export function nodeIsShieldsImg(node: Node): boolean {
  const nodeIsShieldsImg = select.matches(
    "image[url^=https://img.shields.io]:empty",
    node
  );
  return nodeIsShieldsImg;
}

export function nodeIsLink(node: Node): boolean {
  const isLink = is("link", node);
  return isLink;
}
