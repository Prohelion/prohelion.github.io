---
title: BMS User Manual
description: Documentation for the Prohelion Electric Vehicle Driver Controls
tags: [Prohelion, Profinity, CAN Bus Tools, Driver Controls]
keywords: Prohelion, Profinity, CAN Bus Tools, Driver Controls
permalink: Battery_Management_System/User_Manual/Overview.html
folder: Battery_Management_System/User_Manual
order: 0

# Hero section
hero:
    title: Fix Me (TODO)
    text: Developing an Electric Vehicle? The Prohelion Driver Controller Unit is designed to give you a head start with an off the shelf control platform to get you driving sooner.
    background_image: /images/Prohelion_Battery.jpg
    buttons: # Add buttons below, there are examples with all available options
        - label: Order a Prohelion Driver Control
          url: https://www.prohelion.com/shop/accessories/ev-driver-controls/
          external_url: true 
          style: filled
          icon: credit-card 
---

# Battery Management System User Manual

This document describes the interface, installation, and usage requirements for the Prohelion Battery Management System (BMS).   

The BMS provides an easy way to monitor and control an Electric Vehicle battery pack, and can work seamlessly with Prohelion's WaveSculptor motor controllers.  It is a mature design with five previous product generations of real-world experience with various types of cells, form factors, and vehicles. 

![Battery Management System]({{site.dox.baseurl}}/images/BMS_User_Manual/Introduction_1.png)

The BMS consists of two components: multiple [Cell Management Units](Cell_Management_Unit) (CMU), which measure and control the individual cells in the battery pack; and a single [BMS Master Unit](BMS_Master_Unit) (BMU) which interfaces between the CMUs and the vehicle, controls precharge and other safety systems, and provides total pack telemetry.

![Battery Management System]({{site.dox.baseurl}}/images/BMS_User_Manual/Introduction_2.png)
![Battery Management System]({{site.dox.baseurl}}/images/BMS_User_Manual/Introduction_3.png)

## Terminology

<strong>Cell:</strong> A single physical unit, or permanently connected parallel group of units.  A parallel group functions electrically as a larger capacity single unit

<strong>Battery:</strong> A series-connected group of cells 

(TODO) - all descriptions need to be altered (+key words etc.)

