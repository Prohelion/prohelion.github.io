---
title: Virtual CAN bus Adapter
description: "Use a virtual CAN adapter to relay traffic between CAN devices and provide protocol bridging."
---

# Prohelion Virtual CAN bus Adapter

The Prohelion Virtual CAN bus Adapter is a special type of adapter in Profinity in that it is designed to relay information to one or more other CAN adapters, while presenting itself to other clients as a Tritium / Prohelion adapter that can be connected to.

In the diagram below, a client on the left connects to the Virtual Adapter which is being used in conjunction with a Peak USB adapter to provide connectivity to the actual CAN Network.  Traffic is routed bi-directionally.

<figure markdown>
![Virtual Adapter](../../images/VirtualAdapter.png)
<figcaption>Virtual Adapter</figcaption>
</figure>

The Virtual Adapter allows tools that were developed for the Tritium and Prohelion CAN to Ethernet bridges to be used in the absence of a physical bridge. A different CAN connection technology, such as SocketCAN or the Peak USB adapter, connects to the CAN network, and the Virtual Adapter provides connectivity for the legacy tools.

To add a Virtual Adapter to your configuration, add one to your Profile and select the `Network Protocol` to use along with the `Bridge ID` for your configuration.

!!! info "Setting the Virtual Bridge IP Address"
    As the Virtual CAN Bridge runs inside Profinity, the IP address of the Virtual Bridge Adapter is set at an OS level on that machine. It cannot be changed remotely via the CAN Bridge Config tools or Profinity, which can only select the network interface.

!!! warning "Two Bridges With the Same Bridge ID Relay Data Between Each Other"
    Having two bridges with the same ID on a single network causes them to start relaying data from one bridge to the other. This is designed behaviour that allows two separate CAN bus networks to be spanned over Ethernet, and it must be taken into account when using the Virtual Adapter. See the [CAN to Ethernet documentation](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/User_Manual/index.md) for more information.

The configuration options for the Virtual Bridge are generally similar to those of the Tritium bridge, but the virtual bridge behaves differently from the physical bridge in several areas, which are noted below.

## Multi-Protocol Support

Tritium and Prohelion CAN to Ethernet Bridges have been shipped in two versions that speak generally incompatible protocols, v1 and v2. More recent bridges were v2, but many v1 bridges remain in use by existing customers.

Tritium software tools were generally shipped in either a v1 or a v2 variant to talk the correct protocol version, which means that a v1 Bridge could not talk to a v2 version of the software.

The Virtual Bridge resolves this by speaking both the v1 and v2 protocols at the same time, representing itself as two bridges, one v1 and the other v2. The older tools generally discover the version of the bridge that they can speak to.

<figure markdown>
![Multi-Protocol Support](../../images/MultipleProtocol.png)
<figcaption>Multi-Protocol Support</figcaption>
</figure>

A useful scenario for the Virtual Bridge is to use it in conjunction with a physical v1 bridge to talk to tools that were designed for the v2 protocol.

In the scenario below, a Tritium v1 Bridge is front ended by the Virtual Adapter / router, allowing it to communicate with tools that support the v2 protocol.

<figure markdown>
![v1 and v2 Protocol Support](../../images/v1v2Protocol.png)
<figcaption>v1 and v2 Protocol Support</figcaption>
</figure>

## Multi-Client TCP Support

The physical bridge can only handle a single client at a time in TCP mode, whereas the virtual bridge can handle multiple clients simultaneously. This allows the virtual bridge to act as a form of TCP based CAN Bridge server, where many clients connect at once over TCP and sustain the connection to get CAN data from the interface, which is useful for establishing real-time CAN monitoring in remote locations.

<figure markdown>
![Multi-Client Support](../../images/MultipleVirtualAdapter.png)
<figcaption>Multi-Client Support</figcaption>
</figure>
