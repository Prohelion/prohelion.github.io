---
title: Discovery
description: "Configure the LAN heartbeat that lets Profinity Mobile find this Profinity server, including its name, UDP port and interval."
type: reference
owner: Documentation
last_reviewed: 2026-10-14
---

# Discovery

Saving changes on any System Configuration tab restarts Profinity.
Refer to [System Configuration](index.md) for what to expect.

Profinity can broadcast a small User Datagram Protocol (UDP) heartbeat on the local network.
[Profinity Mobile](../../Mobile/index.md) uses it to find this server without anyone typing in the address.

| Parameter | Default | Range | Description |
|-----------|---------|-------|-------------|
| `Send Profinity Heartbeat` | Enabled | - | Enable or disable the heartbeat broadcast. |
| `Profinity Server Name` | Empty, which uses the machine's hostname | - | The name shown to Profinity Mobile. You can change it to something more recognisable. |
| `Heartbeat UDP port` | 49025 | 1 to 65535 | The UDP port used for the broadcast. Only available when the heartbeat is enabled. |
| `Heartbeat interval (seconds)` | 3 | 1 to 60 | The time between broadcasts. Only available when the heartbeat is enabled. |
