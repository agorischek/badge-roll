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
        "azure-devops/build": {
          details: ":organization/:projectId/:definitionId",
          to: "",
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
          to: "",
          display: "Workflow",
        },
      },
    },
  },
};

// Azure DevOps builds:		/azure-devops/build/:organization/:projectId/:definitionId
// Azure DevOps builds (branch):		/azure-devops/build/:organization/:projectId/:definitionId/:branch
// Azure DevOps builds (stage):		/azure-devops/build/:organization/:projectId/:definitionId/:branch*?stage=Successful%20Stage
// Azure DevOps builds (job):		/azure-devops/build/:organization/:projectId/:definitionId/:branch*?job=Successful%20Job&stage=Successful%20Stage
// Azure DevOps releases:	/azure-devops/release/:organization/:projectId/:definitionId/:environmentId
// Azure DevOps tests:		/azure-devops/tests/:organization/:project/:definitionId
// Azure DevOps tests (branch):	/azure-devops/tests/:organization/:project/:definitionId/:branch
// Azure DevOps tests (compact):		/azure-devops/tests/:organization/:project/:definitionId?compact_message
// Azure DevOps tests with custom labels:		/azure-devops/tests/:organization/:project/:definitionId?failed_label=bad&passed_label=good&skipped_label=n%2Fa
