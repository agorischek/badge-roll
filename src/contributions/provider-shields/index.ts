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
          to: "https://www.appveyor.com",
          display: "Build",
          variations: {
            branch: {
              details: ":user/:repo/:branch",
            },
          },
        },
        "appveyor/job/build": {
          details: ":user/:repo/:job",
          to: "https://www.appveyor.com",
          display: "Job",
          variations: {
            branch: {
              details: ":user/:repo/:job/:branch",
            },
          },
        },
        "appveyor/tests": {
          details: ":user/:repo",
          to: "https://www.appveyor.com",
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
        "azure-devops/build": {
          details: ":organization/:projectId/:definitionId",
          to: "https://dev.azure.com",
          display: "Build",
          variations: {
            branch: {
              details: ":organization/:projectId/:definitionId/:branch",
            },
          },
        },
        "badge-roll": {
          path: "badge/badges-rolled-white",
          to: "https://github.com/agorischek/badge-roll",
          display: "Badges",
        },
        // /github/workflow/status/:user/:repo/:workflow
        "github/workflow/status": {
          details: ":user/:repo/:workflow",
          to: "https://github.com",
          display: "Workflow",
        },
      },
    },
  },
};
