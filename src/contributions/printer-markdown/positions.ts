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
    findAnchor: (tree) => nav.find(anchors.root).in(tree),
    affix: (source, badges, anchorLoc, badgesLoc) => {
      const tail = after(badgesLoc.end || 0).in(source);
      return concat(badges, br, tail);
    },
  },
  "above-title": {
    relation: "above",
    findAnchor: (tree) => nav.find(anchors.h1).in(tree),
    affix: (source, badges, anchorLoc, badgesLoc) => "Placeholder",
  },
  "below-title": {
    relation: "below",
    findAnchor: (tree) => nav.find(anchors.h1).in(tree),
    affix: (source, badges, anchorLoc, badgesLoc) => {
      const head = before(anchorLoc.end).in(source);
      const tail = after(badgesLoc.end || anchorLoc.end).in(source);
      return concat(head, br, badges, tail);
    },
  },
  "below-lead": {
    relation: "below",
    findAnchor: (tree) => {
      const h1 = nav.find(anchors.h1).in(tree);
      const lead = nav.find("paragraph").after(h1).in(h1.parent);

      return lead;
    },
    affix: (source, badges, anchorLoc, badgesLoc) => {
      const head = before(anchorLoc.end).in(source);
      const tail = after(badgesLoc.end || anchorLoc.end).in(source);
      return concat(head, br, badges, tail);
    },
  },
  "below-intro": {
    relation: "above",
    findAnchor: (tree) => {
      const h2 = nav.find(anchors.h2).in(tree);
      const introEnd = nav.find("paragraph").after(h2).in(h2.parent);
      return introEnd;
    },
    affix: (source, badges, anchorLoc, badgesLoc) => "Placeholder",
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
    findAnchor: (tree) => nav.find(test.isBadge).in(tree),
    affix: (source, badges, anchorLoc, badgesLoc) => {
      if (!badgesLoc.start)
        throw new Error(
          "Badge section position was set to `current`, but no badges were found in current target file."
        );
      const head = before(anchorLoc.end).in(source);
      const tail = after(badgesLoc.end | anchorLoc.end).in(source);
      return concat(head, br, badges, tail);
    },
  },
};
