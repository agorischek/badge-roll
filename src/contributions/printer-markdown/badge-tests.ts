import select from "unist-util-select";
import { Node, Position } from "unist";
import is from "unist-util-is";

import { getFirstGrandchildren } from "./utils";

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
