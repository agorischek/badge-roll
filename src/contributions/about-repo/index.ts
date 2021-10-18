import parseUrl from "url-parse";
import parseGithubUrl from "parse-github-url";

import { About, Context } from "../../types/index.js";

export default {
  about: function (about: About, context: Context): About {
    const repoUrl = context.package.repository.url || null;
    const parsedUrl = new parseUrl(repoUrl);
    const repoHost = parsedUrl.hostname;

    let repoName,
      repoOwner,
      vcsName,
      vcsNameShort = "";

    switch (repoHost) {
      case "github.com":
        const parsedGithubUrl = parseGithubUrl(repoUrl);
        repoName = parsedGithubUrl.name;
        repoOwner = parsedGithubUrl.owner;
        vcsName = "github";
        vcsNameShort = "gh";
    }

    about.repoHost = repoHost;
    about.repoUrl = repoUrl;
    about.repo = repoName;
    about.user = repoOwner;
    about.vcsName = vcsName;
    about.vcsNameShort = vcsNameShort;

    return about;
  },
};
