import unified from "unified";
import stringify from "remark-stringify";

import { Node } from "unist";

import { removeTrailingNewLine } from "./utils";
import { generateBadgeSectionAst } from "./tree-generator";
import { findBadgeSection } from "./badge-finder";
import { separators } from "./separators";

import { Badge, Settings } from "../../types";

export function affixMarkdown(
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
  // current, top, above-title, end-of-title, below-title, below-lead, below-intro, section, auto
  const badgeSectionLocation = findBadgeSection(doc, separator);
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
