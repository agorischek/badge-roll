export const shields = {
  baseUrl: "https://img.shields.io",
  badges: {
    "npm/v": {
      details: ":packageName",
      to: "https://www.npmjs.com/package/",
      display: "Version",
    },
    "github/license": {
      details: ":user/:repo",
      to: ":packageHomepage",
      display: "License",
    },
    "jsdelivr/npm": {
      details: ":period/:packageName",
      to: ":packageHomepage",
      display: "Downloads",
    },
  },
};
