const findAfter = require("unist-util-find-after");

export type WrappedNode = {
  parent: Node;
  node: Node;
};

export class badgeFinderState {
  firstBadgeParent: Node;
  previousNode: Node;
  currentNode: Node;
  nextNode: Node;
  mostRecentBadge: Node;
  lastBadge: Node;
  constructor(firstBadge: Node, firstBadgeParent: Node) {
    this.previousNode = null;
    this.currentNode = firstBadge;
    this.mostRecentBadge = firstBadge;
    this.lastBadge = null;
    this.firstBadgeParent = firstBadgeParent;
    this.nextNode = findAfter(this.firstBadgeParent, this.currentNode);
  }
  remember() {
    this.mostRecentBadge = this.currentNode;
  }
  step() {
    this.previousNode = this.currentNode;
    this.currentNode = this.nextNode;
    this.nextNode = findAfter(this.firstBadgeParent, this.currentNode);
  }
  complete() {
    this.lastBadge = this.mostRecentBadge;
  }
}

export type badgeSectionLocation = {
  start: number;
  end: number;
};
