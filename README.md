## Welcome to the Prohelion Documentation Set

Any issues with our documentation, please log an issue here on GitHub

# Editing the Documentation

These documents are build with [MkDocs-Material](https://squidfunk.github.io/mkdocs-material/)

To edit the documents locally you will need to install the MkDocs using the instructions found on the [MkDocs Material website](https://squidfunk.github.io/mkdocs-material/getting-started/)

As per the instructions you will need to install, mkdocs material

```pip install mkdocs-material```

And also the following additional tools are required for the Prohelion instance

```
pip install mkdocs-awesome-pages-plugin
pip install mkdocs-glightbox
pip install mkdocs-spellcheck
pip install symspellpy
```

## Using VSCode with Dev Containers

A `Dockerfile` and `.devcontainer.json` have been created under the `.devcontainer` directory. This allows the all development to be performed inside a Docker container using VSCode. The Docker container captures all the dependencies required to build and serve the documentation website. 

### Steps

1. See https://code.visualstudio.com/docs/devcontainers/containers#_installation for how to install VSCode with Dev Containers. 
2. Open this repo using VSCode. this example is using CMD on Windows.
```
cd prohelion.github.io/
code .
```
3. Run the `Dev Containers: Rebuild and Reopen in Container` command using the from the Command Palette (F1) or quick actions Status bar item. 

## Link Checking

A link checker is used to validate all URLs on the site before publishing, we have been using the [Integrity Link Checker](https://peacockmedia.software/mac/integrity/free.html) for Mac, on Windows [LinkChecker](http://wummel.github.io/linkchecker/) is a good soltuion, but any link checker you like is fine.

## Version folders

When a new Profinity docs version is forked, copy the previous version folder and keep it (`Profinity_Version_2.2` stays beside `Profinity_Version_2.3`). Do not rename the old folder away in the same change that adds the new one — the CI `mkdocs build` publishes only what is in the tree.

## Publishing the documentation

Any documentation that is committed to the main branch of this repo will be automatically deployed. A GitHub Actions workflow builds the site with MkDocs and publishes it through GitHub Pages to https://docs.prohelion.com. The repository Pages source must be **GitHub Actions**, not the `gh-pages` branch.

## Checking a Profinity 2.3 page

The rules are in `STYLE_GUIDE.md`, and the reasoning is in `BEST_PRACTICE_GUIDE.md`. Two tools check a page against them. Install [Vale](https://vale.sh) first (`brew install vale` on macOS), and run `npm install` in `scripts/` once.

```
cd scripts
npm run lint-docs -- --details ../docs/Profinity_Software/Profinity_Version_2.3/Getting_Started/Create_User.md
npm run lint-docs                 # every 2.3 page, summary only
npm run test-lint                 # tests for the linter itself
npm run generate-llms             # rebuild docs/llms-full.txt after changing page descriptions
```

Every page is reported, but only pages that declare a `type` in front matter (pages that have been refactored to the style guide) can fail the check. Add `type`, `owner` and `last_reviewed` to a page when you refactor it, and the check starts protecting it.
