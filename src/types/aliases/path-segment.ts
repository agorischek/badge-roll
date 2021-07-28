export type PathSegment = {
  kind: "variable" | "literal";
  name: string;
  suffixes: string[];
};
