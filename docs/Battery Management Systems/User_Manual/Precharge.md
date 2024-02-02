---
title: Precharge
description: Documentation for the Prohelion Electric Vehicle Driver Controls
tags: [Prohelion, Profinity, CAN Bus Tools, Driver Controls]
keywords: Prohelion, Profinity, CAN Bus Tools, Driver Controls
permalink: Battery_Management_System/User_Manual/Precharge.html
folder: Battery_Management_System/User_Manual
order: 9
---

# Precharge

Loads such as motor controllers (inverters), DC/DC converters, and other high-voltage, high-power electronics contain capacitors across the DC bus.  If these are suddenly connected to the battery pack by closing a contactor or switch, then there will be a very large inrush current (thousands of Amps) followed by a voltage surge due to the battery and cabling inductance.  This inrush current will damage the devices and weld contacts together, and the voltage surge can also cause components to fail. 

Precharging the capacitors in the various devices solves these problems.  This can be done by first connecting the loads to the battery through a resistor, so that the current into the capacitors is limited to a few amps.  The voltage on the capacitors will then rise in a controlled manner, and when it is close to the battery voltage the main contactor can be closed to directly connect everything together. 

## Action

The BMU initiates a precharge sequence when commanded to do so from the EV Driver Controls.  There are two conditions that begin precharge: the ignition key moving to the start position from the run position; and the fuel door being opened for charging.   

Either closing the fuel door, or moving the key to no longer be in Ignition run position will shut down the system and open the contactors to make the system safe. 

The BMU can also be set to run in “Standalone Operation” mode, where it will precharge as soon as it measures an acceptable voltage on the 12V contactor power input.  This mode would normally be used in remote area power installations and similar applications, not in vehicles. 

## Sequence

The precharge sequence is as follows: 

1. Contactor 1 energises to connect Pack- to the vehicle 
2. Contactor 3 energises to connect Pack+ to the precharge resistor, and allow the BMU to take pack voltage measurements.  
3. The capacitors in the devices in the vehicle precharge through the precharge resistor that is in parallel with Contactor 2 
4. When the pack voltage and the DC bus voltage are within tolerance then Contactor 2 is energised to complete the high-current circuit 
5. The BMU is now in “Run” mode, and does the following: 
    *   reports this fact on the CAN bus 
    *   activates the status relay output (which can be used to enable the DC/DC converter) 
    *   turns on the pack fan outputs 

## Precharge Resistor Selection

Selection of the external precharge resistor is critical for correct and long-term reliable operation of the precharge circuit.  A judgement must be made by the designer of the vehicle power system to the tradeoff between resistor size, cost and weight, and expected precharge time.  A slower time can use a smaller, cheaper resistor, but taking too long to precharge will be annoying to the end user of the vehicle.  An aluminium-cased wirewound resistor is the most commonly chosen type of resistor. 

As an example, the calculations for a typical EV system are shown as follows: 

System battery voltage maximum = <strong>450V</strong> 

Motor controller (Prohelion Wavesculptor 200) capacitance = <strong>800µF</strong>

Chosen precharge current = <strong>1A</strong> 

Therefore, the minimum resistance (fastest precharge) will be 450V / 1A = 450 Ohms.  Choose <strong>470 Ohms</strong> as the next highest common value.  Peak power dissipation in the resistor is therefore 450V<sup>2</sup>/470R = <strong>430W. </strong> 

The expected precharge time is given by the time constant TAU = R (Ohms) * C (Farads), where the voltage on the capacitor should change by 63% of the difference each TAU time interval.  Precharge should be within 95% of the initial value within 4 TAU, and to 99% within 5 TAU intervals, as an exponential decay.  For the example system, TAU = 376ms, so the expected precharge time of 4 TAU = <strong>1.5 seconds.</strong>

Choosing a >500W resistor is unnecessary, as this rating is only needed for a short amount of time during normal operation.  However, the resistor cannot be too small, as if a fault situation occurs, such as a short circuit in the motor controller, then this power will be dissipated continuously for the entire expected precharge time, until the precharge controller realises that precharging has not occurred properly and goes into an error state.  For safety, the resistor in the example system should be chosen to tolerate a one-off event, starting at the expected maximum ambient temperature, of 430W for 1.5 seconds. 

Searching through available off-the-shelf options from Digikey, the RH series from Vishay is chosen as a likely candidate.  According to the [datasheet](https://www.vishay.com/docs/50013/rh.pdf) (see also, [Appendix](appendix)) for short time overloads, a power rating of 12x the nominal power is acceptable for a 2 second duration.  Using a 50W resistor, this equates to an overload rating of 600W, starting at an ambient of 25°C.   

Therefore, this 50W resistor is acceptable for the external resistor in this application based on maximum fault power. 

During normal operation, the capacitors contain a charge of 0.36C, giving an energy storage of <strong>81 Joules.</strong>  Note that this is a lethal amount of energy.  During an RC precharge type event, the same amount of energy that is eventually stored in the capacitor is also dissipated in the resistor.   

If not mounted on any additional thermal mass, and assuming that 20g of the resistor's total mass is aluminium (specific heat = 0.897 J/g°C), 81 Joules will give a temperature rise of ∆T = Q/mc = <strong>4.5°C,</strong> also well within limits.  During a fault situation, where 430W is being dissipated in the resistor, the same thermal calculation shows a temperature rise of 48°C above the starting temperature.  This also is within limits. 

The maximum acceptable operating voltage for the 50W resistor is 1285V, so our maximum of 450V is also within limits. 

Therefore, a <strong>470 ohm, 50W, RH series wirewound aluminium resistor </strong> would be a suitable choice of external resistor for this application of precharging <strong>800uF to 450V in 1.5 seconds.</strong>  Other devices on the HV bus such as DC/DC converters and battery chargers will add significant extra capacitance, and must be factored into these calculations. 

Note that the BMS must be programmed with the correct timeout value, so as it knows what the expected precharge time is.  If this is not done, then the precharge controller will either expect precharge to have finished when it has not, resulting in an error state, or it will expect precharge to take much longer than it really does, resulting in a potential overload and a fire in the external resistor if there is a system fault. 

## Caveats

Be aware that loads that draw current during precharge will cause the precharge sequence to fail and/or the precharge resistor to overheat.  This is because the current drawn by the load will slow or possibly prevent the output voltage from rising, meaning precharge never completes in the expected time.   

The typical load that causes this problem is the DC/DC converter used to charge the 12V auxilliary battery. 

This problem can be avoided by using the relay output on the BMU to control an “enable” input on the problematic loads once precharge has completed and the BMU is in “Run” mode.  By default, this relay activates in this manner. 