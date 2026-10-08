---
title: How to Guides
description: "Task-based guides for Profinity 2.3: dashboards, components, CAN bus, data logging, configuration, AI and scripting."
---

# How to Guides

These guides cover common Profinity 2.3 jobs, such as connecting a CAN bus adapter, building a dashboard and logging data. Each guide lists what it needs first, then the steps, and links to the reference page for the feature it uses. Start with the [Quick Start Guide](../Getting_Started/Quick_Start.md) if Profinity is not yet installed.

## Build and Style Dashboards

- [How to Create a Custom Dashboard](./Create_Custom_Dashboard.md): builds a first dashboard for a Custom Component.
- [How to Create a Profile Dashboard](./Create_Profile_Dashboard.md): replaces the default home page with a custom dashboard.
- [How to Add Images to Your Dashboard](./Add_Images_to_Dashboard.md): uses custom images in dashboard components.
- [How to Style Your Dashboard](./Style_Dashboard.md): applies custom CSS to dashboard elements.
- [How to View Dashboard Source](./View_Dashboard_Source.md): opens the YAML source of an existing dashboard to copy or learn from.
- [How to Debug Dashboard Issues](./Debug_Dashboard_Issues.md): finds the cause of a dashboard that does not load or show data.

## Add Components and Connect Devices

- [How to Add a Component to Your Profile](./Add_Component_to_Profile.md): configures a component and adds it to the active profile.
- [How to Create a Custom Component](./Create_Custom_Component.md): adds a new CAN bus device from a DBC file.
- [How to Connect to CAN Bus](./Connect_to_CAN_Bus.md): connects Profinity to a CAN bus network.
- [How to Send and Receive CAN Bus Messages](./Send_Receive_CAN_Bus.md): sends and receives CAN messages from the Profinity web interface.
- [How to Replay CAN Bus Logs](./Replay_CAN_Logs.md): replays recorded CAN bus messages for testing without hardware.

## Log and Publish Data

- [How to Configure Data Logging](./Configure_Data_Logging.md): sets up logging and publishing to files, InfluxDB, Prometheus, Message Queuing Telemetry Transport (MQTT) or a webhook.
- [How to Log Data to the Cloud (InfluxDB)](./Log_Data_to_Cloud_Influx.md): logs tag values to InfluxDB Cloud or a self-hosted InfluxDB.

## Configure and Deploy

- [How to Create a New Profile](./Create_New_Profile.md): sets up a profile for a separate site or configuration.
- [How to Configure Environment Variables](./Configure_Environment_Variables.md): sets a configuration value from an environment variable.
- [How to Set Up Profinity as a Kiosk Application](./Set_Up_Profinity_as_Kiosk.md): runs Profinity fullscreen on a dedicated display.

## Extend Profinity

- [How to Connect Profinity to AI](./Connect_Profinity_to_AI.md): connects an AI tool to the Model Context Protocol (MCP) server.
- [How to Write Your First Script](./Write_Your_First_Script.md): creates a script that automates tasks and reads CAN bus data.

## Tags, Rules and Plugins

Profinity 2.3 adds tags, rules and plugins that do not yet have a separate guide. The reference pages describe them in full.

- [Tag Collections](../Tags/Collections.md): groups tags for logging and publishing.
- [Derived Tags](../Tags/Derived_Tags.md): calculates a new tag from existing tags with an expression.
- [Rule Actions and Scripts](../Tags/Actions.md): runs an action when a rule raises an alert.
- [AI Skills](../Profinity_AI/AI_Skills.md): generates dashboards, rules and scripts with an AI tool.
- [DLL Plugins](../Developing_with_Profinity/Plugins/index.md): extends Profinity with a plugin.

## More Help

- [Prohelion Profinity 2.3](../index.md): the documentation home page.
- [Dashboard FAQ](../Customising_Profinity/Dashboards/FAQ.md): answers to frequently asked dashboard questions.
