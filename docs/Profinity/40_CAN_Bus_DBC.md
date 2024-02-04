---
title: CAN Bus DBC
order: 7
---

# CAN Bus DBC

[DBC](http://socialledge.com/sjsu/index.php/DBC_Format) is a file format that can be used to describe the format and nature of CAN Bus data.  With a DBC file CAN data can be understood more clearly and broken down in to Signals and Messages, the fundamental building blocks of a DBC file.

For the moment, Profinity provides a DBC Viewer that can be used to take a DBC file and will show the CAN Bus traffic travelling through the Profinity system as Messages and Signals.

![CAN DBC Viewer](images/dbc_canbus_message.png)

To use the DBC viewer with a third party DBC file you need to [create a new item](15_Adding_New_Items.md) in your [Profile](10_Profiles.md) and in the configuration properties for that new item provide the DBC file.  

Once this has been done then you will see the item in your profile and by right mouse clicking on it you can access information about its Messages and Signals.

Many of the other components supported by Profinity such as the [Elmar Solar MPPT](85_Elmar_Solar_MPPT.md) and the [Tritium WaveSculptor](80_Tritium_WaveSculptor.md) have support for DBC built in to the component and also allow you to view Messages and Signals, without requiring a separate DBC file.