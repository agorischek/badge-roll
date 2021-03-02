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
        "appveyor/build": {
          details: ":user/:repo",
          to: "",
          display: "Build",
          variations: {
            branch: {
              details: ":user/:repo/:branch",
            },
          },
        },
        "appveyor/job/build": {
          details: ":user/:repo/:job",
          to: "",
          display: "Job",
          variations: {
            branch: {
              details: ":user/:repo/:job/:branch",
            },
          },
        },
        "appveyor/tests": {
          details: ":user/:repo",
          to: "",
          display: "Tests",
          variations: {
            branch: {
              details: ":user/:repo/:branch",
            },
            compact: {
              query: {
                compact_message: true,
              },
            },
          },
        },
      },
    },
  },
};
