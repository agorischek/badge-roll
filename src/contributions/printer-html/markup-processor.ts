import { unified } from "unified";
import rehypeStringify from "rehype-stringify";

import { Root } from "hast";

import { removeTrailingNewLine } from "./utils.js";
import { generateBadgeSectionAst } from "./tree-generator.js";
import { separators } from "./separators.js";
import { affixBadgeSection } from "./badge-affixer.js";

import { Badge, Settings } from "../../types/index.js";

export function processHtml(
  badgeSection: Array<Badge>,
  settings: Settings,
  target?: string
): string {
  const separator = separators[settings.separator];
  const badgeSectionAst = generateBadgeSectionAst(badgeSection, separator);
  const markupWithNewLine = generateHtml(badgeSectionAst);
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

function generateHtml(node: Root): string {
  const generator = unified().use(rehypeStringify as any);
  const generated = generator.stringify(node);
  return String(generated);
}
