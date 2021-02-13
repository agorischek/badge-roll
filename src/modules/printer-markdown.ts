import unified from "unified";
import stringify from "remark-stringify";
import { Node } from "unist";
import { Badge, BadgeSection, Settings } from "../declarations";

export default {
  printers: {
    markdown: function (
      badgeSection: BadgeSection,
      settings: Settings,
      target?: string
    ) {
      if (settings.printer === "markdown") {
        const badgeSectionAst = generateBadgeSectionAst(badgeSection);
        const markup = generateMarkdown(badgeSectionAst);
        if (target) {
          const modifiedTarget = `${markup}\n${target}`;
          return modifiedTarget;
        } else {
          return markup;
        }
      } else {
        throw new Error("Unsupported markup language");
      }
    },
  },
};

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
