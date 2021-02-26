import { Node } from "unist";
import nav from "../../tree-navigator";
import test from "../../node-tests";

export class NodeAnalysis {
  exists: boolean;
  isParagraph: boolean;
  isSpace: boolean;
  isNewline: boolean;
  isSeparator: boolean;
  isBadge: boolean;
  constructor(node: Node, separator: string) {
    (this.exists = node ? true : false),
      (this.isParagraph = nav.is(node, "paragraph")),
      (this.isSpace = test.isSpace(node)),
      (this.isNewline = test.isNewline(node)),
      (this.isSeparator = test.isSpecificText(node, separator)),
      (this.isBadge = test.isBadge(node));
  }
}
