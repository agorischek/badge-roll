export const github = {
  "github/license": {
    details: ":user/:repo",
    to: ":packageHomepage/blob/:branch/LICENSE",
    display: "License",
  },
  "github/workflow/status": {
    details: ":user/:repo/:workflowName+workflow",
    to: "https://github.com/:user/:repo/actions/workflows/:workflowFile+workflow",
    display: "Workflow",
  },
};
