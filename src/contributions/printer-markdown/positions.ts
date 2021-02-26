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
      const tail = after(badgesLoc.end | 0, source);
      return concat(badges, br, tail);
    },
  },
  "above-title": {
    relation: "above",
    findAnchor: (tree) => nav.find(tree, anchors.h1),
    affix: (source, badges, anchorLoc, badgesLoc) => "Placeholder",
  },
  "below-title": {
    relation: "below",
    findAnchor: (tree) => nav.find(tree, anchors.h1),
    affix: (source, badges, anchorLoc, badgesLoc) => {
      const head = before(anchorLoc.end, source);
      const tail = after(badgesLoc.end | anchorLoc.end, source);
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
      const head = before(anchorLoc.end, source);
      const tail = after(badgesLoc.end | anchorLoc.end, source);
      return concat(head, br, badges, tail);
    },
  },
  "below-intro": {
    relation: "above",
    findAnchor: (tree) => {
      const h2 = nav.find(tree, anchors.h2);
      const introEnd = nav.findBefore(h2.parent, h2, "paragraph");
      return introEnd;
    },
    affix: (source, badges, anchorLoc, badgesLoc) => "Placeholder",
  },
  section: {
    relation: "inside",
    findAnchor: (tree) => nav.position(nav.select("[class=badges]", tree)),
    affix: (source, badges, anchorLoc, badgesLoc) => "Placeholder",
  },
  current: {
    relation: "inside",
    findAnchor: (tree) => nav.find(tree, test.isBadge),
    affix: (source, badges, anchorLoc, badgesLoc) => {
      if (!badgesLoc.start)
        throw new Error(
          "Badge section position was set to `current`, but no badges were found in current target file."
        );
      const head = source.substring(0, anchorLoc.end);
      const tail = source.substring(badgesLoc.end | anchorLoc.end);
      return concat(head, br, badges, tail);
    },
  },
};
