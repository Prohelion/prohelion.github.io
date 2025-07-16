---
title: Prohelion BMS D1000 Gen2 - DBC Messages and Signals

---

# Prohelion BMS D1000 Gen2 - DBC Messages and Signals

This section provides information on the CAN bus messages and signals used in the Prohelion BMS D1000 Gen2. Each message is identified by its unique ID, and the structure, including signals, is described.

***Note!*** *"Default BASE ID" The following Message IDs assume a default CAN Bus BASE ID of `0x600`. The BASE ID of each device is configurable via the device configuration. If the BASE ID has been configured differently on the device, make sure to account for the shift in the Message IDs. The Message ID offsets from the BASE ID will remain the same regardless of the device configuration.*


## Contents

| Message ID | Name |
|----------|--------|
| **0x600** | [Device Heartbeat](#deviceheartbeat)|
| **0x601** | [Device Firmware Info](#devicefirmwareinfo)|
| **0x606** | [BMS Info](#bmsinfo)|
| **0x607** | [BMS Current Data](#bmscurrentdata)|
| **0x608** | [BMS Voltage Data](#bmsvoltagedata)|
| **0x609** | [BMS Auxiliary Data](#bmsauxiliarydata)|
| **0x60a** | [BMS SoC Data](#bmssocdata)|
| **0x60c** | [BMS SoP Data](#bmssopdata)|
| **0x60d** | [Node Info](#nodeinfo)|
| **0x60e** | [Node Cell Info](#nodecellinfo)|
| **0x60f** | [Node Temp Info](#nodetempinfo)|
| **0x610** | [Node𝒩Voltage Info](#node𝒩voltageinfo)|
| **0x611** | [Node𝒩Cell Voltages 1](#node𝒩cellvoltages1)|
| **0x612** | [Node𝒩Cell Voltages 2](#node𝒩cellvoltages2)|
| **0x613** | [Node𝒩Cell Voltages 3](#node𝒩cellvoltages3)|
| **0x614** | [Node𝒩Cell Voltages 4](#node𝒩cellvoltages4)|
| **0x615** | [Node𝒩Cell Temps](#node𝒩celltemps)|
| **0x616** | [Node𝒩Stats](#node𝒩stats)|
| **0x617** | [Node𝒩Diagnostics](#node𝒩diagnostics)|
| **0x6f1** | [Device Watchdog Info](#devicewatchdoginfo)|
| **0x6f2** | [Device Selftest Info](#deviceselftestinfo)|
| **0x6f3** | [Node Diagnostics](#nodediagnostics)|
| **0x6f4** | [Node Stats](#nodestats)|
| **0x6f5** | [Node Cell Stats](#nodecellstats)|
| **0x6f6** | [Node Temp Stats](#nodetempstats)|
| **0x6f7** | [Node Status Registers](#nodestatusregisters)|
| **0x6f8** | [Sensor Data 1](#sensordata1)|
| **0x6f9** | [Sensor Data 2](#sensordata2)|
| **0x6fb** | [SoXDiagnostics 0](#soxdiagnostics0)|
| **0x6fc** | [SoXDiagnostics 1](#soxdiagnostics1)|
| **0x6fd** | [SoXDiagnostics 2](#soxdiagnostics2)|
| **0x6fe** | [SoXDiagnostics 3](#soxdiagnostics3)|

---

## DeviceHeartbeat
- ID: 0x600 (1536)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Device heartbeat information

| Name | Start Bit | Length | Byte Order | Signed | Scale | Offset | Min | Max | Unit | Comment |
|------|-----------|--------|------------|--------|-------|--------|-----|-----|------|---------|
| DeviceType | 0 | 32 | little_endian | False | 1 | 0 | N/A | N/A |  | Type of device in the system |
| DeviceSerial | 32 | 32 | little_endian | False | 1 | 0 | N/A | N/A |  | Unique serial number of the device |

---

## DeviceFirmwareInfo
- ID: 0x601 (1537)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Firmware version information

| Name | Start Bit | Length | Byte Order | Signed | Scale | Offset | Min | Max | Unit | Comment |
|------|-----------|--------|------------|--------|-------|--------|-----|-----|------|---------|
| FirmwareMajorVersion | 0 | 8 | little_endian | False | 1 | 0 | N/A | N/A |  | Major version of firmware |
| FirmwareMinorVersion | 8 | 8 | little_endian | False | 1 | 0 | N/A | N/A |  | Minor version of firmware |
| FirmwarePatchVersion | 16 | 16 | little_endian | False | 1 | 0 | N/A | N/A |  | Patch version of firmware |
| FirmwareBuildNumber | 32 | 32 | little_endian | False | 1 | 0 | N/A | N/A |  | Commit hash of firmware |

---

## BMSInfo
- ID: 0x606 (1542)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Information on BMS states, failures, and faults

| Name | Start Bit | Length | Byte Order | Signed | Scale | Offset | Min | Max | Unit | Comment |
|------|-----------|--------|------------|--------|-------|--------|-----|-----|------|---------|
| BMSStateINIT | 0 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Initialisation state. Immediately enters this state on startup and proceeds to CALIBRATE once the following conditions are met: Correct cell count, Correct temperature sensor count, External CAN enabled, BJU present, Self testing passed |
| BMSStateCALIBRATE | 1 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Calibration state. Ensures contactors are open before moving to the SAFE state. |
| BMSStateIDLE | 2 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Idle state. System is healthy and awaiting a command to enable or charge. |
| BMSStateCONNECT | 3 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Connect state. A request has been made to close the load contactors. The negative contactor to the load has been closed to enable load voltage checks and connection parameters are established |
| BMSStatePRECHARGE | 4 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Precharge state. The precharge contactor is closed. |
| BMSStateENABLED | 5 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Enabled state. Contactors to the load are now closed following a successful PRECHARGE state. This state will persist until commanded otherwise, or a fault occurs. |
| BMSStateCHARGE_INIT | 6 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Charge initialise state. Initialises the charge session, including EVCC for EVSE charging if configured. Waits for Charge Enable Command to proceed |
| BMSStateCHARGE_CONNECT | 7 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Charge connect state. Closes the negative charge contactor and checks that battery and charger voltages match before proceeding |
| BMSStateCHARGE_ENABLED | 8 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Charge enabled state. Closes the positive charge contactor, allowing the charger to deliver current to the battery |
| BMSStateCHARGE_STOPPING | 9 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Charge stopping state. Waits for current flow to reduce before opening the contactors and performing welding detection |
| BMSStateDISCONNECT | 10 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Safe disconnect state. This state is a transitionary state to allow current flow to stop prior to opening the contactors in the SAFE state. This state occurs if an error has occured while contactors are closed |
| BMSStateSAFE | 11 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Safe state. An error has occurred or we have progressed from the CALIBRATE state. The SAFE state ensures the battery is disconnected from the load and will transition to IDLE state after all errors have cleared. Latching errors will require a reset before the BMS will leave SAFE state |
| BMSPrechargeFailTIMEOUT | 16 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Timeout issue. State has timed out waiting for successful completion of the precharge process |
| BMSPrechargeFailOVERCURRENTMAX | 17 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Overcurrent maximum detected |
| BMSPrechargeFailOVERCURRENTPCHG | 18 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Overcurrent during precharge. Current flow during precharge is abnormally high. Check configuration |
| BMSPrechargeFailNEGCURRENT | 19 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Negative current detected. Current is flowing into the pack instead of into the load |
| BMSPrechargeFailSTABLECURRENT | 20 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Stable current issue. Current flow through the precharge circuit is expected to decrease as the load voltage rises to the battery voltage |
| BMSPrechargeFailOVERVOLTAGE | 21 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Overvoltage detected. Voltage greater than expected |
| BMSPrechargeFailSTABLEVOLTAGE | 22 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Stable voltage issue. Load voltage is expected to rise to battery voltage |
| BMSContactorFaultCONTACTOR1 | 24 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Contactor 1 fault |
| BMSContactorFaultCONTACTOR2 | 25 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Contactor 2 fault |
| BMSContactorFaultCONTACTOR3 | 26 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Contactor 3 fault |
| BMSContactorFaultCONTACTOR4 | 27 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Contactor 4 fault |
| BMSContactorFaultCONTACTOR5 | 28 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Contactor 5 fault |
| BMSReasonSELFTESTFAIL | 32 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Self-test failure. Internal memory or peripheral checks are failing indicating a fault may be present in the microprocessor |
| BMSReasonWATCHDOGFAIL | 33 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Watchdog failure. A module within the firmware is not updating as expected |
| BMSReasonCONTACTORFAIL | 34 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Contactor failure. Contactor states presented by auxiliary circuits do not match the intended state |
| BMSReasonHVIL | 35 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | HVIL issue. The interlocked loop is measuring high impedance, indicating a connector failure |
| BMSReasonBATTVOLTAGE | 36 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Battery voltage issue. Battery voltage is out of expected ranges |
| BMSReasonPACKVOLTAGE | 37 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Pack voltage issue. Pack voltage is not aligned with the sum of the meaured cell voltages, indicating a loose cell node connection |
| BMSReasonLOADVOLTAGE | 38 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Load voltage issue. The load voltage is out of expected ranges |
| BMSReasonCHARGERVOLTAGE | 39 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Charger voltage issue. The charging equipment voltage is out of expected ranges |
| BMSReasonOVERCURRENT | 40 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Overcurrent detected. Software overcurrent detection indicating current has risen above configured limits |
| BMSReasonNODECOUNT | 41 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Node count issue. Incorrect number of CMU (Nodes) detected by the BMS |
| BMSReasonCELLCOUNT | 42 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Cell count issue. Incorrect number of cells detected by the CMU nodes |
| BMSReasonTEMPCOUNT | 43 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Temperature count issue. Incorrect number of temperature sensors detected by the CMU nodes |
| BMSReasonBJU | 44 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | BJU timeout. BJU has not responded to requests for measurements |
| BMSReasonIO | 45 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Pack timeout. IO expander is not responding on the I2C bus |
| BMSReasonCONTROLTIMEOUT | 46 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Control timeout. BMS has not received a control command for a number of seconds. |
| BMSReasonINTERNALCOMMS | 47 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Internal Comms issue. A device connected to the BMS is not responding |
| BMSReasonOVERVOLT | 48 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Cell over-voltage detected |
| BMSReasonUNDERVOLT | 49 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Cell under-voltage detected |
| BMSReasonOVERTEMP | 50 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Cell over-temperature detected |
| BMSReasonUNDERTEMP | 51 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Cell under-temperature detected |
| BMSReasonPRESSURE | 52 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Pressure issue |
| BMSReasonHUMIDITY | 53 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Humidity issue |
| BMSReasonVOC | 54 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | VOC (Volatile Organic Compounds) issue |
| BMSReasonNOX | 55 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | NOx (Nitrogen Oxides) issue |
| BMSReasonPRECHARGE | 56 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | Precharge failure |

---

## BMSCurrentData
- ID: 0x607 (1543)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Current measurement data.

| Name | Start Bit | Length | Byte Order | Signed | Scale | Offset | Min | Max | Unit | Comment |
|------|-----------|--------|------------|--------|-------|--------|-----|-----|------|---------|
| InstantaneousCurrent | 0 | 32 | little_endian | True | 0.001 | 0 | N/A | N/A | A | Instantaneous current measurement |
| FilteredCurrent | 32 | 32 | little_endian | True | 0.001 | 0 | N/A | N/A | A | Filtered current measurement |

---

## BMSVoltageData
- ID: 0x608 (1544)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Voltage measurement data.

| Name | Start Bit | Length | Byte Order | Signed | Scale | Offset | Min | Max | Unit | Comment |
|------|-----------|--------|------------|--------|-------|--------|-----|-----|------|---------|
| BatteryVoltage | 0 | 32 | little_endian | True | 0.001 | 0 | N/A | N/A | V | Battery voltage measurement |
| LoadVoltage | 32 | 32 | little_endian | True | 0.001 | 0 | N/A | N/A | V | Load voltage measurement |

---

## BMSAuxiliaryData
- ID: 0x609 (1545)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Auxiliary data.

| Name | Start Bit | Length | Byte Order | Signed | Scale | Offset | Min | Max | Unit | Comment |
|------|-----------|--------|------------|--------|-------|--------|-----|-----|------|---------|
| AuxiliaryVoltage | 0 | 32 | little_endian | True | 0.001 | 0 | N/A | N/A | V | Auxiliary voltage measurement |
| Power | 32 | 32 | little_endian | True | 0.001 | 0 | N/A | N/A | W | Power measurement |

---

## BMSSoCData
- ID: 0x60a (1546)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Battery SoC estimations

| Name | Start Bit | Length | Byte Order | Signed | Scale | Offset | Min | Max | Unit | Comment |
|------|-----------|--------|------------|--------|-------|--------|-----|-----|------|---------|
| SoCPercentage | 0 | 16 | little_endian | False | 0.1 | 0 | N/A | N/A | % | Battery SoC Percentage |
| SoCCapacity | 16 | 16 | little_endian | False | 0.1 | 0 | N/A | N/A | Ah | Battery SoC in Ah |
| OCV_mV | 32 | 16 | little_endian | False | 0.001 | 0 | N/A | N/A | V | Estimated Open Circuit Voltage in mV |
| SoHPercentage | 48 | 16 | little_endian | False | 0.1 | 0 | N/A | N/A | % | Estimated SoH Percentage |

---

## BMSSoPData
- ID: 0x60c (1548)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: State of Power Information

| Name | Start Bit | Length | Byte Order | Signed | Scale | Offset | Min | Max | Unit | Comment |
|------|-----------|--------|------------|--------|-------|--------|-----|-----|------|---------|
| SoPMaxCurrentDischarge | 0 | 32 | little_endian | True | 0.001 | 0 | N/A | N/A | A | Max Allowable Discharge Current |
| SoPMaxCurrentCharge | 32 | 32 | little_endian | True | 0.001 | 0 | N/A | N/A | A | Max Allowable Charge Current |

---

## NodeInfo
- ID: 0x60d (1549)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Node information

| Name | Start Bit | Length | Byte Order | Signed | Scale | Offset | Min | Max | Unit | Comment |
|------|-----------|--------|------------|--------|-------|--------|-----|-----|------|---------|
| TotalPackVoltage | 0 | 32 | little_endian | False | 0.001 | 0 | N/A | N/A | V | Total pack voltage measurement |
| PackBalanceThreshold | 32 | 16 | little_endian | False | 0.001 | 0 | N/A | N/A | V | Pack balance threshold measurement |
| TotalCellsBalancing | 48 | 16 | little_endian | False | 1 | 0 | N/A | N/A |  | Total cells balancing status |

---

## NodeCellInfo
- ID: 0x60e (1550)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Cell Voltage Statistics

| Name | Start Bit | Length | Byte Order | Signed | Scale | Offset | Min | Max | Unit | Comment |
|------|-----------|--------|------------|--------|-------|--------|-----|-----|------|---------|
| MaxCellVoltage | 0 | 16 | little_endian | False | 0.001 | 0 | N/A | N/A | V | Maximum cell voltage measurement |
| MaxCellVoltageNodeID | 16 | 8 | little_endian | False | 1 | 0 | N/A | N/A |  | Node ID for max cell voltage |
| MaxCellVoltageCellID | 24 | 8 | little_endian | False | 1 | 0 | N/A | N/A |  | Cell ID for max cell voltage |
| MinCellVoltage | 32 | 16 | little_endian | False | 0.001 | 0 | N/A | N/A | V | Minimum cell voltage measurement |
| MinCellVoltageNodeID | 48 | 8 | little_endian | False | 1 | 0 | N/A | N/A |  | Node ID for min cell voltage |
| MinCellVoltageCellID | 56 | 8 | little_endian | False | 1 | 0 | N/A | N/A |  | Cell ID for min cell voltage |

---

## NodeTempInfo
- ID: 0x60f (1551)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Cell Temperature Statistics

| Name | Start Bit | Length | Byte Order | Signed | Scale | Offset | Min | Max | Unit | Comment |
|------|-----------|--------|------------|--------|-------|--------|-----|-----|------|---------|
| MaxTemperature | 0 | 16 | little_endian | True | 0.1 | 0 | N/A | N/A | C | Maximum temperature measurement |
| MaxTemperatureNodeID | 16 | 8 | little_endian | False | 1 | 0 | N/A | N/A |  | Node ID for max temperature |
| MaxTemperatureSensorID | 24 | 8 | little_endian | False | 1 | 0 | N/A | N/A |  | Sensor ID for max temperature |
| MinTemperature | 32 | 16 | little_endian | True | 0.1 | 0 | N/A | N/A | C | Minimum temperature measurement |
| MinTemperatureNodeID | 48 | 8 | little_endian | False | 1 | 0 | N/A | N/A |  | Node ID for min temperature |
| MinTemperatureSensorID | 56 | 8 | little_endian | False | 1 | 0 | N/A | N/A |  | Sensor ID for min temperature |

---

## Node&#x1D4A9;VoltageInfo  

**Note!** *For brevity, node messages are described once, where &#x1D4A9; describes the node number (up to a maximum of 32 nodes).*
- ID: 0x610 + (&#x1D4A9; &times; 0x7)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Voltage information of the node

| Name | Start Bit | Length | Byte Order | Signed | Scale | Offset | Min | Max | Unit | Comment |
|------|-----------|--------|------------|--------|-------|--------|-----|-----|------|---------|
| Node&#x1D4A9;TotalVoltage | 0 | 32 | little_endian | False | 0.001 | 0 | N/A | N/A | V | Sum of the voltage of the cells in the node |
| Node&#x1D4A9;HighResistanceCellSense | 48 | 16 | little_endian | False | 1 | 0 | N/A | N/A |  | Indication that a cell is reading high resistance |

---

## Node&#x1D4A9;CellVoltages1  

**Note!** *For brevity, node messages are described once, where &#x1D4A9; describes the node number (up to a maximum of 32 nodes).*
- ID: 0x611 + (&#x1D4A9; &times; 0x7)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Node cell voltage measurements (1 of 4)

| Name | Start Bit | Length | Byte Order | Signed | Scale | Offset | Min | Max | Unit | Comment |
|------|-----------|--------|------------|--------|-------|--------|-----|-----|------|---------|
| Node&#x1D4A9;Cell01 | 0 | 16 | little_endian | False | 0.001 | 0 | N/A | N/A | V | Cell 01 measured voltage |
| Node&#x1D4A9;Cell02 | 16 | 16 | little_endian | False | 0.001 | 0 | N/A | N/A | V | Cell 02 measured voltage |
| Node&#x1D4A9;Cell03 | 32 | 16 | little_endian | False | 0.001 | 0 | N/A | N/A | V | Cell 03 measured voltage |
| Node&#x1D4A9;Cell04 | 48 | 16 | little_endian | False | 0.001 | 0 | N/A | N/A | V | Cell 04 measured voltage |

---

## Node&#x1D4A9;CellVoltages2  

**Note!** *For brevity, node messages are described once, where &#x1D4A9; describes the node number (up to a maximum of 32 nodes).*
- ID: 0x612 + (&#x1D4A9; &times; 0x7)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Node cell voltage measurements (2 of 4)

| Name | Start Bit | Length | Byte Order | Signed | Scale | Offset | Min | Max | Unit | Comment |
|------|-----------|--------|------------|--------|-------|--------|-----|-----|------|---------|
| Node&#x1D4A9;Cell05 | 0 | 16 | little_endian | False | 0.001 | 0 | N/A | N/A | V | Cell 05 measured voltage |
| Node&#x1D4A9;Cell06 | 16 | 16 | little_endian | False | 0.001 | 0 | N/A | N/A | V | Cell 06 measured voltage |
| Node&#x1D4A9;Cell07 | 32 | 16 | little_endian | False | 0.001 | 0 | N/A | N/A | V | Cell 07 measured voltage |
| Node&#x1D4A9;Cell08 | 48 | 16 | little_endian | False | 0.001 | 0 | N/A | N/A | V | Cell 08 measured voltage |

---

## Node&#x1D4A9;CellVoltages3  

**Note!** *For brevity, node messages are described once, where &#x1D4A9; describes the node number (up to a maximum of 32 nodes).*
- ID: 0x613 + (&#x1D4A9; &times; 0x7)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Node cell voltage measurements (3 of 4)

| Name | Start Bit | Length | Byte Order | Signed | Scale | Offset | Min | Max | Unit | Comment |
|------|-----------|--------|------------|--------|-------|--------|-----|-----|------|---------|
| Node&#x1D4A9;Cell09 | 0 | 16 | little_endian | False | 0.001 | 0 | N/A | N/A | V | Cell 09 measured voltage |
| Node&#x1D4A9;Cell10 | 16 | 16 | little_endian | False | 0.001 | 0 | N/A | N/A | V | Cell 10 measured voltage |
| Node&#x1D4A9;Cell11 | 32 | 16 | little_endian | False | 0.001 | 0 | N/A | N/A | V | Cell 11 measured voltage |
| Node&#x1D4A9;Cell12 | 48 | 16 | little_endian | False | 0.001 | 0 | N/A | N/A | V | Cell 12 measured voltage |

---

## Node&#x1D4A9;CellVoltages4  

**Note!** *For brevity, node messages are described once, where &#x1D4A9; describes the node number (up to a maximum of 32 nodes).*
- ID: 0x614 + (&#x1D4A9; &times; 0x7)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Node cell voltage measurements (4 of 4)

| Name | Start Bit | Length | Byte Order | Signed | Scale | Offset | Min | Max | Unit | Comment |
|------|-----------|--------|------------|--------|-------|--------|-----|-----|------|---------|
| Node&#x1D4A9;Cell13 | 0 | 16 | little_endian | False | 0.001 | 0 | N/A | N/A | V | Cell 13 measured voltage |
| Node&#x1D4A9;Cell14 | 16 | 16 | little_endian | False | 0.001 | 0 | N/A | N/A | V | Cell 14 measured voltage |

---

## Node&#x1D4A9;CellTemps  

**Note!** *For brevity, node messages are described once, where &#x1D4A9; describes the node number (up to a maximum of 32 nodes).*
- ID: 0x615 + (&#x1D4A9; &times; 0x7)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Node thermister temperature measurements

| Name | Start Bit | Length | Byte Order | Signed | Scale | Offset | Min | Max | Unit | Comment |
|------|-----------|--------|------------|--------|-------|--------|-----|-----|------|---------|
| Node&#x1D4A9;Temp01 | 0 | 16 | little_endian | True | 0.1 | 0 | N/A | N/A | C | Thermister 01 temperature measurement |
| Node&#x1D4A9;Temp02 | 16 | 16 | little_endian | True | 0.1 | 0 | N/A | N/A | C | Thermister 02 temperature measurement |
| Node&#x1D4A9;Temp03 | 32 | 16 | little_endian | True | 0.1 | 0 | N/A | N/A | C | Thermister 03 temperature measurement |
| Node&#x1D4A9;Temp04 | 48 | 16 | little_endian | True | 0.1 | 0 | N/A | N/A | C | Thermister 04 temperature measurement |

---

## Node&#x1D4A9;Stats  

**Note!** *For brevity, node messages are described once, where &#x1D4A9; describes the node number (up to a maximum of 32 nodes).*
- ID: 0x616 + (&#x1D4A9; &times; 0x7)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Node cell statistics

| Name | Start Bit | Length | Byte Order | Signed | Scale | Offset | Min | Max | Unit | Comment |
|------|-----------|--------|------------|--------|-------|--------|-----|-----|------|---------|
| Node&#x1D4A9;ConnectedCells | 0 | 8 | little_endian | False | 1 | 0 | N/A | N/A |  | Number of cells detected on the node |
| Node&#x1D4A9;DisconnectedCells | 8 | 8 | little_endian | False | 1 | 0 | N/A | N/A |  | Number of cells that are configured but not detected on the node |
| Node&#x1D4A9;ConnectedTempSensors | 16 | 8 | little_endian | False | 1 | 0 | N/A | N/A |  | Number of connected thermisters on the node |
| Node&#x1D4A9;DisconnectedTempSensors | 24 | 8 | little_endian | False | 1 | 0 | N/A | N/A |  | Number of thermisters that are configured but not detected on the node |
| Node&#x1D4A9;CellBalanceCommandSent | 32 | 16 | little_endian | False | 1 | 0 | N/A | N/A |  | Cell balance command has been send to the node |
| Node&#x1D4A9;CellBalanceStatus | 48 | 16 | little_endian | False | 1 | 0 | N/A | N/A |  | Status of cell balancing on the node |

---

## Node&#x1D4A9;Diagnostics  

**Note!** *For brevity, node messages are described once, where &#x1D4A9; describes the node number (up to a maximum of 32 nodes).*
- ID: 0x617 + (&#x1D4A9; &times; 0x7)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Node diagnostics

| Name | Start Bit | Length | Byte Order | Signed | Scale | Offset | Min | Max | Unit | Comment |
|------|-----------|--------|------------|--------|-------|--------|-----|-----|------|---------|
| Node&#x1D4A9;Type | 0 | 8 | little_endian | False | 1 | 0 | N/A | N/A |  | Type of the node |
| Node&#x1D4A9;Address | 8 | 8 | little_endian | False | 1 | 0 | N/A | N/A |  | Address of the node |
| Node&#x1D4A9;UARTResult | 16 | 16 | little_endian | False | 1 | 0 | N/A | N/A |  | Latest result of UART communications |
| Node&#x1D4A9;State | 32 | 16 | little_endian | False | 1 | 0 | N/A | N/A |  | State of the node |
| Node&#x1D4A9;StateTimer | 48 | 16 | little_endian | False | 1 | 0 | N/A | N/A |  | Time node has spent in the current state |

---

## DeviceWatchdogInfo
- ID: 0x6f1 (1777)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Information relating to internal watchdog status

| Name | Start Bit | Length | Byte Order | Signed | Scale | Offset | Min | Max | Unit | Comment |
|------|-----------|--------|------------|--------|-------|--------|-----|-----|------|---------|
| SelfTestTaskStatus | 0 | 4 | little_endian | False | 1 | 0 | N/A | N/A |  | Self test task running state <ul><li>4: Fail</li><li>2: Fast</li><li>1: Slow</li><li>0: Ok</li></ul> |
| SensorTaskStatus | 8 | 8 | little_endian | False | 1 | 0 | N/A | N/A |  | Sensor task running state <ul><li>4: Fail</li><li>2: Fast</li><li>1: Slow</li><li>0: Ok</li></ul> |
| TelemetryTaskStatus | 16 | 8 | little_endian | False | 1 | 0 | N/A | N/A |  | Telemetry task running state <ul><li>4: Fail</li><li>2: Fast</li><li>1: Slow</li><li>0: Ok</li></ul> |
| CMUTaskStatus | 24 | 8 | little_endian | False | 1 | 0 | N/A | N/A |  | CMU task running state <ul><li>4: Fail</li><li>2: Fast</li><li>1: Slow</li><li>0: Ok</li></ul> |
| BMSTaskStatus | 32 | 8 | little_endian | False | 1 | 0 | N/A | N/A |  | BMS task running state <ul><li>4: Fail</li><li>2: Fast</li><li>1: Slow</li><li>0: Ok</li></ul> |
| SoXTaskStatus | 40 | 8 | little_endian | False | 1 | 0 | N/A | N/A |  | SoX task running state <ul><li>4: Fail</li><li>2: Fast</li><li>1: Slow</li><li>0: Ok</li></ul> |
| WatchdogReset | 48 | 1 | little_endian | False | 1 | 0 | N/A | N/A |  | State of the watchdog peripheral <ul><li>1: Fail</li><li>0: Ok</li></ul> |

---

## DeviceSelftestInfo
- ID: 0x6f2 (1778)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Result of various internal self testing

| Name | Start Bit | Length | Byte Order | Signed | Scale | Offset | Min | Max | Unit | Comment |
|------|-----------|--------|------------|--------|-------|--------|-----|-----|------|---------|
| SelftestResult | 0 | 64 | little_endian | False | 1 | 0 | N/A | N/A |  | Reserved |

---

## NodeDiagnostics
- ID: 0x6f3 (1779)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: CMU controller diagnostic information

| Name | Start Bit | Length | Byte Order | Signed | Scale | Offset | Min | Max | Unit | Comment |
|------|-----------|--------|------------|--------|-------|--------|-----|-----|------|---------|
| ControllerType | 0 | 8 | little_endian | False | 1 | 0 | N/A | N/A |  | Type of the CMU controller |
| CurrentState | 8 | 8 | little_endian | False | 1 | 0 | N/A | N/A |  | State of the CMU controller |
| CurrentStateTimer | 16 | 16 | little_endian | False | 1 | 0 | N/A | N/A |  | Time the controller has spent in the current state |
| CommsResult | 32 | 16 | little_endian | False | 1 | 0 | N/A | N/A |  | Latest result of the CMU controller <--> CMU communication |

---

## NodeStats
- ID: 0x6f4 (1780)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Node statistics information

| Name | Start Bit | Length | Byte Order | Signed | Scale | Offset | Min | Max | Unit | Comment |
|------|-----------|--------|------------|--------|-------|--------|-----|-----|------|---------|
| TotalConfiguredNodes | 0 | 16 | little_endian | False | 1 | 0 | N/A | N/A |  | Sum of nodes expected in the configuration |
| TotalConnectedNodes | 16 | 16 | little_endian | False | 1 | 0 | N/A | N/A |  | Sum of nodes detected by the controller |
| TotalDisconnectedNodes | 32 | 16 | little_endian | False | 1 | 0 | N/A | N/A |  | Sum of configured nodes not detected by the controller |

---

## NodeCellStats
- ID: 0x6f5 (1781)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Cell statistics information

| Name | Start Bit | Length | Byte Order | Signed | Scale | Offset | Min | Max | Unit | Comment |
|------|-----------|--------|------------|--------|-------|--------|-----|-----|------|---------|
| TotalConfiguredCells | 0 | 16 | little_endian | False | 1 | 0 | N/A | N/A |  | Sum of cells expected in the configuration |
| TotalConnectedCells | 16 | 16 | little_endian | False | 1 | 0 | N/A | N/A |  | Sum of cells detected by all nodes |
| TotalDisconnectedCells | 32 | 16 | little_endian | False | 1 | 0 | N/A | N/A |  | Sum of configured cells not detected by all nodes |

---

## NodeTempStats
- ID: 0x6f6 (1782)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Thermister statistics information

| Name | Start Bit | Length | Byte Order | Signed | Scale | Offset | Min | Max | Unit | Comment |
|------|-----------|--------|------------|--------|-------|--------|-----|-----|------|---------|
| TotalConfiguredTempSensors | 0 | 16 | little_endian | False | 1 | 0 | N/A | N/A |  | Sum of thermisters expected in the configuration |
| TotalConnectedTempSensors | 16 | 16 | little_endian | False | 1 | 0 | N/A | N/A |  | Sum of thermisters detected by all nodes |
| TotalDisconnectedTempSensors | 32 | 16 | little_endian | False | 1 | 0 | N/A | N/A |  | Sum of configured thermisters not detected by all nodes |

---

## NodeStatusRegisters
- ID: 0x6f7 (1783)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Node controller status registers

| Name | Start Bit | Length | Byte Order | Signed | Scale | Offset | Min | Max | Unit | Comment |
|------|-----------|--------|------------|--------|-------|--------|-----|-----|------|---------|
| RXStatus | 0 | 8 | little_endian | False | 1 | 0 | N/A | N/A |  | Node controller RX status register |
| TXStatus | 8 | 8 | little_endian | False | 1 | 0 | N/A | N/A |  | Node controller TX status register |
| LSSMByteHWError | 16 | 1 | little_endian | False | 1 | 0 | N/A | N/A | BOOLEAN | HW error reported by node controller |
| LSSMByteAliveCNTError | 17 | 1 | little_endian | False | 1 | 0 | N/A | N/A | BOOLEAN | Incorrect alive count reported by node controller |
| LSSMByteCommandOP | 18 | 1 | little_endian | False | 1 | 0 | N/A | N/A | BOOLEAN | Current command OP code |
| LSSMByteCommMismatchError | 19 | 1 | little_endian | False | 1 | 0 | N/A | N/A | BOOLEAN | Communication mismatch error reported |
| LSSMByteAlertPacketError | 20 | 1 | little_endian | False | 1 | 0 | N/A | N/A | BOOLEAN | Packet error reported |
| LSSMByteCommError | 21 | 1 | little_endian | False | 1 | 0 | N/A | N/A | BOOLEAN | Comm error reported |
| LSSMByteAlertPacketStatusError | 22 | 1 | little_endian | False | 1 | 0 | N/A | N/A | BOOLEAN | Packet status error reported |
| LSSMByteRXReady | 23 | 1 | little_endian | False | 1 | 0 | N/A | N/A | BOOLEAN | Node controller ready to receive |
| GENStatus | 24 | 8 | little_endian | False | 1 | 0 | N/A | N/A |  |  |
| OPStateStatus | 32 | 8 | little_endian | False | 1 | 0 | N/A | N/A |  |  |
| BufferStatus | 40 | 8 | little_endian | False | 1 | 0 | N/A | N/A |  |  |
| WatchdogStatus | 48 | 8 | little_endian | False | 1 | 0 | N/A | N/A |  |  |
| GPIOStatus | 56 | 8 | little_endian | False | 1 | 0 | N/A | N/A |  |  |

---

## SensorData1
- ID: 0x6f8 (1784)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Sensor data 1

| Name | Start Bit | Length | Byte Order | Signed | Scale | Offset | Min | Max | Unit | Comment |
|------|-----------|--------|------------|--------|-------|--------|-----|-----|------|---------|
| Temperature1 | 0 | 16 | little_endian | True | 0.1 | 0 | N/A | N/A | C | Thermister 1 measured temperature |
| Temperature2 | 16 | 16 | little_endian | True | 0.1 | 0 | N/A | N/A | C | Thermister 2 measured temperature |
| Pressure | 32 | 16 | little_endian | True | 0.1 | 0 | N/A | N/A | kPa | Measured pressure |
| Humidity | 48 | 16 | little_endian | True | 0.1 | 0 | N/A | N/A | % RH | Measured humidity |

---

## SensorData2
- ID: 0x6f9 (1785)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Sensor data 2

| Name | Start Bit | Length | Byte Order | Signed | Scale | Offset | Min | Max | Unit | Comment |
|------|-----------|--------|------------|--------|-------|--------|-----|-----|------|---------|
| VOC | 0 | 16 | little_endian | False | 1 | 0 | N/A | N/A | ppb | Measured Volatile Organic Compound (VOC) concentration in parts per billion (ppb) |
| NOX | 16 | 16 | little_endian | False | 1 | 0 | N/A | N/A | ppb | Measured Nitrous Oxide (NOx) concentration in parts per billion (ppb) |

---

## SoXDiagnostics0
- ID: 0x6fb (1787)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: State of Charge/Power/Health (SoX) Diagnostic information 1

| Name | Start Bit | Length | Byte Order | Signed | Scale | Offset | Min | Max | Unit | Comment |
|------|-----------|--------|------------|--------|-------|--------|-----|-----|------|---------|
| IntegralValid | 0 | 1 | little_endian | False | 1 | 0 | 0 | 1 | bool | Integral model functioning accurately |
| TheveninValid | 1 | 1 | little_endian | False | 1 | 0 | 0 | 1 | bool | Thevenin model functioning accurately |
| ECMTheveninValid | 2 | 1 | little_endian | False | 1 | 0 | 0 | 1 | bool | Eqivalent circuit model (ECM) thevenin model functioning accurately |
| ECMRiValid | 3 | 1 | little_endian | False | 1 | 0 | 0 | 1 | bool | Eqivalent circuit model (ECM) internal resistance (Ri) model functioning accurately |
| ECMTheveninSleep | 4 | 1 | little_endian | False | 1 | 0 | 0 | 1 | bool | ECM thevenin method inactive |
| ECMTheveninBackup | 5 | 1 | little_endian | False | 1 | 0 | 0 | 1 | bool | ECM thevenin method backed up |
| ECMRiOCV | 16 | 16 | little_endian | False | 0.001 | 0 | N/A | N/A | V | Open circuit voltage (OCV) for Ri model |
| IntegralOCV | 32 | 16 | little_endian | False | 0.001 | 0 | N/A | N/A | V | OCV for integral model |
| TheveninOCV | 48 | 16 | little_endian | False | 0.001 | 0 | N/A | N/A | V | OCV for thevenin  model |

---

## SoXDiagnostics1
- ID: 0x6fc (1788)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: State of Charge/Power/Health (SoX) Diagnostic information 2

| Name | Start Bit | Length | Byte Order | Signed | Scale | Offset | Min | Max | Unit | Comment |
|------|-----------|--------|------------|--------|-------|--------|-----|-----|------|---------|
| ECMTheveninOCV | 0 | 16 | little_endian | False | 0.001 | 0 | N/A | N/A | V | OCV for ECM thevenin model |
| ECMTheveninVt | 16 | 16 | little_endian | False | 0.001 | 0 | N/A | N/A | V | Terminal voltage for ECM thevenin model |
| ECMRi | 32 | 32 | little_endian | False | 1e-06 | 0 | N/A | N/A | Ohm | Estimated internal resistance by ECM |

---

## SoXDiagnostics2
- ID: 0x6fd (1789)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: State of Charge/Power/Health (SoX) Diagnostic information 3

| Name | Start Bit | Length | Byte Order | Signed | Scale | Offset | Min | Max | Unit | Comment |
|------|-----------|--------|------------|--------|-------|--------|-----|-----|------|---------|
| ECMTheveninRi | 0 | 32 | little_endian | False | 1e-06 | 0 | N/A | N/A | Ohm | Estimated internal resistance by ECM thevenin model |
| ECMTheveninRp | 32 | 32 | little_endian | False | 1e-06 | 0 | N/A | N/A | Ohm | Estimated polarisation resistance by ECM thevenin model |

---

## SoXDiagnostics3
- ID: 0x6fe (1790)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: State of Charge/Power/Health (SoX) Diagnostic information 4

| Name | Start Bit | Length | Byte Order | Signed | Scale | Offset | Min | Max | Unit | Comment               |
|------|-----------|--------|------------|--------|-------|--------|-----|-----|------|-----------------------|
| ECMTheveninCp | 0 | 32 | little_endian | False | 1 | 0 | N/A | N/A | F | Estimated polarisation capacitance by ECM thevenin model |
| PackStaticRi | 32 | 32 | little_endian | False | 1e-06 | 0 | N/A | N/A | Ohm | Calculated internal resistance based on configured cell internal resistance |

---
