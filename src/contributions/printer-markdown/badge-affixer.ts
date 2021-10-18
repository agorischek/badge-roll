import { unified } from "unified";
import markdown from "remark-parse";

import { Root } from "mdast";

import nav from "./tree-navigator.js";
import { isParent } from "./node-tests.js";
import { findBadgeSection } from "./badge-finder.js";
import { positions } from "./positions.js";
import { PossibleParent } from "./types/interfaces/index.js";

export function affixBadgeSection(
  doc: string,
  newBadgeSection: string,
  separator: string,
  position: string
): string {
  if (!positions[position]) throw new Error(`Unknown position ${position}`);

  const processor = unified().use(markdown);
  const tree: Root = processor.parse(doc);
  const treeWithParents = nav.parents(tree);
  const anchor: PossibleParent =
    positions[position].findAnchor(treeWithParents);

  if (anchor && isParent(anchor)) {
    const badgeSectionLocation = findBadgeSection(
      tree,
      anchor,
      separator,
      position
    );
    const anchorLocation = {
      start: nav.position(anchor).start.offset,
      end: nav.position(anchor).end.offset,
    };

    return positions[position].affix(
      doc,
      newBadgeSection,
      anchorLocation,
      badgeSectionLocation
    );
  } else {
    throw new Error("Couldn't find anchor in target file");
  }
}
