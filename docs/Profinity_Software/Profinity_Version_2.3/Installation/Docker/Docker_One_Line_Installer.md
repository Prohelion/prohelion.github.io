---
title: Install Profinity with the Docker one-line installer
description: "Install Profinity in Docker with the install-docker.sh script, which writes the compose file, pulls the image, and starts Profinity."
type: task
owner: Documentation
last_reviewed: 2026-10-15
---

# Install Profinity with the Docker one-line installer

Install Profinity on a Docker host with a single script instead of writing a compose file yourself.
To write the compose file yourself, and for the Docker, CAN adapter, licence, and `PROFINITY_HOME` requirements that apply to both methods, refer to [Install Profinity with Docker](./index.md).

Prohelion provides three helper scripts for Docker hosts:

- `install-docker.sh` creates `~/profinity-docker`, or the folder named by `--dir`, writes a compose file, pulls the image, and starts Profinity.
- `~/profinity-docker/profinity.sh` runs `docker compose up -d` and waits for the HTTP port to answer.
- `~/profinity-docker/update.sh` runs `docker compose pull` and `docker compose up -d`.

The `--image` option, or the `PROFINITY_DOCKER_IMAGE` variable, selects a different image than the default `prohelion/profinity:latest`.

1. Download the installer from the Profinity release on GitHub, with its checksum.
   `install-docker.sh` writes `profinity.sh` and `update.sh` itself, so it is the only file you need.

    ```bash
    curl -fsSL -o install-docker.sh https://github.com/Prohelion/Profinity/releases/latest/download/install-docker.sh
    curl -fsSL -o install-docker.sh.sha256 https://github.com/Prohelion/Profinity/releases/latest/download/install-docker.sh.sha256
    ```

2. Verify the checksum and run the installer:

    ```bash
    sha256sum -c install-docker.sh.sha256 && bash install-docker.sh --dir ~/profinity-docker
    ```

    On macOS, use `shasum -a 256 -c install-docker.sh.sha256` in place of `sha256sum -c`.

To open the web interface and sign in, refer to [Sign in](./index.md#sign-in).
A new installation starts the 14-day local trial, as described in [Who can sign in, by installation type](../Applying_a_Licence.md#who-can-sign-in).
To update the installation, run `~/profinity-docker/update.sh`, or refer to [Update the Profinity Docker image](./Update_Docker_Image.md).
