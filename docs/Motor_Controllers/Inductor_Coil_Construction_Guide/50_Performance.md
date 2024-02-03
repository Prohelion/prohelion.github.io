---
title: Performance
description: Documentation for the Prohelion Vehicle Communications protocol
order: 5
---

# Performance

### Calculations:

L = N<sup>2</sup> x A<sub>L</sub> = 36<sup>2</sup>turns x 37nH/turn = 48µH

### Testing:

50A step response:

L = 118V / (23.4A / 10 µS) = 50µH

### 100A step response: 

Start of step (10A)	L = 118V / (45.3A / 19.2µS) = 50µH

End of step (115A)	L = 118V / (35.9A / 12.4µS) = 40µH

### 120A Step response:

Start of step (10A)	L = 118V / (54.7A / 23.8µS) = 50µH

End of step (150A)	L = 118V / (54.7A / 13.8µS) = 30µH

The decay of inductance with increasing current is gradual and continuous, unlike the ferrite cored CSIRO inductors.  This gradual decay presents no major problems for the Wavesculptor current control loop maintaining control of the motor phase current.

