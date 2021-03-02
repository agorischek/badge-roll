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
      },
    },
  },
};

// AppVeyor:	/appveyor/build/:user/:repo
// AppVeyor branch:		/appveyor/build/:user/:repo/:branch
// AppVeyor Job:		/appveyor/job/build/:user/:repo/:job
// AppVeyor Job branch:		/appveyor/job/build/:user/:repo/:job/:branch
// AppVeyor tests:		/appveyor/tests/:user/:repo
// AppVeyor tests (branch):		/appveyor/tests/:user/:repo/:branch
// AppVeyor tests (compact):		/appveyor/tests/:user/:repo?compact_message
// AppVeyor tests with custom labels:	/appveyor/tests/:user/:repo?failed_label=bad&passed_label=good&skipped_label=n%2Fa
