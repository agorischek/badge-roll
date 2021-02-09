import { assert } from "chai";

import * as generator from "../generator";

describe("Generator", () => {
  it("generates image Markdown", () => {
    const imageNode = {
      type: "image",
      url: "http://url",
      title: "title",
      alt: "alt text",
    };
    const markdown = generator.generateMarkdown(imageNode);
    const expected = '![alt text](http://url "title")\n';
    assert.equal(markdown, expected);
  });
});
