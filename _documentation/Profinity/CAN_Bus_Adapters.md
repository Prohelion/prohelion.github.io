---
title: CanBUS Adapters
tags: [Profinity, CanBUS, CanBUS DBC, DBC, Overview]
keywords: Profinity, CanBUS, CanBUS DBC, DBC, Overview
last_updated: November 3, 2020
permalink: Profinity/CAN_Bus_Adapters.html
folder: Profinity
order: 2
---

# CanBUS Adapters

An adapter is the technology that you use to connect Profinity to your CAN Bus network.  Profinity supported adapters include the [Prohelion](www.prohelion.com) and Tritum CAN Bus bridges as well as Socketcan using the [SocketCanD](https://github.com/linux-can/socketcand) technology.

Adapters can be added in one of two ways, either via Auto Discovery or Manually.

## Adapter Auto Discovery

The supported CAN Bus adapters can be automatically found via the Auto Discovery mechanism.  If an adapter is defined and visible on the network then clicking the CAN Adapters button on the menu or right clicking on the Profile and selecting 'Add Adapter Via Autodiscovery' will work.

In the Autodiscovery window you will find all of the adapters that are currently visible to Profinity.  If your adapter does not show up here then you may have configuration issues that need to be addressed, check the [CAN Adapter FAQ](CAN_Adapter_FAQ.html) for more information

![Add an Adapter via AutoDiscovery]({{site.dox.baseurl}}/images/Profinity/add_adapter_autodiscovery.png)

If your adapter cannot be found or is not currently on the network, there is always the option to configure your adapter manually.  This can be done by right mouse clicking on the profile and select 'Add New Item' and then an adapter type or if you have an adapter already configured you can right mouse click on the adapters folder and 'Add an Adapter Manually'

![Add an Adapter]({{site.dox.baseurl}}/images/Profinity/add_adapter.png)

Once your adapter has been added to the Profile then the colour of the circle indicates the health of the adapter.  Ideally your adapter should have a green circle, the colour signals for the adapters are as follows;

| Colour | Meaning |
| ------ | ----------------------------------------------------- |
| Green  | Good, adapter is connected and we are getting data    |
| Yellow | Warning, adapter is connected but no data is arriving |
| Red    | Error, see the logs for more details                  | 
| Grey   | N/A, adapter is not connected                         |

