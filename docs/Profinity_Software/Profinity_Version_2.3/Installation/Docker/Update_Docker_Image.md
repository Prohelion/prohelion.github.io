---
title: Update the Profinity Docker image
description: "Move a Docker installation to a newer Profinity image with Docker Compose, after backing up the mounted data folder."
type: task
owner: Documentation
last_reviewed: 2026-11-04
---

# Update the Profinity Docker image

Docker does not update a running container, so the `latest` tag only moves when you pull a newer image.
To move to a newer Profinity image, use the compose file from [Install Profinity with Docker](./index.md).
To upgrade a 2.2 container, read [Upgrade from Profinity 2.2](../Upgrading/Upgrade_From_2_2.md) first.

Before you start:

- Back up the host folder that the compose file mounts at `PROFINITY_HOME`, as described in [Back up and restore](../Artifacts_Directory.md#back-up-and-restore).
- Check that `PROFINITY_HOME` names the container path of that mounted volume, because Docker discards data kept anywhere else when it replaces the container.

1. In the directory that holds the compose file, pull the newer image:

    ```bash
    docker compose pull
    ```

2. Start Profinity with the new image:

    ```bash
    docker compose up -d
    ```

Configuration and profiles are kept in the mounted volume.
