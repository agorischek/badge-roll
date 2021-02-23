import unified from "unified";
import stringify from "remark-stringify";

import { Node } from "unist";

import { removeTrailingNewLine } from "./utils";
import { generateBadgeSectionAst } from "./tree-generator";
import { findBadgeSection } from "./badge-finder";

import { Badge, Settings } from "../../types";

export function affixMarkdown(
  badgeSection: Array<Badge>,
  settings: Settings,
  target?: string
): string {
  const badgeSectionAst = generateBadgeSectionAst(badgeSection);
  const markupWithNewLine = generateMarkdown(badgeSectionAst);
  const markup = removeTrailingNewLine(markupWithNewLine);
  if (target) {
    const modifiedTarget = affixBadgeSection(target, markup);
    return modifiedTarget;
  } else {
    return markup;
  }
}

export function affixBadgeSection(
  doc: string,
  newBadgeSection: string
): string {
  const badgeSectionLocation = findBadgeSection(doc);
  const beforeBadges = doc.substring(0, badgeSectionLocation.start);
  const afterBadges = doc.substring(badgeSectionLocation.end);
  const documentWithNewBadges = beforeBadges.concat(
    newBadgeSection,
    afterBadges
  );
  return documentWithNewBadges;
}

function generateMarkdown(node: Node) {
  const generator = unified().use(stringify);
  const generated = generator.stringify(node);
  return generated;
}
