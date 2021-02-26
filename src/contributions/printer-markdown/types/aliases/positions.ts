import { Node } from "unist";

import { BadgeSectionLocation } from "..";

export type Positions = {
  [position: string]: Position;
};

type Position = {
  relation: string;
  findAnchor: (node: Node) => Node;
  affix: (
    doc: string,
    badges: string,
    badgeSectionLocation: BadgeSectionLocation
  ) => string;
};
