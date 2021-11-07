import { Parent } from "mdast";
import { Optional } from "utility-types";

export type PossibleParent = Optional<Parent, "children">;
