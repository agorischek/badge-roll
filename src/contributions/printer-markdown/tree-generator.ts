import { Paragraph, PhrasingContent, Root } from "mdast";

import { isLast } from "../../utilities/index.js";

import { Badge } from "../../types/index.js";

function generateBadgeAst(badge: Badge): PhrasingContent {
  const badgeAst = {
    type: "link" as const,
    url: badge.to,
    title: badge.display,
    children: [
      {
        type: "image" as const,
        url: badge.url,
        alt: badge.display,
      },
    ],
  };
  return badgeAst;
}

export function generateBadgeSectionAst(
  badges: Badge[],
  separator: string
): Root {
  const badgeReducer = (
    accumulator: PhrasingContent[],
    badge: Badge,
    index: number,
    badges: Badge[]
  ) => {
    const badgeAst = generateBadgeAst(badge);
    if (isLast(index, badges)) {
      return accumulator.concat(badgeAst);
    } else {
      return accumulator.concat([badgeAst, separatorAst]);
    }
  };

  const separatorAst: PhrasingContent = {
    type: "text" as const,
    value: separator,
  };

  const badgesAst: PhrasingContent[] = badges.reduce(badgeReducer, []);

  const badgesParagraphAst: Paragraph = {
    type: "paragraph" as const,
    children: badgesAst,
  };

  const badgeSectionAst = {
    type: "root" as const,
    children: [badgesParagraphAst],
  };

  return badgeSectionAst;
}
