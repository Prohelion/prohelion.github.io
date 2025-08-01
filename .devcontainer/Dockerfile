FROM python:3.12

RUN pip install mkdocs-material
RUN pip install mkdocs-awesome-pages-plugin
RUN pip install mkdocs-glightbox
RUN pip install mkdocs-spellcheck
RUN pip install mkdocs-redirects
RUN pip install mkdocs-with-pdf
RUN pip install symspellpy
RUN pip install codespell

EXPOSE 8000

ENTRYPOINT ["mkdocs", "serve"]