import { Node } from "unist";

export type Positions = {
  [position: string]: {
    relation: string;
    findAnchor: (node: Node) => Node;
  };
};
