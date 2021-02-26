import { select } from "unist-util-select";
const find = require("unist-util-find");
const findAfter = require("unist-util-find-after");
const findBefore = require("unist-util-find-before");
const position = require("unist-util-position");

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
    findAnchor: (tree) => find(tree, anchors.root),
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
    findAnchor: (tree) => find(tree, test.isBadge),
  },
};
