---
title: ArrowPoint Troubleshooting 
tags: [ArrowPoint, Troubleshooting]
keywords: ArrowPoint, Troubleshooting
last_updated: November 22, 2019
summary:
sidebar: arrowpoint_sidebar
permalink: Arrow_SoftwareTroubleshooting.html
folder: ArrowPoint
---

## CANbus data is not appearing in the applications or tablet
This is by far the most common issue that we experience with the code and is unfortunately due to the nature of CANbus and particularly Windows OS.

CANbus is based on the UDP protocol, which is fire and forget and does not guarantee delivery, as such the packets often get 'lost'.  The best solution we have generally found to this is to disable any network adapter that is not required to run the system, this is particularly critical in a race environment.  Ideally your PC and tablets should only be connected or able to connect to one network which is tested and you know works.

To do this in Windows find your Network Connection and disable anything that is not required.  For example below this PC has both WiFi, Ethernet 5 (which is actually a docking station ethernet connection via USB) and Ethernet 2 a TAP or VPN connection.  Having all these connections running increases the chance that you UDP traffic is coming down or going up the wrong link.  Be careful disabling vEthernet connections as these are part of Docker and are required for it to run.

{% include image.html file="canbus_troubleshoot.png" alt="canbus_troubleshoot" caption="CANbus troubleshooting" %}

## Getting help with an Issue
If you are having an issue please let us know.  The best option is via GitHub where you can log a bug against the product that is giving you an issue.

* [https://github.com/Prohelion/ArrowPoint-Telemetry/issues](https://github.com/Prohelion/ArrowPoint-Telemetry/issues)
* [https://github.com/Prohelion/ArrowPoint-Tablet/issues](https://github.com/Prohelion/ArrowPoint-Tablet/issues)
* [https://github.com/Prohelion/ArrowPoint-Tablet/issues](https://github.com/Prohelion/ArrowPoint-Tablet/issues)


If you know the solution to your issue, please help us by forking the code and creating a fix.  You can find information on contributing to the code in the Contributing.md file that is located in the root directory of each product, here is a link to the ArrowPoint Telemetry one [https://github.com/Prohelion/ArrowPoint-Telemetry/blob/master/CONTRIBUTING.md](https://github.com/Prohelion/ArrowPoint-Telemetry/blob/master/CONTRIBUTING.md)

{% include links.html %}