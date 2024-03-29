import { About, Context } from "../../types/index.js";

export default {
  about: function (about: About, context: Context): About {
    const packageName = context.package.name || null;
    const packageHomepage = context.package.homepage || null;

    about.packageName = packageName;
    about.packageHomepage = packageHomepage;

    return about;
  },
};
