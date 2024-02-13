---
title: Common Problems & Solutions
---

## Common Bridge Problems & Solutions

#### Firewall Requirements

The Tritium and Prohelion CAN-Ethernet Bridges need to have certain ports open on the firewall in order to receive traffic and heartbeats from the bridges without issues.

*Fix: Add the following ports to your firewall to allow the traffic through. The easiest way to actually do this is just to install Profinity as it does it automatically as part of the install process.*

    UDP: Port 4876
    TCP: Port 4876

*If you are using SocketCanD which is also supported by Profinity then you need to also add*

    UDP: Port 42000

#### TCP - Adapters not in the same subnet on direct connection or when connected via a hub.

If your PC and Bridge are not in the same subnet (they don't have the same first three digits) and you are on a direct wired connection or a hub. Then the networking stack does not know how to route traffic between the PC and the CAN-Ethernet Bridge.

*Fix: Adjust the IP addresses on either the PC or the CAN-Ethernet Bridge to get them on to the same subnet. Use Static IP addresses to ensure that this change remains in place after restarts.*

#### Unable to set the Bridge IP to be static as you cannot get a TCP connection to it

If the PC and the Bridge have a different subnet then it is often not possible to connect to the bridge via TCP.  Connecting to the bridge via TCP is required in order to set its IP address.  

**As such it is possible to end up in a situation where you cannot change the bridge IP address but need to in order to be able to change the bridge IP address!**

*Fix: There are two ways to solve this issue*

1. *Use the direct cable connection configuration outlined in [Supported Network Setups](40_Supported_Network_Setups.md), resetting both the IP Address on the bridge (by pushing the reset button) and the IP Address on the PC by running ipconfig /release followed by ipconfig /renew in a command window.  You should now be able to AutoDiscover the adapter and change its IP Address to something you want using Profinity.*

2. *Manually change the IP Address of the network adapter on your PC to a static IP address that matches the subnet of the bridge.  You can see the subnet of the bridge in the AutoDiscovery window.  Once the subnets are the same you should be able to connect to the bridge in Profinity and change its IP address to what you want it to be.  Once that is done, change your PC's IP address back.*

#### WiFi that does not span UDP across subnets

Your CAN-Ethernet Bridge is connected to a router and your PC or laptop is connected via WiFi. The adapter cannot be auto discovered, or if it does get discovered it tends to work unreliably and packets seem to disappear.

*Fix: Your WiFi router is not handling broadcast UDP correctly. Make sure that your WiFi router supports broadcast UDP and if it does set it up to be enabled. Use UDP broadcast testing tools to ensure that it works as expected or the CAN-Ethernet Bridge and Profinity AutoDiscovery as outlined above in the networking section.*

#### The Can Packets are just not showing up in the Tritium tools

The bridge is connect the packet are showing up in WireShark but for some reason they are not showing up in the Tritium tools. 

This is a very common problem, that is usually caused by the fact that the Tritium tools have connected to the wrong network adapter on the PC. The Tritium tools will only connect to one network adapter and take direction from the OS which one to use. If they are provided the wrong network adapter by the OS then while traffic might be coming in on your ethernet connection, if the tool is connected to your WiFi connection, nothing is going to show up.

*Fix: Disable every network adapter on the PC apart from the one you want to use. This is achieved by right clicking on the adapter in the control panel and disabling it. By leaving just the correct adapter active, this forces the Tritium tools to use the right network adapter as there is only one option they can use. This is generally not an issue with Profinity as it works differently and uses the right adapter based on information provided during AutoDiscovery.*

#### Virtualisation Software

Profinity is not working well or at all in a visualised environment such as VmWare Fusion.

*Fix: Virtualisation tools like VmWare fusion create virtual IP stacks to virtualise network adapters. All of this can be very problematic when trying to get UDP to work. If possible explicitly connect your virtual network adapter to a physical ethernet (not WiFi, that just complicates things even further) on your host machine.*

Profinity can work in this model, in fact we develop and test Profinity on visualised machines, but it’s not the most reliable way to get it to work.*

#### Multiple TCP clients on one bridge

The Tritium CAN-Ethernet Bridge can only support a single TCP connection at any one time, a second TCP connection will fail.
 
*Fix: If you need to have multiple connections to the CAN-Ethernet Bridge at once then use UDP, which can support this. The CAN-Ethernet Bridge will only support one TCP connection at a time.*

#### Rapid TCP Connect / Disconnect

Rapidly connecting and disconnecting the CAN-Ethernet Bridge in TCP mode can cause the bridge to start rejecting TCP connection requests. This is a self preservation mechanism designed to prevent the bridge from being overloaded from a deliberate or accidental connection flood.

*Fix: If this occurs wait for a short period of time (30 seconds to a minute) and the bridge will start accepting connections again.*

#### Windows or Bridge Network Stack issues

Under very unusual circumstances the Windows network stack or bridge network stack can get in a tangle and just not accept packets or connections. This seems to mainly occur for us in visualised environments and may not be related to the OS network stack but rather the virtualisation stack.

*Fix: Power cycle the CAN-Ethernet Bridge and if that does not work reboot the PC. If you are doing this a lot it is likely not the primary issue and you should probably read the article end to end to see if you can find out what the root cause really is.*