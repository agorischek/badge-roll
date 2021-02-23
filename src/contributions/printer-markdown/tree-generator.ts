import { Node } from "unist";

import { Badge, BadgeSection } from "../../types";

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

export function generateBadgeSectionAst(badges: Array<Badge>): Node {
  const badgeSectionAst = {
    type: "paragraph",
    children: badges.map((badge) => generateBadgeAst(badge)),
  };
  return badgeSectionAst;
}
