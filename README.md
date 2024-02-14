## Welcome to the Prohelion Documentation Set

Any issues with our documentation, please log an issue here on GitHub

# Editing the Documentation

These documents are build with MkDocs-Material https://squidfunk.github.io/mkdocs-material/

To edit the documents locally you will need to install the MkDocs using the instructions found on the MkDocs Material website

https://squidfunk.github.io/mkdocs-material/getting-started/

As per the instructions you will need to install, mkdocs material

pip install mkdocs-material

And also the following additional tools

pip install mkdocs-awesome-pages-plugin
pip install mkdocs-glightbox
pip install mkdocs-spellcheck
pip install symspellpy

# Link Checking

A link checker is used to validate all URLs on the site before publishing, we have been using the Integrity Link Checker, but any link checker you like is fine.

# Publishing the documentation

To publish the documentation run the command 

mkdocs gh-deploy  

This will publish the site and post it to the gh-pages branch on github from where the site is staticly served by GitHub to the domain https://docs.prohelion.com
