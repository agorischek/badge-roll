import { unified } from "unified";
import stringify from "remark-stringify";

import { Node } from "unist";

import { removeTrailingNewLine } from "./utils";
import { generateBadgeSectionAst } from "./tree-generator";
import { separators } from "./separators";
import { affixBadgeSection } from "./badge-affixer";

import { Badge, Settings } from "../../types";

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

function generateMarkdown(node: Node) {
  const generator = unified().use(stringify);
  const generated = generator.stringify(node);
  return generated;
}
