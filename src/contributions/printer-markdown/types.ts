const findAfter = require("unist-util-find-after");
const is = require("unist-util-is");

import { getFirstChild } from "./utils";

import { Node } from "unist";

import {
  badgePatternTest,
  nodeMatchesPattern,
  nodeIsSpace,
  nodeIsNewline,
  nodeIsSpecificText,
} from "./badge-tester";

export type Positions = {
  [position: string]: {
    relation: string;
    findAnchor: (node: Node) => Node;
  };
};

export class NodeAnalysis {
  exists: boolean;
  isParagraph: boolean;
  isSpace: boolean;
  isNewline: boolean;
  isSeparator: boolean;
  isBadge: boolean;
  constructor(node: Node, separator: string) {
    (this.exists = node ? true : false),
      (this.isParagraph = is(node, "paragraph")),
      (this.isSpace = nodeIsSpace(node)),
      (this.isNewline = nodeIsNewline(node)),
      (this.isSeparator = nodeIsSpecificText(node, separator)),
      (this.isBadge = nodeMatchesPattern(node));
  }
}

export type WrappedNode = {
  parent: Node;
  node: Node;
};

export type Separators = {
  [id: string]: string;
};

export class BadgeFinderState {
  currentParent: Node;
  previousNode: Node;
  currentNode: Node;
  nextNode: Node;
  mostRecentBadge: Node;
  firstBadge: Node;
  lastBadge: Node;
  searchComplete: boolean;
  constructor(starter: Node, starterParent: Node) {
    this.previousNode = null;
    this.currentNode = starter;
    this.firstBadge = nodeMatchesPattern(starter) ? starter : null;
    this.mostRecentBadge = this.firstBadge;
    this.lastBadge = null;
    this.currentParent = starterParent;
    this.nextNode = findAfter(this.currentParent, this.currentNode);
    this.searchComplete = false;
  }
  rememberBadge(): void {
    if (this.firstBadge === null) {
      this.firstBadge = this.currentNode;
    }
    this.mostRecentBadge = this.currentNode;
  }
  stepForward(): void {
    this.previousNode = this.currentNode;
    this.currentNode = this.nextNode;
    this.nextNode = findAfter(this.currentParent, this.currentNode);
  }
  stepDown(): void {
    this.previousNode = this.currentNode;
    this.currentParent = this.previousNode;
    this.currentNode = getFirstChild(this.currentParent);
    this.nextNode = findAfter(this.currentParent, this.currentNode);
  }
  complete(): void {
    this.lastBadge = this.mostRecentBadge;
    this.searchComplete = true;
  }
}

export type BadgeSectionLocation = {
  start: number;
  end: number;
};
