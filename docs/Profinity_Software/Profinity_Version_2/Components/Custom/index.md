---
title: Custom Components
---

!!! tip "Profinity V2 IS NOW IN GENERAL RELEASE"
    Profinity V2 is available now in General Release.  If you have any issues or feedback please report it via our support portal or via the Feedback form in the Profinity Admin menu.

Profinity provides the ability to create custom components that uses your DBC files and custom dashboard definitions to include any component that you may have in your system that runs CAN Bus in to your profile, to monitor those components and graph or log the data.

# CAN Bus DBC

[DBC](http://socialledge.com/sjsu/index.php/DBC_Format) is a file format that can be used to describe the format and nature of CAN Bus data.  With a DBC file CAN data can be understood more clearly and broken down in to Signals and Messages, the fundamental building blocks of a DBC file.

For the moment, Profinity provides a DBC Viewer that can be used to take a DBC file and will show the CAN Bus traffic travelling through the Profinity system as Messages and Signals.

<figure markdown>
![CAN DBC Viewer](../../images/dbc_canbus_message.png)
<figcaption>CAN DBC Viewer</figcaption>
</figure>

To use the DBC viewer with a third party DBC file you need to [create a new component](../../Getting_Started/Adding_New_Components.md) in your [Profile](../../Administration/Profiles.md) and in the configuration properties for that new item provide the DBC file.  

Once this has been done then you will see the item in your profile and by right mouse clicking on it you can access information about its Messages and Signals.

Many of the other components supported by Profinity such as the [Elmar Solar MPPT](../MPPT/index.md) and the [WaveSculptor](../Motor_Controller/index.md) have support for DBC built in to the component and also allow you to view Messages and Signals, without requiring a separate DBC file.

# Custom Dashboards

Profinity provides the ability to define custom dashboards using our YAML custom dashboard editor.  The editor can validate your dashboard as you create it and it is also possible to use our existing dashboards as templates for your dashboard as we build our own Profinity dashboards using this tool.

For more information on custom dashboards, see the dashboard definition section of this document,