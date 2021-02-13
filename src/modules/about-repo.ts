import parseUrl from "url-parse";
import parseGithubUrl from "parse-github-url";

import { About } from "../classes";
import { Context } from "../declarations";

export default {
  about: function (about: About, context: Context): About {
    const repoUrl = context.package.repository.url || null;
    const parsedUrl = new parseUrl(repoUrl);
    const repoHost = parsedUrl.hostname;

    let repoName = "";
    let repoOwner = "";

    switch (repoHost) {
      case "github.com":
        const parsedGithubUrl = parseGithubUrl(repoUrl);
        repoName = parsedGithubUrl.name;
        repoOwner = parsedGithubUrl.owner;
    }

    about.repoHost = repoHost;
    about.repoUrl = repoUrl;
    about.repo = repoName;
    about.user = repoOwner;

    return about;
  },
};
