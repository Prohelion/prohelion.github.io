---
title: Prohelion BMS D1000 Gen2 - Configuration Parameters
---
<!--- Auto-generated markdown documentation from config_map.yaml -->

This section provides information on each of the BMS configuration parameters.

## serialNumber

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Unique serial number for this unit |
| **Permission**  | Admin |
| **Index**       | 0x32 |
| **Scale**       | 1 |
| **Type**        | UINT16 |
| **Default**     | 0 |

## deviceID

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Unique identifier for this device type |
| **Permission**  | Admin |
| **Index**       | 0x33 |
| **Scale**       | 1 |
| **Type**        | UINT16 |
| **Max**     | 4472 |
| **Min**     | 4476 |
| **Values**      | <ul><li>4472: D1000 Gen2 12V rev 1</li><li>4476: D1000 Gen2 24V rev 1</li></ul>  |

## bitrate

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | CAN bitrate that the device communicates with |
| **Permission**  | Admin |
| **Index**       | 0x34 |
| **Scale**       | 1 |
| **Type**        | UINT16 |
| **Units**       | Enum |
| **Max**     | 1000 |
| **Min**     | 125 |
| **Values**      | <ul><li>125: 125 kb/s</li><li>250: 250 kb/s</li><li>500: 500 kb/s</li><li>1000: 1000 kb/s</li></ul>  |
| **Default**     | 500 |

## nodeID

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Base address for the CAN communication |
| **Permission**  | Admin |
| **Index**       | 0x35 |
| **Scale**       | 1 |
| **Type**        | UINT16 |
| **Max**     | 0x700 |
| **Min**     | 0x000 |
| **Default**     | 0x600 |

## numCMUNodes

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Number of CMU nodes in the system |
| **Permission**  | User |
| **Index**       | 0x36 |
| **Scale**       | 1 |
| **Type**        | UINT16 |
| **Max**     | 32 |
| **Min**     | 1 |
| **Default**     | 1 |

## chargingMethod

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Method used for recharging the battery |
| **Permission**  | User |
| **Index**       | 0x37 |
| **Scale**       | 1 |
| **Type**        | UINT16 |
| **Units**       | Enum |
| **Max**     | 0 |
| **Min**     | 2 |
| **Values**      | <ul><li>0: None</li><li>1: EVSE</li><li>2: External</li></ul>  |
| **Default**     | 0 |

## prechargeResistance

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Resistance of the precharge resistor |
| **Permission**  | User |
| **Index**       | 0x39 |
| **Scale**       | 0.1 |
| **Type**        | UINT16 |
| **Units**       | Ohms |
| **Max**     | 32000 |
| **Min**     | 1 |
| **Default**     | 330 |

## packCapacity

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Total Ah of the battery |
| **Permission**  | User |
| **Index**       | 0x40 |
| **Scale**       | 0.1 |
| **Type**        | UINT16 |
| **Units**       | Ah |
| **Max**     | 32000 |
| **Min**     | 1 |
| **Default**     | 1000 |

## critCellOverVoltage

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Voltage for a single cell at which the BMS will force a disconnect of the battery |
| **Permission**  | User |
| **Index**       | 0x41 |
| **Scale**       | 0.001 |
| **Type**        | UINT16 |
| **Units**       | V |
| **Max**     | 32000 |
| **Min**     | 1 |
| **Default**     | 4200 |

## warningCellOverVoltage

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Voltage for a single cell at which the BMS will disable further charging |
| **Permission**  | User |
| **Index**       | 0x42 |
| **Scale**       | 0.001 |
| **Type**        | UINT16 |
| **Units**       | V |
| **Max**     | 32000 |
| **Min**     | 1 |
| **Default**     | 4150 |

## cellBalancingVoltage

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Voltage for a single cell at which the BMS will trigger balancing |
| **Permission**  | User |
| **Index**       | 0x43 |
| **Scale**       | 0.001 |
| **Type**        | UINT16 |
| **Units**       | V |
| **Max**     | 32000 |
| **Min**     | 1 |
| **Default**     | 4100 |

## warningCellUnderVoltage

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Voltage for a single cell at which the BMS will disable further discharging |
| **Permission**  | User |
| **Index**       | 0x44 |
| **Scale**       | 0.001 |
| **Type**        | UINT16 |
| **Units**       | V |
| **Max**     | 32000 |
| **Min**     | 1 |
| **Default**     | 2600 |

## critCellUnderVoltage

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Voltage for a single cell at which the BMS will force a disconnect of the battery |
| **Permission**  | User |
| **Index**       | 0x45 |
| **Scale**       | 0.001 |
| **Type**        | UINT16 |
| **Units**       | V |
| **Max**     | 32000 |
| **Min**     | 1 |
| **Default**     | 2500 |

## maxCellTemperature

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Temperature upper limit at which the BMS will disconnect the battery |
| **Permission**  | User |
| **Index**       | 0x46 |
| **Scale**       | 0.1 |
| **Type**        | INT16 |
| **Units**       | °C |
| **Max**     | 2000 |
| **Min**     | -2000 |
| **Default**     | 600 |

## minCellTemperature

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Temperature lower limit at which the BMS will disconnect the battery |
| **Permission**  | User |
| **Index**       | 0x47 |
| **Scale**       | 0.1 |
| **Type**        | INT16 |
| **Units**       | °C |
| **Max**     | 2000 |
| **Min**     | -2000 |
| **Default**     | -200 |

## maxChargeCurrent

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Maximum allowed current that the pack will charge at without disconnecting |
| **Permission**  | User |
| **Index**       | 0x48 |
| **Scale**       | 0.1 |
| **Type**        | INT16 |
| **Units**       | A |
| **Max**     | 32000 |
| **Min**     | 1 |
| **Default**     | 1000 |

## maxDischargeCurrent

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Maximum allowed current that the pack will discharge at without disconnecting |
| **Permission**  | User |
| **Index**       | 0x49 |
| **Scale**       | 0.1 |
| **Type**        | INT16 |
| **Units**       | A |
| **Max**     | 32000 |
| **Min**     | 1 |
| **Default**     | 1000 |

## maxPrechargeCurrent

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Maximum allowed current that the pack will precharge at without failing |
| **Permission**  | User |
| **Index**       | 0x50 |
| **Scale**       | 0.001 |
| **Type**        | INT16 |
| **Units**       | A |
| **Max**     | 32000 |
| **Min**     | 0 |
| **Default**     | 3000 |

## maxPrechargeVoltageDelta

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Maximum allowed voltage delta between load voltage and pack voltage before succeeding precharge |
| **Permission**  | User |
| **Index**       | 0x51 |
| **Scale**       | 0.001 |
| **Type**        | INT16 |
| **Units**       | V |
| **Max**     | 32000 |
| **Min**     | 0 |
| **Default**     | 1000 |

## thermistorBetaValue

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Thermistor Beta Value for temperature calculations |
| **Permission**  | User |
| **Index**       | 0x52 |
| **Scale**       | 1 |
| **Type**        | UINT16 |
| **Max**     | 64000 |
| **Min**     | 0 |
| **Default**     | 3380 |

## prechargeTimeout

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Maximum allowable wait time before failing precharge |
| **Permission**  | User |
| **Index**       | 0x54 |
| **Scale**       | 0.001 |
| **Type**        | UINT16 |
| **Units**       | Seconds |
| **Max**     | 64000 |
| **Min**     | 0 |
| **Default**     | 25000 |

## bmuTemperatureMin

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Minimum temperature of the BMS |
| **Permission**  | User |
| **Index**       | 0x55 |
| **Scale**       | 0.1 |
| **Type**        | INT16 |
| **Units**       | °C |
| **Max**     | 32000 |
| **Min**     | -32000 |
| **Default**     | 600 |

## bmuTemperatureMax

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Maximum temperature of the BMS |
| **Permission**  | User |
| **Index**       | 0x56 |
| **Scale**       | 0.1 |
| **Type**        | INT16 |
| **Units**       | °C |
| **Max**     | 32000 |
| **Min**     | -32000 |
| **Default**     | -200 |

## bmuPressureMin

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Minimum pressure of the BMS |
| **Permission**  | User |
| **Index**       | 0x57 |
| **Scale**       | 0.1 |
| **Type**        | INT16 |
| **Units**       | kPa |
| **Max**     | 32000 |
| **Min**     | 0 |
| **Default**     | 0 |

## bmuPressureMax

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Maximum pressure of the BMS |
| **Permission**  | User |
| **Index**       | 0x58 |
| **Scale**       | 0.1 |
| **Type**        | INT16 |
| **Units**       | kPa |
| **Max**     | 32000 |
| **Min**     | 0 |
| **Default**     | 1200 |

## bmuHumidityMin

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Minimum humidity of the BMS |
| **Permission**  | User |
| **Index**       | 0x59 |
| **Scale**       | 0.1 |
| **Type**        | INT16 |
| **Units**       | RH % |
| **Max**     | 32000 |
| **Min**     | 0 |
| **Default**     | 0 |

## bmuHumidityMax

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Maximum humidity of the BMS |
| **Permission**  | User |
| **Index**       | 0x5A |
| **Scale**       | 0.1 |
| **Type**        | INT16 |
| **Units**       | RH % |
| **Max**     | 32000 |
| **Min**     | 0 |
| **Default**     | 900 |

## cellInternalResistance

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Nominal internal resistance of the cell |
| **Permission**  | User |
| **Index**       | 0x5B |
| **Scale**       | 0.001 |
| **Type**        | UINT16 |
| **Units**       | Ohms |
| **Max**     | 64000 |
| **Min**     | 0 |
| **Default**     | 31 |

## cellNominalCapacity

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Nominal capacity of a singular cell |
| **Permission**  | User |
| **Index**       | 0x5C |
| **Scale**       | 0.001 |
| **Type**        | UINT32 |
| **Units**       | Ah |
| **Max**     | 64000000 |
| **Min**     | 1 |
| **Default**     | 5000 |

## contactorConfigAuxEnable

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Contactor Auxiliary Check Enable |
| **Permission**  | User |
| **Index**       | 0x60 |
| **Scale**       | 1 |
| **Type**        | UINT32 |
| **Units**       | Bitfield |
| **Max**     | 0x11111 |
| **Min**     | 0x00000 |
| **Default**     | 0x11111 |

## contactorConfigTypes

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Contactor Type Configuration (NO/NO or NO/NC) |
| **Permission**  | User |
| **Index**       | 0x61 |
| **Scale**       | 1 |
| **Type**        | UINT32 |
| **Units**       | Bitfield |
| **Max**     | 0x11111 |
| **Min**     | 0x00000 |
| **Default**     | 0x00000 |

## nodeNumCells

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Number of Cells per node |
| **Permission**  | User |
| **Index**       | 0x100 |
| **Scale**       | 1 |
| **Type**        | UINT16 ARRAY |
| **Max**     | 14 |
| **Min**     | 1 |
| **Default**     | 10 |

## nodeNumTemp

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Number of Temp sensors per node |
| **Permission**  | User |
| **Index**       | 0x140 |
| **Scale**       | 1 |
| **Type**        | UINT16 ARRAY |
| **Max**     | 4 |
| **Min**     | 0 |
| **Default**     | 4 |

## cellSocLookupTableLength

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Length of the SoC/OCV lookup table |
| **Permission**  | User |
| **Index**       | 0x5D |
| **Scale**       | 1 |
| **Type**        | UINT16 |
| **Max**     | 101 |
| **Min**     | 2 |
| **Default**     | 101 |

## cellSocLookupTable

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Single cell voltages associated with its index as state of charge |
| **Permission**  | User |
| **Index**       | 0x160 |
| **Scale**       | 0.001 |
| **Type**        | INT16 ARRAY |
| **Units**       | V |
| **Max**     | 100000 |
| **Min**     | 0 |
| **Default**     | 2500, 2715, 2826, 2904, 2958, 3005, 3044, 3083, 3105, 3133, 3180, 3222, 3250, 3281, 3309, 3338, 3363, 3385, 3399, 3412, 3424, 3434, 3445, 3453, 3463, 3473, 3483, 3494, 3504, 3514, 3524, 3534, 3543, 3551, 3559, 3567, 3575, 3582, 3589, 3598, 3604, 3612, 3620, 3627, 3635, 3643, 3652, 3660, 3669, 3679, 3688, 3699, 3709, 3720, 3731, 3741, 3750, 3760, 3769, 3781, 3790, 3800, 3808, 3818, 3828, 3836, 3844, 3854, 3861, 3869, 3877, 3885, 3893, 3901, 3910, 3921, 3931, 3944, 3957, 3971, 3985, 3998, 4010, 4020, 4033, 4043, 4051, 4056, 4061, 4065, 4069, 4073, 4077, 4082, 4087, 4092, 4100, 4111, 4126, 4152, 4200 |
