---
title: Type 6 - Encoder and Thermistor
description: Documentation for the Prohelion Vehicle Communications protocol
tags: [Prohelion, Profinity, CAN Bus Tools, Driver Controls]
keywords: Prohelion, Profinity, CAN Bus Tools, Driver Controls
permalink: WaveSculptor_Motor_Controllers/WaveSculptor_Motor_Interface_Type_6/Overview.html
folder: WaveSculptor_Motor_Controllers/WaveSculptor_Motor_Interface_Type_6
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

Fix todo!! Whats the difference between 2 and 6?

# Wave Sculptor Motor Interface Type 6: Encoder and Thermistor 

This document describes the function, interface and properties of the WaveSculptor motor interface circuit, type 6.

# Position Sensor

## Type

The type 6 interface reads three channels of position information from a <strong>quadrature encoder position sensor</strong> with <strong>single-ended outputs. </strong> It provides each channel with a 10k pull-up resistor for use with open-collector sensors.

## Power 

Power is provided to the sensors, and this voltage is also used as the pull-up voltage for the three input resistors.  By default, the voltage provided is 12V DC, but this can also be chosen as a factory option to be 5V DC.  

## Inputs

Each input is sensed by a schmitt-trigger logic input with hysteresis.  Rising and falling input thresholds are at 2/3 and 1/3 of the power supply voltage.

## Connector

The connector used for the motor sense signals is a 6-way 3mm pitch Molex MicroFit connector.  The pinout is shown below, as viewed from the wire side – as you would look at it while inserting crimps.  

i

