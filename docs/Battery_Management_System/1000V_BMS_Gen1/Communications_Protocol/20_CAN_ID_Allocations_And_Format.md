---
title: CAN ID's And Format
---

# CAN ID Allocations

By default, the BMS BMU ships with a CAN base ID set to 0x600.  This can be adjusted by the end user.  Assuming this base ID, the following CAN IDs are used on the vehicle bus by the BMS BMU:

| CAN ID (hex)    | Description                                                                |           
| --------------- | -------------------------------------------------------------------------- |
| `0x600`         | BMU heartbeat & serial number                                              | 
| `0x601 - 0x6EF` | CMU Status, temperature, and voltage telemetry, if set to relay to vehicle |
| `0x6F0`         | Reserved for factory configuration & calibration commands                  |            
| `0x6F1 - 0x6F3` | Reserved for future configuration system update                            |       
| `0x6F4`         | Pack SoC                                                                   |
| `0x6F5`         | Balance SoC                                                                |
| `0x6F6`         | Charger Control information                                                |
| `0x6F7`         | Pre-charge status, 12V status                                              |           
| `0x6F8`         | Minimum / Maximum cell voltage                                             |       
| `0x6F9`         | Minimum / Maximum cell temperature                                         |   
| `0x6FA`         | Battery pack voltage & current                                             |
| `0x6FB`         | Battery pack status                                                        |
| `0x6FC`         | Fan & 12V supply status                                                    |       
| `0x6FD`         | Extended battery pack status                                               |       
| `0x6FE - 0x6FF` | Reserved, currently unused                                                 |
| `0x7F0 - 0x7F4` | Reserved for bootloader triggering and data transfer (these IDs do __not__ move with a change in BMU CAN Base ID) | 

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
