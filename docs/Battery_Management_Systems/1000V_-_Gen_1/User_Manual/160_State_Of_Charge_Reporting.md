---
title: State Of Charge Reporting 
description: Documentation for the Prohelion Electric Vehicle Driver Controls
order: 16
---

# State of Charge Reporting

The BMS reports State of Charge (SOC) based on integrating the pack current (coulomb counting).   

The SOC is calculated in Amp-Hours (Ah), based on the user-set scale value for the 25mV shunt.  The Ah is then also calculated to a percentage, based on the user-set value for total pack capacity.   

Ah are set to zero when the first cell reaches the balance threshold while charging for the first time.   It then counts up to indicate Ah drawn from the pack.  It will count back down towards zero when the pack is recharged. 

A second telemetry value is also reported, the Balance SOC.  This value begins counting when the first cell reaches the balance threshold during charging, and continues to count until the last cell has reached the balance threshold.  This gives an accurate value for the amount of imbalance in the battery pack that was corrected during this charging session.  Logging this value in a higher-level system controller and looking for changes over time will give an indication of potential problems with the pack. 