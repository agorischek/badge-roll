import unified from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";
const parents = require("unist-util-parents");
const find = require("unist-util-find");
const is = require("unist-util-is");
const position = require("unist-util-position");

import { wrappedNodeMatchesPattern } from "./badge-tester";

import { badgeSectionLocation, badgeFinderState } from "./types";

export function findBadgeSection(doc: string): badgeSectionLocation {
  const processor = unified().use(markdown).use(remark2rehype);
  const tree = processor.parse(doc);
  const treeWithParents = parents(tree);
  const firstBadge = find(treeWithParents, wrappedNodeMatchesPattern);
  const firstBadgeParent = firstBadge.parent;

  let state = new badgeFinderState(firstBadge, firstBadgeParent);

  while (!state.lastBadge) {
    const currentNodeIsBadge = is(state.currentNode, wrappedNodeMatchesPattern);
    const nextNodeIsNewLine = is(state.nextNode, { type: "text", value: "\n" });
    const nextNodeIsBadge = is(state.nextNode, wrappedNodeMatchesPattern);
    if (currentNodeIsBadge) {
      state.remember();
    }
    if (nextNodeIsBadge) {
      state.step();
    } else if (nextNodeIsNewLine) {
      state.step();
    } else {
      state.complete();
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
