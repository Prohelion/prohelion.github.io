---
title: Docker ports and data directory
description: "Look up the ports the Profinity container publishes and the artefacts directory it uses, including how PROFINITY_HOME must match the volume mount."
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

Docker publishes a port as TCP unless the mapping ends in `/udp`, so add `- 4876:4876/udp` when a Tritium adapter is reached through the published ports.
With host networking, Docker ignores the `ports` entries, as described under [Expose devices to the container](./index.md#expose-devices-to-the-container).

## Artefacts directory

The artefacts directory inside the container is whatever `PROFINITY_HOME` names.
With the volume in the compose file, the configuration is in `/app/Prohelion/config`, the profiles in `/app/Prohelion/profiles`, and the logs in `/app/Prohelion/logs`, which appear on the host under `$HOME/Prohelion`.
The one-line installer uses `PROFINITY_HOME=/var/lib/prohelion/profinity` mounted from a local `data` directory, which is also the default artefacts path on Linux.
Either path is valid, provided that the environment variable and the mount destination match.

!!! warning "Set PROFINITY_HOME to your mount path"
    If `PROFINITY_HOME` does not name the container path of your mounted volume, Profinity writes its configuration and profiles inside the container, and they are lost when the image is replaced.
    Compose files written for 2.2 that mount `/root/Prohelion/Profinity/...` need their mounts moved to the new `PROFINITY_HOME` path.
    Profinity does not migrate data from legacy locations when `PROFINITY_HOME` is set; refer to [Upgrade from Profinity 2.2](../Upgrading/Upgrade_From_2_2.md).

The sub-folders beneath the artefacts directory use lowercase names (`config`, `profiles`, `logs`).
Linux file systems are case-sensitive, so mounts must target those names.
For the full layout, refer to [Artefacts directory](../Artifacts_Directory.md).

If a port or the data directory does not behave as described, refer to [Troubleshoot Profinity in Docker](./Troubleshoot_Docker_Installation.md).
