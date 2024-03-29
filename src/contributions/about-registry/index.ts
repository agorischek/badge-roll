import { About, Context } from "../../types/index.js";

export default {
  about: function (about: About, context: Context): About {
    const isPublic = !context.package.private;

    if (isPublic) {
      const npmBaseUrl = "https://www.npmjs.com/package";
      const packageName = about.packageName;
      const packageRegistry = `${npmBaseUrl}/${packageName}`;
      about.packageRegistry = packageRegistry;
    }

    return about;
  },
};
