---
title: Application Config
description: "Set packet retention, update checks, the recent tag history window and scripting on the System Configuration Application Config tab."
type: reference
owner: Documentation
last_reviewed: 2026-10-28
---

# Application Config

The Application Config tab of [System Configuration](index.md) holds packet retention, update checks, the recent tag history window and scripting.

Saving changes on any System Configuration tab restarts Profinity.
Refer to [System Configuration](index.md) for what to expect.

| Parameter | Default | Range | Description |
|-----------|---------|-------|-------------|
| `Maximum number of retained Packets` | 1000 | 1 to 10000 | The number of CAN packets Profinity retains for the CAN utilities. |
| `Custom Update Server` | Blank (standard Prohelion update service) | - | The address of your own update server. Leave it blank to use the standard Prohelion update service. |
| `Update Check Interval (hours)` | 24 | 1 to 168 (one week), or 0 | How often Profinity checks for updates. 0 disables scheduled checks. |
| `Recent tag history — local window (minutes)` | 60 | 1 to 10080 | How far back dashboard bindings read from the in-memory [tag buffer](Tags.md). |
| `Enable Scripting` | Off | - | In the **Optional Capabilities** section. Turns scripting on for the instance. |

For the recent tag history window, a dashboard binding that queries a time range starting within the window is served entirely from the in-memory tag buffer.
A range that starts earlier uses the designated InfluxDB reader for the whole window, when one is configured.

Scripts run code on the host, so turning on scripting is a security decision.
The **Enable Scripting** field is available only when the licence includes the **Scripting** feature (**Desktop**, **Server**, and **Enterprise** editions).
An unlicensed instance does not include scripting.

<figure markdown>
![The Application Config tab of the System Configuration dialog, with update server and check interval fields, packet and tag history limits, and an Enable Scripting checkbox that is ticked.](../../images/app_configuration.png)
<figcaption>Profinity System Configuration</figcaption>
</figure>
