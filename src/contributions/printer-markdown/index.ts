import unified from "unified";
import stringify from "remark-stringify";
import { Node } from "unist";
import { Badge, BadgeSection, Settings } from "../../types";
import { affixBadgeSection } from "./badge-finder";

export default {
  printers: {
    md: function (
      badgeSection: BadgeSection,
      settings: Settings,
      target?: string
    ): string {
      return affixMarkdown(badgeSection, settings, target);
    },
    markdown: function (
      badgeSection: BadgeSection,
      settings: Settings,
      target?: string
    ): string {
      return affixMarkdown(badgeSection, settings, target);
    },
  },
};

function removeTrailingNewLine(markup: string): string {
  const stringWithOutTrailingNewLine = markup.match(/^(.*)\n$/)[1];
  return stringWithOutTrailingNewLine;
}

function affixMarkdown(
  badgeSection: BadgeSection,
  settings: Settings,
  target?: string
) {
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

function generateMarkdown(node: Node) {
  const generator = unified().use(stringify);
  const generated = generator.stringify(node);
  return generated;
}

function generateBadgeAst(badge: Badge): Node {
  const badgeAst = {
    type: "link",
    url: badge.to,
    title: badge.display,
    children: [
      {
        type: "image",
        url: badge.url,
        alt: badge.display,
      },
    ],
  };
  return badgeAst;
}

function generateBadgeSectionAst(badges: BadgeSection): Node {
  const badgeSectionAst = {
    type: "paragraph",
    children: badges.map((badge) => generateBadgeAst(badge)),
  };
  return badgeSectionAst;
}
