import fs from "fs";
import unified from "unified";
import stringify from "remark-stringify";
import gfm from "remark-gfm";
import { flatMap, merge, map, sortBy } from "lodash";

import { Node } from "unist";

import providerContribution from ".";

import { BadgeDefinition, ProviderDefinition } from "../../types";

const defaultPlaceholder = "—";

type BadgeRowDefinition = {
  id: string;
  variation: string;
  path?: string;
  details?: string;
  to?: string;
};

class Cell {
  type: string;
  children: Array<{ type: string; value: string }>;
  constructor(value: string) {
    return {
      type: "tableCell",
      children: [{ type: "text", value: value }],
    };
  }
}

class Row {
  type: string;
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

const header = new Row(["ID", "Variation", "Details", "To"]);

const badgeDefinitions = map(
  sortedBadges,
  (badge) => new Row([badge.id, badge.variation, badge.details, badge.to])
);

const table = {
  type: "table",
  align: ["left"],
  children: [header].concat(badgeDefinitions),
};

const markup = generateMarkdown(table);

fs.writeFileSync("./badges.md", markup, "utf8");

function generateMarkdown(node: Node) {
  const generator = unified().use(gfm).use(stringify);
  const generated = generator.stringify(node);
  return generated;
}
