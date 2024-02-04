---
title: High Power Testing
description: Documentation for the Prohelion Vehicle Communications protocol
order: 12
---

# High Power Testing

## Connections

Make sure your precharge circuit, contactors, and fusing are in place.  Check the polarity of the supply cables to the WaveSculptor.  Take all appropriate safety precautions when working on the HV circuitry.  Depending on the legislation in your country, you may require a licensed electrician to work on the high voltage parts of the system.

Making sure that all contactors are off, in the safe state, make the bolt connections to the DC POS and DC NEG terminals of the WaveSculptor.

## PC Software Control

Move the CAN cable and termination resistor from the hardware driver controls and reconnect it to the CAN-Ethernet bridge.  Run the PC software.  Run through the same checks as outlined in the previous 24V low voltage testing section.  

## Driver Controls

Reconnect the CAN cable and termination resistor to the hardware driver controls.  Run through the same checks as listed above in the 24V driver controls hardware testing.  

Test at least the following functionality:

*   Driving forwards
*   Car coasts to a stop when accelerator pedal is lifted
*   Driving in reverse
*   Car coasts to a stop when accelerator pedal is lifted
*   Appropriate action happens when brake pedal is pushed
*   If your driver controls is configured to use regen, it works correctly in forwards
*   If your driver controls is configured to use regen, it works correctly in reverse
*   Selecting Neutral on the driver controls makes the car coast to a stop
*   Turning off the key makes the car coast to a stop

