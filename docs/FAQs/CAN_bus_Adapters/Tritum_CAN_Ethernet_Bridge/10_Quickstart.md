---
title: Bridge Quickstart
order: 1
---
  
## Tritium Bridge Quickstart

There is a lot of information in this article, if you just want to get started quickly then here is the place to start. 

Just be aware, to get the most out of the bridge it’s worth reading right through the other sections as well.

### Getting Started

Here is a simple guide to getting you started, you can also use these steps if you get in to trouble and need to reset your CAN-Ethernet Bridge for some reason.

    1. Plug your CAN-Ethernet Bridge in to a 12v power source 
    2. Install Profinity on your PC
    3. Connect the PC and bridge via one of the two approaches below
    4. Make sure the CAN-Ethernet Bridge and the PC are in the same subnet.

It really is that simple but it's worth pointing out that **step 4 is where 95% of all issues come from**.

### The two best ways to connect the Bridge and PC

This really depend on if you have a router with a DHCP server or not. Having a router with DHCP and a PC that can support wired ethernet is going to cause you less issues, so if you have this setup use it now.

**Option 1 - Direct Cable Connection, or using a network hub**

This is the most common setup that we see people attempt with the CAN-Ethernet bridge, but it is also the setup most fraught with potential problems.  

Why?  Because to get this setup working with the bridge and the PC ending up in the same subnet, **we are relying on IP allocation failing** and things like networks do not always 'fail' in predicable ways.

The 169.x.x.x address range is the IP range that network adapters use when they have no idea what IP address they should be using.  

Both the CAN-Ethernet Bridge and your Windows PC will automatically assign themselves an IP address in this range if they do not have static IP addresses and can't reach a DHCP server.  This works a lot of the time as the PC and Bridge end up by default in the same subnet, but if either device already has an IP then you can end up with this approach not working, **because in that case the bridge and the PC are not in the same subnet**

    1. Plug the PC and CAN-Ethernet Bridge together directly or via the hub
    2. Press the reset button on your CAN-Ethernet Bridge
    3. The bridge will get an IP in the 169.x.x.x or 168.x.x.x range
    4. Your PC should also get an IP in the same range if not ...
    5. Run ipconfig /release and ipconfig /renew in a command window
    6. Using AutoDiscovery in Profinity to locate the CAN-Ethernet Bridge
 
Once you have it working, we would generally recommend that you take this opportunity set a static IP address on your CAN-Ethernet Bridge and your PC network adapter. 

Both IP address should have the same first three digits and have their subnets set to 255.255.255.0. This will ensure they work reliably each time you connect them going forwards as they are now in the same subnet.

You can use the automatic IP addresses assigned in step 3, but it’s not going to give you reliable consistent behaviours.

**Option 2 - If you have a router with DHCP enabled and two ethernet cables**

This is another good option to use if you want reliable behaviours out of your configuration.

    1. Plug your CAN Bus bridge and your PC in to the router with cables.
    2. Press the reset button on your CAN-Ethernet Bridge
    3. Both devices will be assigned an IP address from the DHCP server.
    4. Use Profinity and with AutoDiscovery locate the bridge.

If you are going to use this network all the time then this is all that is required. But we would again suggest taking this opportunity to set Static IPs on at least your bridge using Profinity, if for some reason you do not want to set static IPs then use UDP rather than TCP in your profile as in TCP mode as **the DHCP server might assign your CAN-Ethernet Bridge a different IP address in the future.**

If you need a different configuration, there are other network configurations that will work and we have further information in the [Supported Network Setups](40_Supported_Network_Setups.md) section.
