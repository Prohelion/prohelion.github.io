---
title: CAN-Ethernet Bridge User Manual
description: Documentation for the Prohelion Vehicle Communications protocol
tags: [Prohelion, Profinity, CAN Bus Tools, Driver Controls]
keywords: Prohelion, Profinity, CAN Bus Tools, Driver Controls
permalink: CAN_Bus_To_Ethernet_Bridge/CAN-Ethernet_Bridge_User_Manual/Overview.html 
folder: CAN_Bus_To_Ethernet_Bridge/CAN-Ethernet_Bridge_User_Manual
order: 0

# Hero section
hero:
    title: Fix Me (TODO)
    text: Developing an Electric Vehicle? The Prohelion Driver Controller Unit is designed to give you a head start with an off the shelf control platform to get you driving sooner.
    background_image: /images/Prohelion_Battery.jpg
    buttons: # Add buttons below, there are examples with all available options
        - label: Order a Prohelion Driver Control
          url: https://www.prohelion.com/shop/accessories/ev-driver-controls/
          external_url: true 
          style: filled
          icon: credit-card 
---

# CAN-Ethernet Bridge User Manual

This document describes the usage of the Prohelion CAN–Ethernet bridge, including the accompanying configuration software.

i

The Prohelion CAN–Ethernet bridge allows easy access to a CAN bus from a PC. No installation is required, so the device can be used with any PC with an Ethernet interface. Furthermore, an already present Ethernet network can be used to route CAN messages: with a bridge connected to a router on the network, all PCs attached to that router will become part of the virtual CAN bus. It is also possible to combine multiple physically separate CAN buses into one virtual bus, or use them as separate virtual buses on the same network.

## CAN Bridge Hardware

The CAN-Ethernet bridge uses the standard CAN bus pinout on the male DB9 connector.  Refer to the [datasheet]() for the specifications on this connector.  

