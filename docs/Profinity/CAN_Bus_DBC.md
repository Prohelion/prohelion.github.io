---
title: CAN Bus DBC
tags: [Profinity, CAN Bus, CAN Bus DBC, DBC, Overview]
keywords: Profinity, CAN Bus, CAN Bus DBC, DBC, Overview
last_updated: July 24, 2022
permalink: Profinity/CAN_Bus_DBC.html
folder: Profinity
order: 7
---

# CAN Bus DBC

[DBC](http://socialledge.com/sjsu/index.php/DBC_Format) is a file format that can be used to describe the format and nature of CAN Bus data.  With a DBC file CAN data can be understood more clearly and broken down in to Signals and Messages, the fundamental building blocks of a DBC file.

For the moment, Profinity provides a DBC Viewer that can be used to take a DBC file and will show the CAN Bus traffic travelling through the Profinity system as Messages and Signals.

![CAN DBC Viewer]({{site.dox.baseurl}}/images/Profinity/dbc_canbus_message.png)

To use the DBC viewer with a third party DBC file you need to [create a new item](Adding_New_Items.html) in your [Profile](Profiles.html) and in the configuration properties for that new item provide the DBC file.  

Once this has been done then you will see the item in your profile and by right mouse clicking on it you can access information about its Messages and Signals.

Many of the other components supported by Profinity such as the [Elmar Solar MPPT](Elmar_Solar_MPPT.html) and the [Tritium WaveSculptor](Tritium_WaveSculptor.html) have support for DBC built in to the component and also allow you to view Messages and Signals, without requiring a separate DBC file.