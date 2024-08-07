FROM python:3.12

RUN pip install mkdocs-material
RUN pip install mkdocs-awesome-pages-plugin
RUN pip install mkdocs-glightbox
RUN pip install mkdocs-spellcheck
RUN pip install symspellpy

EXPOSE 8000

ENTRYPOINT ["mkdocs", "serve"]