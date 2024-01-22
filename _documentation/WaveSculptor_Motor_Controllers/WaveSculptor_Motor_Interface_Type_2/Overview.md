---
title: Type 2 - Encoder and Thermistor
description: Documentation for the Prohelion Vehicle Communications protocol
tags: [Prohelion, Profinity, CAN Bus Tools, Driver Controls]
keywords: Prohelion, Profinity, CAN Bus Tools, Driver Controls
permalink: WaveSculptor_Motor_Controllers/WaveSculptor_Motor_Interface_Type_2/Overview.html
folder: WaveSculptor_Motor_Controllers/WaveSculptor_Motor_Interface_Type_2
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

# WaveSculptor Motor Interface Type 2: Encoder and Thermistor

This document describes the function, interface and properties of the WaveSculptor motor interface circuit, type 2.

# Position Sensor

## Type

The type 2 interface reads three channels of position information from a <strong>quadrature encoder position sensor</strong> with <strong>differential outputs.</strong>  Each channel is passed through to the differential receiver in the WaveSculptor, terminated with approximately 150 ohms between each + and – pair.

## Power

5V DC is provided to run the encoder.

## Connector

The connector used for the motor sense signals is a 10-way 3mm pitch Molex MicroFit connector.  The pinout is shown below, as viewed from the wire side – as you would look at it while inserting crimps.  

i

