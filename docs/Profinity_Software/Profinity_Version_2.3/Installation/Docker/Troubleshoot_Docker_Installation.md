---
title: Troubleshoot Profinity in Docker
description: "Fix lost configuration after an image update, mount permission errors, a missing Tritium adapter, and SocketCAN interfaces that are not visible in Docker."
type: reference
owner: Documentation
last_reviewed: 2026-10-15
---

# Troubleshoot Profinity in Docker

This page lists the symptoms seen on a Profinity container installed with [Install Profinity with Docker](./index.md), with the cause and the fix for each.

| Symptom | Cause and fix |
|---------|---------------|
| The profile and configuration are back to their defaults after an image update | `PROFINITY_HOME` did not match the container-side mount path, so the data was written to the container and lost when it was replaced. Set the variable to the mount path and restore the files from your backup. |
| Profinity fails to start with a permission error on the mounted directory | The `app` user cannot write to the directory. Change the ownership or permissions of the host directory. |
| A Tritium adapter is not found | Publish port `4876` for UDP as well as TCP, or use host networking. |
| The host's SocketCAN interfaces are not visible inside the container | Expose them to Docker, as described under [Expose devices to the container](./index.md#expose-devices-to-the-container). |

For the ports and the data directory, refer to [Docker ports and data directory](./Docker_Ports_and_Data_Directory.md).
