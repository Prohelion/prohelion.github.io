---
title: Type 3 - Resolver and pt100
description: Documentation for the Prohelion Vehicle Communications protocol
tags: [Prohelion, Profinity, CAN Bus Tools, Driver Controls]
keywords: Prohelion, Profinity, CAN Bus Tools, Driver Controls
permalink: WaveSculptor_Motor_Controllers/WaveSculptor_Motor_Interface_Type_3/Overview.html
folder: WaveSculptor_Motor_Controllers/WaveSculptor_Motor_Interface_Type_3
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

# WaveSculptor Motor Interface Type 3: Resolver and pt100

This document describes the function, interface and properties of the WaveSculptor motor interface circuit, type 3.

# Position Sensor

## Type

The type 3 interface reads position information from a <strong>sin/cos resolver position sensor with analog outputs</strong>.

## Drive

The interface board drives the resolver with a sinusoidal excitation signal of approximately 7V pk-pk at a frequency of 10kHz.  This amplitude and frequency is factory settable to other options so can support other types of resolver if necessary.  

These drive signals are commonly shown in [resolver datasheets]() as:

*   R1(Exc+)
*   R2(Exc–)

## Sense

Two channels of differential analog input are used, for the sin and cos sense windings.  

These signals are commonly shown in [resolver datasheets]() as:

*   S1 (Sin+)
*   S3 (Sin–)
*   S4(Cos+)
*   S2(Cos–)

## SHIELD

Resolver signals can be quite sensitive to noise and therefore attention should be paid to shielding. 

The motor interface board provides two possible shield signals:
 *  1) ground, and 
 *  2) a shield generated from the average voltage of the Sin and Cos waveforms.  If using a single-shielded cable, terminate the shield to the SHIELD pin, although terminating to GND will usually work equally well.

If using a dual shielded cable, terminate the inner shield to SHIELD, and the outer shield to GND.

## Resolver Mount

To help prevent noise pickup from capacitive coupling, the resolver should be mounted such that its body is isolated from the motor frame.  Do NOT tie the SHIELD or GND pins to the motor frame.

## Connector 

The connector used for the motor sense signals is a 8-way 3mm pitch Molex MicroFit connector.  The pinout is shown below, as viewed from the wire side – as you would look at it while inserting crimps

i





