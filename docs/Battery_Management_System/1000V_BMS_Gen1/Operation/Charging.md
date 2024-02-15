---
title: Charging
---

# Charger Control

To charge and balance the pack correctly the BMS must be able to control the charging current in a continuous manner.  Therefore, a charger that is able to be controlled remotely is required.  Battery management systems and chargers that use on/off control will result in slow and/or poor balancing of cells.   

Charging the pack requires an external component, either a charge control loop controlled by software such as [Profinity](../../../Profinity/Battery_Charging.md) or via a control loop implemented in third party charge control units or in your code.
z
## High Level Charging Logic

The BMU runs a PID control loop based on maximum individual cell voltage, with the aim of raising it up to the Balance Threshold voltage.  It will issue current setpoint commands to the charger to achieve this goal. 

This control strategy results in the minimum possible charge time, as the charger will be ramped up to maximum current rapidly, and stay there until the maximum cell reaches the target voltage at the end of the 'constant current' portion of the charge cycle.  At this point, charge current will be gradually ramped down, at whatever rate is necessary to keep the maximum cell at the target and adsorbing as quickly as possible – the 'constant voltage' portion of the charge cycle.  Therefore, it does not matter at what rate the cell is adsorbing charge, the control loop will keep it at the optimal amount at all times. 

As the maximum cell reaches 100% SOC, the charging current will have been gradually reduced down until it matches the balance current of ~250mA.  At this point, the maximum cell will be at the target voltage, held at that point by the balance resistor, and lower cells in the pack will be rising at the rate governed by the 250mA charge.   

When the minimum cell reaches the target voltage, then all cells are in balance, and the pack is at 100% SOC.  This time difference between maximum and minimum cells reaching the target voltage is usually only a few minutes for a well-balanced battery pack.  Therefore, the power wasted in the balance resistors during this time is a trivial percentage of the total charge energy. 

Note that the very first balance may take considerable time if the cells are grossly out of balance.  Worst-case time is the Ah capacity of the cells divided by the 250mA balance rate divided by the out-of-balance percentage, eg 90Ah / 0.25A / 20% = 72 hours. 

!!! info
    For more information on charging generally and example code for implementing charging logic on third party devices, please see the [Prohelion Knowledge Base](https://prohelion.atlassian.net/servicedesk/customer/portals), which can be accessed via the support portal, search for `charging`.
