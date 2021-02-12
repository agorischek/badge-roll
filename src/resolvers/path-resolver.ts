import { About, Path } from "../declarations";

export function resolvePath(path: string, about: About): string {
  const parsed = parsePath(path);
  const resolved = parsed.reduce((acc, segment) => {
    if (segment.kind === "literal") {
      return `${acc}/${segment.name}`;
    } else if (segment.kind === "variable") {
      return `${acc}/${about[segment.name]}`;
    }
  }, "");
  return resolved;
}

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
