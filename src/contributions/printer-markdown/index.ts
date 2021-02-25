import { processMarkdown } from "./markup-processor";

import { Badge, Settings } from "../../types";

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
