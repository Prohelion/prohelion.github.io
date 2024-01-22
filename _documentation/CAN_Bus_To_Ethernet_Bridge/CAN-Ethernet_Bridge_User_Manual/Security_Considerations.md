---
title: Security Considerations
description: Documentation for the Prohelion Vehicle Communications protocol
tags: [Prohelion, Profinity, CAN Bus Tools, Driver Controls]
keywords: Prohelion, Profinity, CAN Bus Tools, Driver Controls
permalink: CAN_Bus_To_Ethernet_Bridge/CAN-Ethernet_Bridge_User_Manual/Security Considerations.html 
folder: CAN_Bus_To_Ethernet_Bridge/CAN-Ethernet_Bridge_User_Manual
order: 2
---

# Security Considerations

Both multicast UDP and TCP are insecure protocols.  If the appropriate steps are not taken in the configuration of the network that a bridge is attached to, this could result in a malicious party gaining access to devices connected to the physical CAN network. Therefore, it is important that you configure your network properly before connecting any device to your CAN bus. The most secure configuration procedures are:

1.	Disconnect from the Internet. Ensure that there is no connection between any PC in your network and the Internet.

2.	Configure your router. In most offices only one router has a connection to the Internet and all other traffic goes through this router. If this router is configured to block all traffic on the port used by the bridge  (default 4876), your CAN network will be separated from the Internet.

