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
      if (acc === "") {
        return `${segment.name}`;
      } else {
        return `${acc}/${segment.name}`;
      }
    } else if (segment.kind === "variable") {
      if (acc === "") {
        return `${about[segment.name]}`;
      } else {
        return `${acc}/${about[segment.name]}`;
      }
    }
  }, "");
  return evaluated;
}

export function parsePath(unparsed: string): Array<PathSegment> {
  const split = unparsed.split("/");
  const path: Array<PathSegment> = split.map((segment) => {
    const matched = segment.match(/^:(.+)/);
    if (matched) {
      return { kind: "variable", name: matched[1] };
    } else {
      return { kind: "literal", name: segment };
    }
  });
  return path;
}
