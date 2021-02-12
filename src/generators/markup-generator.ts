import unified from "unified";
import stringify from "remark-stringify";
import { Node } from "unist";

const generator = unified().use(stringify);

function generateMarkdown(node: Node) {
  const generated = generator.stringify(node);
  return generated;
}

function generateImageMarkup(
  language: string,
  url: string,
  alt: string,
  title: string
) {
  if (language === "markdown") {
    const imageNode: Node = {
      type: "image",
      url: url,
      title: title,
      alt: alt,
    };
    imageNode;
    const generatedImageMarkup = generateMarkdown(imageNode);
    return generatedImageMarkup;
  } else {
    throw "Unsupported markup language";
  }
}

function generateLinkMarkup(
  language: string,
  url: string,
  title: string,
  display: string
) {
  if (language === "markdown") {
    const linkNode: Node = {
      type: "link",
      url: url,
      title: title,
      children: { type: "text", value: display },
    };
    const generatedLinkMarkup = generateMarkdown(linkNode);
    return generatedLinkMarkup;
  } else {
    throw "Unsupported markup language";
  }
}

export function generateBadgeMarkup(
  language: string,
  imageUrl: string,
  targetUrl: string,
  alt: string
): string {
  if (language === "markdown") {
    alt;
    const generatedImageMarkup = generateImageMarkup(
      language,
      imageUrl,
      alt,
      null
    );
    generatedImageMarkup;
    const generatedBadgeMarkup = generateLinkMarkup(
      language,
      targetUrl,
      alt,
      generatedImageMarkup
    );
    generatedBadgeMarkup;
    return generatedBadgeMarkup;
  } else {
    throw "Unsupported markup language";
  }
}
