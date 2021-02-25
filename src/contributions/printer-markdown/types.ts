const findAfter = require("unist-util-find-after");

import { nodeMatchesPattern } from "./badge-tester";

import { Node } from "unist";

export type WrappedNode = {
  parent: Node;
  node: Node;
};

export type Separators = {
  [id: string]: string;
};

export class BadgeFinderState {
  starterParent: Node;
  previousNode: Node;
  currentNode: Node;
  nextNode: Node;
  mostRecentBadge: Node;
  firstBadge: Node;
  lastBadge: Node;
  constructor(starter: Node, starterParent: Node) {
    this.previousNode = null;
    this.firstBadge = nodeMatchesPattern(starter) ? starter : null;
    this.currentNode = starter;
    this.mostRecentBadge = this.firstBadge;
    this.lastBadge = null;
    this.starterParent = starterParent;
    this.nextNode = findAfter(this.starterParent, this.currentNode);
  }
  remember(): void {
    this.mostRecentBadge = this.currentNode;
  }
  step(): void {
    this.previousNode = this.currentNode;
    this.currentNode = this.nextNode;
    this.nextNode = findAfter(this.starterParent, this.currentNode);
  }
  complete(): void {
    this.lastBadge = this.mostRecentBadge;
  }
}

export type BadgeSectionLocation = {
  start: number;
  end: number;
};
