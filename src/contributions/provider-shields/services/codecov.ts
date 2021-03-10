export const codecov = {
  "codecov/c": {
    details: ":vcsName/:user/:repo",
    to: "https://codecov.io/:vcsNameShort/:user/:repo",
    display: "Coverage",
    variations: {
      branch: {
        details: ":vcsName/:user/:repo/:branch",
        to: ":vcsName/:user/:repo/:branch",
      },
    },
  },
};
