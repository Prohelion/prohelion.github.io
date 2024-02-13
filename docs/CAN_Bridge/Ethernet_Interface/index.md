---
title: Overview
description: Documentation for the Prohelion Vehicle Communications protocol
---

# CAN-Ethernet Bridge Ethernet Interface

This document describes the Ethernet interface to the Prohelion CAN-Ethernet bridge device.  This information is primarily aimed at advanced users who wish to communicate with the bridge using custom or 3<sup>rd</sup> party software.

The bridge supports bi-directional CAN-Ethernet bridging using both UDP and TCP protocols.  UDP is the default protocol, and should be used for normal broadcast CAN packets.  TCP mode should be used when a reliable point-to-point connection is required between the bridge and a single network device, for example when exchanging a stream of data via the CAN-Ethernet network.  The bridge can only support a single TCP connection at any time.

