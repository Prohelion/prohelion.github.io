---
title: State Of Charge Reporting 
description: Documentation for the Prohelion Electric Vehicle Driver Controls
---

# State of Charge Reporting

The BMS reports State of Charge (SOC) based on integrating the pack current (coulomb counting).   

The BMU takes readings of the shunt current using a high-accuracy front-end circuit and 24-bit A/D converter.  It integrates these readings to accumulate an Ah consumption for the pack.   The Ah accumulation is used in conjunction with the user-settable pack capacity value to calculate a SoCin percent.  Both Ah and percent are reported on the CAN bus. 

The SoCis calculated in Amp-Hours (Ah), based on the user-set scale value for the 25mV shunt.  The Ah is then also calculated to a percentage, based on the user-set value for total pack capacity.   

A second telemetry value is also reported, the Balance SOC.  This value begins counting when the first cell reaches the balance threshold during charging, and continues to count until the last cell has reached the balance threshold.  This gives an accurate value for the amount of imbalance in the battery pack that was corrected during this charging session.  Logging this value in a higher-level system controller and looking for changes over time will give an indication of potential problems with the pack. 

## What Defines a Full Pack?

The SoCreading is reset to 'full' when the first bypass shunt has activated during a charge cycle.  At this point the “Balance SOC” telemetry value begins incrementing, halting when all bypass shunts are active.  This “Balance SOC” telemetry value therefore shows the amount of imbalance between cells that has been corrected during the current charging session. 

## What Defines an Empty Pack?

Ah are set to zero when the first cell reaches the balance threshold while charging for the first time.   It then counts up to indicate Ah drawn from the pack.  It will count back down towards zero when the pack is recharged. 