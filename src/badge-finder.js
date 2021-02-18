var unified = require("unified");

var markdown = require("remark-parse");
var remark2rehype = require("remark-rehype");
var select = require("unist-util-select");
var visit = require("unist-util-visit");
var is = require("unist-util-is");

var processor = unified().use(markdown).use(remark2rehype);

const tree = processor.parse(
  'Test\n\n**test**\n\n[![Version](https://img.shields.io/npm/v//badge-roll)](/https://www.npmjs.com/package/badge-roll "Version")[![Version](https://img.shields.io/npm/v//badge-roll)](/https://www.npmjs.com/package/badge-roll "Version")\n\n# test\n\n## test'
);

let firstShieldFound = false;
let firstShieldPosition = {};
let lastShieldFound = false;
let lastShieldPosition = {};

visit(tree, visitor);

console.log(`First shield position:`);
console.log(firstShieldPosition);
console.log(`Last shield position:`);
console.log(lastShieldPosition);

function visitor(node) {
  if (nodeMatchesPattern(node)) {
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

function nodeMatchesPattern(node) {
  const firstChild = node.children ? node.children[0] : null;

  const isLink = is(node, "link");
  const hasExactlyOneChild = node.children && node.children.length === 1;
  const childIsShieldsImg = select.matches(
    "image[url^=https://img.shields.io]:empty",
    firstChild
  );
  const hasGrandChildren =
    firstChild != null &&
    firstChild.children != null &&
    firstChild.children.length === 0;
  const hasNoGrandChildren = !hasGrandChildren;

  const matchesPattern =
    childIsShieldsImg && isLink && hasExactlyOneChild && hasNoGrandChildren;

  return matchesPattern;
}
