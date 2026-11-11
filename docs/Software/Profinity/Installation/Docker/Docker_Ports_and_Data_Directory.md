---
title: Docker ports and data directory
description: "Look up the ports the Profinity container publishes and the artefacts directory it uses, including the default path a volume mounts at."
type: reference
owner: Documentation
last_reviewed: 2026-10-15
---

# Docker ports and data directory

This page lists the ports that the compose file in [Install Profinity with Docker](./index.md) publishes, and where the container keeps its configuration, profiles, and logs.

## Ports

| Port | Purpose |
|------|---------|
| `18080` | HTTP web interface |
| `18443` | HTTPS web interface |
| `4876` | Tritium CAN to Ethernet bridge, which uses this port for both UDP and TCP and cannot change it |

Docker publishes a port as TCP unless the mapping ends in `/udp`, so keep the existing `- 4876:4876` line and add `- 4876:4876/udp` beside it when a Tritium adapter is reached through the published ports.
With host networking, Docker ignores the `ports` entries, as described under [Expose devices to the container](./index.md#expose-devices-to-the-container).

## Artefacts directory

The artefacts directory inside the container is `/var/lib/prohelion/profinity`, the default on Linux.
Mount a host folder at that path, so that the data survives when the image is replaced.
With the volume in the compose file, the configuration is in `/var/lib/prohelion/profinity/config`, the profiles in `/var/lib/prohelion/profinity/profiles`, and the logs in `/var/lib/prohelion/profinity/logs`, which appear on the host under `$HOME/Prohelion`.
The [one-line installer](./Docker_One_Line_Installer.md) creates a `data` folder inside the install folder, `~/profinity-docker` by default or the folder you give with `--dir`, and mounts it at the same path.

!!! warning "Mount a volume at the artefacts directory"
    If no host folder is mounted at `/var/lib/prohelion/profinity`, Profinity writes its configuration and profiles inside the container, and they are lost when the image is replaced.
    A compose file written for 2.2 mounts a host folder at `/app/Prohelion`, which holds the 2.2 data in its `Profinity` folder. Mount the host folder that holds the 2.2 data at `/var/lib/prohelion/profinity` instead, as described in [Upgrade from Profinity 2.2](../Upgrading/Upgrade_From_2_2.md).

Do not set `PROFINITY_HOME` for a normal installation, because the default path is the right one.
The variable moves the artefacts directory to another path and turns off the move from older locations, so use it only for an exception such as a non-standard mount root, and then make the mount destination match it, as described under [Move or relocate the artefacts directory](../Artifacts_Directory.md).

The sub-folders beneath the artefacts directory use lowercase names (`config`, `profiles`, `logs`).
Linux file systems are case-sensitive, so mounts must target those names.
For the full layout, refer to [Artefacts directory](../Artifacts_Directory.md).

If a port or the data directory does not behave as described, refer to [Troubleshoot Profinity in Docker](./Troubleshoot_Docker_Installation.md).
