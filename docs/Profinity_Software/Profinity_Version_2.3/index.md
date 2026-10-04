---
title: Prohelion Profinity V2
description: "Current release of Profinity, a modern CAN bus management platform that connects CAN devices to AI, cloud, APIs, and big data analytics."
---

# Prohelion Profinity V2.3

Profinity is a modern CAN bus and Industrial Data management platform designed to connect a range of industrial and vehicle solution to AI, cloud, API and big data technologies.

Profinity V2.3 updates the capabilities of Prohelion's Profinity V2.2 suite by adding:

- Tags: A unified data model that allows any type of protocol to be displayed in a common manner, for both realtime and historical data
- Rules: Intelligent rules that can sit over the top of Tags and help identify issues or out of range behaviours
- Actions: Triggered by rules these actions can take corrective behaviour
- Context Driven AI: With Tags, Rules and Actions, AI now has the context it needs to help identify and address issues in your system.
- Plugins: Your components or 3rd party components can now be added to Profinity in the same way that standard Prohelion components can.  This allows Profinity to be easily extended for additional components or white-labelled solutions.


# The new Profinity v2.3 Architecture

<figure markdown>
![A layered platform: Dashboards, Rules, Alerts, Collections, and Derived Tags apply on top of one Tags data model; plugins, scripting, APIs, and MCP extend it; Security protects it; the Profinity Engine runs it, on any OS or container](images/2.3-diagram-architecture.png)
<figcaption>One platform, from device to dashboard</figcaption>
</figure>

<figure markdown>
![Profinity](images/wavesculptor.png)
<figcaption>Profinity V2 - Showing a Motor Controller Dashboard</figcaption>
</figure>

Profinity is built around the concept of [Profiles](Getting_Started/Profiles.md), which are sets of configured devices in your system.  By switching between Profiles you can support multiple configurations across different sites or different combinations of technologies. The configuration of the system is largely driven by the Profinity GUI, but once configured, the solution can run as a service, providing continuous data streams off servers or embedded devices, or run from the cloud.

<figure markdown>
![Prohelion battery management systems, WaveSculptor and Elmar Solar MPPT drives, and chargers and power supplies, each connecting through the CAN bus adapter of your choice or directly over SCPI](images/2.3-diagram-devices-adapters.png)
<figcaption>Native connectivity for your hardware</figcaption>
</figure>

## Release notes

See the [Release Notes](./Release_Notes/index.md) for user-visible changes and upgrade notes for each Profinity V2 release.

## Quick Guides

The [How to Guides](./How_To_Guides/index.md) provide concise step-by-step instructions for common tasks such as creating custom dashboards, configuring components, and setting up data logging.

To request support or assistance, contact Prohelion through the [Prohelion website](https://www.prohelion.com/contact-us/). Bugs and requests for improvement can also be logged through the built-in [Feedback Form](./Administration/Feedback.md).

Support Requests should be submitted to the [Prohelion Support Portal](https://prohelion.atlassian.net/servicedesk/customer/portals).