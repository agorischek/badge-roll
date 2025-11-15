import { Root, Element, Text } from "hast";

import { isLast } from "../../utilities/index.js";

import { Badge } from "../../types/index.js";

function generateBadgeAst(badge: Badge): Element {
  const badgeAst: Element = {
    type: "element",
    tagName: "a",
    properties: {
      href: badge.to,
      title: badge.display,
    },
    children: [
      {
        type: "element",
        tagName: "img",
        properties: {
          src: badge.url,
          alt: badge.display,
        },
        children: [],
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
    accumulator: Array<Element | Text>,
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

  const separatorAst: Text = {
    type: "text",
    value: separator,
  };

  const badgesAst: Array<Element | Text> = badges.reduce(badgeReducer, []);

  const badgesParagraphAst: Element = {
    type: "element",
    tagName: "p",
    properties: {},
    children: badgesAst,
  };

  const badgeSectionAst: Root = {
    type: "root",
    children: [badgesParagraphAst],
  };

  return badgeSectionAst;
}
