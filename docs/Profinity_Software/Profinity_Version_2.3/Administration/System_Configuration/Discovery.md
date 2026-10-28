---
title: Discovery
description: "Configure the LAN heartbeat that lets Profinity Mobile find this Profinity server, including its name, UDP port and interval."
type: reference
owner: Documentation
last_reviewed: 2026-10-14
---

# Discovery

Profinity can broadcast a small User Datagram Protocol (UDP) heartbeat on the local network.
[Profinity Mobile](../../Mobile/index.md) uses it to find this server without anyone typing in the address.

Saving changes on any System Configuration tab restarts Profinity.
Refer to [System Configuration](index.md) for what to expect.

| Parameter | Type | Default | Range | Description |
|-----------|------|---------|-------|-------------|
| `Send Profinity Heartbeat` | On or off | Enabled | - | Enable or disable the heartbeat broadcast. |
| `Profinity Server Name` | Text | Empty, which uses the machine's hostname | - | The name shown to Profinity Mobile. You can change it to something more recognisable. |
| `Heartbeat UDP port` | Whole number | 49025 | 1 to 65535 | The UDP port used for the broadcast. Only available when the heartbeat is enabled. |
| `Heartbeat interval (seconds)` | Whole number | 3 | 1 to 60 | The time between broadcasts. Only available when the heartbeat is enabled. |
