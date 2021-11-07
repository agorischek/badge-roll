import { unified } from "unified";
import stringify from "remark-stringify";

import { Root } from "mdast";

import { removeTrailingNewLine } from "./utils.js";
import { generateBadgeSectionAst } from "./tree-generator.js";
import { separators } from "./separators.js";
import { affixBadgeSection } from "./badge-affixer.js";

import { Badge, Settings } from "../../types/index.js";

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

function generateMarkdown(node: Root) {
  const generator = unified().use(stringify);
  const generated = generator.stringify(node);
  return generated;
}
