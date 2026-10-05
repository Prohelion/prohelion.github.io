---
title: Discovery
description: "Configure the LAN heartbeat that lets Profinity Mobile find this Profinity server."
---

# Discovery

!!! warning "Saving restarts Profinity"
    Saving changes on any System Configuration tab restarts Profinity. See [System Configuration](index.md) for what to expect.

Profinity can broadcast a small UDP heartbeat on the local network so that [Profinity Mobile](../../Mobile/index.md) can find this server without the address being typed in.

| Parameter                          | Description |
|------------------------------------|--|
|`Send Profinity Heartbeat`          | Enable or disable the heartbeat broadcast, which is enabled by default. |
|`Profinity Server Name`             | The name shown to Profinity Mobile. When left empty it defaults to the machine's hostname, and it can be changed to something more recognisable. |
|`Heartbeat UDP port`                | The UDP port used for the broadcast, from 1 to 65535 (default 49025). Only available when the heartbeat is enabled. |
|`Heartbeat interval (seconds)`      | The time between broadcasts, from 1 to 60 seconds (default 3). Only available when the heartbeat is enabled. |
