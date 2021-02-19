import unified from "unified";
import markdown from "remark-parse";
import select from "unist-util-select";
import visit from "unist-util-visit-parents";
import is from "unist-util-is";
import remark2rehype from "remark-rehype";
import { Node, Position } from "unist";
import { loadTarget } from "./loaders";
import { writeFile } from "./utilities";

const processor = unified().use(markdown).use(remark2rehype);

const doc = loadTarget("./README.md").content;

const newBadge =
  '[![heyy](https://img.shields.io/npm/v//badge-roll)](/https://www.npmjs.com/package/badge-roll "Version")';
// console.log(doc);
// const doc =
//   'Test\n\n**test**\n\n[![Version](https://img.shields.io/npm/v//badge-roll)](/https://www.npmjs.com/package/badge-roll "Version")[![Version](https://img.shields.io/npm/v//badge-roll)](/https://www.npmjs.com/package/badge-roll "Version")\n\n# test\n\n## test';

const tree = processor.parse(doc);

let firstShieldFound = false;
let firstShieldPosition: Position;
let lastShieldFound = false;
let lastShieldPosition: Position;

visit(tree, visitor);

console.log(`First shield position:`);
console.log(firstShieldPosition);
console.log(`Last shield position:`);
console.log(lastShieldPosition);

function visitor(node: Node, parents: Node[]) {
  if (nodeMatchesPattern(node, parents)) {
    if (!firstShieldFound) {
      firstShieldFound = true;
      firstShieldPosition = node.position;
    }

    lastShieldPosition = node.position;

    return visit.SKIP;
  } else if (firstShieldFound) {
    lastShieldFound = true;

    return visit.EXIT;
  }
}

function nodeMatchesPattern(node: Node, parents: Node[]): boolean {
  const firstChild = select.select(":first-child", node);

  const isLink: boolean = nodeIsLink(node);
  const hasExactlyOneChild: boolean = nodeHasExactlyOneChild(node);
  const childIsShieldsImg: boolean = nodeIsShieldsImg(firstChild);
  const hasNoGrandChildren: boolean = nodeHasNoGrandchildren(node);

  const matchesPattern = childIsShieldsImg && isLink && hasExactlyOneChild;
  return matchesPattern;
}

const beforeBadges = doc.substring(0, firstShieldPosition.start.offset);
// console.log(beforeBadges);
const afterBadges = doc.substring(lastShieldPosition.end.offset);
// console.log(afterBadges);

const documentWithoutBadges = beforeBadges.concat(afterBadges);
// console.log(documentWithoutBadges);
const documentWithNewBadges = beforeBadges.concat(newBadge, afterBadges);
// console.log(documentWithNewBadges);

writeFile("./README.md", documentWithNewBadges);

function nodeIsLink(node: Node) {
  return is(node, "link");
}

function nodeHasExactlyOneChild(node: Node): boolean {
  const children: Array<Node> = [].concat(node.children);
  return children && children.length === 1;
}

function nodeHasNoGrandchildren(node: Node): boolean {
  const grandchildren = getFirstGrandchildren(node);
  const hasNoGrandchildren = grandchildren.length === 0;

  return hasNoGrandchildren;
}

function nodeIsShieldsImg(node: Node): boolean {
  const nodeIsShieldsImg = select.matches(
    "image[url^=https://img.shields.io]:empty",
    node
  );
  return nodeIsShieldsImg;
}

function getFirstChild(node: Node): Node {
  const firstChild: Node = select.select(":first-child", node);
  return firstChild;
}
function getFirstGrandchildren(node: Node): Array<Node> {
  const firstChild: Node = getFirstChild(node);
  const grandchildren: Array<Node> = firstChild
    ? [].concat(firstChild.children)
    : [];
  return grandchildren;
}
