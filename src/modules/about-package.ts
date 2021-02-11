"use strict";

import { About, Context } from "../about-retriever";

export function about(about: About, context: Context): About {
  const packageName = context.package.name || null;
  const packageHomepage = context.package.homepage || null;

  about.name = packageName;
  about.homepage = packageHomepage;

  return about;
}
