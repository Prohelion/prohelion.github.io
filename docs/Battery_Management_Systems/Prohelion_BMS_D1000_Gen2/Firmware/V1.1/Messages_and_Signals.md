---
title: Prohelion BMS D1000 Gen2 - DBC Messages and Signals
---

This section provides detailed information on the CAN bus messages and signals used in the Prohelion BMS D1000 Gen2. Each message is identified by its unique ID, and the structure, including signals, is described.

>NOTE: The following messages IDs assume a CAN Bus BASE ID of `0x600`. The BASE ID of each device is configurable via the device configuration. If the BASE ID has been changed,  

---

## Overview

| **Message ID**        | **Name**                                |
|---------------------- |------------------------------------------|
| **0x600**             | [Device Heartbeat](#device-heartbeat)         |
| **0x601**             | [Device Firmware Info](#device-firmware-info) |
| **0x606**             | [BMS State Info](#bms-state-info)             |
| **0x607**             | [BMS Current Data](#bms-current-data)         |
| **0x608**             | [BMS Voltage Data](#bms-voltage-data)         |
| **0x609**             | [BMS Auxiliary Data](#bms-auxiliary-data)      |
| **0x60A**             | [BMS SOC Data](#bms-soc-data)                 |
| **0x60B**             | [BMS SOH Data](#bms-soh-data)                 |
| **0x60C**             | [BMS Counter Data](#bms-counter-data)         |
| **0x60D**             | [Node Info](#node-info)                       |
| **0x60E**             | [Node Cell Info](#node-cell-info)             |
| **0x60F**             | [Node Temp Info](#node-temp-info)             |


---
## Device Information

### Device Heartbeat

| **Field**       | **Value**                                |
|-----------------|------------------------------------------|
| **Message ID**  | `0x600` (1536)                           |
| **Description** | Device heartbeat information.            |

#### Signals

| **Signal Name**  | **Start Bit** | **Length** | **Factor** | **Offset** | **Min Value** | **Max Value** | **Unit** | **Description**                   |
|------------------|---------------|------------|------------|------------|---------------|---------------|----------|-----------------------------------|
| DeviceType       | 0             | 32 bits    | 1          | 0          | N/A           | N/A           | N/A      | Type of device in the system      |
| DeviceSerial     | 32            | 32 bits    | 1          | 0          | N/A           | N/A           | N/A      | Unique serial number of the device|

---

### Device Firmware Info

| **Field**       | **Value**                                |
|-----------------|------------------------------------------|
| **Message ID**  | `0x601` (1537)                           |
| **Description** | Firmware version information.            |

#### Signals

| **Signal Name**       | **Start Bit** | **Length** | **Factor** | **Offset** | **Min Value** | **Max Value** | **Unit** | **Description**             |
|-----------------------|---------------|------------|------------|------------|---------------|---------------|----------|-----------------------------|
| FirmwareMajorVersion  | 0             | 8 bits     | 1          | 0          | N/A           | N/A           | N/A      | Major version of firmware    |
| FirmwareMinorVersion  | 8             | 8 bits     | 1          | 0          | N/A           | N/A           | N/A      | Minor version of firmware    |
| FirmwarePatchVersion  | 16            | 16 bits    | 1          | 0          | N/A           | N/A           | N/A      | Patch version of firmware    |

---
## BMS Information

### BMS State Info

| **Field**       | **Value**                                |
|-----------------|------------------------------------------|
| **Message ID**  | `0x606` (1542)                           |
| **Description** | Information on BMS states, failures, and faults. |

#### Signals

| **Signal Name**                   | **Start Bit** | **Length** | **Factor** | **Offset** | **Min Value** | **Max Value** | **Unit** | **Description**             |
|-----------------------------------|---------------|------------|------------|------------|---------------|---------------|----------|-----------------------------|
| BMSState                          | 0             | 16 bit     | 1          | 0          | N/A           | N/A           | N/A      | BMS State                           |
| BMSPrechargeFault                 | 16            | 8 bit      | 1          | 0          | N/A           | N/A           | N/A      | Precharge Fault Reason Bitfield     |
| BMSContactorFault                 | 24            | 8 bits     | 1          | 0          | N/A           | N/A           | N/A      | Contactor Fault ID Bitfield         |
| BMSReason                         | 32            | 32 bit     | 1          | 0          | N/A           | N/A           | N/A      | BMS Safe-State Reason               |
|


#### BMS State Bitfield Table

| **Bit Position** | **Hex Value** | **State Code** | **Description**          |
|------------------|---------------|----------------|--------------------------|
| 0                | 0x01          | INITIALISE     | Initialisation state     |
| 1                | 0x02          | CALIBRATE      | Calibration state        |
| 2                | 0x04          | IDLE           | Idle state               |
| 3                | 0x08          | CONNECT        | Connect state            |
| 4                | 0x10          | PRECHARGE      | Precharge state          |
| 5                | 0x20          | ENABLED        | Enabled state            |
| 6                | 0x40          | CHARGE         | Charging state           |
| 7                | 0x80          | SAFE           | Safe state               |


#### BMS Precharge Fault Reason Bitfield Table

| **Bit Position** | **Hex Value** | **Reason Code**   | **Description**              |
|------------------|---------------|-------------------|------------------------------|
| 0                | 0x01          | TIMEOUT           | Timeout issue                |
| 1                | 0x02          | OVER_CURRENT_MAX  | Overcurrent maximum detected |
| 2                | 0x04          | OVER_CURRENT_PCHG | Overcurrent during precharge |
| 3                | 0x08          | NEG_CURRENT       | Negative current detected    |
| 4                | 0x10          | STABLE_CURRENT    | Stable current issue         |
| 5                | 0x20          | OVER_VOLTAGE      | Overvoltage detected         |
| 6                | 0x40          | STABLE_VOLTAGE    | Stable voltage issue         |

#### BMS Contactor ID Fault Bitfield Table

| **Bit Position** | **Hex Value** | **Contactor Code**         | **Description**         |
|------------------|---------------|------------------------|-------------------------|
| 0                | 0x01          | CONTACTOR1             | Contactor 1 fault       |
| 1                | 0x02          | CONTACTOR2             | Contactor 2 fault       |
| 2                | 0x04          | CONTACTOR3             | Contactor 3 fault       |
| 3                | 0x08          | CONTACTOR4             | Contactor 4 fault       |
| 4                | 0x10          | CONTACTOR5             | Contactor 5 fault       |

#### BMS Reason Safe-State Reason Bitfield Table

| **Bit Position** | **Hex Value** | **Reason Code**     | **Description**                   |
|------------------|---------------|---------------------|-----------------------------------|
| 0                | 0x00000001    | SELFTEST_FAIL       | Self-test failure                 |
| 1                | 0x00000002    | WATCHDOG_FAIL       | Watchdog failure                  |
| 2                | 0x00000004    | CONTACTOR_FAIL      | Contactor failure                 |
| 3                | 0x00000008    | HVIL                | HVIL issue                        |
| 4                | 0x00000010    | BATT_VOLTAGE        | Battery voltage issue             |
| 5                | 0x00000020    | PACK_VOLTAGE        | Pack voltage issue                |
| 6                | 0x00000040    | LOAD_VOLTAGE        | Load voltage issue                |
| 7                | 0x00000080    | FUSE_VOLTAGE        | Fuse voltage issue                |
| 8                | 0x00000100    | OVER_CURRENT        | Overcurrent detected              |
| 9                | 0x00000200    | NODE_COUNT          | Node count issue                  |
| 10               | 0x00000400    | CELL_COUNT          | Cell count issue                  |
| 11               | 0x00000800    | TEMP_COUNT          | Temperature count issue           |
| 12               | 0x00001000    | BJU_TIMEOUT         | BJU timeout                       |
| 13               | 0x00002000    | PACK_TIMEOUT        | Pack timeout                      |
| 14               | 0x00004000    | CONTROL_TIMEOUT     | Control timeout                   |
| 15               | 0x00008000    | SENSOR_TIMEOUT      | Sensor timeout                    |
| 16               | 0x00010000    | OVER_VOLT           | Cell over-voltage detected        |
| 17               | 0x00020000    | UNDER_VOLT          | Cell under-voltage detected       |
| 18               | 0x00040000    | OVER_TEMP           | Cell over-temperature detected    |
| 19               | 0x00080000    | UNDER_TEMP          | Cell under-temperature detected   |
| 20               | 0x00100000    | PRESSURE            | Pressure issue                    |
| 21               | 0x00200000    | HUMIDITY            | Humidity issue                    |
| 22               | 0x00400000    | VOC                 | VOC (Volatile Organic Compounds) issue  |
| 23               | 0x00800000    | NOX                 | NOx (Nitrogen Oxides) issue             |

---

### BMS Current Data

| **Field**           | **Value**                |
|---------------------|--------------------------|
| **Message ID**      | `0x607` (1543)           |
| **Description**     | Current measurement data.|

### Signals

| **Signal Name**        | **Start Bit** | **Length** | **Factor** | **Offset** | **Min Value** | **Max Value** | **Unit** | **Description**         |
|------------------------|---------------|------------|------------|------------|---------------|---------------|----------|-------------------------|
| InstantaneousCurrent   | 0             | 32 bits     | -0.001     | 0          | N/A           | N/A           | A        | Instantaneous current measurement |
| FilteredCurrent        | 32            | 32 bits     | -0.001     | 0          | N/A           | N/A           | A        | Filtered current measurement      |

---

### BMS Voltage Data

| **Field**           | **Value**                |
|---------------------|--------------------------|
| **Message ID**      | `0x608` (1544)           |
| **Description**     | Voltage measurement data.|

### Signals

| **Signal Name**     | **Start Bit** | **Length** | **Factor** | **Offset** | **Min Value** | **Max Value** | **Unit** | **Description**        |
|---------------------|---------------|------------|------------|------------|---------------|---------------|----------|------------------------|
| BatteryVoltage      | 0             | 32 bits     | 0.001      | 0          | N/A           | N/A           | V        | Battery voltage measurement |
| LoadVoltage         | 32            | 32 bits     | 0.001      | 0          | N/A           | N/A           | V        | Load voltage measurement    |

---

### BMS Auxiliary Data

| **Field**           | **Value**                |
|---------------------|--------------------------|
| **Message ID**      | `0x609` (1545)           |
| **Description**     | Auxiliary data.          |

#### Signals

| **Signal Name**      | **Start Bit** | **Length** | **Factor** | **Offset** | **Min Value** | **Max Value** | **Unit** | **Description**             |
|----------------------|---------------|------------|------------|------------|---------------|---------------|----------|-----------------------------|
| AuxiliaryVoltage     | 0             | 32 bits     | 0.001      | 0          | N/A           | N/A           | V        | Auxiliary voltage measurement |
| Power                | 32            | 32 bits     | 0.001      | 0          | N/A           | N/A           | V        | Power measurement            |

---

### BMS SOC Data

| **Field**           | **Value**                |
|---------------------|--------------------------|
| **Message ID**      | `0x60A` (1547)           |
| **Description**     | Counter data.            |

#### Signals

| **Signal Name**     | **Start Bit** | **Length** | **Factor** | **Offset** | **Min Value** | **Max Value** | **Unit** | **Description**         |
|---------------------|---------------|------------|------------|------------|---------------|---------------|----------|-------------------------|
| BatterySoC          | 0             | 16 bits     | 0.1      | 0           | 0             | 1000         | %         | Battery SOC Percentage  |

---

### BMS SOH Data

| **Field**           | **Value**                |
|---------------------|--------------------------|
| **Message ID**      | `0x60B` (1547)           |
| **Description**     | Counter data.            |

#### Signals

| **Signal Name**     | **Start Bit** | **Length** | **Factor** | **Offset** | **Min Value** | **Max Value** | **Unit** | **Description**         |
|---------------------|---------------|------------|------------|------------|---------------|---------------|----------|-------------------------|
| BatterySoH          | 0             | 16 bits     | 0.1      | 0           | 0             | 1000         | %         | Battery SOH Percentage  |

---

### BMS Counter Data

| **Field**           | **Value**                |
|---------------------|--------------------------|
| **Message ID**      | `0x60C` (1548)           |
| **Description**     | Counter data.            |

#### Signals

| **Signal Name**     | **Start Bit** | **Length** | **Factor** | **Offset** | **Min Value** | **Max Value** | **Unit** | **Description**         |
|---------------------|---------------|------------|------------|------------|---------------|---------------|----------|-------------------------|
| CurrentCounter      | 0             | 32 bits     | 0.001      | 0          | N/A           | N/A           | As       | Current counter measurement |
| EnergyCounter       | 32            | 32 bits     | 0.001      | 0          | N/A           | N/A           | Wh       | Energy counter measurement  |

---

### Node Info

| **Field**           | **Value**                |
|---------------------|--------------------------|
| **Message ID**      | `0x60D` (1549)           |
| **Description**     | Node information.        |

#### Signals

| **Signal Name**        | **Start Bit** | **Length** | **Factor** | **Offset** | **Min Value** | **Max Value** | **Unit** | **Description**             |
|------------------------|---------------|------------|------------|------------|---------------|---------------|----------|-----------------------------|
| TotalPackVoltage       | 0             | 32 bits     | 0.001      | 0          | N/A           | N/A           | V        | Total pack voltage measurement |
| PackBalanceThreshold   | 32            | 16 bits     | 0.001      | 0          | N/A           | N/A           | V        | Pack balance threshold measurement |
| TotalCellsBalancing    | 48            | 16 bits     | 1          | 0          | N/A           | N/A           | -        | Total cells balancing status     |

---

### Node Cell Info

| **Field**           | **Value**                |
|---------------------|--------------------------|
| **Message ID**      | `0x60E` (1550)           |
| **Description**     | Cell information.        |

#### Signals

| **Signal Name**        | **Start Bit** | **Length** | **Factor** | **Offset** | **Min Value** | **Max Value** | **Unit** | **Description**              |
|------------------------|---------------|------------|------------|------------|---------------|---------------|----------|------------------------------|
| MaxCellVoltage         | 0             | 16 bits     | 0.001      | 0          | N/A           | N/A           | V        | Maximum cell voltage measurement |
| MaxCellVoltageNodeID   | 16            | 8 bits      | 1          | 0          | N/A           | N/A           | -        | Node ID for max cell voltage    |
| MaxCellVoltageCellID   | 24            | 8 bits      | 1          | 0          | N/A           | N/A           | -        | Cell ID for max cell voltage     |
| MinCellVoltage         | 32            | 16 bits     | 0.001      | 0          | N/A           | N/A           | V        | Minimum cell voltage measurement |
| MinCellVoltageNodeID   | 48            | 8 bits      | 1          | 0          | N/A           | N/A           | -        | Node ID for min cell voltage    |
| MinCellVoltageCellID   | 56            | 8 bits      | 1          | 0          | N/A           | N/A           | -        | Cell ID for min cell voltage     |

---

### Node Temp Info

| **Field**           | **Value**                |
|---------------------|--------------------------|
| **Message ID**      | `0x60F` (1551)           |
| **Description**     | Temperature information. |

#### Signals

| **Signal Name**          | **Start Bit** | **Length** | **Factor** | **Offset** | **Min Value** | **Max Value** | **Unit** | **Description**               |
|--------------------------|---------------|------------|------------|------------|---------------|---------------|----------|-------------------------------|
| MaxTemperature           | 0             | 16 bits     | -0.1       | 0          | N/A           | N/A           | C        | Maximum temperature measurement |
| MaxTemperatureNodeID     | 16            | 8 bits      | 1          | 0          | N/A           | N/A           | -        | Node ID for max temperature     |
| MaxTemperatureSensorID   | 24            | 8 bits      | 1          | 0          | N/A           | N/A           | -        | Sensor ID for max temperature   |
| MinTemperature           | 32            | 16 bits     | -0.1       | 0          | N/A           | N/A           | C        | Minimum temperature measurement |
| MinTemperatureNodeID     | 48            | 8 bits      | 1          | 0          | N/A           | N/A           | -        | Node ID for min temperature     |
| MinTemperatureSensorID   | 56            | 8 bits      | 1          | 0          | N/A           | N/A           | -        | Sensor ID for min temperature   |

---


