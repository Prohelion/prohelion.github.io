---
title: Motor Setup and Testing
---

# Motor Setup and Testing 

## Low Power Setup 

At this stage, put the car on a vehicle lift, or use a secure method to lift the drive wheels from the ground. 

A low voltage supply should be connected to perform the next stage of testing.  Note that if it is necessary to run these tests again later, they may be run from the high voltage pack – it is not necessary to disconnect everything and use a low voltage setup.  At this point however, the low voltage supply should be used as a safer option until it is known that everything in the system is working correctly.

A suitable low voltage supply is a pair of 12V batteries in series.  Make sure to fuse them correctly, and use your precharge circuit.  A power supply with current limiting is the best option if one is available.

Run the PC software, and provide 12V along the CAN cable to power up the motor controller electronics.  You should see telemetry values updating on the PC.  Connect the 24V to the high power section of the motor controller.  You should see the reported battery voltage on the PC show the correct value.

If you are using a BLDC or other permanent magnet motor, refer to the [software user's manual](../../Config_Software/index.md) for the procedure to run PhasorSense.  This routine identifies the relationship between motor phases and hall position sensors.

Next, run the parameter extraction routine, which calculates motor parameters.  Save the results into one of the ten available motor configuration slots.  In the general configuration screen, set this motor slot as the “Active Motor”.

For bench testing with an unloaded motor, set the vehicle mass in the config screen to 30kg.  Using the actual vehicle mass when running with an unloaded motor will cause the velocity control loop to overshoot and oscillate around the setpoint.

## Low Power Testing

### PC Software Control

This test will check that the motor spins and is configured correctly.  

Open the controls screen in the PC software (View → Controls). There are three sliders, setting Motor Current, Motor Velocity, and Bus (battery) current respectively.  The motor controller will use up to whatever motor current you have set to try and achieve the requested velocity.  The motor current will be limited if the battery current reaches the bus current setpoint.

If using batteries as the power source, regenerative braking (regen) can also be tested.  DO NOT test regen braking if using a power supply for the 24V source, as you will force current back into the supply and damage it.

The motor controller will regen if the velocity is set to a lower speed than the motor is actually moving, and motor current is above zero. 

To stop without regen braking:

__1.__	Zero the motor current, then
__2.__	Zero the velocity

To stop with regen braking:

__1.__	Set motor current to your desired regen current, then
__2.__	Zero the velocity

Now that the motor is configured correctly, set the Bus Current to 100%, if it is not already.  Change the Velocity slider to around 10%.  Now, gradually increase the Motor Current slider, and the motor should smoothly accelerate to a moderate speed.

Zero the motor current, then zero the velocity, and the motor should smoothly coast to a stop.
  
Now set the velocity slider to 100%.  Once again, gradually increase the motor current.  The motor should smoothly accelerate to a faster speed than before.  Zero the motor current, then zero the velocity.  

If using batteries, now test regen braking.  Set velocity to 100%.  Gradually increase motor current.  Now, with the motor spinning, set motor current to around 10%.  Zero the velocity.  The motor will regen brake to a halt.  Since it does not have the mass of a vehicle to damp the system, it may then oscillate slightly forwards and backwards – this should be relatively minimal if the vehicle mass was set to 30kg as outlined in the previous section.  Zero the motor current when near zero speed to stop this happening.

### Driver Controls Hardware

Remove the CAN cable and termination resistor from the CAN-Ethernet bridge, and connect them both to the EV Driver Controls hardware.  

Provide 12V power to the driver controls.  Go through the startup sequence as described in the [Driver Controls User's Manual](../../../Driver_Control/User_Manual/index.md).  Depending on the exact firmware you have this will usually involve turning the key to the start position, and selecting forward gear in the driver controls. 

Use the accelerator (gas) pedal to run the motor.  Complete the following checks:

- [ ] Driving forwards
- [ ] Car coasts to a stop when accelerator pedal is lifted
- [ ] Driving in reverse
- [ ] Car coasts to a stop when accelerator pedal is lifted
- [ ] Appropriate action happens when brake pedal is pushed
- [ ] If your driver controls is configured to use regen, it works correctly in forwards
- [ ] If your driver controls is configured to use regen, it works correctly in reverse
- [ ] Selecting Neutral on the driver controls makes the car coast to a stop
- [ ] Turning off the key makes the car coast to a stop

## High Power Testing

Make sure your precharge circuit, contactors, and fusing are in place.  Check the polarity of the supply cables to the WaveSculptor.  Take all appropriate safety precautions when working on the HV circuitry.  Depending on the legislation in your country, you may require a licensed electrician to work on the high voltage parts of the system.

Making sure that all contactors are off, in the safe state, make the bolt connections to the DC POS and DC NEG terminals of the WaveSculptor.

### PC Software Control

Move the CAN cable and termination resistor from the hardware driver controls and reconnect it to the CAN-Ethernet bridge.  Run the PC software.  Run through the same checks as outlined in the previous 24V low voltage testing section.  

### Driver Controls Hardware

Reconnect the CAN cable and termination resistor to the hardware driver controls.  Run through the same checks as listed above in the 24V driver controls hardware testing.  

Test at least the following functionality:

- [ ] Driving forwards
- [ ] Car coasts to a stop when accelerator pedal is lifted
- [ ]  Driving in reverse
- [ ] Car coasts to a stop when accelerator pedal is lifted
- [ ] Appropriate action happens when brake pedal is pushed
- [ ] If your driver controls is configured to use regen, it works correctly in forwards
- [ ] If your driver controls is configured to use regen, it works correctly in reverse
- [ ] Selecting Neutral on the driver controls makes the car coast to a stop
- [ ] Turning off the key makes the car coast to a stop