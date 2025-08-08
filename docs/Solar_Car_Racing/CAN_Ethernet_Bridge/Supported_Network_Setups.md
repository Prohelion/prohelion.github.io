---
title: Supported Network Setups
---

The single most common issues we encounter with the CAN Bus bridges are network related. 

Here are the five possible setups we support and a quick guide to getting them going.  We have put them in recommended order based on what’s going to be the most reliable.

For all scenarios (apart from the last one), to confirm your bridge is correctly setup ensure that Profinity can Auto Discover your bridge.

If you have issues see the section on [Common Problems and Solutions](Common_Problems_And_Solutions.md) section.

**Remember: Static IP addresses, particularly on the CAN-Ethernet bridge are the best way to achieving consistent, reliable behaviours on your bridge. Use them whenever possible.**

### Direct Connect - RECOMMENDED
**CAN Bus bridge directly connected to your PC (no router)**

Set the IP addresses on both your CAN Bus bridge and the PC network adapter that you are using to connect to your bridge to be Static and in the same subnet (first three digits are the same, last digit is different).

For example PC: 192.168.16.60 (Subnet 255.255.255.0), CAN-Ethernet Bridge: 192.168.16.70 (Subnet: 255.255.255.0).

Note this setup is only going to be reliable time after time if you use Static IPs for both the PC the CAN Bus Bridge, if either of your adapters are set to use DHCP, it will not be reliable.

### Wired via Hub - RECOMMENDED
**CAN Bus bridge and PC connected via a wired network hub (no DHCP server)**

Use the same steps as having your bridge connected directly to your PC as above. In effect this is basically the same configuration. As above use static IP wherever possible to ensure reliable use.

### Wired via Router with DHCP - RECOMMENDED
**CAN Bus Bridge and PC connected via a wired network router (with a DHCP server)**

Allow the PC and Bridge to get their IP addresses via DHCP. If the bridge ends up with a strange IP address, press the reset button and let it try again. If the PC has a strange IP, make sure the PC network adapter is running with DHCP switched on, the go to a command prompt run the commands

    ipconfig /release
    ipconfig /renew

Finally check that you now have a valid IP address by running the command for your network adapter

    ipconfig

Even in this setup we would recommend using a Static IP for the CAN Bus bridge. It’s less important here that you use Static IP for the PC. 

Why the bridge only? Because Profinity needs to know the IP address of the Bridge for TCP mode and that is set in the profile. If the bridge changes IP addresses which can occur with DHCP over time, then Profinity will find it in UDP mode, but not TCP mode as the IP address in the profile will be wrong.

This setup is exactly what we use when developing Profinity, it works reliably if setup right. Just note when setting a Static IP address for the bridge that the DHCP server will have a range of addresses that it uses for DHCP (check your WiFi router for the range) you would set the static IP of the bridge to be outside that range so that you do not end up with the DHCP server setting another device to have the same IP as your bridge.

### Over WiFi with DHCP - ADVANCED
**CAN Bus Bridge connected via a router with WiFi (and a DHCP server)**

The CAN Bus bridge does not directly support connecting data via WiFi and must be connected via cable to a WiFi router, but it is possible to connect Profinity via WiFi using the WiFi adapter on your PC or laptop. If we are using our bridges in a mobile setup (for example motor sport), this is the setup we use.

Be aware however that this configuration has various potential ways it can cause you grief.

The behaviour of WiFi routers can vary wildly when it comes to broadcast UDP. Some will relay it, some will not. Some will relay on the ethernet cable side only and not on the WiFi side. Some will intermittently relay, creating a scenario where the bridge will appear to work intermittently.

**This is only a good setup if you have the right sort of WiFi equipment and your WiFi access point is setup to handle UDP Broadcasting reliably.**

Prohelion use Ubiquity and Juniper WiFi routers as these are commercial grade, highly configurable devices and are not particularly expensive. Everyday WiFi routers designed for home use, often do not have the necessary configuration options to get this setup working well.

To test if your WiFi router works you can use approaches like those covered in this article or the bridge and Profinity.

1. Plug in the CAN Bus bridge on the ethernet side of the router using a cable.
2. Connect your PC to the WiFi point of the router
3. Use Profinity with AutoDiscovery to connect to the router with a UDP connection
4. Ensure that you get consistent UDP traffic from the CAN Bus bridge and no drop outs.

If any of these steps don't work it is likely that your WiFi router is either not able to handle the UDP traffic in the manner required or is not configured to handle broadcast UDP in the right way.

### TCP via router or WiFi - ADVANCED
**Direct TCP Connection using a router or WiFi**

It is possible to set up the CAN Bus Bridge to be on a different subnet to Profinity and use TCP connections to span subnets and connect to the bridge. 

This is particularly useful in scenarios where the CAN-Ethernet Bridge is remote to the PC, for example you are connecting to a remote site or over a VPN. Note, Profinity Cloud Connect could also be used in this scenario and may be a simpler solution.

It is important to note that UDP will not work in this configuration as we are spanning subnets.   AutoDiscovery will also not work in this configuration as it is based on UDP heartbeats sent from the bridge and UDP is not going to work across subnets.

If you know the IP address of your bridge and your network is setup correctly you can connect by manually setting the IP address of the CAN-Ethernet Bridge in Profinity and setting the connection mode to TCP. To check if this connection will work you can try pinging the bridge from the PC, if a Ping from the PC to the CAN-Ethernet Bridge works as expected, then TCP connection should be possible.

Also check for green light on the TCP adapter in Profinity, this is also an indication that the connection is working and receiving data.