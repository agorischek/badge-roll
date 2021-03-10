import nav from "./tree-navigator";

import test from "./node-tests";
import { after, before, concat } from "./utils";

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

const br = "\n\n";

export const positions: Positions = {
  top: {
    relation: "below",
    findAnchor: (tree) => nav.find(tree, anchors.root),
    affix: (source, badges, anchorLoc, badgesLoc) => {
      if (badgesLoc.end) {
        const tail = after(badgesLoc.end).in(source);
        return concat(badges, tail);
      } else return concat(badges, br, source);
    },
  },
  "below-title": {
    relation: "below",
    findAnchor: (tree) => nav.find(tree, anchors.h1),
    affix: (source, badges, anchorLoc, badgesLoc) => {
      const head = before(anchorLoc.end).in(source);
      const tail = after(badgesLoc.end || anchorLoc.end).in(source);
      return concat(head, br, badges, tail);
    },
  },
  "below-lead": {
    relation: "below",
    findAnchor: (tree) => {
      const h1 = nav.find(tree, anchors.h1);
      const lead = nav.findAfter(h1.parent, h1, "paragraph");
      return lead;
    },
    affix: (source, badges, anchorLoc, badgesLoc) => {
      const head = before(anchorLoc.end).in(source);
      const tail = after(badgesLoc.end || anchorLoc.end).in(source);
      return concat(head, br, badges, tail);
    },
  },
  section: {
    relation: "inside",
    findAnchor: (tree) => nav.select("[class=badges]", tree),
    affix: (source, badges, anchorLoc, badgesLoc) => {
      const head = before(anchorLoc.start).in(source);
      const tail = after(anchorLoc.end).in(source);
      return concat(head, br, badges, tail);
    },
  },
  current: {
    relation: "inside",
    findAnchor: (tree) => nav.find(tree, test.isBadge),
    affix: (source, badges, anchorLoc, badgesLoc) => {
      if (badgesLoc.start === null || badgesLoc.end === null)
        throw new Error(
          "Badge section position was set to `current`, but no badges were found in current target file."
        );
      const head = before(badgesLoc.start).in(source);
      const tail = after(badgesLoc.end).in(source);
      return concat(head, badges, tail);
    },
  },
};
