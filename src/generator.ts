"use strict";

import unified from "unified";
import stringify from "remark-stringify";

const generator = unified().use(stringify);

export function generateMarkdown(node: any) {
  const generated = generator.stringify(node);
  return generated;
}
