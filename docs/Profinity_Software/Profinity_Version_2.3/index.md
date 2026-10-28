---
title: Prohelion Profinity 2.3
description: "Profinity 2.3 is a CAN bus and industrial data management platform that connects equipment and vehicles to AI tools, cloud services, APIs, and analytics."
type: index
owner: Documentation
last_reviewed: 2026-10-15
---

# Prohelion Profinity 2.3

Profinity is a CAN bus and industrial data management platform that connects industrial equipment and vehicles to AI tools, cloud services, APIs, and big data analytics.
It reads data from CAN bus adapters and industrial protocols, shows that data on dashboards, and passes it on to the systems that use it.

Profinity 2.3 adds a range of new features to the core Profinity 2.2 release.
The biggest change is a complete redesign of the way Profinity stores and represents data.
In Profinity 2.3 this data storage model moves to a new, source-independent data storage system called Tags.
Many of the other new 2.3 features use this Tags capability to enable richer data visualisation, transmission, storage, and analysis.

[Tags](Tags/index.md) give data from any protocol a common data model, for both real-time and historical values.
[Rules](Tags/Rules/index.md) evaluate tag values and raise an [alert](Tags/Alerts.md) when a value goes out of range, for example when a battery pack temperature exceeds a limit.
[Actions](Tags/Rules/Actions/index.md) respond when a rule fires, for example by writing an entry to the Profinity log.

Tags, Rules, and Actions can then describe both the active system state and the context of that state to [Profinity AI](Profinity_AI/AI_Chat.md).
They can also describe it to external AI tools that connect through the [Model Context Protocol (MCP) server](Integrating_to_Profinity/MCP_Server/index.md).
These tools can then help identify and address issues.

[Plugins](Developing_with_Profinity/SDK/Developing_Plugins.md) add third-party or in-house components to Profinity in the same way as Prohelion components.
[Scripts](Developing_with_Profinity/Scripting/index.md) automate tasks.
Together they extend Profinity for additional components or white-labelled solutions.

Some features need a licensed edition, and [Licensing](Licensing.md) lists what each edition includes.

<figure markdown>
![A layered platform: Dashboards, Rules, Alerts, Collections, and Derived Tags apply on top of one Tags data model; plugins, scripting, APIs, and the Model Context Protocol (MCP) extend it; Security protects it; the Profinity Engine runs it, on any operating system or container](images/diagram-architecture.png)
<figcaption>The Profinity 2.3 platform from devices to dashboards</figcaption>
</figure>

## Where to start

To install Profinity, refer to [Install Profinity on Windows](Installation/Windows_Installation.md), [Install Profinity on Linux and macOS](Installation/Linux_and_macOS_Installation.md), or [Install Profinity with Docker](Installation/Docker_Installation.md).
Then follow the [Quick start guide](Getting_Started/Quick_Start.md) to load an example profile and edit a first dashboard.
The [How to guides](How_To_Guides/index.md) cover common tasks, such as connecting a CAN bus adapter, building a dashboard, and logging data.
The [Glossary](Getting_Started/Glossary.md) defines the terms and acronyms used throughout.

## Release notes

Refer to the [Release notes](Release_Notes/index.md) for user-visible changes and upgrade notes.
