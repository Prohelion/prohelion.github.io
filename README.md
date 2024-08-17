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

## Publishing the documentation

Any documentation that is commited to the main branch of this repo will be automatically deployed.  A GitHub CI script will publish the site and post it to the gh-pages branch on github from where the site is staticly served by GitHub to the domain https://docs.prohelion.com
