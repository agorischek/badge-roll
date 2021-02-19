import unified from "unified";
import markdown from "remark-parse";
import visit from "unist-util-visit-parents";
import remark2rehype from "remark-rehype";
import { Node, Position } from "unist";

const parents = require("unist-util-parents");
const findAfter = require("unist-util-find-after");
const find = require("unist-util-find");
const is = require("unist-util-is");
const position = require("unist-util-position");

import {
  nodeHasExactlyOneChild,
  nodeHasNoGrandchildren,
  nodeIsShieldsImg,
  nodeIsLink,
} from "./badge-tests";

import { getFirstChild } from "./utils";

type badgeFinderState = {
  previousNode: Node;
  currentNode: Node;
  mostRecentBadge: Node;
  lastBadge: Node;
};

type badgeSectionLocation = {
  start: number;
  end: number;
};

function findBadgeSection(doc: string): badgeSectionLocation {
  const processor = unified().use(markdown).use(remark2rehype);
  const tree = processor.parse(doc);
  const treeWithParents = parents(tree);
  const firstBadge = find(treeWithParents, wrappedNodeMatchesPattern);
  const firstBadgeParent = firstBadge.parent;

  const state: badgeFinderState = {
    previousNode: null,
    currentNode: firstBadge,
    mostRecentBadge: firstBadge,
    lastBadge: null,
  };

  while (!state.lastBadge) {
    const nextNode = findAfter(firstBadgeParent, state.currentNode);
    const currentNodeIsBadge = is(state.currentNode, wrappedNodeMatchesPattern);
    const nextNodeIsNewLine = is(nextNode, { type: "text", value: "\n" });
    const nextNodeIsBadge = is(nextNode, wrappedNodeMatchesPattern);
    if (currentNodeIsBadge) {
      state.mostRecentBadge = state.currentNode;
    }
    if (nextNodeIsBadge) {
      state.previousNode = state.currentNode;
      state.currentNode = nextNode;
    } else if (nextNodeIsNewLine) {
      state.previousNode = state.currentNode;
      state.currentNode = nextNode;
    } else {
      state.lastBadge = state.mostRecentBadge;
    }
  }
  const lastBadge = state.lastBadge;
  const badgeSectionStart = position(firstBadge).start.offset;
  const badgeSectionEnd = position(lastBadge).end.offset;
  return {
    start: badgeSectionStart,
    end: badgeSectionEnd,
  };
}

export function affixBadgeSection(doc: string, newBadgeSection: string) {
  const badgeSectionLocation = findBadgeSection(doc);
  const beforeBadges = doc.substring(0, badgeSectionLocation.start);
  const afterBadges = doc.substring(badgeSectionLocation.end);
  const documentWithNewBadges = beforeBadges.concat(
    newBadgeSection,
    afterBadges
  );
  return documentWithNewBadges;
}

type WrappedNode = {
  parent: Node;
  node: Node;
};

function wrappedNodeMatchesPattern(wrappedNode: WrappedNode) {
  const node = wrappedNode.node;
  const matches = nodeMatchesPattern(node);
  return matches;
}

function nodeMatchesPattern(node: Node): boolean {
  const firstChild = getFirstChild(node);

  const isLink: boolean = nodeIsLink(node);
  const hasExactlyOneChild: boolean = nodeHasExactlyOneChild(node);
  const childIsShieldsImg: boolean = nodeIsShieldsImg(firstChild);
  const hasNoGrandChildren: boolean = nodeHasNoGrandchildren(node);

  // const matchesPattern = childIsShieldsImg && isLink && hasExactlyOneChild;
  const matchesPattern = childIsShieldsImg && hasExactlyOneChild;
  return matchesPattern;
}
