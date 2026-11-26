---
title: Update the Profinity Docker image
description: "Move a Docker installation to a newer Profinity image with Docker Compose, after backing up the mounted data folder, or pin it to one version."
type: task
owner: Documentation
last_reviewed: 2026-11-26
---

# Update the Profinity Docker image

Docker does not update a running container, so the `latest` tag only moves when you pull a newer image.
To move to a newer Profinity image, use the compose file from [Install Profinity with Docker](./index.md).
To upgrade a 2.2 container, read [Upgrade from Profinity 2.2](../Upgrading/Upgrade_From_2_2.md) first.

Before you start:

- Back up the host folder that the compose file mounts at `/var/lib/prohelion/profinity`, as described in [Back up and restore](../Artifacts_Directory.md#back-up-and-restore).
- Check that the compose file mounts a host folder at `/var/lib/prohelion/profinity`, because Docker discards data kept anywhere else when it replaces the container.

1. In the directory that holds the compose file, pull the newer image:

    ```bash
    docker compose pull
    ```

2. Start Profinity with the new image:

    ```bash
    docker compose up -d
    ```

Configuration and profiles are kept in the mounted volume. Open `http://localhost:18080` on the local machine to check that the sign-in page loads, as described in [Sign in](./index.md#sign-in).

## Pin a version

The `latest` tag follows the newest release. To stay on one version until you choose to move, name the version in the `image` line of the compose file:

```yaml
image: prohelion/profinity:2.3.6
```

Prohelion publishes these tags for each version:

| Tag | What it follows |
|-----|-----------------|
| `2.3.6` | The release with that version. It does not change. |
| `2.3` | The newest release of that minor version. |
| `latest` | The newest release. |
| `2.3.6-prerelease`, `2.3-prerelease`, `prerelease` | Builds that are ahead of the next release. |
| `2.3.6-develop`, `2.3-develop`, `develop` | Development builds, which are not for production. |

The `-prerelease` and `-develop` tags move each time Prohelion publishes a new build of that version. To hold one exact build, add its digest after the tag:

```yaml
image: prohelion/profinity:2.3.6@sha256:<digest>
```

Replace `<digest>` with the image's digest, which you can read from the machine that pulled the image with `docker image inspect --format '{{index .RepoDigests 0}}' prohelion/profinity:2.3.6`. To see which build an image is, run `docker image inspect --format '{{index .Config.Labels "org.opencontainers.image.version"}}' prohelion/profinity:2.3.6`, which prints the version with its build number.

Moving to a different minor version, such as from 2.3 to a later one, can change how profiles are stored, so back up the mounted folder first, as described in [Back up and restore](../Artifacts_Directory.md#back-up-and-restore). Going back to an earlier minor version means restoring that backup.
