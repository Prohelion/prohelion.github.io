---
title: Ethernet
description: Documentation for the Prohelion Vehicle Communications protocol
order: 2
---

# Ethernet

The CAN–Ethernet bridge provides a standard RJ-45 Ethernet jack, capable of operating at 10/100 Mbit/sec, with auto-crossover functionality.  It will operate either connected to a switch or hub, or directly connected to a PC for standalone applications.

The bridge has two modes of IP address configuration:

- __Auto IP:__ The bridge tries to acquire an IP address from a DHCP server on startup.  If this fails, it reverts to the AutoConf range of IP addresses.  Thus the bridge will operate both in a standard network setup (with DHCP), or when connected directly to a PC (point-to-point) application (AutoConf).

- __Static IP:__ The bridge uses its a static IP address which is configured through the bridge configuration tool. Use of the static IP address is recommended for point-to-point applications. The subnet mask of the bridge is automatically set to the default mask for the three classes of available IP ranges: A(255.0.0.0), B(255.255.0.0) and C(255.255.255.0)

By default, the bridge joins a multicast IP address at IP 239.255.60.60, and sends and receives UDP packets on port 4876.
