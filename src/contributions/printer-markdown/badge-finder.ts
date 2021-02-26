const find = require("unist-util-find");
const position = require("unist-util-position");

import { BadgeSectionLocation, BadgeFinderState } from "./types";
import { NodeAnalysis } from "./types/classes/node-analysis";

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
      const currentNode = new NodeAnalysis(state.currentNode, separator);
      const nextNode = new NodeAnalysis(state.nextNode, separator);

      if (currentNode.isBadge) state.rememberBadge();

      if (currentNode.isParagraph) state.stepDown();
      else if (!nextNode.exists) state.complete();
      else if (nextNode.isParagraph) state.stepForward();
      else if (nextNode.isBadge) state.stepForward();
      else if (nextNode.isSpace || nextNode.isSeparator || nextNode.isNewline)
        state.stepForward();
      else state.complete();
    }

    const badgeSectionStart = position(state.firstBadge).start.offset;
    const badgeSectionEnd = position(state.lastBadge).end.offset;

    return {
      start: badgeSectionStart,
      end: badgeSectionEnd,
    };
  } else {
    return null;
  }
}
