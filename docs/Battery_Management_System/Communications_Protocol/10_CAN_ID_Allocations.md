---
title: CAN ID Allocations
description: Documentation for the Prohelion Vehicle Communications protocol
order: 1
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