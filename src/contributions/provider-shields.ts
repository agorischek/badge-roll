export default {
  providers: {
    shields: {
      baseUrl: "https://img.shields.io",
      badges: {
        "npm/v": {
          details: ":packageName",
          to: ":packageRegistry",
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
    },
  },
};
