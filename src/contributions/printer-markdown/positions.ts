import nav from "./tree-navigator";

import test from "./node-tests";

import { Positions } from "./types";

const anchors = {
  h1: {
    type: "heading",
    depth: 1,
  },
  h2: {
    type: "heading",
    depth: 2,
  },
  root: {
    type: "root",
  },
};

export const positions: Positions = {
  top: {
    relation: "below",
    findAnchor: (tree) => nav.find(tree, anchors.root),
    affix: (doc, badges, badgeSectionLocation) => "Placeholder",
  },
  "above-title": {
    relation: "above",
    findAnchor: (tree) => nav.find(tree, anchors.h1),
    affix: (doc, badges, badgeSectionLocation) => "Placeholder",
  },
  "below-title": {
    relation: "below",
    findAnchor: (tree) => nav.find(tree, anchors.h1),
    affix: (doc, badges, badgeSectionLocation) => {
      const beforeBadges = doc.substring(0, badgeSectionLocation.start);
      const afterBadges = doc.substring(badgeSectionLocation.end);
      const modifiedDoc = beforeBadges.concat(badges, afterBadges);
      return modifiedDoc;
    },
  },
  "below-lead": {
    relation: "below",
    findAnchor: (tree) => {
      const h1 = nav.find(tree, anchors.h1);
      const lead = nav.findAfter(h1.parent, h1, "paragraph");
      return lead;
    },
    affix: (doc, badges, badgeSectionLocation) => "Placeholder",
  },
  "below-intro": {
    relation: "above",
    findAnchor: (tree) => {
      const h2 = nav.find(tree, anchors.h2);
      const introEnd = nav.findBefore(h2.parent, h2, "paragraph");
      return introEnd;
    },
    affix: (doc, badges, badgeSectionLocation) => "Placeholder",
  },
  section: {
    relation: "inside",
    findAnchor: (tree) => nav.position(nav.select("[class=badges]", tree)),
    affix: (doc, badges, badgeSectionLocation) => "Placeholder",
  },
  current: {
    relation: "inside",
    findAnchor: (tree) => nav.find(tree, test.isBadge),
    affix: (doc, badges, badgeSectionLocation) => {
      if (badgeSectionLocation) {
        const beforeBadges = doc.substring(0, badgeSectionLocation.start);
        const afterBadges = doc.substring(badgeSectionLocation.end);
        const modifiedDoc = beforeBadges.concat(badges, afterBadges);
        return modifiedDoc;
      } else {
        throw new Error(
          "Badge section position was set to `current`, but no badges were found in current target file."
        );
      }
    },
  },
};
