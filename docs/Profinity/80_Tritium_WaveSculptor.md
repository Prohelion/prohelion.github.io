---
title: Tritium WaveSculptor
---

# Tritium WaveSculptor

[Tritium](https://www.tritiumcharging.com/) initially created the WaveSculptor Motor Inverter, used by racing teams around the world.  With 99.2% cruising efficiency the WaveSculptor family is a go to choice for most high efficiency electric vehicle racing teams.  In 2021 [Prohelion](https://www.prohelion.com) took over the design, manufacturing and support for this product.

Profinity provides integrated management of the WaveSculptor products and you can access the WaveSculptor dashboard by adding a WaveSculptor to your [Profile](10_Profiles.md). 

From there right mouse client to access the WaveSculptor Dashboard or to access the CAN Bus Messages and Signals.

![Tritium WaveSculptor](images/WaveSculptor.png)

Prohelion is currently migrating all of the Tritium WaveSculptor supporting software in to Profinity, in this release the configuration of the WaveSculptor tools is still handed by the Tritium software and we expect to migrate all of that functionality to Profinity over time.

## Updating the WaveSculptor Configuration

To update the configuration of your WaveSculptor, right mouse click on the WaveSculptor in the Profinity menu and select Setup and Configuration.  This will load the WaveSculptor setup and configuration utilities.

!!! info "Tritium / Prohelion Adapter"
    The WaveSculptor configuration tools were developed by Tritium and rely on a CAN to Ethernet Bridge being present in the configuration.  If you do not have such a bridge, you can create a virtual one using the [Virtual CAN Adapter](25_Virtual_CAN_Adapter.md) in conjunction with another bridge.

<video autoplay loop controls width="100%">
  <source src="video/ConfigWS22.mov" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Flashing the WaveSculptor Firmware

To flash the WaveSculptor firmware, right mouse click on the Update Firmware menu item on the WaveSculptor.  As per the configuration tools a CAN to Ethernet bridge or a [Virtual CAN Adapter](25_Virtual_CAN_Adapter.md) is required for this operation.

