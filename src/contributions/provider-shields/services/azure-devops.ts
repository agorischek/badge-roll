export const azureDevops = {
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
  "azure-devops/release": {
    details: ":organization/:projectId/:definitionId/:environmentId",
    to: "https://dev.azure.com",
    display: "Release",
  },
  "azure-devops/tests": {
    details: ":organization/:project/:definitionId",
    to: "https://dev.azure.com",
    display: "Tests",
    variations: {
      branch: {
        details: ":organization/:project/:definitionId/:branch",
      },
    },
  },
};
