---
title: Networking Introduction
tags: [Profinity, CAN Bus, CAN Bus DBC, DBC, Overview, Adapter, Networking]
keywords: Profinity, CAN Bus, CAN Bus DBC, DBC, Overview, Adapter, Networking
last_updated: November 27, 2020
permalink: FAQs/Networking_FAQ.html
folder: FAQs
order: 1
---

## CAN Bus Adapter Networking

By far one of the most common questions we get asked is about how to connect your CAN Bus Adapter to the network and how to diagnose common CAN Bus Adapter issues.

Before starting on your CAN Bus Adapter journey it's worth understanding a couple of important points about your CAN Bus adapter.  

Firstly Prohelion's Profinity tool currently supports two different types of adapters, a Tritium Can to Ethernet bridge and [SocketCanD](https://github.com/linux-can/socketcand), which is a network aware addition to the commonly used, open source SocketCan libraries.

The way these two adapters work is quite different, while they both can translate a CAN Bus network to be read on a IP network like the one your computer attaches to, the Tritium Can to Ethernet bridge mainly uses UDP and Socket Can mainly uses TCP.  This makes a big difference to how they work, so lets first spend a couple of minutes understanding UDP vs TCP.

### UDP vs TCP

[UDP or User Datagram Protocol (Wikipedia)](https://en.wikipedia.org/wiki/User_Datagram_Protocol) is a connectionless communications protocol that's commonly used in situations where error correction or reliability are less important than performance.  

While you can read up on the Wikipedia link about all the technical details, the easiest way to think about UDP is it's a connectionless protocol so the sender of traffic will send the data unaware of if anything is listening or not.  It's like the adapter is shouting out CAN Bus message in a dark room unaware if anyone is actually listening to it.  Both the Tritium adapter and SocketCanD adapter use UDP Multicast but in different ways (see the detail on the adapters for more information).

[TCP or Transmission Control Protocol (Wikipedia)](https://en.wikipedia.org/wiki/Transmission_Control_Protocol) is often referred to as TCP/IP or TCP over the [Internet Protocol (Wikipedia)](https://en.wikipedia.org/wiki/Internet_Protocol).  It is quite different to UDP in that TCP is reliable and works in a Client / Server architecture.  In TCP the 'Client' connects to the 'Server' and commences a conversation just like two people having a conversation.  

In this sense TCP is fundamentally different to UDP, the 'Client' (Profinity) knows the 'Server' (the CAN Bus adapter) is present and communication is reliable.  Rather than shouting in a dark room, TCP is like having a conversation, each party is aware that the other party is listening and the conversation flows naturally when we all follow the agreed protocols.

### Subnets

Another concept that is important to understand when dealing with networks and that is concept of a [Subnet (Wikipedia)](https://en.wikipedia.org/wiki/Subnetwork).  When you connect to a network your network adapter in your computer / tablet / phone is assigned an IP address that typically is made up of four digits separated by a . for example

    192.168.12.103

This is what we technically call a IPv4 network address and its purpose is to help the various routers that make up your network and the internet at large to route traffic to and from your device.  Think if it as being like a phone number, these addresses are unique on your network and hence we can use it as an identifier to route network traffic to your device and no other device on the network.

If the first three digits of two IP address are the same, for example 192.168.12.103 and 192.168.12.110, then that tells the router that receives the message that both devices are connected to the same network and hence all the router needs to do is to take the message that it receives and pass it on to the other device.  If the IP address is different, for example 192.168.12.103 and 192.168.10.10 then the router needs to route the message by finding the device that is looking after the 192.168.10.x range and sending the message to it first, that device then sends the message to the device on 192.168.10.10.

At a very basic level, this is how the internet works.  You can see it working by using the traceroute (or tracert) tool, which shows how a message gets from one machine to another.  Try the following command to see how your laptop sends a message to Google and all the steps along the way as the routers pass the message up the chain looking for the google servers.

**On Windows**

    tracert 8.8.8.8

**On Linux / Mac**

    traceroute 8.8.8.8

As you can see when you run this test, sometimes it takes many hops for the message to make its way from one machine to another.

### DHCP vs Static IP Address

The final concept that is worth understanding is the [Dynamic Host Configuration Protocol or DHCP](https://en.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol).

There are two ways that you can get an IP Address, either you set explicitly set the address yourself (this is called a static IP) or you can use DHCP (this is called a dynamic IP address).  When you have a DHCP server on your network and you connect to the network, if you don't have an IP address the DHCP server will automatically assign you one in a pre-configured range.

Most of the time when you are using the internet via Wifi or a cable this is what's happening.  You connect to the Wifi access point, the router recognises that you are new device and allocates you an IP address in the range that it manages, from there it can start routing your traffic and you are on your way!

