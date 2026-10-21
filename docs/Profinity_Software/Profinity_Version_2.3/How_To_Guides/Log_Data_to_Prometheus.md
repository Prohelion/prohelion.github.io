---
title: How to serve data to Prometheus
description: "Add the Prometheus Logger, choose the tag collections to serve, and point a Prometheus server at the Profinity metrics endpoint."
type: task
owner: Documentation
last_reviewed: 2026-10-14
---

# How to serve data to Prometheus

Configure the Prometheus Logger so that a Prometheus server can collect tag values from Profinity.
Prometheus collects data from Profinity rather than receiving it, so no destination is configured.
The Prometheus Logger needs no licensed feature, and you need an active profile and the **Modify components** permission.

1. Add a **Prometheus Logger** component, as described in [How to configure data logging](./Configure_Data_Logging.md#add-the-component).
2. Set the **Data endpoint URL**, **Server Hostname** and **Server Port**. The defaults serve data at `http://localhost:7065/metrics`.
3. Select the tag collections to serve, as described in [How to configure data logging](./Configure_Data_Logging.md#select-tag-collections).
4. Configure the Prometheus server to collect from that URL.

To start the component and confirm that data is arriving, refer to [How to configure data logging](./Configure_Data_Logging.md#start-the-logger-or-publisher).
For the full settings, refer to [Prometheus Logger](../Components/Loggers/Prometheus_Logger.md).
