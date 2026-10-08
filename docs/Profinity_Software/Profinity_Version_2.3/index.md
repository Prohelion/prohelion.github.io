---
title: Prohelion Profinity 2.3
description: "Profinity 2.3, a CAN bus and industrial data management platform that connects industrial equipment and vehicles to AI tools, cloud services, APIs and big data analytics."
---

# Prohelion Profinity 2.3

Profinity is a CAN bus and industrial data management platform that connects industrial equipment and vehicles to AI tools, cloud services, APIs and big data analytics. It reads data from CAN bus adapters and industrial protocols, shows that data on dashboards, and passes it on to the systems that use it.

Profinity 2.3 adds the following to Profinity 2.2. [Tags](Tags/index.md) give data from any protocol a common data model, for both real-time and historical values. [Rules](Tags/index.md) evaluate tag values and raise an [alert](Tags/Alerts.md) when a value goes out of range, for example when a battery pack temperature exceeds a limit, and [Actions](Tags/Actions.md) respond when a rule fires, for example by writing an entry to the Profinity log. Tags, Rules and Actions describe the system to [Profinity AI](Profinity_AI/AI_Chat.md) and to external AI tools that connect through the [MCP server](Integrating_to_Profinity/MCP_Server.md), so that they can help identify and address issues. [Plugins](Developing_with_Profinity/Plugins/index.md) add third-party or in-house components to Profinity in the same way as Prohelion components, and [scripts](Developing_with_Profinity/Scripting/index.md) automate tasks, so Profinity can be extended for additional components or white-labelled solutions.

Some features need a licensed edition, and [Licensing](Administration/Licensing.md) lists what each edition includes.

<figure markdown>
![A layered platform: Dashboards, Rules, Alerts, Collections, and Derived Tags apply on top of one Tags data model; plugins, scripting, APIs, and the Model Context Protocol (MCP) extend it; Security protects it; the Profinity Engine runs it, on any operating system or container](images/2.3-diagram-architecture.png)
<figcaption>The Profinity 2.3 Platform from Devices to Dashboards</figcaption>
</figure>

## Where to Start

To install Profinity, follow the [Windows](Installation/Windows_Installation.md), [Linux and macOS](Installation/Zip_Installation.md) or [Docker](Installation/Docker_Installation.md) installation guide, then follow the [Quick Start Guide](Getting_Started/Quick_Start.md) to load an example profile and edit a first dashboard. The [How to Guides](How_To_Guides/index.md) cover common tasks, such as connecting a CAN bus adapter, building a dashboard and logging data.

## Release Notes

See the [Release notes 2.3](./Release_Notes/index.md) for user-visible changes and upgrade notes.
