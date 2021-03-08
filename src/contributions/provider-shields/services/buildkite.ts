export const buildkite = {
  buildkite: {
    details: ":identifier",
    to: "https://buildkit.com",
    display: "Build",
    variations: {
      branch: {
        details: ":identifier/:branch",
      },
    },
  },
};
