---
title: Overview
tags: [Profinity, CAN Bus, CAN Bus DBC, DBC, Overview]
keywords: Profinity, CAN Bus, CAN Bus DBC, DBC, Overview
last_updated: November 3, 2020
permalink: Profinity/Overview.html
folder: Profinity
order: 0

# Hero section
hero:
    title: Profinity
    text: Prohlelion's CAN Bus, Battery, Solar and DBC Management Solution
    background_image: /images/Prohelion_Battery.jpg
    buttons: # Add buttons below, there are examples with all available options
        - label: Download (for Windows)
          url: https://github.com/Prohelion/Profinity/releases/latest/download/Profinity.install.msi
          external_url: true 
          style: filled
          icon: download 
---

# Introduction to Profinity

Profinity is a system management platform developed by Prohelion to manage our products and other systems built around a CAN Bus based architecture.

Profinity is built around the concept of [profiles](Profiles.html), which is a set of configured devices in your system.  By switching between profiles you can support multiple configurations across different sites of different combinations of technologies.

![Profinity]({{site.dox.baseurl}}/images/Profinity/profinity_overview.png)

Profinity can connect to CAN-Ethernet Bridges, which translate CAN Bus traffic from your network to the PC, you can send and receive and view CAN Bus messages either raw or using DBC, log messages and replay them.  You can also use Profinity to share CAN Bus data from your system to your team, either in near real time via a [Prohelion Cloud Connect](Prohelion_Cloud_Connect.html) data stream, or via the logs. 

On top of this Profinity provides specialised tools for managing [Prohelion Batteries](Prohelion_Batteries.html), MPPT systems from [Elmar Solar](Elmar_Solar_MPPT.html) and [Tritium WaveSculptors](Tritium_WaveSculptor.html) as well as any device that can be defined by a CAN DBC file.  Over coming releases we will be extending our supported devices to include a range of chargers and other tools that are used in industry.

If you require support or assistance, please [Contact Us](https://www.prohelion.com/contact-us/) via the Prohelion Website or you can log bugs or requests for improvement on our [GitHub issues page](https://github.com/Prohelion/Profinity/issues)