const find = require("unist-util-find");
const findAfter = require("unist-util-find-after");
const findBefore = require("unist-util-find-before");
import is, { TestFunction } from "unist-util-is";
const parents = require("unist-util-parents");
const position = require("unist-util-position");
import { select, matches } from "unist-util-select";
import { Node } from "unist";

export default {
  find: (test: unknown) => {
    return {
      in: (tree: Node) => {
        return find(tree, test);
      },
      after: (anchor: Node) => {
        return {
          in: (tree: Node) => {
            return findAfter(tree, anchor, test);
          },
        };
      },
      before: (anchor: Node) => {
        return {
          in: (tree: Node) => {
            return findBefore(tree, anchor, test);
          },
        };
      },
    };
  },
  test: (node: Node) => {
    return {
      is: (test: string | any[] | Partial<Node> | TestFunction<Node>) => {
        return is(node, test);
      },
    };
  },
  matches,
  parents,
  position,
  select,
};
