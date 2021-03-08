export const appveyor = {
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
        options: {
          compact_message: true,
        },
      },
    },
  },
};
