export const cirrus = {
  "cirrus/github": {
    display: "Build",
    to: "https://cirrus-ci.org",
    details: ":user/:repo",
    variations: {
      branch: {
        details: ":user/:repo/:branch",
      },
    },
  },
};
