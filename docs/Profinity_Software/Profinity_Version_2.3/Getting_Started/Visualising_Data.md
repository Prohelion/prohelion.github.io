---
title: Visualising data
description: "View the data for a configured component on its dashboard, and find how to bring data in and build your own dashboard."
type: concept
owner: Documentation
last_reviewed: 2026-10-14
---

# Visualising data

Each configured component has a [dashboard](../Customising_Profinity/Dashboards/index.md), opened by selecting the component in the sidebar, that shows the data for that component type.

<figure markdown>
![A WaveSculptor22 dashboard with a summary strip of bus voltage, power, temperatures and speed, two line charts for bus power and velocity, and status lights for controller limits and errors.](../images/wavesculptor.png)
<figcaption>Example of a dashboard visualising data</figcaption>
</figure>

A dashboard stays empty until data arrives.
[How to Connect to CAN Bus](../How_To_Guides/Connect_to_CAN_Bus.md) brings in live data from a CAN bus adapter, and [How to Replay CAN Bus Logs](../How_To_Guides/Replay_CAN_Logs.md) supplies recorded data when no hardware is connected.
The [Tag Explorer](../Tags/index.md), opened from **TAG UTILITIES** in the side menu, shows the tags and their current values.

To see how a dashboard is built, or to create your own, refer to [How to View Dashboard Source](../How_To_Guides/View_Dashboard_Source.md) and the [Dashboard Development Guide](../Customising_Profinity/Dashboards/index.md).
