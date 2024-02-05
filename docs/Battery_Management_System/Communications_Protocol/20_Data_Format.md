---
title: Data Format
description: Documentation for the Prohelion Vehicle Communications protocol
order: 2
---

# Data Format

The 8-byte data on the CAN bus is formatted using a 'union' overlay structure in the BMS CMU microcontroller firmware.  

__Note:__ this depends on the byte ordering and word size of the CPU and is not portable across architectures – however the byte order is correct for both the MSP430 microcontroller in the CMUs and BMU and the x86 CPU in a PC.

The structure is defined on the (16-bit) MSP430 as follows:

~~~ c++
typedef union _group_64 {
	float data_fp[2];
	unsigned char data_u8[8];
	char data_8[8];
	unsigned int data_u16[4];
	int data_16[4];
	unsigned long data_u32[2];
	long data_32[2];
} group_64;
~~~

Data values data_u8[0] through to data_u8[7] are the bytes transmitted on the CAN bus.
