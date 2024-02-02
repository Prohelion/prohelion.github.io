---
title: Timing
description: Documentation for the Prohelion Vehicle Communications protocol
order: 1
---

# Timing

The serial link runs using asynchronous UART comms at 470.6 kbits/sec, 1 start bit, 8 bits data, 1 stop bit, no parity.  Complete packets are sent at a rate that will keep the serial channel full.  

There should be a break character inserted after each packet, to allow the reciever to resynchronise to the correct start bit if noise corrupts the transmission during a packet.

The WaveSculptor should run a timeout check on incoming comms, and flag a fault if no data is received within a certain time window (MOT error).
