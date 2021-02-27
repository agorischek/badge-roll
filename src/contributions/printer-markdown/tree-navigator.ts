const find = require("unist-util-find");
const findAfter = require("unist-util-find-after");
const findBefore = require("unist-util-find-before");
import is from "unist-util-is";
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
    };
  },
  findAfter,
  findBefore,
  is,
  matches,
  parents,
  position,
  select,
};
