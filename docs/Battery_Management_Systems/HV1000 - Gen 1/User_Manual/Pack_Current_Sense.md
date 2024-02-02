---
title: Pack Current Sense
description: Documentation for the Prohelion Electric Vehicle Driver Controls
order: 7
---

# Pack Current Sense

The BMU provides a mechanism for measuring pack current using a resistive shunt.  This is preferred over hall-effect based sensors as it provides much lower drift, allowing more accurate State of Charge (SOC) integration calculation.   

The shunt must be located in the Battery HV– connection of the pack, as shown in the BMS wiring diagram in the [Appendix](Appendix)

## Shunt Selection

The BMU Shunt Sense input has a full-scale range of ±25mV, relative to the Battery HV– Sense input.  This allows the use of a standard 50mV shunt running at half its rated current to minimise heat buildup and thermal drift effects, since it will be installed inside the battery pack.   

Choose a full-scale range slightly over the expected maximum battery current.  As an example, a Prohelion [WaveSculptor200](http://localhost:4000/WaveSculptor_Motor_Controllers/WaveSculptor200_User_Manual/Overview.md) motor controller driving an induction motor may have an expected maximum power consumption of 90kW.  At a 400V battery voltage, this is 225A.  Choose a full scale of 250A to allow some headroom on the measurement.  Since we wish to use a standard 50mV shunt at half rating, you would therefore select a 500A/50mV shunt. 

The value of the shunt can be set in the user-interface software. 

## State of Charge Reporting

The BMU takes readings of the shunt current using a high-accuracy front-end circuit and 24-bit A/D converter.  It integrates these readings to accumulate an Ah consumption for the pack.   

The Ah accumulation is used in conjunction with the user-settable pack capacity value to calculate a SOC in percent.  Both Ah and percent are reported on the CAN bus. 

The SOC reading is reset to 'full' when the first bypass shunt has activated during a charge cycle.  At this point the “Balance SOC” telemetry value begins incrementing, halting when all bypass shunts are active.  This “Balance SOC” telemetry value therefore shows the amount of imbalance between cells that has been corrected during the current charging session. 

## Overcurrent Shutdown

The BMU has the capability to shut down the pack by opening the contactors if the pack current exceeds a fixed threshold.  This function is not currently implemented in the default firmware, but will be added at a later date. 