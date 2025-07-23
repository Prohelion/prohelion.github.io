---
title: Prohelion BMS D1000 Gen2 - Configuration Parameters
---

This section provides information on each of the BMS Configuration Parameters.

### serialNumber

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Unique serial number for this unit |
| **Permission**  | Admin |
| **Index**       | 0x32 |
| **Scale**       | 1 |
| **Type**        | UINT16 |
| **Units**       | NA |
| **Default**     | 0 |

### deviceID

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Unique identifier for this device type |
| **Permission**  | Admin |
| **Index**       | 0x33 |
| **Scale**       | 1 |
| **Type**        | UINT16 |
| **Units**       | NA |
| **Default**     | 595 |

### bitrate

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | CAN bitrate that the device commmunicates with |
| **Permission**  | Admin |
| **Index**       | 0x34 |
| **Scale**       | 1 |
| **Type**        | UINT16 |
| **Units**       | kb/s |
| **Default**     | 500 |

### nodeID

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Base address for the CAN communication |
| **Permission**  | Admin |
| **Index**       | 0x35 |
| **Scale**       | 1 |
| **Type**        | UINT16 |
| **Units**       | NA |
| **Default**     | 1536 |

### numCMUNodes

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Number of CMU nodes in the system |
| **Permission**  | User |
| **Index**       | 0x36 |
| **Scale**       | 1 |
| **Type**        | UINT16 |
| **Units**       | NA |
| **Default**     | 1 |

### chargingMethod

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Method used for recharging the battery |
| **Permission**  | User |
| **Index**       | 0x37 |
| **Scale**       | 1 |
| **Type**        | UINT16 |
| **Units**       | enumeration |
| **Default**     | 0 |

### prechargeResistance

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Resistance of the precharge resistor |
| **Permission**  | User |
| **Index**       | 0x39 |
| **Scale**       | 1 |
| **Type**        | UINT16 |
| **Units**       | Ohms |
| **Default**     | 33000 |

### packCapacity

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Total Ah of the battery |
| **Permission**  | User |
| **Index**       | 0x40 |
| **Scale**       | 1 |
| **Type**        | UINT16 |
| **Units**       | Wh |
| **Default**     | 1000 |

### critCellOverVoltage

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Voltage for a single cell at which the BMS will force a disconnect of the battery |
| **Permission**  | User |
| **Index**       | 0x41 |
| **Scale**       | 0.001 |
| **Type**        | UINT16 |
| **Units**       | V |
| **Default**     | 4200 |

### warningCellOverVoltage

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Voltage for a single cell at which the BMS will disallow further charging |
| **Permission**  | User |
| **Index**       | 0x42 |
| **Scale**       | 0.001 |
| **Type**        | UINT16 |
| **Units**       | V |
| **Default**     | 4150 |

### cellBalancingVoltage

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Voltage for a single cell at which the BMS will trigger balancing |
| **Permission**  | User |
| **Index**       | 0x43 |
| **Scale**       | 0.001 |
| **Type**        | UINT16 |
| **Units**       | V |
| **Default**     | 4100 |

### warningCellUnderVoltage

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Voltage for a single cell at which the BMS will disallow further discharging |
| **Permission**  | User |
| **Index**       | 0x44 |
| **Scale**       | 0.001 |
| **Type**        | UINT16 |
| **Units**       | V |
| **Default**     | 2600 |

### critCellUnderVoltage

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Voltage for a single cell at which the BMS will force a disconnect of the battery |
| **Permission**  | User |
| **Index**       | 0x45 |
| **Scale**       | 0.001 |
| **Type**        | UINT16 |
| **Units**       | V |
| **Default**     | 2500 |

### maxTemperature

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Temperature upper limit at which the BMS will disconnect the battery |
| **Permission**  | User |
| **Index**       | 0x46 |
| **Scale**       | 0.1 |
| **Type**        | INT16 |
| **Units**       | °C |
| **Default**     | 600 |

### minTemperature

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Temperature lower limit at which the BMS will disconnect the battery |
| **Permission**  | User |
| **Index**       | 0x47 |
| **Scale**       | 0.1 |
| **Type**        | INT16 |
| **Units**       | °C |
| **Default**     | -200 |

### maxChargeCurrent

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Maximum allowed current that the pack will charge at without disconnecting |
| **Permission**  | User |
| **Index**       | 0x48 |
| **Scale**       | 0.1 |
| **Type**        | INT16 |
| **Units**       | A |
| **Default**     | 1000 |

### maxDischargeCurrent

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Maximum allowed current that the pack will discharge at without disconnecting |
| **Permission**  | User |
| **Index**       | 0x49 |
| **Scale**       | 0.1 |
| **Type**        | INT16 |
| **Units**       | A |
| **Default**     | 1000 |

### maxPrechargeCurrent

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Maximum allowed current that the pack will precharge at without failing |
| **Permission**  | User |
| **Index**       | 0x50 |
| **Scale**       | 0.001 |
| **Type**        | INT16 |
| **Units**       | A |
| **Default**     | 3000 |

### maxPrechargeVoltageDelta

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Maximum allowed voltage delta between load voltage and pack voltage before succeeding precharge |
| **Permission**  | User |
| **Index**       | 0x51 |
| **Scale**       | 0.001 |
| **Type**        | INT16 |
| **Units**       | V |
| **Default**     | 1000 |

### thermistorBetaValue

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Thermistor Beta Value for temperature calculations |
| **Permission**  | User |
| **Index**       | 0x52 |
| **Scale**       | 1 |
| **Type**        | UINT16 |
| **Units**       | NA |
| **Default**     | 3380 |

### prechargeTimeout

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Maximum allowable wait time before failing precharge |
| **Permission**  | User |
| **Index**       | 0x54 |
| **Scale**       | 0.001 |
| **Type**        | UINT16 |
| **Units**       | Seconds |
| **Default**     | 25000 |

### bmuTemperatureMin

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Minimum temperature of the BMS |
| **Permission**  | User |
| **Index**       | 0x55 |
| **Scale**       | 0.1 |
| **Type**        | INT16 |
| **Units**       | °C |
| **Default**     | 600 |

### bmuTemperatureMax

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Maximum temperature of the BMS |
| **Permission**  | User |
| **Index**       | 0x56 |
| **Scale**       | 0.1 |
| **Type**        | INT16 |
| **Units**       | °C |
| **Default**     | -200 |

### bmuPressureMin

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Minimum pressure of the BMS |
| **Permission**  | User |
| **Index**       | 0x57 |
| **Scale**       | 0.1 |
| **Type**        | INT16 |
| **Units**       | kPa |
| **Default**     | 0 |

### bmuPressureMax

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Maximum pressure of the BMS |
| **Permission**  | User |
| **Index**       | 0x58 |
| **Scale**       | 0.1 |
| **Type**        | INT16 |
| **Units**       | kPa |
| **Default**     | 1200 |

### bmuHumidityMin

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Minimum humidity of the BMS |
| **Permission**  | User |
| **Index**       | 0x59 |
| **Scale**       | 0.1 |
| **Type**        | INT16 |
| **Units**       | RH % |
| **Default**     | 0 |

### bmuHumidityMax

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Maximum humidity of the BMS |
| **Permission**  | User |
| **Index**       | 0x5A |
| **Scale**       | 0.1 |
| **Type**        | INT16 |
| **Units**       | RH % |
| **Default**     | 900 |

### cellInternalResistance

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Nominal internal resistance of the cell |
| **Permission**  | User |
| **Index**       | 0x5B |
| **Scale**       | 0.001 |
| **Type**        | UINT16 |
| **Units**       | Ohm |
| **Default**     | 31 |

### cellNominalCapacity

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Nominal capacity of a singular cell |
| **Permission**  | User |
| **Index**       | 0x5C |
| **Scale**       | 0.001 |
| **Type**        | UINT16 |
| **Units**       | Ah |
| **Default**     | 5000 |

### cellSocLookupTableLength

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Length of the SoC/OCV lookup table |
| **Permission**  | User |
| **Index**       | 0x5D |
| **Scale**       | 1 |
| **Type**        | UINT16 |
| **Units**       | NA |
| **Default**     | 101 |

### nodeNumCells

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Number of Cells per node |
| **Permission**  | User |
| **Index**       | 0x100 |
| **Scale**       | 1 |
| **Type**        | UINT16 ARRAY |
| **Length**      | 32 |
| **Units**       | NA |
| **Default**     | 10 |

### nodeNumTemp

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Number of Temp sensors per node |
| **Permission**  | User |
| **Index**       | 0x140 |
| **Scale**       | 1 |
| **Type**        | UINT16 ARRAY |
| **Length**      | 32 |
| **Units**       | NA |
| **Default**     | 4 |

### cellSocLookupTable

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Single cell voltages associated with its index as state of charge |
| **Permission**  | User |
| **Index**       | 0x160 |
| **Scale**       | 0.001 |
| **Type**        | INT16 ARRAY |
| **Length**      | 101 |
| **Units**       | V |
| **Default**     | 2500, 2715, 2826, 2904, 2958, 3005, 3044, 3083, 3105, 3133, 3180, 3222, 3250, 3281, 3309, 3338, 3363, 3385, 3399, 3412, 3424, 3434, 3445, 3453, 3463, 3473, 3483, 3494, 3504, 3514, 3524, 3534, 3543, 3551, 3559, 3567, 3575, 3582, 3589, 3598, 3604, 3612, 3620, 3627, 3635, 3643, 3652, 3660, 3669, 3679, 3688, 3699, 3709, 3720, 3731, 3741, 3750, 3760, 3769, 3781, 3790, 3800, 3808, 3818, 3828, 3836, 3844, 3854, 3861, 3869, 3877, 3885, 3893, 3901, 3910, 3921, 3931, 3944, 3957, 3971, 3985, 3998, 4010, 4020, 4033, 4043, 4051, 4056, 4061, 4065, 4069, 4073, 4077, 4082, 4087, 4092, 4100, 4111, 4126, 4152, 4200 |

### contactorConfigAuxEnable

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Contactor Auxiliary Check Enable |
| **Permission**  | User |
| **Index**       | 0x60 |
| **Scale**       | 1 |
| **Type**        | UINT32 |
| **Units**       | Bitfield |
| **Default**     | 69905 |

### contactorConfigTypes

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Contactor Type Configuration |
| **Permission**  | User |
| **Index**       | 0x61 |
| **Scale**       | 1 |
| **Type**        | UINT32 |
| **Units**       | Bitfield |
| **Default**     | 0 |
