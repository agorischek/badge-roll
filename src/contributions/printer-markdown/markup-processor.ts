import unified from "unified";
import stringify from "remark-stringify";
import markdown from "remark-parse";
const parents = require("unist-util-parents");

import { Node } from "unist";

import { removeTrailingNewLine } from "./utils";
import { generateBadgeSectionAst } from "./tree-generator";
import { findBadgeSection } from "./badge-finder";
import { separators } from "./separators";
import { positions } from "./positions";

import { Badge, Settings } from "../../types";
import { BadgeSectionLocation } from "./types";

export function processMarkdown(
  badgeSection: Array<Badge>,
  settings: Settings,
  target?: string
): string {
  const separator = separators[settings.separator];
  const badgeSectionAst = generateBadgeSectionAst(badgeSection, separator);
  const markupWithNewLine = generateMarkdown(badgeSectionAst);
  const markup = removeTrailingNewLine(markupWithNewLine);
  if (target) {
    const modifiedTarget = affixBadgeSection(
      target,
      markup,
      separator,
      settings.position
    );
    return modifiedTarget;
  } else {
    return markup;
  }
}

export function affixBadgeSection(
  doc: string,
  newBadgeSection: string,
  separator: string,
  position: string
): string {
  if (!positions[position]) throw new Error(`Unknown position ${position}`);

  const processor = unified().use(markdown);
  const tree = parents(processor.parse(doc));
  const anchor: Node = positions[position].findAnchor(tree);
  if (!anchor) throw new Error("Couldn't find anchor in target file");

  const badgeSectionLocation: BadgeSectionLocation = findBadgeSection(
    tree,
    anchor,
    separator
  );

  let modifiedDoc: string;
  let beforeBadges: string;
  let afterBadges: string;

  switch (position) {
    case "current":
      if (badgeSectionLocation) {
        beforeBadges = doc.substring(0, badgeSectionLocation.start);
        afterBadges = doc.substring(badgeSectionLocation.end);
        modifiedDoc = beforeBadges.concat(newBadgeSection, afterBadges);
      } else {
        throw new Error(
          "Badge section position was set to `current`, but no badges were found in current target file."
        );
      }
    default:
      if (badgeSectionLocation) {
        beforeBadges = doc.substring(0, badgeSectionLocation.start);
        afterBadges = doc.substring(badgeSectionLocation.end);
        modifiedDoc = beforeBadges.concat(newBadgeSection, afterBadges);
      } else {
        throw new Error(
          "Badge section position was set to `current`, but no badges were found in current target file."
        );
      }
  }

  return modifiedDoc;
}

function generateMarkdown(node: Node) {
  const generator = unified().use(stringify);
  const generated = generator.stringify(node);
  return generated;
}
