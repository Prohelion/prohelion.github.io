---
title: Prohelion Cloud Connect
order: 9
---

# Prohelion Cloud Connect

Profinity provides support for sharing your CAN Bus data in a secure manner to your whoever you want (including teams of people) in near real time via Prohelion Cloud Connect.

When you add a Cloud Connect device to your profile Profinity will start automatically streaming CAN Bus data to the Prohelion Cloud, it will also provide you with a URL that when shared will automatically connect another Profinity instance to the same stream and display your profile.  Within seconds you can be sharing and collaborating your CAN Bus with anyone or teams of people, anywhere in the world, using an encrypted and compressed CAN Bus stream.

Prohelion Cloud Connect is a great solution for allow teams to work remotely and jointly analyse and diagnose problems.  

A core concept of Prohelion Cloud Connect is the idea of the transmitting node and the receiving nodes.

### Transmitting Node

When Prohelion Cloud Connect is added to a profile, the machine on which this first occurs is marked as the transmitting instance of Profinity. Any data transmitted in to this Prohelion Cloud Connect stream must be transmitted from this instance of Profinity.

Sharing the Cloud Connect URL not only shares the data it allow enables a copy of the transmitting nodes [Profile](10_Profiles.md) to be sent to anyone who has the URL and is using it to connect to via Profinity.

If a change is made to the [Profile](10_Profiles.md) on the transmitting node, for example a new device is configured or a change is made to one of hte configuration parameters, then that change is automatically sent to each of the receiving nodes of Profinity and within a few seconds you should see the profiles of the receiving nodes update as well.

### Receiving Node

A receiving node is one that has used a received URL to connect to the Prohelion Cloud Connect Steam.

If you are monitoring a CAN Bus stream on a receiving node, then the [Profile](10_Profiles.md) will be automatically sent to you, but the Profile will be read only.  On the receiving node you will often find devices have they grey dot rather than a green dot.  This is because devices like [loggers](35_Logging_Replaying_CAN_Bus_Messages.md) and [Adapters](20_CAN_Bus_Adapters.md) are disabled by default as if they ran then the behaviours would not make sense, for example an adapter can not run locally on the receiving node as their is likely no Can BUS adapter for it to connect to.

## Cloud Connect Transmission Protocol

CAN Bus is a protocol designed to be used to highly reliable very low latency networks such as vehicle control networks, as such it is a noisy and chatty network protocol, not well suited to being transmitted over long distances or a potentially low speed internet connection.

Prohelion Cloud Connect addresses this issue through a custom CAN Bas transmission protocol created by a code library we call the 'CANpressor'.  The CANpressor takes advantage of a couple of behaviours in CAN Bus traffic to substantially reduce the amount of traffic that needs to be sent.  You can adjust the behaviours of the CANpressor in Profinity to tune the performance of the transmission and find a balance between performance and the fidelity of the data being sent.

CAN Bus has a number of behaviours that lend itself to compression.

1. CAN Bus packets are often sent many times a second.  However, the data being transmitted often doesn't change that much or at all.  Consider a battery voltage CAN Packet being sent 10 times a second, it's quite lightly that the voltage will not change from one packet to the next.

2. For many situations we don't need to capture every CAN Packet.  It might be perfectly acceptable to send all the last values of all the packets at regular intervals and send those most recent values rather than every single value.

The CANpressor uses a combination of approaches as well as a more efficient transmission structure and traditional zip compression to substantially reduce the amount of data required to be transmitted to send CAN Bus data.  

Using these approaches in a typical configuration **we can achieve around a 200x reduction** in data over traditional CAN Bus logs.  This level of compression allows us to transmit CAN Bus in near real time over low latency links.

When a CANpressed stream is received by a Profinity instance via a Prohelion Cloud Connect data stream the CANpressor simply works in reverse to decompress the stream and replay it locally.

However, there are some downsides to this approach.  Unless the sampling rate for the CANpressor is set at the same frequency as the most frequently sent CAN Packet, then the CANpressor will not capture every packet being transmitted.  This is generally not an issue as CAN Bus by its nature transmits constantly, but if you need to capture absolutely every packet then the sampling rate needs to be very low. 