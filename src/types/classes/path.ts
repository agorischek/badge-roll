import { About, PathSegment } from "..";

export class Path {
  segments: Array<PathSegment>;
  original: string;
  evaluated: string;
  constructor(path: string, about: About) {
    this.original = path;
    this.segments = parsePath(path);
    this.evaluated = evaluatePath(this.segments, about);
  }
}

export function evaluatePath(path: Array<PathSegment>, about: About): string {
  const evaluated = path.reduce((acc: string, segment: PathSegment) => {
    if (segment.kind === "literal") {
      if (acc === "") return `${segment.name}`;
      else return `${acc}/${segment.name}`;
    } else if (segment.kind === "variable") {
      const hasSuffixes = segment.suffixes.length > 0;
      const suffix = hasSuffixes ? segment.suffixes[0] : null;
      const suffixIsDefined = about[suffix] ? true : false;
      const lookup =
        hasSuffixes && suffixIsDefined
          ? `${segment.name}:${about[suffix]}`
          : segment.name;
      const resolved = about[lookup];
      if (acc === "") return `${resolved}`;
      else return `${acc}/${resolved}`;
    }
  }, "");
  return evaluated;
}

export function parsePath(unparsed: string): Array<PathSegment> {
  const split = unparsed.split("/");
  const path: Array<PathSegment> = split.map((segment) => {
    const variableMatch = segment.match(/^:(.+)$/);
    if (variableMatch) {
      const variable = variableMatch[1];
      const subvariables = variable.split("+");
      const root = subvariables[0];
      const suffixes = subvariables.slice(1);
      return {
        kind: "variable",
        name: root,
        suffixes: suffixes,
      };
    } else
      return {
        kind: "literal",
        name: segment,
        suffixes: [],
      };
  });
  return path;
}
