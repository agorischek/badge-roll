import fs from "fs";
import { unified } from "unified";
import stringify from "remark-stringify";
import gfm from "remark-gfm";
import { flatMap, merge, map, sortBy } from "lodash";

import { Node } from "unist";
import { Root, TableCell, TableRow } from "mdast";

import providerContribution from "./index";

import { BadgeDefinition, ProviderDefinition } from "../../types";

const defaultPlaceholder = "—";

type BadgeRowDefinition = {
  id: string;
  variation: string;
  path?: string;
  details?: string;
  to?: string;
};

class Cell implements TableCell {
  type: "tableCell";
  children: Array<{ type: "inlineCode" | "text"; value: string }>;
  constructor(value: string) {
    return {
      type: "tableCell",
      children: [{ type: value ? "inlineCode" : "text", value: value }],
    };
  }
}

class Row implements TableRow {
  type: "tableRow";
  children: Array<Cell>;
  constructor(cells: string[]) {
    return {
      type: "tableRow",
      children: map(cells, (value) => new Cell(value)),
    };
  }
}

const flattenBadgeDefinition = (
  badge: BadgeDefinition,
  id: string
): BadgeRowDefinition[] => {
  const main = merge(badge, { id: id, variation: defaultPlaceholder });
  const variations = map(badge.variations, (variation, id) =>
    merge({}, main, variation, { variation: id })
  );
  const all = [main, ...variations];
  return all;
};

const provider: ProviderDefinition = providerContribution.providers.shields;

const badges = flatMap(provider.badges, (badge, id) =>
  flattenBadgeDefinition(badge, id)
);
const sortedBadges = sortBy(badges, (badge) => badge.id);

const header = new Row(["id", "variation", "details", "to"]);

const badgeDefinitions = map(
  sortedBadges,
  (badge) => new Row([badge.id, badge.variation, badge.details, badge.to])
);

const table: Root = {
  type: "root",
  children: [
    {
      type: "table",
      align: ["left"],
      children: [header].concat(badgeDefinitions),
    },
  ],
};

const markup = generateMarkdown(table);

fs.writeFileSync("./badges.md", markup, "utf8");

function generateMarkdown(node: Root) {
  const generator = unified().use(gfm).use(stringify);
  const generated = generator.stringify(node);
  return generated;
}
