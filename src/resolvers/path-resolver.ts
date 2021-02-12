import { About, Path } from "../declarations";

export function resolvePath(path: string, about: About): string {
  const parsed = parsePath(path);
  const evaluated = evaluatePath(parsed, about);
  return evaluated;
}

export function evaluatePath(path: Path, about: About) {
  const evaluated = path.reduce((acc, segment) => {
    if (segment.kind === "literal") {
      return `${acc}/${segment.name}`;
    } else if (segment.kind === "variable") {
      return `${acc}/${about[segment.name]}`;
    }
  }, "");
  return evaluated;
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
