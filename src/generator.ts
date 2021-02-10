"use strict";

import unified from "unified";
import stringify from "remark-stringify";
import { Node } from "unist";

const generator = unified().use(stringify);

interface ImageNodeProps {
  url: string;
  title: string;
  alt: string;
}

function generateMarkdown(node: Node) {
  const generated = generator.stringify(node);
  return generated;
}

export function generateMarkdownImage(imageNodeProps: ImageNodeProps) {
  const imageNode: Node = {
    type: "image",
    url: imageNodeProps.url,
    title: imageNodeProps.title,
    alt: imageNodeProps.alt,
  };
  const generated = generateMarkdown(imageNode);
  return generated;
}
