---
title: Virtual CAN Bus Adapter
---

# Prohelion Virtual CAN Bus Adapter

The Prohelion Virtual CAN Bus Adapter is a special type of adapter in Profinity in that it is designed to relay information to one or more other CAN adapters, while presenting itself to other clients as a Tritium / Prohelion adapter that can be connected to.

In the diagram below, a client on the left connects to the Virtual Adapter which is being used in conjunction with a Peak USB adapter to provide connectivity to the actual CAN Network.  Traffic is routed bi-directionally.

<figure markdown>
![Virtual Adapter](../../images/VirtualAdapter.png)
<figcaption>Virtual Adapter</figcaption>
</figure>

The Virtual Adapter serves an important role in helping tools that have previously been developed to support the Tritium and Prohelion CAN to Ethernet bridges, in the absence of an actual physical bridge. Instead, a different CAN connection technology such as SocketCAN or the Peak USB adapter can be used to actually connect to the CAN network, and the Virtual Adapter supports connectivity to the legacy technologies.

To add a Virtual Adapter to your configuration, simply add one to your Profile and select which `Network Protocol` will be used along with the `Bridge ID` for your configuration.

!!! info "Setting the Virtual Bridge IP Address"
    As the Virtual CAN Bridge is running inside Profinity, the IP address of the Virtual Bridge Adapter should be set at an OS level on that machine, it cannot be changed remotely via the CAN Bridge Config tools or Profinity, only the network interface can be selected.

!!! warning "Take care with your BridgeID"
    Having two bridges with the same ID on a single network causes the two bridges to start relaying data from one bridge to the other bridge.  This is a designed behaviour that allows to separate CAN bus networks to be spanned over Ethernet.  Just be aware of it when using the Virtual Adapter, see the [CAN to Ethernet documentation](../../../../CAN_Bridge/User_Manual/index.md)</a> for more information.

Generally, the configuration options for the Virtual Bridge are similar to that of the Tritium bridge.  

However, there are several key areas in which the virtual bridge behaves differently than the physical bridge and these are noted below.

## Multi-Protocol Support

Tritium and Prohelion CAN to Ethernet Bridges have been shipped in two versions that speak generally incompatible protocols v1 and v2.  More recent bridges were v2, but we still see lots of v1 bridges around from older customers. 

Tritium software tools where generally shipped in either a v1 or v2 variant to talk the correct protocol version, which means that a v1 Bridge, could not talk to a v2 version of the software.

The Virtual Bridge resolves this issue by speaking both the v1 and v2 protocol at the same time.  It does this by representing itself as two bridges one a v1 bridge and the other a v2.  The older tools will generally discover the version of the bridge that that can speak to.

<figure markdown>
![Multi-Protocol Support](../../images/MultipleProtocol.png)
<figcaption>Multi-Protocol Support</figcaption>
</figure>

One very useful scenario for the Virtual Bridge is to use it in conjunction with a physical v1 bridge to talk to tools that were designed for the v2 protocols.  

In the scenario below Tritium v1 Bridge is front ended by the Virtual adapter / router, allowing it to communicate with tools that support the v2 protocol.

<figure markdown>
![v1 and v2 Protocol Support](../../images/v1v2Protocol.png)
<figcaption>v1 and v2 Protocol Support</figcaption>
</figure>

## Multi-Client TCP Support

The physical bridge can only handle a single client at a time in TCP mode.  The virtual bridge can handle multiple clients simultaneously.  This allows the virtual bridge to act as a form of TCP based CAN Bridge server, where many clients can connect at once over TCP and sustain the connection to get CAN data from this interface.  This may be a useful tool for people looking to establish real time CAN monitoring in remote locations.

<figure markdown>
![Multi-Client Support](../../images/MultipleVirtualAdapter.png)
<figcaption>Multi-Client Support</figcaption>
</figure>

