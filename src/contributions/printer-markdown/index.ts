import { processMarkdown } from "./markup-processor.js";

import { Badge, Settings } from "../../types/index.js";

export default {
  printers: {
    md: function (
      badgeSection: Array<Badge>,
      settings: Settings,
      target?: string
    ): string {
      return processMarkdown(badgeSection, settings, target);
    },
    markdown: function (
      badgeSection: Array<Badge>,
      settings: Settings,
      target?: string
    ): string {
      return processMarkdown(badgeSection, settings, target);
    },
  },
};
