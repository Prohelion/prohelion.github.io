---
title: Overview
description: Documentation for the Prohelion Vehicle Communications protocol
tags: [Prohelion, Profinity, CAN Bus Tools, Driver Controls]
keywords: Prohelion, Profinity, CAN Bus Tools, Driver Controls
permalink: CAN_Bus_To_Ethernet_Bridge/CAN-Ethernet_Bridge_Ethernet_Interface/Overview.html 
folder: CAN_Bus_To_Ethernet_Bridge/CAN-Ethernet_Bridge_Ethernet_Interface
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

# CAN-Ethernet Bridge Ethernet Interface

This document describes the Ethernet interface to the Prohelion CAN-Ethernet bridge device.  This information is primarily aimed at advanced users who wish to communicate with the bridge using custom or 3<sup>rd</sup> party software.

The bridge supports bi-directional CAN-Ethernet bridging using both UDP and TCP protocols.  UDP is the default protocol, and should be used for normal broadcast CAN packets.  TCP mode should be used when a reliable point-to-point connection is required between the bridge and a single network device, for example when exchanging a stream of data via the CAN-Ethernet network.  The bridge can only support a single TCP connection at any time.

