---
name: Weekly Dependency Release
description: Weekly agentic dependency update, repair, version bump, tag, and npm publish trigger.
on:
  schedule: weekly
  workflow_dispatch:
permissions:
  contents: read
  actions: read
network:
  allowed:
    - defaults
    - github
    - node
timeout-minutes: 120
concurrency:
  group: weekly-dependency-release
  cancel-in-progress: false
pre-agent-steps:
  - name: Set up Node.js
    uses: actions/setup-node@v6.4.0
    with:
      node-version: 24
      cache: npm
  - name: Install dependencies
    run: npm ci
post-steps:
  - name: Commit, tag, and trigger npm publish
    if: success()
    shell: bash
    env:
      DEFAULT_BRANCH: ${{ github.event.repository.default_branch }}
      GH_AW_RELEASE_TOKEN: ${{ secrets.GH_AW_RELEASE_TOKEN }}
    run: |
      set -euo pipefail

      if [ -z "${GH_AW_RELEASE_TOKEN:-}" ]; then
        echo "::error::GH_AW_RELEASE_TOKEN is not configured. Create a fine-grained PAT secret with Contents read/write and Actions read/write for this repository."
        exit 1
      fi

      if git diff --quiet && git diff --cached --quiet && [ -z "$(git ls-files --others --exclude-standard)" ]; then
        echo "No dependency changes were produced; nothing to publish."
        exit 0
      fi

      default_branch="${DEFAULT_BRANCH:-main}"
      git fetch origin "${default_branch}"
      if ! git merge-base --is-ancestor "origin/${default_branch}" HEAD; then
        echo "::error::origin/${default_branch} moved after this run started. Aborting so the weekly release does not overwrite newer work."
        exit 1
      fi

      npm test
      npm version patch --no-git-tag-version
      version="$(node -p "JSON.parse(require('node:fs').readFileSync('package.json', 'utf8')).version")"
      tag="v${version}"

      if git ls-remote --exit-code --tags origin "refs/tags/${tag}" >/dev/null 2>&1; then
        echo "::error::Tag ${tag} already exists. Refusing to publish over an existing npm version."
        exit 1
      fi

      git add -A
      if git diff --cached --quiet; then
        echo "No staged changes after version bump; nothing to publish."
        exit 0
      fi

      git config user.name "github-actions[bot]"
      git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
      git commit -m "chore: weekly dependency release ${tag}"
      git tag -a "${tag}" -m "Release ${tag}"

      git remote set-url origin "https://x-access-token:${GH_AW_RELEASE_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"
      git push origin "HEAD:${default_branch}"
      git push origin "${tag}"
---

# Weekly Dependency Release

You are maintaining `badge-roll` as a weekly dependency release agent. The repository owner explicitly wants this workflow to update dependencies, fix any breakage, and publish directly without opening a pull request.

## Objective

Update all npm dependencies and dev dependencies to the latest available versions, even when the new versions are outside the existing semver ranges. Repair any breakage caused by those updates. Leave the working tree in a state where the deterministic post-step can run the full test suite, bump the package patch version, commit to the default branch, create a matching `vX.Y.Z` tag, and let the existing npm trusted-publisher workflow publish from that tag.

## Required Process

1. Inspect `package.json`, the lockfile, current scripts, CI, and recent release workflow setup before changing files.
2. Update all dependencies to latest using npm tooling. Prefer `npx npm-check-updates --upgrade --target latest` followed by `npm install`.
3. Fix source, config, lint, tests, and workflow compatibility issues caused by the updates.
4. Run `npm test` locally in the workflow environment and keep iterating until it passes.
5. Do not bump `package.json` version yourself. The post-step owns version bumping, commit creation, tag creation, and publishing.
6. Do not open a pull request. Do not call publishing commands directly. The post-step and existing `publish.yml` workflow handle the release path.

## Guardrails

If there are no dependency updates or no resulting file changes, leave the worktree clean and finish normally. If a dependency update would require a user-facing breaking API change, avoid the breaking API change when reasonably possible. If you cannot avoid it, make the smallest compatible repair, ensure tests/documentation reflect the behavior, and mention the breaking-risk assessment in your final run summary.

Do not add new production dependencies unless they are necessary to repair the update. Keep edits focused on dependency updates and compatibility fixes. Never commit secrets or generated build output.
