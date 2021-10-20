import nav from "./tree-navigator.js";

import { Location, BadgeFinderState } from "./types/index.js";
import { NodeAnalysis } from "./types/classes/node-analysis.js";

import { Parent, Root } from "mdast";

export function findBadgeSection(
  tree: Root,
  startingNode: Parent,
  separator: string,
  position: string
): Location {
  const starter = nav.find(tree, startingNode);

  if (starter) {
    const state = new BadgeFinderState(starter, starter.parent);

    while (!state.searchComplete) {
      const currentNode = new NodeAnalysis(state.currentNode, separator);
      const nextNode = new NodeAnalysis(state.nextNode, separator);

      if (currentNode.isBadge) state.rememberBadge();

      if (currentNode.isRoot) {
        state.stepDown();
      } else if (
        currentNode.isParagraph &&
        position === "below-lead" &&
        state.paragraphCount === 0
      ) {
        state.countParagraph();
        state.stepForward();
      } else if (currentNode.isParagraph) {
        state.countParagraph();
        state.stepDown();
      } else if (!nextNode.exists) state.complete();
      else if (nextNode.isParagraph) state.stepForward();
      else if (nextNode.isBadge) state.stepForward();
      else if (nextNode.isSpace || nextNode.isSeparator || nextNode.isNewline)
        state.stepForward();
      else state.complete();
    }

    const badgeSectionStart = nav.position(state.firstBadge).start.offset;
    const badgeSectionEnd = nav.position(state.lastBadge).end.offset;

    return {
      start: badgeSectionStart,
      end: badgeSectionEnd,
    };
  } else {
    return null;
  }
}
