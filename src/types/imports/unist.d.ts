declare module "unist-util-find" {
  import { Node } from "unist";
  import { Parent } from "mdast";

  type ChildNode = Node & { parent: Parent };
  type example = { [key: string]: string | number };
  type condition = (node: Node) => boolean;

  function find(
    node: Node,
    test: string | example | condition | Parent
  ): ChildNode;

  export = find;
}
