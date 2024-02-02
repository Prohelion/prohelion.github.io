---
title: Motor Sense Connections
description: Documentation for the Prohelion Vehicle Communications protocol
order: 9
---

# Motor Sense Connections

The WaveSculptor200 requires a position sensor to be able to control the motor.  It can also measure the temperature of the motor, and gradually reduce the motor current if this temperature rises towards a user-programmable threshold.  

Since there are a large variety of possible combinations of position and temperature sensors, Prohelion has implemented the interface on the motor controller in a generic manner.  Small adapter circuit boards, suitable for mounting directly inside the motor terminal box, are used to adapt the sensors in that motor to the interface required by the WaveSculptor200.  This also provides a robust signalling mechanism (isolated, differential) for the longest length of cable possible.

It is expected that the motor sense adapter board will be located inside the motor terminal box, and connect to the WaveSculptor200 via a twisted-pair cable routed along the conduit with the motor phase wiring.

The WaveSculptor provides isolated, regulated +5V and +12V DC to power the external adapter.  Refer to the [datasheet](../Datasheet/Overview.md) for specifications on these supplies.

The WaveSculptor provides four isolated differential inputs for information from the motor.  Three of these are routed to timer/capture peripherals in the main processor, and are normally used for three Hall-effect position sensors, or the A, B and Index channels of a quadrature encoder.  The fourth channel is routed to a UART serial receiver, and expects digital data.  Depending on the adapter board, this data may contain temperature, position, velocity, or a combination of all three.

A brief datasheet for each adapter option is available on the Prohelion website.  If your motor requires an adapter that is not yet available, please contact Prohelion to enquire about development, as new adapters are simple and low-cost to design.

## Connector Pinout

The connector used on the WaveSculptor200 for the connection to the motor sense adapter board is a 14-way 3mm pitch Molex MicroFit connector.  The pinout is shown below, as viewed from the wire side – as you would look at it while inserting crimps.  Please refer to [Appendix B](Appendix_B.md) for an overview of correct crimping technique, as poor crimps will cause unreliable operation.

![WaveSculptor 200 Motor Controller](images/introduction.png)

The wiring for this connector should be implemented with twisted pairs, as the signal inputs are differential.  Prohelion recommends using Belden 9506 type cable (shielded 6 pair) for this connection, with suggested cable colours shown above.

Make sure to wire the cable with the pair orientation correct, with each + and – signal (eg Serial RX+ and Serial RX-) twisted together.

## Motion Position Sense

### BLDC Motor

For operating Brushless DC (BLDC) and Permanent Magnet Synchronous (PMSM) type motors, the WaveSculptor requires three motor position sensing inputs, commonly provided using Hall-effect switches embedded in the motor.

Please note that the relation between each Hall-effect input and a motor output phase, as well as the polarity of the Hall-effect input signal, does not matter. The WaveSculptor will detect these relationships when running its initial setup and configuration routine (PhasorSense). The only requirement for these signals is that they have a fixed alignment (ideally, a 0° offset) with the zero-crossing point of the back-EMF waveform of the motor, and that the signals are offset from each other by 120°. This is where most motors will be configured by default.

### Induction Motor

For operating Induction motors, the WaveSculptor requires a quadrature (A + B channel) indexed (+ I channel) incremental encoder.  If you have purchased your motor through Prohelion, this encoder will already be fitted in place.

The encoder must be chosen to give enough speed resolution to operate successfully.  This can depend somewhat on your expected operating rpm, but as a good all-round solution a 256 count encoder will be suitable.

### IPM Motor

For operating Interior Permanent Magnet motors, as well as some types of BLDC motors, a resolver is a suitable position sensor.  Prohelion can provide a motor adapter suitable for driving and interpreting data from this type of sensor.

## Motor Temperature Sense

Prohelion 's motor adapters are currently available for use with NTC thermistor and Pt100 temperature sensor elements.  Variations are possible to accommodate thermocouple and LM35-type semiconductor sensors also.




