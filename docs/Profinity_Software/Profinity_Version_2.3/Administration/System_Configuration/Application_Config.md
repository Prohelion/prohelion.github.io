---
title: Application Config
description: "Set packet retention, update checks, the recent tag history window and scripting on the System Configuration Application Config tab."
type: reference
owner: Documentation
last_reviewed: 2026-10-14
---

# Application Config

The Application Config tab of [System Configuration](index.md) holds packet retention, update checks, the recent tag history window and scripting.

Saving changes on any System Configuration tab restarts Profinity.
Refer to [System Configuration](index.md) for what to expect.

| Parameter                          | Description |
|------------------------------------|--|
|`Maximum number of retained Packets`| The number of CAN packets Profinity retains for the CAN utilities. The default is 1000 and the range is 1 to 10000. |
|`Custom Update Server`              | The address of your own update server. Leave it blank to use the standard Prohelion update service. |
|`Update Check Interval (hours)`     | How often Profinity checks for updates, from 1 to 168 hours (one week). The default is 24, and 0 disables scheduled checks. |
|`Recent tag history — local window (minutes)` | How far back dashboard bindings read from the in-memory [tag buffer](Tags.md). The default is 60 and the range is 1 to 10080 minutes. |
|`Enable Scripting`                  | Turns scripting on for the instance. It is off by default. |

For the recent tag history window, a dashboard binding that queries a time range starting within the window is served entirely from the in-memory tag buffer.
A range that starts earlier uses the designated InfluxDB reader for the whole window, when one is configured.

Scripts run code on the host, so turning on scripting is a security decision.
The **Enable Scripting** field is available only when the licence includes the **Scripting** feature (**Desktop**, **Server**, and **Enterprise** editions).
An unlicensed instance does not include scripting.

<figure markdown>
![The Application Config tab of the System Configuration dialog, with update server and check interval fields, packet and tag history limits, and an Enable Scripting checkbox that is ticked.](../../images/app_configuration.png)
<figcaption>Profinity System Configuration</figcaption>
</figure>
