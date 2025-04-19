---
title: Profinity Overview
---

# Prohelion Profinity V2

Profinity is a modern CAN bus management platform designed to enable the connection of CAN bus based solutions to modern Cloud, APIs and Big Data technologies.  

[Download Profinity V2 :material-download:](https://github.com/Prohelion/Profinity/releases/latest/download/Profinity.install.msi){ .md-button }

Profinity V2, completely updates the capabilities of Prohelion's Profinity suite by adding:

- Native run anywhere capabilities, use Profinity on your PC, Server, Embedded Device or run in the Cloud
- Fully web enabled user interface that runs on desktop, mobile or Kiosk.
- Full API integration to allow easy extensions to Profinity's features and to build your own custom applications
- Inbuilt Scripting support

<!-- Update this image -->
<figure markdown>
![Profinity](images/wavesculptor.png)
<figcaption>Profinity V2 - Showing a Motor Controller Dashboard</figcaption>
</figure>

Profinity is built around the concept of [Profiles](Getting_Started/Profiles.md), which is a set of configured devices in your system.  By switching between Profiles you can support multiple configurations across different sites or different combinations of technologies. The configuration of the system is largely driven by the Profinity GUI, but once configured, the solution can run as a service, providing continuous data streams off servers or embedded devices, or run from the cloud.

Profinity can connect to [CAN bridges](Components/Adaptors/CAN_Bus_Adapters.md), which translate CAN bus traffic from your network to the Profinity solution. You can send, receive, and view CAN bus messages either raw or using DBC, log messages and replay them. You can also use Profinity to share CAN bus data from your system to your team via cloud data logging platforms. 

Profinity provides specialised tools for managing [Prohelion batteries](Components/Battery_Management_Systems/index.md) and chargers, MPPT systems from [Elmar Solar](Components/MPPT/index.md), and [WaveSculptors](Components/Motor_Controller/index.md), as well as any device that can be defined by a CAN DBC file.  

### Profinity Server (Rest APIs, Web, and Docker)

As of Profinity 2, Prohelion has fully migrated to a modern container and API centric architecture.  You will find information on our [Restful APIs and Swagger Support](./APIs/index.md) in the documentation, as well as our out-of-the-box cloud connectivity for [InfluxDB and Prometheus](Components/Loggers/InfluxDB_Prometheus_Integration.md) to support cloud based Big Data capture and analytics of CAN bus based solutions. 

Profinity can be run native on Windows, Unix, MacOS and cloud (via Docker) from V2 onward, see the [Installation Guide](./Getting_Started/Installation/Windows_Installation.md) for more information on how to install Profinity.

If you require support or assistance, please [Contact Us](https://www.prohelion.com/contact-us/) via the Prohelion Website. You can also log bugs, or requests for improvement on our built in [Feedback Form](./Admin/Feedback.md).  

Support Requests should be submitted to the [Prohelion Support Portal](https://prohelion.atlassian.net/servicedesk/customer/portals).