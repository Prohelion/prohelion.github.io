---
title: Eternet Protocols
description: Documentation for the Prohelion Vehicle Communications protocol
tags: [Prohelion, Profinity, CAN Bus Tools, Driver Controls]
keywords: Prohelion, Profinity, CAN Bus Tools, Driver Controls
permalink: CAN_Bus_To_Ethernet_Bridge/CAN-Ethernet_Bridge_User_Manual/Ethernet_Protocols.html 
folder: CAN_Bus_To_Ethernet_Bridge/CAN-Ethernet_Bridge_User_Manual
order: 1
---

# Ethernet Protocols 

By default, the bridge transmits CAN message over Ethernet via multicast UDP/IP packets. This protocol provides the best match with the broadcast architecture of physical CAN networks, whereby a packet sent by one node can be received by all other nodes connected to the network.  

However, UDP is an unreliable protocol, which means that messages can get lost and the order of messages can change.  In general, given the relatively high bandwidth of most modern network connections, such transmission errors are rare; however, in certain applications when lossless communications are required (e.g. when transmitting data streams over CAN) the unreliable nature of UDP may not be acceptable.  In these situations, it is possible for a bi-directional TCP/IP connection to be made to a particular CAN–Ethernet bridge, thereby ensuring the reliability of the virtual section of the CAN–Ethernet network.  The downside of using this TCP/IP link is that by definition it is a point-to-point connection, and any data sent or received will not be visible to other nodes on the virtual network.  Also, each bridge supports only a single simultaneous TCP/IP connection.

