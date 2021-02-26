import unified from "unified";
import stringify from "remark-stringify";
import markdown from "remark-parse";
import { select } from "unist-util-select";
const parents = require("unist-util-parents");
const find = require("unist-util-find");
const findAfter = require("unist-util-find-after");
const findBefore = require("unist-util-find-before");
const position = require("unist-util-position");

import { Node, Position } from "unist";

import { removeTrailingNewLine } from "./utils";
import { generateBadgeSectionAst } from "./tree-generator";
import { findBadgeSection } from "./badge-finder";
import { separators } from "./separators";
import { badgePatternTest } from "./badge-tester";

import { Badge, Settings } from "../../types";
import { BadgeSectionLocation } from "./types";

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

const anchors = {
  h1: {
    type: "heading",
    depth: 1,
  },
  h2: {
    type: "heading",
    depth: 2,
  },
};

type Positions = {
  [position: string]: {
    relation: string;
    findAnchor: (node: Node) => Node;
  };
};

const positions: Positions = {
  top: {
    relation: "below",
    findAnchor: (tree) => find(tree, "root"),
  },
  "above-title": {
    relation: "above",
    findAnchor: (tree) => find(tree, anchors.h1),
  },
  "below-title": {
    relation: "below",
    findAnchor: (tree) => find(tree, anchors.h1),
  },
  "below-lead": {
    relation: "below",
    findAnchor: (tree) => {
      const h1 = find(tree, anchors.h1);
      const lead = findAfter(h1.parent, h1, "paragraph");
      return lead;
    },
  },
  "below-intro": {
    relation: "above",
    findAnchor: (tree) => {
      const h2 = find(tree, anchors.h2);
      const introEnd = findBefore(h2.parent, h2, "paragraph");
      return introEnd;
    },
  },
  section: {
    relation: "inside",
    findAnchor: (tree) => position(select("[class=badges]", tree)),
  },
  current: {
    relation: "inside",
    findAnchor: (tree) => find(tree, badgePatternTest),
  },
};

// current, top, above-title, end-of-title, below-title, below-lead, below-intro, section, auto

export function affixBadgeSection(
  doc: string,
  newBadgeSection: string,
  separator: string,
  position: string
): string {
  if (!positions[position]) throw new Error(`Unknown position ${position}`);

  const processor = unified().use(markdown);
  const tree = parents(processor.parse(doc));
  const anchor: Node = positions[position].findAnchor(tree);

  const badgeSectionLocation: BadgeSectionLocation = findBadgeSection(
    tree,
    anchor,
    separator
  );

  // current, top, above-title, end-of-title, below-title, below-lead, below-intro, section, auto
  let modifiedDoc: string;
  let beforeBadges: string;
  let afterBadges: string;

  switch (position) {
    case "current":
      if (badgeSectionLocation) {
        beforeBadges = doc.substring(0, badgeSectionLocation.start);
        afterBadges = doc.substring(badgeSectionLocation.end);
        modifiedDoc = beforeBadges.concat(newBadgeSection, afterBadges);
      } else {
        throw new Error(
          "Badge section position was set to `current`, but no badges were found in current target file."
        );
      }
    default:
      if (badgeSectionLocation) {
        beforeBadges = doc.substring(0, badgeSectionLocation.start);
        afterBadges = doc.substring(badgeSectionLocation.end);
        modifiedDoc = beforeBadges.concat(newBadgeSection, afterBadges);
      } else {
        throw new Error(
          "Badge section position was set to `current`, but no badges were found in current target file."
        );
      }
  }

  return modifiedDoc;
}

function generateMarkdown(node: Node) {
  const generator = unified().use(stringify);
  const generated = generator.stringify(node);
  return generated;
}
