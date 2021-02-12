import { Path } from "./declarations";

export function parsePath(unparsed: string): Path {
  const split = unparsed.split("/");
  const path: Path = split.map((segment) => {
    const matched = segment.match(/^:(.+)/);
    if (matched) {
      return { kind: "variable", name: matched[1] };
    } else {
      return { kind: "literal", name: segment };
    }
  });
  return path;
}
