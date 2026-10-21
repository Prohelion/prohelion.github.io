---
title: Update the Profinity Docker image
description: "Move a Docker installation to a newer Profinity image with Docker Compose, or update it automatically each day with Watchtower."
type: task
owner: Documentation
last_reviewed: 2026-10-15
---

# Update the Profinity Docker image

Docker does not update a running container, so the `latest` tag only moves when you pull a newer image.
To move to a newer Profinity image, use the compose file from [Install Profinity with Docker](./Docker_Installation.md).
To upgrade a 2.2 container, read [Upgrade from Profinity 2.2](./Upgrade_From_2_2.md) first.

1. In the directory that holds the compose file, pull the newer image:

    ```bash
    docker compose pull
    ```

2. Start Profinity with the new image:

    ```bash
    docker compose up -d
    ```

Configuration and profiles are kept as long as `PROFINITY_HOME` names the container path of your mounted volume.

## Update automatically with Watchtower

To update automatically, add Watchtower to the compose file.
Watchtower is a community tool that replaces a container whenever a newer image appears.
This file adds it:

```yaml
services:
  profinity:
    image: prohelion/profinity:latest
    restart: always
    ports:
      - 18080:18080
      - 18443:18443
      - 4876:4876
    environment:
      - PROFINITY_HOME=/app/Prohelion
    volumes:
      - $HOME/Prohelion:/app/Prohelion:rw
    labels:
      - com.centurylinklabs.watchtower.enable=true

  watchtower:
    image: containrrr/watchtower
    restart: always
    command: --label-enable --cleanup --interval 86400
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
```

In this compose file, the `label` limits updates to the Profinity container, `--cleanup` removes old images, and `--interval 86400` checks once a day.
Refer to the [Watchtower documentation](https://containrrr.dev/watchtower/) for the other options.
An unattended update discards any data that is not in a host-mounted volume, so check that `PROFINITY_HOME` matches the mount before you enable it.

