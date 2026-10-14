---
title: How to guides
description: "Find a Profinity 2.3 guide for building dashboards, adding components, connecting CAN bus, logging data, setting up a kiosk, connecting AI, and scripting."
type: index
owner: Documentation
last_reviewed: 2026-10-14
---

# How to guides

These guides cover common Profinity 2.3 jobs, such as connecting a CAN bus adapter, building a dashboard and logging data.
Most guides list what they need first, then the steps, and link to the reference page for the feature they use.
Start with the [Quick Start Guide](../Getting_Started/Quick_Start.md) if Profinity is not yet installed.

## Build and style dashboards

- [How to Create a Custom Dashboard](./Create_Custom_Dashboard.md): builds a first dashboard for a Custom Component.
- [How to create a profile dashboard](./Create_Profile_Dashboard.md): replaces the default home page with a custom dashboard, built in the visual editor or uploaded as a YAML file, and removes it again.
- [How to Add Images to Your Dashboard](./Add_Images_to_Dashboard.md): uses custom images in dashboard components.
- [How to style your dashboard](./Style_Dashboard.md): adds a `profile.css` stylesheet and applies its classes to dashboard groups and readouts.
- [How to view dashboard source](./View_Dashboard_Source.md): opens the YAML source of a component or profile dashboard to copy or learn from.
- [How to debug dashboard issues](./Debug_Dashboard_Issues.md): lists the cause and fix for a dashboard that does not load, a readout with no data, a missing image or a style with no effect.

## Add components and connect devices

- [How to Add a Component to Your Profile](./Add_Component_to_Profile.md): configures a component and adds it to the active profile.
- [How to Create a Custom Component](./Create_Custom_Component.md): adds a new CAN bus device from a DBC file.
- [How to Connect to CAN Bus](./Connect_to_CAN_Bus.md): connects Profinity to a CAN bus network.
- [How to send and receive CAN bus messages](./Send_Receive_CAN_Bus.md): views CAN traffic, and sends a CAN packet once or on a schedule.
- [How to replay CAN bus logs](./Replay_CAN_Logs.md): replays recorded CAN bus messages from a log file for testing without live CAN hardware.

## Log and publish data

- [How to Configure Data Logging](./Configure_Data_Logging.md): sets up logging and publishing to files, InfluxDB, Prometheus, Message Queuing Telemetry Transport (MQTT) or a webhook.
- [How to log data to the cloud (InfluxDB)](./Log_Data_to_Cloud_Influx.md): logs tag values to InfluxDB Cloud or a self-hosted InfluxDB with the InfluxDB v2 Historian, and describes the data it writes.

## Configure and deploy

- [How to Create a New Profile](./Create_New_Profile.md): sets up a profile for a separate site or configuration.
- [Environment variables](../Installation/Environment_Variables.md): sets a configuration value from an environment variable.
- [How to set up Profinity as a kiosk application](./Set_Up_Profinity_as_Kiosk.md): configures Kiosk Mode and starts a fullscreen browser on Windows, Linux, or macOS.

## Extend Profinity

- [How to Connect Profinity to AI](./Connect_Profinity_to_AI.md): connects an AI tool to the Model Context Protocol (MCP) server.
- [How to write your first script](./Write_Your_First_Script.md): enables scripting, adds a script component, runs a first script, and shows DBC, CAN, and state examples.

## Tags, rules, and plugins

These Profinity 2.3 features have no separate guide, and the reference pages describe them in full.

- [Tag Collections](../Tags/Collections.md): groups tags for logging and publishing.
- [Derived Tags](../Tags/Derived_Tags.md): calculates a new tag from existing tags with an expression.
- [Rules](../Tags/Rules.md) and [Actions](../Tags/Actions.md): runs an action when a rule raises an alert.
- [AI Skills](../Profinity_AI/AI_Skills.md): generates dashboards, rules, and scripts with an AI tool.
- [DLL Plugins](../Developing_with_Profinity/Plugins/index.md): extends Profinity with a plugin.

## More help

- [Prohelion Profinity 2.3](../index.md): the documentation home page.
- [Dashboard FAQ](../Customising_Profinity/Dashboards/FAQ.md): answers to frequently asked dashboard questions.
