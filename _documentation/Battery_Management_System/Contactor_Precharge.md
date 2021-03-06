---
title: Contactor and Precharge
keywords: BMS, 
summary: ""
sidebar: bmu_sidebar
permalink: Battery_Management_System/Contactor_Precharge.html
folder: Battery_Management_System
order: 2
---

## PACK CURRENT SENSE
The BMU provides a mechanism for measuring pack current using a resistive shunt.  This is preferred over hall-effect based sensors as it provides much lower drift, allowing more accurate State of Charge (SOC) integration calculation. 

The shunt must be located in the Battery HV– connection of the pack, as shown in the BMS wiring diagram in the Appendix. 

### SHUNT SELECTION
The BMU Shunt Sense input has a full-scale range of ±25mV, relative to the Battery HV– Sense input.  This allows the use of a standard 50mV shunt running at half its rated current to minimise heat buildup and thermal drift effects, since it will be installed inside the battery pack. 

Choose a full-scale range slightly over the expected maximum battery current. As an example, a Tritium WaveSculptor200 motor controller driving an induction motor may have an expected maximum power consumption of 90kW.  At a 400V battery voltage, this is 225A.  Choose a full scale of 250A to allow some headroom on the measurement.  Since we wish to use a standard 50mV shunt at half rating, you would therefore select a 500A/50mV shunt. The value of the shunt can be set in the user-interface software.

### STATE OF CHARGE REPORTING
The BMU takes readings of the shunt current using a high-accuracy front-end circuit and 24-bit A/D converter.  It integrates these readings to accumulate an Ah consumption for the pack. 

The Ah accumulation is used in conjunction with the user-settable pack capacity value to calculate a SOC in percent.  Both Ah and percent are reported on the CAN bus.

The SOC reading is reset to 'full' when the first bypass shunt has activated during a charge cycle.  At this point the “Balance SOC” telemetry value begins incrementing, halting when all bypass shunts are active.  This “Balance SOC” telemetry value therefore shows the amount of imbalance between cells that has been corrected during the current charging session.

### OVERCURRENT SHUTDOWN
The BMU has the capability to shut down the pack by opening the contactors if the pack current exceeds a fixed threshold.  This function is not currently implemented in the default firmware, but will be added at a later date.

## CONTACTOR DRIVE / SENSE
The BMU provides three outputs for driving HV contactors with 12V coils.  At a minimum Contactors 1 & 2 are required for pack safety, although this option still presents a shock hazard (via the precharge resistor) in a single-fault situation to the rest of the system.  A professional design will use all three contactors. 

The contactors are energised in sequence (1, 3, 2) during precharge, and deenergised when shutting down the system both under user command and due to a fault being detected by the BMS.  The BMU operates the contactors to protect the cells above all other priorities.

Each contactor output connector also has pins for feedback from contactors with auxilliary sense contacts.  These can be used by the BMU to detect failed contactors, both failed open or welded shut.  Do not connect these pins to anything other than auxilliary contact output terminals – they are not rated for anything more than the 12V supplied by the BMU.

Refer to the BMS datasheet for continuous and peak current and voltage ratings of the contactor drive outputs.  Contactors without integrated electronics must have a diode fitted across their coil terminals to limit flyback voltage at turn-off. 

### CONTACTOR 12V SUPPLY CONNECTOR
The connector used for the Contactor 12V supply input is a 2-way 4.2mm pitch Molex MiniFit Jr connector.  The pinout is shown below, as viewed from the wire side – as you would look at it while inserting crimps.

![BMS Contactor Connector]({{site.dox.baseurl}}/images/IMPS_BMS_Contactor_Connector.gif)

This connection should be wired to the vehicle 12V DC supply via the emergency stop switch (if fitted), the G-force impact switch, an optional HV disable switch, and a fuse.  It requires a low impedance connection to the vehicle battery, since most contactors draw a large current inrush during turn-on, and a poor connection will result in contactor chattering and/or precharge fault trips. 

This connection draws no current when the BMS is in the off state, and does not have to be routed via the ignition key.  Connecting it to a permanent source of power (rather than via the ignition key) allows the BMS to operate the contactors without the ignition key switched on, for example during charging.

### CONTACTOR OUTPUT CONNECTORS
The connectors used for the Contactor drive outputs are a 4-way 4.2mm pitch Molex MiniFit Jr connector.  The pinout is shown below, as viewed from the wire side – as you would look at it while inserting crimps. The colours shown match those used by the Gigavac GX11 and GX12 family of contactors.

![BMS Contactor Output]({{site.dox.baseurl}}/images/IMPS_BMS_Contactor_Output.gif)

## PRECHARGE
### CONCEPT
Loads such as motor controllers (inverters), DC/DC converters, and other highvoltage, high-power electronics contain capacitors across the DC bus.  If these are suddenly connected to the battery pack by closing a contactor or switch, then there will be a very large inrush current (thousands of Amps) followed by a voltage surge due to the battery and cabling inductance.  This inrush current will damage the devices and weld contacts together, and the voltage surge can also cause components to fail.

Precharging the capacitors in the various devices solves these problems.  This can be done by first connecting the loads to the battery through a resistor, so that the current into the capacitors is limited to a few amps.  The voltage on the capacitors will then rise in a controlled manner, and when it is close to the battery voltage the main contactor can be closed to directly connect everything together.

### ACTION
The BMU initiates a precharge sequence when commanded to do so from the EV Driver Controls.  There are two conditions that begin precharge: the ignition key moving to the start position from the run position; and the fuel door being opened for charging. 

Either closing the fuel door, or moving the key to no longer be in Ignition run position will shut down the system and open the contactors to make the system safe.

The BMU can also be set to run in “Standalone Operation” mode, where it will precharge as soon as it measures an acceptable voltage on the 12V contactor power input.  This mode would normally be used in remote area power installations and similar applications, not in vehicles.

### SEQUENCE
The precharge sequence is as follows:

1.              Contactor 1 energises to connect Pack- to the vehicle

2.              Contactor 3 energises to connect Pack+ to the precharge resistor, and allow the BMU to take pack voltage measurements. A pack isolation test is performed at this point

3.              The capacitors in the devices in the vehicle precharge through the

precharge resistor that is in parallel with Contactor 2

4.              When the pack voltage and the DC bus voltage are within tolerance then Contactor 2 is energised to complete the high-current circuit

5.              The BMU is now in “Run” mode, and does the following:

    •       reports this fact on the CAN bus

    •       activates the status relay output (which can be used to enable the DC/DC converter)

    •       turns on the pack fan outputs

### PRECHARGE RESISTOR SELECTION
Selection of the external precharge resistor is critical for correct and long-term reliable operation of the precharge circuit.  A judgement must be made by the designer of the vehicle power system to the tradeoff between resistor size, cost and weight, and expected precharge time.  A slower time can use a smaller, cheaper resistor, but taking too long to precharge will be annoying to the end user of the vehicle.  An aluminium-cased wirewound resistor is the most commonly chosen type of resistor.

As an example, the calculations for a typical EV system are shown as follows:

System battery voltage maximum = **450V**

Motor controller (Tritium Wavesculptor 200) capacitance = **800µF**

Chosen precharge current = **1A**

Therefore, the minimum resistance (fastest precharge) will be 450V / 1A = 450 Ohms.  Choose 470 Ohms as the next highest common value.  Peak power dissipation in the resistor is therefore 450V²/470R = **430W**

The expected precharge time is given by the time constant TAU = R (Ohms) * C (Farads), where the voltage on the capacitor should change by 63% of the difference each TAU time interval.  Precharge should be within 95% of the initial value within 4 TAU, and to 99% within 5 TAU intervals, as an exponential decay. For the example system, TAU = 376ms, so the expected precharge time of 4 TAU = **1.5 seconds**

Choosing a >500W resistor is unnecessary, as this rating is only needed for a short amount of time during normal operation.  However, the resistor cannot be too small, as if a fault situation occurs, such as a short circuit in the motor controller, then this power will be dissipated continuously for the entire expected precharge time, until the precharge controller realises that precharging has not occurred properly and goes into an error state.  For safety, the resistor in the example system should be chosen to tolerate a one-off event, starting at the expected maximum ambient temperature, of 430W for 1.5 seconds.

Searching through available off-the-shelf options from Digikey, the RH series from Vishay is chosen as a likely candidate.  According to the datasheet located at http://www.vishay.com/docs/50013/rh.pdf , for short time overloads, a power rating of 12x the nominal power is acceptable for a 2 second duration.  Using a 50W resistor, this equates to an overload rating of 600W, starting at an ambient of 25°C. 

Therefore, this 50W resistor is acceptable for the external resistor in this application based on maximum fault power.

During normal operation, the capacitors contain a charge of 0.36C, giving an energy storage of **81 Joules**.  Note that this is a lethal amount of energy.  During an RC precharge type event, the same amount of energy that is eventually stored in the capacitor is also dissipated in the resistor. 

If not mounted on any additional thermal mass, and assuming that 20g of the resistor's total mass is aluminium (specific heat = 0.897 J/g°C), 81 Joules will give a temperature rise of ∆T = Q/mc = **4.5°C**, also well within limits.  During a fault situation, where 430W is being dissipated in the resistor, the same thermal calculation shows a temperature rise of 48°C above the starting temperature. This also is within limits.

The maximum acceptable operating voltage for the 50W resistor is 1285V, so our maximum of 450V is also within limits.

Therefore, a **470 ohm, 50W, RH series wirewound aluminium resistor** would be a suitable choice of external resistor for this application of precharging **800uF to 450V in 1.5 seconds**.  Other devices on the HV bus such as DC/DC converters and battery chargers will add significant extra capacitance, and must be factored into these calculations.

Note that the BMS must be programmed with the correct timeout value, so as it knows what the expected precharge time is.  If this is not done, then the precharge controller will either expect precharge to have finished when it has not, resulting in an error state, or it will expect precharge to take much longer than it really does, resulting in a potential overload and a fire in the external resistor if there is a system fault.

### CAVEATS
Be aware that loads that draw current during precharge will cause the precharge sequence to fail and/or the precharge resistor to overheat.  This is because the current drawn by the load will slow or possibly prevent the output voltage from rising, meaning precharge never completes in the expected time. 

The typical load that causes this problem is the DC/DC converter used to charge the 12V auxilliary battery.

This problem can be avoided by using the relay output on the BMU to control an “enable” input on the problematic loads once precharge has completed and the BMU is in “Run” mode.  By default, this relay activates in this manner.

## TRUSTED MEASUREMENTS
The CMUs measure their cell voltages using two separate front-end circuits, A/D converters, and voltage references.  One channel records with a high resolution 24-bit converter at a slow 2 Hz rate.  The other channel uses a mid resolution 12bit converter running at several kHz.  These are cross-checked against each other to verify that the CMU is functioning correctly and that the cell voltage measurement can be trusted.

Measurements reported on the CAN bus telemetry come from the high resolution channel. 

Measurements where the two channels do not agree are flagged as untrusted.  If any cells report an untrusted measurement, the BMU will report a TRUST error on the CAN bus.  This is not treated as a fatal error, and will not result in a pack shutdown.

The threshold where a trust error is generated is set in the BMU config, and is currently factory set to 100mV.

Please note that due to the different response rates of the two A/D converters, it is possible to get a trust error briefly during sharp voltage transients on the cells, for instance during rapid acceleration or regen braking events.  Whatever higherlevel vehicle system is handling BMS telemetry and user interface should be programmed to ignore trust errors that are present for less than some period (eg 500ms) of time.

## FUSING
The battery pack must be fused in each physical pack section with a fuse rated for at least the full DC pack voltage.  Note that it must be a DC rated fuse.

Selection of fuse type and current rating is beyond the scope of this document, as it depends on expected load profile and duration, cable sizing and temperature rating, cable installation methods, and short-circuit rating of the pack, among other factors.  

## CONTACTOR SELECTION
The three contactors used to break the HV DC connections must be appropriately rated for the currents and voltages seen during both normal use and during fault situations.  Typical parts used in automotive sized packs are the Tyco EV200 or the Gigavac GX11 or GX12 series.  Selection of these parts is beyond the scope of this document.


