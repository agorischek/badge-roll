import { Parent } from "hast";
import { Optional } from "utility-types";

export type PossibleParent = Optional<Parent, "children">;
