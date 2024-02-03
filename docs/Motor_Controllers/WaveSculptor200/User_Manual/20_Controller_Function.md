---
title: Controller Function
description: Documentation for the Prohelion Vehicle Communications protocol
order: 2
---

# Controller Function

As a high-level description, the WaveSculptor takes high voltage DC from a battery pack, and converts it to a lower voltage 3-phase AC to drive a motor.  

Power flow is bi-directional, so it can also perform regenerative braking (regen) where power flows from the motor back into the batteries.  It is a four-quadrant device, which means that it can drive or regen in both forwards and reverse directions.

Ignoring the losses in the system (refer to the [datasheet](http://localhost:4000/WaveSculptor_Motor_Controllers/WaveSculptor200_datasheet/0_Overview.md) for efficiency curves for the WaveSculptor), total power through the motor controller is conserved.  It does not create energy, it just converts it from one form (DC) to another (AC).  

## A Note on Motor and Battery Currents

Motor current is proportional to torque, whereas battery current is proportional to power.

<strong>Power = Torque x speed</strong>  

The effect of this is that battery current will only approach motor current as the motor speed approaches 100%.  At low motor speeds, the battery current will also be low, regardless of what the motor current is.  

This applies to most motor controllers, but with DC motor systems (where efficiency is much more variable) the effect is not usually as noticeable.  So, when reading this document (and the [datasheet](http://localhost:4000/WaveSculptor_Motor_Controllers/WaveSculptor200_datasheet/0_Overview.md)) make sure to note if the specification is talking about motor current or battery current.  They are very different quantities.

