"use strict";

import parseUrl from "url-parse";
import parseGithubUrl from "parse-github-url";

import { About, Context } from "../about-retriever";

export function about(about: About, context: Context): About {
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

  about.host = repoHost;
  about.url = repoUrl;
  about.repo = repoName;
  about.owner = repoOwner;

  return about;
}
