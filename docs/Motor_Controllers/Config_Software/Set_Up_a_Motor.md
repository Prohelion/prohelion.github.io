---
title: Set Up a Motor 
description: Documentation for the Prohelion Vehicle Communications protocol
order: 4
---

# Set Up a Motor

The following is list of instructions for setting up a generic motor:

1.	Set the tyre diameter to match your vehicle.

2.	Chose a motor slot (tab) to configure.

3.	Change the active motor to match the motor slot (tab) you are configuring.

4.	Give the motor a meaningful text description

5.	Enter the number of pole pairs

6.	Adjust Motor ramp and cut-out temperature for your motor.

7.	Leave the engage and disengage frequency alone

8.	Set the ignore hall box

9.	If using an encoder set the encoder count correctly (When using a resolver ensure the encoder count is at the default value of “1024”)

10.	If you wish to use a motor temperature sensor, configure these constants. Otherwise, make sure to connect a dummy resistor in place of the required thermistor or PT100.

11.	Upload to WaveSculptor

12.	Download from the WaveSculptor to confirm the upload

13.	Run paramExtract

14.	Select motor type

15.	Follow the instructions in the appropriate section (15-16) for your motor

16.	Upload to WaveSculptor

17.	Download from the WaveSculptor to confirm the upload

18.	Save the configuration file locally as a backup

## BLDC Motor

The following is a list of instructions particular to setting up a BLDC motor:

1.	Run phasorsense

## IPM Motor

The following is a list of instructions particular to setting up an IPM motor:

1.	Run phasorsense

2.	Upload configuration

3.	Set Rotor L to the Lq inductance of the motor. Lq is expected to be 2 – 4 times the value of Ld (the Line Inductance calculated by ParamExtract).

    *   If you can stiffly lock the rotor then ParamExtract can be used to find this inductance. After running ParamExtract and saving the calculated inductance as the Line Inductance, move the rotor 360 / (4 * nrPolePairs) degrees in either direction. In an IPM motor this will align phase CB with its highest inductance position. Run ParamExtract again, this will be the Lq inductance. Note this inductance, don't save it. Go back to the motor configuration screen and enter this inductance in the Rotor L field.

    *   If you can't lock the rotor, set Rotor L to 2.35 * Line Inductance. Try driving the motor & assess the torque output for a given current limit → adjust the Rotor L field → try driving the motor & assess the torque output for a given current limit → repeat until you find best performing Rotor L value.

## Induction Motor

The following is a list of instructions particular to setting up an induction motor:

1.	Run ImExtract

2.	Check that the rotor R is correct – should be between 10 and 300 mR

3.	Check that rotor L is correct – should be between 5000 and 20000 uH

4.	Set Min Id – default to 5A

5.	Set Max Id – start at 20A. Try driving the motor & assess the torque output for a given current limit → adjust the Max Id field → try driving the motor & assess the torque output for a given current limit → repeat until you find best performing Max Id value.  This process is best performed on a motor dynomometer.
