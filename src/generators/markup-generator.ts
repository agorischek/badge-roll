import unified from "unified";
import stringify from "remark-stringify";
import { Node } from "unist";
import { Badge, BadgeSection } from "../declarations";

const generator = unified().use(stringify);

export function generateBadgeSectionMarkup(
  badgeSection: BadgeSection,
  language: string
): string {
  if (language === "markdown") {
    const badgeSectionAst = generateBadgeSectionAst(badgeSection);
    const markup = generateMarkdown(badgeSectionAst);
    return markup;
  } else {
    throw "Unsupported markup language";
  }
}

export function generateMarkdown(node: Node) {
  const generated = generator.stringify(node);
  return generated;
}

export function generateBadgeAst(badge: Badge): Node {
  const badgeAst = {
    type: "link",
    url: badge.to,
    title: badge.display,
    children: [
      {
        type: "image",
        url: badge.url,
        alt: badge.display,
      },
    ],
  };
  return badgeAst;
}

export function generateBadgeSectionAst(badges: BadgeSection): Node {
  const badgeSectionAst = {
    type: "paragraph",
    children: badges.map((badge) => generateBadgeAst(badge)),
  };
  return badgeSectionAst;
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
