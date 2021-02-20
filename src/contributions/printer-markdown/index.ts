import { affixMarkdown } from "./markup-processor";

import { BadgeSection, Settings } from "../../types";

export default {
  printers: {
    md: function (
      badgeSection: BadgeSection,
      settings: Settings,
      target?: string
    ): string {
      return affixMarkdown(badgeSection, settings, target);
    },
    markdown: function (
      badgeSection: BadgeSection,
      settings: Settings,
      target?: string
    ): string {
      return affixMarkdown(badgeSection, settings, target);
    },
  },
};
