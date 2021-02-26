const findAfter = require("unist-util-find-after");

import { Node } from "unist";

import test from "../../node-tests";
import { getFirstChild } from "../../utils";

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
    this.firstBadge = test.isBadge(starter) ? starter : null;
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
