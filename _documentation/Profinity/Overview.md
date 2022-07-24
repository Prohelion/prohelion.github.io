---
title: Profinity Overview
tags: [Profinity, CAN Bus, CAN Bus DBC, DBC, Overview]
keywords: Profinity, CAN Bus, CAN Bus DBC, DBC, Overview
last_updated: July 24, 2022
permalink: Profinity/Overview.html
folder: Profinity
order: 0

# Hero section
hero:
    title: Profinity
    text: Prohelion's CAN Bus, Battery, Solar and DBC Management Solution
    background_image: /images/Prohelion_Battery.jpg
    buttons: # Add buttons below, there are examples with all available options
        - label: Download (for Windows)
          url: https://github.com/Prohelion/Profinity/releases/latest/download/Profinity.install.msi
          external_url: true 
          style: filled
          icon: download 
---

# Prohelion Profinity

Profinity is a modern CAN Bus management platform designed to enable the connection of CAN Bus based solution to modern Cloud, APIs and Big Data technologies.

Originally developed by Prohelion to manage our own products it has evolved over time to be multi-platform solution, capable of running on Windows, Linux, MacOS and Docker, with a core engine, easily extendable via Restful APIs.

Profinity is built around the concept of [profiles](Profiles.html), which is a set of configured devices in your system.  By switching between profiles you can support multiple configurations across different sites of different combinations of technologies.  The configuration of the system is largely driven by the Profinity GUI, but once configured, the solution can run as a service, providing continuous data streams off servers or embedded devices, or run from the cloud.

![Profinity]({{site.dox.baseurl}}/images/Profinity/profinity_overview.png)

Profinity can connect to [CAN Bridges](CAN_Bus_Adapters.html), which translate CAN Bus traffic from your network to the Profinity solution, you can send and receive and view CAN Bus messages either raw or using DBC, log messages and replay them.  You can also use Profinity to share CAN Bus data from your system to your team, either in near real time via a [Prohelion Cloud Connect](Prohelion_Cloud_Connect.html) data stream, or via the logs to cloud data logging platforms. 

It provides specialised tools for managing [Prohelion Batteries](Prohelion_Batteries.html) and chargers, MPPT systems from [Elmar Solar](Elmar_Solar_MPPT.html) and [Tritium WaveSculptors](Tritium_WaveSculptor.html) as well as any device that can be defined by a CAN DBC file.  

### Profinity Server (Rest APIs, Web and Docker)

As of Profinity 1.11, Prohelion has migrated to a modern container and API centric architecture.  You will find information on our [Restful APIs and Swagger Support](Profinity_Rest_APIs.html) in the documentation as well as our out of the box Cloud connectivity for [InfluxDB and Prometheus](InfluxDB_Prometheus_Integration.html) to support cloud based Big Data capture and analytics of CAN Bus based solutions.  

In addition we now support for Profinity running as a Server on [Windows, Docker, Linux and MacOS](Profinity_Server.html).

If you require support or assistance, please [Contact Us](https://www.prohelion.com/contact-us/) via the Prohelion Website or you can log bugs, requests for help or requests for improvement on our [Support Portal](https://prohelion.atlassian.net/servicedesk/customer/portals).