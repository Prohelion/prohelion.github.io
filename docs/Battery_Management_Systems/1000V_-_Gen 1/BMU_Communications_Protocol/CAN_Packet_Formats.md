---
title: CAN Packet Formats
description: Documentation for the Prohelion Vehicle Communications protocol
order: 3
---

# CAN Packet Formats

## BMU Heartbeat and Serial Numbers

This packet is transmitted by the BMU and allows it to be located and identified on the CAN bus.  It contains an identifying string, and the serial number of the BMU device.

<strong>CAN ID: 0x600</strong>     

<strong>Interval: 1 Hz</strong>

| data_u32[0] | v5 and later: Devide ID: 0x00001000 v4 and earlier: <br> ASCII ID string: 'T', 'O', '6', '7' 
| data_u32[1] | Device serial number as programmed at the factory |

## CMU Status, Temperature and Voltage Telemetry

These packets are transmitted by the CMUs and contain the telemetry values from the cells.  The BMU will relay these packets through to the vehicle CAN bus if configured to do so – this is enabled by default.

Each CMU transmits a group of three packets, with the ID of the first packet being granted by the BMU during the ID request/grant phase at start-up.  

CMU 1 will be assigned an ID of 0x601, and will therefore transmit telemetry on 0x601, 0x602, and 0x603.  CMU 2 will be assigned an ID of 0x604, CMU 3 will be assigned to 0x607, and so on.

Reported cell voltages also indicate measurement status.  Measurements with a high confidence (both redundant measurement channels agree closely) will be reported as a reading in mV.  Readings where the redundant channels disagree ('trust' error) will be reported as <strong>negative mV</strong>, with the reported number coming from the high-accuracy / slow-speed converter channel.  

Note that with the current CMU firmware, during very rapid voltage changes (high charge/discharge current pulses), the channels may report as a trust error for a few update cycles due to the sampling timing for the two measurement channels not being simultaneous.

Readings with all cell voltages reported as negative indicate that either the 3.3V power supply voltage or one of the A/D reference voltages is out of specification.

A CMU reporting any of these conditions (-ve mV) will potentially be reporting erroneous readings.  A cell reporting a -ve mV reading will not balance that cell, to avoid balancing at a potentially incorrect voltage.  Any cell reporting as a -ve mV reading should be flagged in the higher-level system and dealt with appropriately.  It should not necessarily trigger an immediate system shutdown but should probably be latched and indicated to the user to seek servicing promptly.

Readings from cells above the number defined by the BMU to each CMU during start-up are sent as <strong>-32768mV (maximum negative) </strong> to indicate a 'cell not present / not monitored'.  A cell that is read by the CMU as having voltage present, when that cell has been configured as 'not present', will report as <strong>-32767mV</strong> to indicate a possible 'extra cell' fault.  These cells should not be included in any min / max / average cell voltage calculations.  

<strong>CAN ID: 0x601, 0x604, 0x607 etc. </strong>          

<strong>Interval: Approx. 1Hz (CMU timebases are not synchronised and will drift relative to each other, and to actual time)</strong>

| data_u32[0] | CMU serial number (allocated at factory) |
| data_16[2]  | PCB temperature (1/10th°C) |            
| data_16[3]  | Cell temperature (1/10th°C) |    

<strong>CAN ID: 0x602, 0x605, 0x608 etc. </strong>    

<strong>Interval: Approx. 1Hz</strong>

| data_16[0] | Cell 0 voltage (mV). +ve = OK, -ve = Channel mismatch |
| data_16[1] | Cell 1 voltage (mV). +ve = OK, -ve = Channel mismatch|            
| data_16[2] | Cell 2 voltage (mV). +ve = OK, -ve = Channel mismatch |     
| data_16[3] | Cell 3 voltage (mV). +ve = OK, -ve = Channel mismatch |    

<strong>CAN ID: 0x603, 0x606, 0x609 etc. </strong>         

<strong>Interval: Approx. 1Hz</strong>

| data_16[0] | Cell 4 voltage (mV). +ve = OK, -ve = Channel mismatch |
| data_16[1] | Cell 5 voltage (mV). +ve = OK, -ve = Channel mismatch|            
| data_16[2] | Cell 6 voltage (mV). +ve = OK, -ve = Channel mismatch |     
| data_16[3] | Cell 7 voltage (mV). +ve = OK, -ve = Channel mismatch |    

## Pack State of Charge (SOC)

This packet is transmitted by the BMU to show the current state of charge during normal pack operation.

<strong>CAN ID: 0x6F4</strong>    

<strong>Interval: 1Hz</strong>

| data_fp[0] | SOC (Amp-Hours (Ah)). Shows Ah consumed from pack. 0 = Full, and counts upwards towards the user-set pack capacity number as Ah are used. Resets to 0 when max cell reaches balance threshold.|
| data_fp[1]| Shows the SOC as a Percentage (%). 100% = full, 0% = empty|            

## Pack Balance State of Charge (SOC)

This packet is transmitted by the BMU to show the current state of cell mismatch during balancing at top of charge.

<strong>CAN ID: 0x6F5 </strong>

<strong>Interval: 1Hz</strong>

| data_fp[0] | Balance SOC (Ah). Shows Ah supplied to the pack since the first cell began balancing. This number will continue to count up until all cells in the pack are balancing, therefore showing the Ah mismatch that has been corrected during this balancing session |
| data_fp[1]| Shows the balancing SOC as a percentage (%), in other words the percentage mismatch between cells this session. |            

## Charger Control Information 

This packet is transmitted by the BMU to allow an external charger to control itself based in detailed cell information from the BMS, without having to know about the various user-configured cell setup parameters.

<strong>CAN ID: 0x6F6 </strong>

<strong>Interval: 10Hz</strong>

| data_16[0] | Charging cell voltage error (mV). This value is the user-configured “Balance Threshold” voltage minus the maximum cell voltage.  The charger should run a charge current control loop to try and bring this value to 0mV.  An Integral type control loop is suggested.|
| data_16[1]| Cell temperature margin ( 1/10th°C). This value is the maximum cell temperature minus the user-configured “Maximum Cell Temperature” limit.  The charger should reduce charge current such that this value will never reach 0, as the BMS will disconnect the pack if the maximum cell temperature is exceeded.  A Proportional type control loop is suggested.|  
| data_16[2] |Discharging cell voltage error (mV). This value is the user-configured “Zero SOC Threshold” voltage minus the minimum cell voltage.  This value can be used by devices that are discharging the battery (eg. motor controllers in vehicles) to gradually limit their consumption as the minimum cell approaches being fully discharged.|
| data_u16[3]| Total pack capacity (Ah). This value can be used by the charger / discharger to calculate control loop gain constants for the installation.  It is simply the user-set configuration value rounded to the nearest Ah. |

## Pre-Charge Status

This packet is transmitted by the BMU to indicate the current state of the pre-charge system.

<strong>CAN ID: 0x6F7</strong>  

<strong>Interval: 1Hz, and on each pre-charge state change</strong>

| data_u8[0] | Pre-charge contactor driver status:
||0x01 = Error status of contactor 1 driver (0 = OK, 1 = error ) <br> 0x02 = Error status of contactor 2 driver<br>0x04 = Output status of contactor 1 driver (0 = Off, 1 = On)<br>0x08 = Output status of contactor 2 driver<br>0x10 = 12V contactor supply voltage OK (0 = Fault, 1 = OK)<br>0x20 = Error status of contactor 3 driver<br>0x40 = Output status of contactor 3 driver<br>0x80 = Unused|
| data_u8[1] | Pre-charge state (in order of normal appearance when starting):
||0 = Error<br>1 = Idle<br>5 = Enable Pack<br>2 = Measure<br>3 = Pre-charge<br>4 = Run|
| data_u16[1] | 12V contactor supply voltage, mV (only on v4 or earlier BMU) for v5 or later BMU, refer to binary bit 0x10 in data_u8[0]|     
| data_u16[2] | Unused, reports as 0x0000|   
| data_u8[6] | 0x01 = Pre-charge timer elapsed. (Don't care if timeout disabled) 0x00 = Pre-charge timer not elapsed
| data_u8[7] | Pre-charge timer counter (10ms per count)|   

## Minimum / Maximum Cell Voltage

This packet is transmitted by the BMU to show the highest and lowest voltage cells in the pack.

<strong>CAN ID:0x6F8 </strong>    

<strong>Interval: 10Hz, will likely move to higher frequency in future version</strong>

| data_u16[0] | Minimum cell voltage (mV) |
| data_u16[1] | Maximum cell voltage (mV)            
| data_u8[4] | CMU number that has the minimum cell voltage |     
| data_u8[5] | Cell number in CMU that is the minimum cell voltage  |    
| data_u8[6] | CMU number that has the maximum cell voltage |     
| data_u8[7] | Cell number in CMU that is the maximum cell voltage  |

## Maximum / Minimum Cell Temperature

This packet is transmitted by the BMU to show the highest and lowest temperature cells in the pack.

<strong>CAN ID: 0x6F9 </strong>

<strong>Interval: 1Hz</strong>

| data_u16[0] | Minimum cell temperature (1/10th°C) |
| data_u16[1] | Maximum cell temperature ( 1/10th °C) |          
| data_u8[4] | CMU number that has the minimum cell temperature |     
| data_u8[5] | Unused, reads as 0x00  |    
| data_u8[6] | CMU number that has the maximum cell temperature |     
| data_u8[7] | Unused, reads as 0x00  |

## Battery Pack Voltage / Current

This packet is transmitted by the BMU to show the total pack voltage and current.

<strong> CAN ID: 0x6FA  </strong>

<strong>Interval: 10Hz</strong>

| data_u32[0] | Battery Voltage (mV) |
| data_u32[1] | Battery Current (m) |          

## Battery Pack Status

This packet is transmitted by the BMU to show the status of the overall pack.

<strong> CAN ID: 0x6FB </strong>

<strong>Interval: 1Hz</strong>

| data_u16[0] | Balance voltage threshold – rising (balance resistor turns on) |
| data_u16[1] | Balance voltage threshold – rising (balance resistor turns on)|          
| data_u8[4] | Status Flags
||0x01 = Cell Over Voltage<br>0x02 = Cell Under Voltage<br>0x04 = Cell Over Temperature<br>0x08 = Measurement Untrusted (redundant channel mismatch)<br>0x10 = CMU Communications Timeout (lost CMU)<br>0x20 = Vehicle Communications Timeout (lost EVDC)<br>0x40 = BMU is in Setup mode<br>0x80 = CMU CAN bus power status
||Present for backwards compatibility with older software<br>For newer software, please view the flags in the extended battery pack status ID packet |     
| data_u8[5] | BMS CMU count |    
| data_u16[3] | BMS BMU Firmware Build Number |

## Battery Pack Fan Status 

This packet is transmitted by the BMU to show fan speeds and 12V power consumption.

<strong>CAN ID: 0x6FC </strong>

<strong>Interval: 1Hz</strong>

| data_u16[0] | Fan speed 0 (rpm)|
| data_u16[1] | Fan Speed 1 (rpm) |          
| data_u16[2] | 12V current consumption of fans + contactors (mA) |     
| data_u16[3] | 12V current consumption of CMUs (mA)  |    

## Extended Battery Pack Status 

This packet is transmitted by the BMU to show extended pack status data.

<strong> CAN ID: 0x6FD </strong>

<strong>Interval: 1Hz</strong>

| data_u32[0] | Status Flags:
||0x00000001 = Cell Over Voltage<br>0x00000002 = Cell Under Voltage<br>0x00000004 = Cell Over Temperature<br>0x00000008 = Measurement Untrusted (channel mismatch)<br>0x00000010 = CMU Communications Timeout (lost CMU)<br>0x00000020 = Vehicle Communications Timeout (lost EVDC)<br>0x00000040 = BMU is in Setup mode<br>0x00000080 = CMU CAN bus power status<br>0x00000100 = Pack Isolation test failure<br>0x00000200 = SOC measurement is not valid<br>0x00000400 = CAN 12V supply is low  - about to shut down<br>0x00000800 = A contactor is stuck / not engaged<br>0x00001000 = A CMU has detected an extra cell present
| data_u8[4] |BMU Hardware version|          
| data_u8[5] |BMU Model ID|     
| data_u16[3] | Unused|    

## Reserved IDs

Do not transmit data on reserved IDs, as this may trigger configuration or boot load events and mode changes.