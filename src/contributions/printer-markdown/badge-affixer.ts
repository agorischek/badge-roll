import { unified } from "unified";
import markdown from "remark-parse";

import nav from "./tree-navigator";

import { Node } from "unist";
import { Parent, Root } from "mdast";

import { findBadgeSection } from "./badge-finder";
import { positions } from "./positions";

export function affixBadgeSection(
  doc: string,
  newBadgeSection: string,
  separator: string,
  position: string
): string {
  if (!positions[position]) throw new Error(`Unknown position ${position}`);

  const processor = unified().use(markdown);
  const tree: Root = nav.parents(processor.parse(doc));
  const anchor: Node = positions[position].findAnchor(tree);

  if (!anchor) throw new Error("Couldn't find anchor in target file");

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
}
