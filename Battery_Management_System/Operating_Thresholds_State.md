---
title: Operating Thresholds and State
keywords: BMS, 
summary: ""
sidebar: imps_sidebar
permalink: BMS_Operating_Thresholds_State.html
folder: I.M.P.S.
---

## CONTACTOR SELECTION
The three contactors used to break the HV DC connections must be appropriately rated for the currents and voltages seen during both normal use and during fault situations.  Typical parts used in automotive sized packs are the Tyco EV200 or the Gigavac GX11 or GX12 series.  Selection of these parts is beyond the scope of this document.

## OPERATING THRESHOLDS
There are six user-settable thresholds that control the operation of the BMS. These should be set based on the maximum acceptable limits for the cells used in the battery pack, along with reference to the charge/discharge curves for selecting the balancing points. 

These operating points can be programmed into the BMU over the CAN bus using the BMS Setup software and a CAN-Ethernet bridge.  Settings that are required at the CMUs are passed to them from the BMU when the system starts.

The SOC vs Voltage curve for a typical Lithium chemistry cell is shown below, along with the location of the various thresholds.

![BMU State of Charge](IMPS_BMU_State_of_charge.gif)

### OVER VOLTAGE THRESHOLD
This voltage should be set to the maximum acceptable voltage for the cell.  If it is ever exceeded, then the BMS will move to the Error state and open the contactors immediately to protect the pack.

### BALANCE THRESHOLD
This voltage is the target setpoint for the charging control algorithm, and will be the voltage that the cells are charged to in normal operation.  It should be chosen to be part-way up the 'knee' in the voltage charge curve, so that the cells can be easily seen to be at different SOC and therefore balanced accurately. 

Choosing this number to be higher (closer towards the Over Voltage Threshold) will give a slightly increased useable capacity of the pack, but will make it more likely that sudden regen braking will push a cell above the Over Voltage Threshold and shut down the system without warning.  Pushing the usual charge voltage to the maximum rating of the cell may also reduce cell cycle life – refer to the cell datasheet for specific information on this aspect, as it is highly dependant on cell chemistry and manufacturing techniques.

When any cell exceeds this voltage, the cell balance (shunt) resistor for that cell is switched on, and begins to discharge that cell at approximately 250mA.  The shunt resistor remains switched on until the cell falls below the Balance Threshold by the Balance Threshold Hysteresis value.

### BALANCE THRESHOLD HYSTERESIS
This voltage determines the hysteresis used to control the balance resistors. 

If using CMUs made after January 2013, it should be set to around 5mV, as the firmware in the newer CMUs turns off the shunt resistors while taking voltage measurements to eliminate errors caused by the resistance of the sense wiring. 

If using older CMUs, it should be set to around 50mV for a typical pack, to allow for the voltage drop in the sense wiring, connections, and cell impedance when 250mA of balance current is flowing.  This will be installation dependent.

Setting it too low will cause oscillations in the balance resistor switching and possibly erroneous voltage measurement reporting.

Setting it too high will give a wide band of voltage that various cells are balanced to, giving a less than optimally balanced pack and slightly reduced pack capacity.

### ZERO SOC THRESHOLD
This voltage should be set to the point where the cells are considered fully discharged during normal operation.  It will be along the lower 'knee' in the charge curve.  When a cell goes below this threshold, the BMU reports SOC as 0%.  It is also the target minimum voltage used by motor controllers and other devices to not exceed during operation.

### UNDER VOLTAGE THRESHOLD
This voltage should be set to the minimum acceptable voltage for the cell.  If any cell voltage falls below this point, then the BMS will move to the Error state and open the contactors immediately to protect the pack.

### OVER TEMPERATURE THRESHOLD
This temperature should be set to the maximum acceptable operating temperature for the cell.  If it is ever exceeded, then the BMS will move to the Error state and open the contactors immediately to protect the pack.

## CHARGER CONTROL
To charge and balance the pack correctly the BMS must be able to control the charging current in a continuous manner.  Therefore, a charger that is able to be controlled remotely is required.  Battery management systems and chargers that use on/off control will result in slow and/or poor balancing of cells. 

Suitable chargers that the BMS currently supports are the Brusa NLG series, and the TC Charger range with CAN-bus option.  Please contact Prohelion regarding support for other types of chargers.

The BMU runs a PID control loop based on maximum individual cell voltage, with the aim of raising it up to the Balance Threshold voltage.  It will issue current setpoint commands to the charger to achieve this goal.

This control strategy results in the minimum possible charge time, as the charger will be ramped up to maximum current rapidly, and stay there until the maximum cell reaches the target voltage at the end of the 'constant current' portion of the charge cycle.  At this point, charge current will be gradually ramped down, at whatever rate is necessary to keep the maximum cell at the target and adsorbing as quickly as possible – the 'constant voltage' portion of the charge cycle. Therefore, it does not matter at what rate the cell is adsorbing charge, the control loop will keep it at the optimal amount at all times.

As the maximum cell reaches 100% SOC, the charging current will have been gradually reduced down until it matches the balance current of ~250mA.  At this point, the maximum cell will be at the target voltage, held at that point by the balance resistor, and lower cells in the pack will be rising at the rate governed by the 250mA charge. 

When the minimum cell reaches the target voltage, then all cells are in balance, and the pack is at 100% SOC.  This time difference between maximum and minimum cells reaching the target voltage is usually only a few minutes for a well-balanced battery pack.  Therefore, the power wasted in the balance resistors during this time is a trivial percentage of the total charge energy.

Note that the very first balance may take considerable time if the cells are grossly out of balance.  Worst-case time is the Ah capacity of the cells divided by the 250mA balance rate divided by the out-of-balance percentage, eg 90Ah / 0.25A / 20% = 72 hours.

## OPERATING STATE
The BMS can be in any one of six states, depending on operating conditions, commands, and errors.  The states are reported on the CAN bus, and shown in the BMS Viewer software.  The states are, in the most commonly seen sequence:

*         Error

*         Idle

*         Enable

*         Measure

*         Precharge

*         Run

States transition from one to another based on various thresholds and timers, and on user commands from the Driver Controls via the CAN bus, as detailed in the following sections.

### ERROR
The BMS is in the Error state if any of the following conditions are true:

*         The 12V contactor supply is not present or is undervoltage

*         Any cell Over Voltage

*         Any cell Under Voltage

*         Any cell Over Temperature

*         Any CMU communications packet is overdue (CMU timeout)

*         Packets from the EV driver controls are overdue (vehicle timeout)

*         Missing CMU or cell

*         Extra CMU or cell

*         Contactor feedback mismatch to the commanded state of the contactor

In the Error state, all contactors are switched off to isolate the pack.  The relay

and fan outputs are also switched off.

If all errors are removed, then the BMS will transition to the Idle state if the ignition key is switched to the accessories position and the fuel door is closed.  It requires this active user intervention to move to Idle, and will otherwise remain in the Error state.

### IDLE
In the Idle state, the BMS waits for a command from the EV driver controls.  All contactors are switched off.  The relay output and fans are also off.

If the ignition key is switched from the run position to the start position, or the fuel door is opened, then the BMS transitions to the Enable state and begins a precharge sequence.

### ENABLE
Contactor 1 is switched on, to connect the Pack- connection to the vehicle.  After a short time to allow the inrush current from the contactor switching to subside on the 12V supply, the BMS transitions to the Measure state.

### MEASURE
Contactor 3 is also switched on, to connect the Pack+ connection to the vehicle via the precharge resistor.  The vehicle will begin precharging. 

The pack isolation test is run during this interval

After a short time to allow the total pack voltage measurement to stabilise, and the 12V current inrush from the contactor switching to subside, the BMS transitions to the Precharge state.

### PRECHARGE
The load will now be precharging.  The BMS begins a timeout (error) counter (2000ms by default), to avoid a fault situation overheating the precharge resistor, and also begins comparing the total pack voltage and DC bus voltage measurements. 

When they match within a the precharge voltage threshold (20V by default), precharge is regarded as complete and the BMS transitions to the Run state.

### RUN
Contactor 2 is also switched on, to directly connect the Pack+ connection to the load.  The relay and fan outputs are switched on. 

If the ignition key is switched away from the run position (back to accessories) or the fuel door is closed, then the BMS transitions to the Idle state.

## STATE OF CHARGE (SOC) REPORTING
The BMS reports State of Charge (SOC) based on integrating the pack current (coulomb counting). 

The SOC is calculated in Amp-Hours (Ah), based on the user-set scale value for the 25mV shunt.  The Ah is then also calculated to a percentage, based on the user-set value for total pack capacity. 

Ah are set to zero when the first cell reaches the balance threshold while charging for the first time.   It then counts up to indicate Ah drawn from the pack.

It will count back down towards zero when the pack is recharged.

A second telemetry value is also reported, the Balance SOC.  This value begins counting when the first cell reaches the balance threshold during charging, and continues to count until the last cell has reached the balance threshold.  This gives an accurate value for the amount of imbalance in the battery pack that was corrected during this charging session.  Logging this value in a higher-level system controller and looking for changes over time will give an indication of potential problems with the pack.

## PACK ISOLATION DETECTION
The BMU contains hardware that is capable of sensing if the HV battery pack connections (both + and –, and any point along the pack)  are isolated from the chassis.  This test is run during each startup sequence, and a failed test will report as an isolation fault in the configuration software. 

A failed pack isolation test will not prevent operation of the system, but should be flagged by the user interface for the system (eg dashboard display) and indicate to the user to seek servicing. 


