---
title: Application Config
description: "Packet retention, update checks, the recent tag history window and scripting on the System Configuration Application Config tab."
---

# Application Config

!!! warning "Saving restarts Profinity"
    Saving changes on any System Configuration tab restarts Profinity. See [System Configuration](index.md) for what to expect.

| Parameter                          | Description |
|------------------------------------|--|
|`Maximum number of retained Packets`| Profinity retains CAN Packets for use in the CAN Utilities, and this parameter sets the number of packets retained. The default is 1000 and the maximum is 10000. |
|`Custom Update Server`              | Profinity supports the use of Custom Update Servers for release management. If you are running the standard version of Profinity, leave this field blank. |
|`Update Check Interval (hours)`     | How often Profinity checks for updates, from 1 to 168 hours (one week). The default is 24, and 0 disables scheduled checks. |
|`Recent tag history - local window (minutes)` | Dashboard bindings that query a time range starting within this window are served entirely from the in-memory [tag buffer](Tags.md). Ranges that start earlier use the designated InfluxDB reader for the whole window, when one is configured. The default is 60 and the range is 1 to 10080 minutes. |
|`Enable Scripting`                  | This field must be selected for the Profinity instance to support scripting. Scripting requires security considerations and as such is not activated by default, and it can only be enabled when the Profinity licence includes the Scripting feature. |

<figure markdown>
![Profinity System Configuration](../../images/app_configuration.png)
<figcaption>Profinity System Configuration</figcaption>
</figure>
