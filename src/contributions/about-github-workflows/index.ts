import glob from "glob";
import yaml from "yaml";
import fs from "fs";

import { About } from "../../types/index.js";

export default {
  about: function (about: About): About {
    const basePath = "./.github/workflows/";
    const paths = glob.sync(`${basePath}**/*.yml`, null);
    paths.map((path) => {
      const id = path.match(/^.*\/(.+).yml$/)[1];
      const content = fs.readFileSync(path, "utf8");
      const parsed = yaml.parse(content);
      const name = parsed.name;

      about[`workflowFile:${id}`] = `${id}.yml`;
      about[`workflowName:${id}`] = name;
    });

    return about;
  },
};
