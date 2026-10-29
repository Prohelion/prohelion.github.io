---
title: How to guides
description: "Find a Profinity 2.3 guide for building dashboards, adding components, connecting CAN bus, logging data, setting up a kiosk, connecting AI, and scripting."
type: index
owner: Documentation
last_reviewed: 2026-10-27
---

# How to guides

These guides cover common Profinity 2.3 jobs, such as connecting a CAN bus adapter, building a dashboard, and logging data.
Most guides list what they need first, then the steps, and link to the reference page for the feature they use.
Start with the [Quick start guide](../Getting_Started/Quick_Start.md) if Profinity is not installed yet.

## Build and style dashboards

- [How to create a custom dashboard](./Create_Custom_Dashboard.md): build a first dashboard for a Custom Component.
- [How to add images to your dashboard](./Add_Images_to_Dashboard.md): use custom images in dashboard components.
- [How to style your dashboard](./Style_Dashboard.md): add a `profile.css` stylesheet, and apply its classes to dashboard groups and readouts.

## Add components and connect devices

- [How to add a component to your profile](./Add_Component_to_Profile.md): configure a component, and add it to the active profile.
- [How to connect to CAN bus](./Connect_to_CAN_Bus.md): connect Profinity to a CAN bus network.
- [How to send and receive CAN bus messages](./Send_Receive_CAN_Bus.md): view CAN traffic, and send a CAN packet once or on a schedule.
- [How to replay CAN bus logs](./Replay_CAN_Logs.md): replay recorded CAN bus messages for testing without live CAN hardware.

## Log and publish data

- [How to configure data logging](./Configure_Data_Logging.md): choose a destination for files, InfluxDB, Prometheus, Message Queuing Telemetry Transport (MQTT), or a webhook, add the logger or publisher, start it, and check that data is flowing.
- [How to log data to InfluxDB](./Log_Data_to_InfluxDB.md): prepare InfluxDB Cloud or a self-hosted server, connect the InfluxDB v2 Historian, and check data arrives.

## Configure and deploy

- [How to create a new profile](./Create_New_Profile.md): set up a profile for a separate site or configuration.
- [Environment variables](../Installation/Environment_Variables.md): set a configuration value from an environment variable.
- [How to set up Profinity as a kiosk application](./Set_Up_Profinity_as_Kiosk.md): configure Kiosk Mode, and start a fullscreen browser on Windows, Linux, or macOS.

## Extend Profinity

- [Connect an AI tool to Profinity](../Integrating_to_Profinity/MCP_Server/index.md): choose Claude Code, Cursor, Codex, or ChatGPT and open its setup guide.
- [Make your first Custom Component](../Developing_with_Profinity/Custom_Components/First_Custom_Component.md): add a Custom Component with a CAN database (DBC) file, dashboard, main script, menu actions, and firmware.
- [How to write your first script](./Write_Your_First_Script.md): enable scripting, add a script component, and run a first script.
- [Script examples](../Developing_with_Profinity/Scripting/Script_Examples.md): read a DBC signal, send a CAN message, and keep script state.

## Tags, rules, and plugins

These Profinity 2.3 features have no separate guide, and the reference pages describe them in full.

- [Tag collections](../Tags/Collections/index.md): group tags for logging and publishing.
- [Derived tags](../Tags/Derived_Tags/index.md): calculate a new tag from existing tags with an expression.
- [Tag rules](../Tags/Rules/index.md) and [Rule actions](../Tags/Rules/Actions/index.md): run an action when a rule raises an alert.
- [AI Skills](../Profinity_AI/AI_Skills/index.md): generate dashboards, rules, and scripts with an AI tool.
- [Developing Plugins](../Developing_with_Profinity/SDK/Developing_Plugins.md): extend Profinity with a plugin.

## More help

- [Prohelion Profinity 2.3](../index.md): the documentation home page.
- [Frequently asked questions](../Customising_Profinity/Dashboards/FAQ.md): answers to frequently asked dashboard questions.
