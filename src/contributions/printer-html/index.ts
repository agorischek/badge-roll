import { processHtml } from "./markup-processor.js";

import { Badge, Settings } from "../../types/index.js";

export default {
  printers: {
    html: function (
      badgeSection: Array<Badge>,
      settings: Settings,
      target?: string
    ): string {
      return processHtml(badgeSection, settings, target);
    },
  },
};
