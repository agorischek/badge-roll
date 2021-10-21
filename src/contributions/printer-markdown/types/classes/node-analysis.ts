import { is } from "unist-util-is";
import { Node } from "unist";

import test from "../../node-tests.js";

export class NodeAnalysis {
  exists: boolean;
  isParagraph: boolean;
  isSpace: boolean;
  isNewline: boolean;
  isSeparator: boolean;
  isBadge: boolean;
  isRoot: boolean;
  isParent: boolean;
  constructor(node: Node, separator?: string) {
    this.exists = Boolean(node);
    this.isParagraph = is(node, "paragraph");
    this.isSpace = test.isSpace(node);
    this.isNewline = test.isNewline(node);
    this.isSeparator = test.isSpecificText(node, separator);
    this.isBadge = test.isBadge(node);
    this.isRoot = test.isRoot(node);
    this.isParent = test.isParent(node);
  }
}
