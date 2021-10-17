import { findAfter } from "unist-util-find-after";

import { Node } from "unist";
import { Parent, Content } from "mdast";

import test from "../../node-tests";
import { getFirstChild } from "../../utils";

interface PossibleParent extends Node {
  children?: Content[];
}

export class BadgeFinderState {
  currentParent: Parent;
  previousNode: PossibleParent;
  currentNode: PossibleParent;
  nextNode: PossibleParent;
  mostRecentBadge: Node;
  firstBadge: Node;
  lastBadge: Node;
  paragraphCount: number;
  searchComplete: boolean;
  constructor(starter: PossibleParent, starterParent: Parent) {
    this.previousNode = null;
    this.currentNode = starter;
    this.firstBadge = test.isBadge(starter) ? starter : null;
    this.mostRecentBadge = this.firstBadge;
    this.lastBadge = null;
    this.currentParent = starterParent;
    this.nextNode = starterParent
      ? findAfter(this.currentParent, this.currentNode)
      : null;
    this.searchComplete = false;
    this.paragraphCount = 0;
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
    this.currentParent = this.previousNode.children
      ? (this.previousNode as Parent)
      : null;
    this.currentNode = getFirstChild(this.currentParent);
    this.nextNode = findAfter(this.currentParent, this.currentNode);
  }
  countParagraph(): void {
    this.paragraphCount++;
  }
  complete(): void {
    this.lastBadge = this.mostRecentBadge;
    this.searchComplete = true;
  }
}
