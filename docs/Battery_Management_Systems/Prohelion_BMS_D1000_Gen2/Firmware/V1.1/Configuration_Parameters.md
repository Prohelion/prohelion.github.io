---
title: Prohelion BMS D1000 Gen2 - Configuration Parameters
---

This section provides detailed information on each of the BMS Configuration Parameters. 

### Device Serial Number

| **Field**       | **Value**               |
|-----------------|-------------------------|
| **Description** | The serial number that is unique to each unit |
| **Permission**  | Read Only               |
| **Index**       | 0x32                    |
| **Scale**       | 1                       |
| **Type**        | UINT16                  |
| **Units**       | NA                      |

### Device Type ID

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | The device type identifier (Prohelion BMS D1000 Gen2) |
| **Permission**  | Read Only      |
| **Index**       | 0x33           |
| **Scale**       | 1              |
| **Type**        | UINT16         |
| **Units**       | NA             |

### Bitrate

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | The CAN bus bitrate |
| **Permission**  | Admin          |
| **Index**       | 0x34           |
| **Scale**       | 1              |
| **Type**        | UINT16         |
| **Units**       | kb/s           |

### Base CAN ID

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | The base CAN ID of the device |
| **Permission**  | Admin          |
| **Index**       | 0x35           |
| **Scale**       | 1              |
| **Type**        | UINT16         |
| **Units**       | NA             |

### Number of CMU Nodes

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | The number of CMU nodes |
| **Permission**  | User           |
| **Index**       | 0x36           |
| **Scale**       | 1              |
| **Type**        | UINT16         |
| **Units**       | NA             |

### Number of Cells per Node

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | The number of cells at each CMU node |
| **Permission**  | User           |
| **Index**       | 0x100          |
| **Scale**       | 1              |
| **Type**        | UINT16 ARRAY   |
| **Length**      | 32             |
| **Units**       | NA             |

### Number of Temp Sensors per Node

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | The number of temp sensors at each CMU node |
| **Permission**  | User           |
| **Index**       | 0x140          |
| **Scale**       | 1              |
| **Type**        | UINT16 ARRAY   |
| **Length**      | 32             |
| **Units**       | NA             |

### Precharge Resistance

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | The precharge resistance value |
| **Permission**  | User           |
| **Index**       | 0x39           |
| **Scale**       | 1              |
| **Type**        | UINT16         |
| **Units**       | Ohms           |

### Pack Capacity

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | The pack capacity in watt-hours |
| **Permission**  | User           |
| **Index**       | 0x40           |
| **Scale**       | 0.1            |
| **Type**        | UINT16         |
| **Units**       | Wh             |

### Critical Cell Over Voltage

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | The critical cell over-voltage threshold |
| **Permission**  | User           |
| **Index**       | 0x41           |
| **Scale**       | 0.001          |
| **Type**        | UINT16         |
| **Units**       | V              |

### Warning Cell Over Voltage

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | The warning cell over-voltage threshold |
| **Permission**  | User           |
| **Index**       | 0x42           |
| **Scale**       | 0.001          |
| **Type**        | UINT16         |
| **Units**       | V              |

### Balancing Voltage Threshold

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | The cell balance voltage threshold  |
| **Permission**  | User           |
| **Index**       | 0x43           |
| **Scale**       | 0.001          |
| **Type**        | UINT16         |
| **Units**       | V              |

### Warning Cell Under Voltage

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | The warning cell under-voltage threshold |
| **Permission**  | User           |
| **Index**       | 0x44           |
| **Scale**       | 0.001          |
| **Type**        | UINT16         |
| **Units**       | V              |

### Critical Cell Under Voltage

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | The critical cell under-voltage threshold |
| **Permission**  | User           |
| **Index**       | 0x45           |
| **Scale**       | 0.001          |
| **Type**        | UINT16         |
| **Units**       | V              |

### Maximum Temperature

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | The maximum cell temperature threshold |
| **Permission**  | User           |
| **Index**       | 0x46           |
| **Scale**       | 0.1            |
| **Type**        | INT16          |
| **Units**       | °C             |

### Minimum Temperature

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | The minimum cell temperature threshold  |
| **Permission**  | User           |
| **Index**       | 0x47           |
| **Scale**       | 0.1            |
| **Type**        | INT16          |
| **Units**       | °C             |

### Maximum Charge Current

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | The maximum charge current threshold |
| **Permission**  | User           |
| **Index**       | 0x48           |
| **Scale**       | 0.001          |
| **Type**        | INT16          |
| **Units**       | A              |

### Maximum Discharge Current

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | The maximum discharge current threshold |
| **Permission**  | User           |
| **Index**       | 0x49           |
| **Scale**       | 0.001          |
| **Type**        | INT16          |
| **Units**       | A              |

### Maximum Precharge Current

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | The maximum precharge current threshold |
| **Permission**  | User           |
| **Index**       | 0x50           |
| **Scale**       | 0.001          |
| **Type**        | INT16          |
| **Units**       | A              |

### Maximum Voltage Delta

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | The maximum precharge voltage-delta threshold |
| **Permission**  | User           |
| **Index**       | 0x51           |
| **Scale**       | 0.001          |
| **Type**        | INT16          |
| **Units**       | V              |

### Thermistor Beta Value

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | Beta-value of the themristors being used on the CMU Nodes |
| **Permission**  | User           |
| **Index**       | 0x52           |
| **Scale**       | 1              |
| **Type**        | UINT16         |
| **Units**       |                |

### Contactor Auxiliary Check Enable

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | A bitfield that allows the auxillary inputs of each contactor to be ignored |
| **Permission**  | User           |
| **Index**       | 0x53           |
| **Scale**       | 1              |
| **Type**        | UINT16         |
| **Units**       | Bitfield       |

### Maximum Allowable Precharge Time

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | The maximum precharge time threshold |
| **Permission**  | User           |
| **Index**       | 0x54           |
| **Scale**       | 0.001          |
| **Type**        | UINT16         |
| **Units**       | Seconds        |

### Minimum Temperature of the BMU

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | The minimum temperature threshold of the BMU |
| **Permission**  | User           |
| **Index**       | 0x55           |
| **Scale**       | 0.1            |
| **Type**        | INT16          |
| **Units**       | °C             |

### Maximum Temperature of the BMU

| **Field**       | **Value**      |
|-----------------|----------------|
| **Description** | The maximum temperature threshold of the BMU |
| **Permission**  | User           |
| **Index**       | 0x56           |
| **Scale**       | 0.1            |
| **Type**        | INT16          |
| **Units**       | °C             |
