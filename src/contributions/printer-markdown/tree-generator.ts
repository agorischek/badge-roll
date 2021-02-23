import { Node } from "unist";

import { isLast } from "../../utilities";

import { Badge } from "../../types";

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

export function generateBadgeSectionAst(
  badges: Array<Badge>,
  separator: string
): Node {
  const separatorAst = {
    type: "text",
    value: separator,
  };

  const badgeReducer = (
    accumulator: Array<Node>,
    badge: Badge,
    index: number,
    badges: Array<Badge>
  ) => {
    const badgeAst = generateBadgeAst(badge);
    if (isLast(index, badges)) {
      return accumulator.concat(badgeAst);
    } else {
      return accumulator.concat([badgeAst, separatorAst]);
    }
  };

  const badgeSectionAst = {
    type: "paragraph",
    children: badges.reduce(badgeReducer, []),
  };
  return badgeSectionAst;
}
