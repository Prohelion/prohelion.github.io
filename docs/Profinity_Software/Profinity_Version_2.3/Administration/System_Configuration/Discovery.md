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

| Parameter                          | Description |
|------------------------------------|--|
|`Send Profinity Heartbeat`          | Enable or disable the heartbeat broadcast, which is enabled by default. |
|`Profinity Server Name`             | The name shown to Profinity Mobile. When empty, it defaults to the machine's hostname. You can change it to something more recognisable. |
|`Heartbeat UDP port`                | The UDP port used for the broadcast, from 1 to 65535 (default 49025). Only available when the heartbeat is enabled. |
|`Heartbeat interval (seconds)`      | The time between broadcasts, from 1 to 60 seconds (default 3). Only available when the heartbeat is enabled. |
