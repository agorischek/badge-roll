import { Node } from "unist";

import { Location } from "../index.js";

export type Positions = {
  [position: string]: Position;
};

type Position = {
  relation: string;
  findAnchor: (node: Node) => Node;
  affix: (
    doc: string,
    badges: string,
    anchorLocation: Location,
    badgeSectionLocation: Location
  ) => string;
};
