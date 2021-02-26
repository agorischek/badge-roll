import unified from "unified";
import markdown from "remark-parse";
const parents = require("unist-util-parents");
const find = require("unist-util-find");
const is = require("unist-util-is");
const position = require("unist-util-position");

import { badgePatternTest, nodeMatchesPattern } from "./badge-tester";

import { BadgeSectionLocation, BadgeFinderState } from "./types";

import { Node } from "unist";

export function findBadgeSection(
  tree: Node,
  startingNode: Node,
  separator: string
): BadgeSectionLocation {
  const starter = find(tree, startingNode);

  if (starter) {
    const state = new BadgeFinderState(starter, starter.parent);

    while (!state.searchComplete) {
      const currentNodeIsBadge = nodeMatchesPattern(state.currentNode);
      const currentNodeIsParagraph = is(state.currentNode, "paragraph");
      const nextNodeIsParagraph = is(state.nextNode, "paragraph");
      const nextNodeExists = state.nextNode ? true : false;
      const nextNodeIsSpace = nextNodeExists
        ? is(state.nextNode, {
            type: "text",
            value: " ",
          })
        : false;
      const nextNodeIsNewline = nextNodeExists
        ? is(state.nextNode, {
            type: "text",
            value: "\n",
          })
        : false;
      const nextNodeIsSeparator = nextNodeExists
        ? is(state.nextNode, {
            type: "text",
            value: separator,
          })
        : false;
      const nextNodeIsBadge = nextNodeExists
        ? nodeMatchesPattern(state.nextNode)
        : false;

      if (currentNodeIsBadge) {
        state.rememberBadge();
      }
      if (currentNodeIsParagraph) {
        state.stepDown();
      } else if (!nextNodeExists) {
        state.complete();
      } else if (nextNodeIsParagraph) {
        state.stepForward();
      } else if (
        nextNodeIsBadge ||
        nextNodeIsSpace ||
        nextNodeIsSeparator ||
        nextNodeIsNewline
      ) {
        state.stepForward();
      } else {
        state.complete();
      }
    }

    const firstBadge = state.firstBadge;
    const lastBadge = state.lastBadge;
    const badgeSectionStart = position(firstBadge).start.offset;
    const badgeSectionEnd = position(lastBadge).end.offset;

    return {
      start: badgeSectionStart,
      end: badgeSectionEnd,
    };
  } else {
    return null;
  }
}
