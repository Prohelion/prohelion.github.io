---
title: Set Up a Motor 
---

# Set Up a Motor

The following is list of instructions for setting up a generic motor:

| Step      | Action                                                                        |
| --------- | ----------------------------------------------------------------------------- |
| __1.__    | Set the tyre diameter to match your vehicle.                                  |
| __2.__	| Chose a motor slot (tab) to configure.                                        |
| __3.__	| Change the active motor to match the motor slot (tab) you are configuring.    |
| __4.__	| Give the motor a meaningful text description                                  |
| __5.__	| Enter the number of pole pairs                                                |
| __6.__	| Adjust Motor ramp and cut-out temperature for your motor                      |
| __7.__	| Leave the engage and disengage frequency alone                                |
| __8.__	| Set the ignore hall box                                                       |
| __9.__	| If using an encoder set the encoder count correctly (When using a resolver ensure the encoder count is at the default value of “1024”)    |
| __10.__	| If you wish to use a motor temperature sensor, configure these constants. Otherwise, make sure to connect a dummy resistor in place of the required thermistor or PT100 |
| __11.__	| Upload to WaveSculptor                                                        |
| __12.__	| Download from the WaveSculptor to confirm the upload                          |
| __13.__	| Run paramExtract                                                              |
| __14.__	| Select motor type                                                             |
| __15.__	| Follow the instructions in the appropriate section (15-16) for your motor     |
| __16.__	| Upload to WaveSculptor                                                        |
| __17.__	| Download from the WaveSculptor to confirm the upload                          |
| __18.__	| Save the configuration file locally as a backup                               |

## BLDC Motor

The following is a list of instructions particular to setting up a BLDC motor:

| Step      | Action                                                                        |
| --------- | ----------------------------------------------------------------------------- |
| __1.__    | Run phasorsense                                                               |

## IPM Motor

The following is a list of instructions particular to setting up an IPM motor:

| Step      | Action                                                                        |
| --------- | ----------------------------------------------------------------------------- |
| __1.__	| Run phasorsense                                                               |
| __2.__	| Upload configuration                                                          |
| __3.__	| Set Rotor L to the Lq inductance of the motor. Lq is expected to be 2 – 4 times the value of Ld (the Line Inductance calculated by ParamExtract). |

 - If you can stiffly lock the rotor then ParamExtract can be used to find this inductance. After running ParamExtract and saving the calculated inductance as the Line Inductance, move the rotor 360 / (4 * nrPolePairs) degrees in either direction. In an IPM motor this will align phase CB with its highest inductance position. Run ParamExtract again, this will be the Lq inductance. Note this inductance, do not save it. Go back to the motor configuration screen and enter this inductance in the Rotor L field.

 - If you can't lock the rotor, set Rotor L to 2.35 * Line Inductance. Try driving the motor & assess the torque output for a given current limit → adjust the Rotor L field → try driving the motor & assess the torque output for a given current limit → repeat until you find best performing Rotor L value.

## Induction Motor

The following is a list of instructions particular to setting up an induction motor:

| Step      | Action                                                                        |
| --------- | ----------------------------------------------------------------------------- |
| __1.__    | Run ImExtract                                                                 |
| __2.__	| Check that the rotor R is correct – should be between 10 and 300 mR           |
| __3.__	| Check that rotor L is correct – should be between 5000 and 20000 uH           |
| __4.__	| Set Min Id – default to 5A                                                    |
| __5.__	| Set Max Id – start at 20A. Try driving the motor & assess the torque output for a given current limit → adjust the Max Id field → try driving the motor & assess the torque output for a given current limit → repeat until you find best performing Max Id value.  This process is best performed on a motor dynomometer.    |