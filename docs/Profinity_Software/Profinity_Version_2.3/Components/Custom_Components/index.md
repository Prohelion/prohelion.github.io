---
title: Custom Components
description: "Create custom components using DBC files and custom YAML dashboard definitions for any CAN bus device."
---

# Custom Components

Profinity allows Custom Components to be created from DBC files and custom dashboard definitions, which makes it possible to include any CAN bus device in your profile so that its data can be monitored, graphed or logged.

## CAN bus DBC

[DBC](http://socialledge.com/sjsu/index.php/DBC_Format) is a file format that describes the format and nature of CAN bus data. With a DBC file, CAN data can be understood more clearly and broken down into Signals and Messages, the fundamental building blocks of a DBC file.

For the moment, Profinity provides a DBC Viewer that takes a DBC file and shows the CAN bus traffic travelling through the Profinity system as Messages and Signals.

<figure markdown>
![CAN DBC Viewer](../../images/dbc_canbus_message.png)
<figcaption>CAN DBC Viewer</figcaption>
</figure>

To use the DBC Viewer with a third-party DBC file, [create a new component](../../Getting_Started/Adding_New_Components.md) in your [Profile](../../Administration/Profiles.md) and provide the DBC file in the configuration properties for the new component. The item then appears in your profile, and right-clicking it gives access to information about its Messages and Signals.

Many of the other components supported by Profinity such as the [Elmar Solar MPPT](../MPPT/index.md) and the [WaveSculptor](../Motor_Controller/index.md) have DBC support built into the component, and also allow Messages and Signals to be viewed without a separate DBC file. The DBC file of the WaveSculptor22 is published in the [hardware documentation](../../../../Motor_Controllers/WaveSculptor22/User_Manual/DBC.md), and the [EV Driver Controls DBC file](../../../../Solar_Car_Racing/EV_Driver_Controller/Communications_Protocol/DBC.md) can be used in the same way to create a custom component for a device that has no built-in support.

## Custom Dashboards

Profinity provides a YAML custom dashboard editor for defining custom dashboards. The editor validates a dashboard as it is created, and the existing Profinity dashboards, which Prohelion builds with the same tool, can be used as templates.

For more information on creating dashboards, see the [Dashboard Development Guide](../../Extending_Profinity/Dashboards/index.md).
