# Contributing

Thank you for contributing to DataCanvas SDK. This document explains how to open PRs, the release process, and how maintainers should publish to npm.

## Pull Request Checklist

- [ ] Follow conventional commits for commit messages (e.g. `feat:`, `fix:`, `chore:`).
- [ ] Add or update unit tests for new behavior when applicable.
- [ ] Update `CHANGELOG.md` — add concise bullets to the `Unreleased` section describing user-visible changes.
- [ ] Ensure `npm test` and `npm run build` pass locally.
- [ ] Ensure CI checks pass and obtain required reviews before merging.

Note: Direct pushes to `main` are restricted — open a PR and request review from maintainers.

## Branching and Releases

- Work in feature branches: `feature/awesome`, `fix/bug-name`.
- Open a PR targeting `main` when ready.

### Release process (maintainers)

1. Increment the `version` field in `package.json` (semantic versioning).
2. Move `Unreleased` entries in `CHANGELOG.md` into a new heading for the released version and add the release date (YYYY-MM-DD).
3. Commit the version bump and changelog changes on a branch and open a PR to `main`.
4. Once CI passes and required reviews are complete, merge to `main` (branch protection ensures appropriate checks and reviews).
5. The GitHub Action at `.github/workflows/npm-publish.yml` will run on the push to `main` and publish the package to npm using the `NPM_TOKEN` secret.

Important: Be sure the `version` is updated to a previously unpublished value; npm will reject publishing an existing version.

## Using the release script locally

To build and publish locally (for maintainers with an npm token configured in their environment):

```bash
# build and publish (requires npm auth locally)
npm run release
```

Or run the steps manually:

```bash
npm ci
npm run build
# ensure npm is logged in or set `NODE_AUTH_TOKEN` in environment
npm publish --access public
```

## Contact / Support

If you have trouble generating the token or setting secrets, contact the maintainers listed in the README or open an issue.
