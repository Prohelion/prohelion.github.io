---
title: ProhelionBmsD1000Gen2 - DBC Messages and Signals
---
<!--- Auto-generated markdown documentation from device CAN database (dbc) -->

# Messages and Signals

This section provides information on the CAN bus messages and signals used in the ProhelionBmsD1000Gen2. Each message is identified by its unique ID, and the structure, including signals, is described.

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
| **0x610** | [Node𝒩Voltage Info](#)|
| **0x611** | [Node𝒩Cell Voltages 1](#)|
| **0x612** | [Node𝒩Cell Voltages 2](#)|
| **0x613** | [Node𝒩Cell Voltages 3](#)|
| **0x614** | [Node𝒩Cell Voltages 4](#)|
| **0x615** | [Node𝒩Cell Temps](#)|
| **0x616** | [Node𝒩Stats](#)|
| **0x617** | [Node𝒩Diagnostics](#)|
| **0x6f0** | [Contactor Diagnostics](#contactordiagnostics)|
| **0x6f1** | [Device Watchdog Info](#devicewatchdoginfo)|
| **0x6f2** | [Device Selftest Info](#deviceselftestinfo)|
| **0x6f3** | [Node Diagnostics](#nodediagnostics)|
| **0x6f4** | [Node Stats](#nodestats)|
| **0x6f5** | [Node Cell Stats](#nodecellstats)|
| **0x6f6** | [Node Temp Stats](#nodetempstats)|
| **0x6f7** | [Node Status Registers](#nodestatusregisters)|
| **0x6f8** | [Sensor Data 1](#sensordata1)|
| **0x6f9** | [Sensor Data 2](#sensordata2)|

---

## DeviceHeartbeat
- ID: 0x600 (1536)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Device heartbeat information

| Name | Comment&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Unit | Start Bit | Length | Signed | Scale | Offset | Min | Max | Byte Order |
|------|---------------------------|---|--------|------------|--------|-------|--------|-----|-----|------|
| DeviceType | Type of device in the system  |  | 0 | 32 | False | 1 | 0 | N/A | N/A | little_endian |
| DeviceSerial | Unique serial number of the device  |  | 32 | 32 | False | 1 | 0 | N/A | N/A | little_endian |

---

## DeviceFirmwareInfo
- ID: 0x601 (1537)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Firmware version information

| Name | Comment&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Unit | Start Bit | Length | Signed | Scale | Offset | Min | Max | Byte Order |
|------|---------------------------|---|--------|------------|--------|-------|--------|-----|-----|------|
| FirmwareMajorVersion | Major version of firmware  |  | 0 | 8 | False | 1 | 0 | N/A | N/A | little_endian |
| FirmwareMinorVersion | Minor version of firmware  |  | 8 | 8 | False | 1 | 0 | N/A | N/A | little_endian |
| FirmwarePatchVersion | Patch version of firmware  |  | 16 | 16 | False | 1 | 0 | N/A | N/A | little_endian |
| FirmwareBuildNumber | Commit hash of firmware  |  | 32 | 32 | False | 1 | 0 | N/A | N/A | little_endian |

---

## BMSInfo
- ID: 0x606 (1542)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Information on BMS states, failures, and faults

| Name | Comment&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Unit | Start Bit | Length | Signed | Scale | Offset | Min | Max | Byte Order |
|------|---------------------------|---|--------|------------|--------|-------|--------|-----|-----|------|
| BMSStateINIT | Initialisation state. Immediately enters this state on startup and proceeds to CALIBRATE once the conditions are met  |  | 0 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSStateCALIBRATE | Calibration state. Ensures contactors are open before moving to the SAFE state.  |  | 1 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSStateIDLE | Idle state. System is healthy and awaiting a command to enable or charge.  |  | 2 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSStateCONNECT | Connect state. A request has been made to close the load contactors. The negative contactor to the load has been closed to enable load voltage checks.  |  | 3 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSStatePRECHARGE | Precharge state. The precharge contactor is closed.  |  | 4 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSStateENABLED | Enabled state. Contactors to the load are now closed following a successful PRECHARGE state. This state will persist until commanded otherwise, or a fault occurs.  |  | 5 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSStateCHARGE_INIT | Charge initialise state. Initialises the charge session, including EVCC for EVSE charging if configured. Waits for Charge Enable Command to proceed  |  | 6 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSStateCHARGE_CONNECT | Charge connect state. Closes the negative charge contactor and checks that battery and charger voltages match before proceeding  |  | 7 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSStateCHARGE_ENABLED | Charge enabled state. Closes the positive charge contactor, allowing the charger to deliver current to the battery  |  | 8 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSStateCHARGE_STOPPING | Charge stopping state. Waits for current flow to reduce before opening the contactors and performing welding detection  |  | 9 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSStateDISCONNECT | Safe disconnect state. This state is a transitional state to allow current flow to stop prior to opening the contactors in the SAFE state. This state occurs if an error has occurred while contactors are closed  |  | 10 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSStateSAFE | Safe state. An error has occurred or we have progressed from the CALIBRATE state. The SAFE state ensures the battery is disconnected from the load and will transition to IDLE state after all errors have cleared. Latching errors will require a reset before the BMS will leave SAFE state  |  | 11 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSPrechargeFailTIMEOUT | Timeout issue. State has timed out waiting for successful completion of the precharge process  |  | 16 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSPrechargeFailOVERCURRENTMAX | Over-current maximum detected  |  | 17 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSPrechargeFailOVERCURRENTPCHG | Over-current during precharge. Current flow during precharge is abnormally high. Check configuration  |  | 18 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSPrechargeFailNEGCURRENT | Negative current detected. Current is flowing into the pack instead of into the load  |  | 19 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSPrechargeFailSTABLECURRENT | Stable current issue. Current flow through the precharge circuit is expected to decrease as the load voltage rises to the battery voltage  |  | 20 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSPrechargeFailOVERVOLTAGE | Over-voltage detected. Voltage greater than expected  |  | 21 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSPrechargeFailSTABLEVOLTAGE | Stable voltage issue. Load voltage is expected to rise to battery voltage  |  | 22 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSContactorFaultCONTACTOR1 | Contactor 1 fault  |  | 24 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSContactorFaultCONTACTOR2 | Contactor 2 fault  |  | 25 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSContactorFaultCONTACTOR3 | Contactor 3 fault  |  | 26 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSContactorFaultCONTACTOR4 | Contactor 4 fault  |  | 27 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSContactorFaultCONTACTOR5 | Contactor 5 fault  |  | 28 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSReasonSELFTESTFAIL | Self-test failure. Internal memory or peripheral checks are failing indicating a fault may be present in the microprocessor  |  | 32 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSReasonWATCHDOGFAIL | Watchdog failure. A module within the firmware is not updating as expected  |  | 33 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSReasonCONTACTORFAIL | Contactor failure. Contactor states presented by auxiliary circuits do not match the intended state  |  | 34 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSReasonHVIL | HVIL issue. The interlocked loop is measuring high impedance, indicating a connector failure  |  | 35 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSReasonBATTVOLTAGE | Battery voltage issue. Battery voltage is out of expected ranges  |  | 36 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSReasonPACKVOLTAGE | Pack voltage issue. Pack voltage is not aligned with the sum of the measured cell voltages, indicating a loose cell node connection  |  | 37 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSReasonLOADVOLTAGE | Load voltage issue. The load voltage is out of expected ranges  |  | 38 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSReasonCHARGERVOLTAGE | Charger voltage issue. The charging equipment voltage is out of expected ranges  |  | 39 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSReasonOVERCURRENT | Over-current detected. Software over-current detection indicating current has risen above configured limits  |  | 40 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSReasonNODECOUNT | Node count issue. Incorrect number of CMU (Nodes) detected by the BMS  |  | 41 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSReasonCELLCOUNT | Cell count issue. Incorrect number of cells detected by the CMU nodes  |  | 42 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSReasonTEMPCOUNT | Temperature count issue. Incorrect number of temperature sensors detected by the CMU nodes  |  | 43 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSReasonBJU | BJU timeout. BJU has not responded to requests for measurements  |  | 44 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSReasonIO | Pack timeout. IO expander is not responding on the I2C bus  |  | 45 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSReasonCONTROLTIMEOUT | Control timeout. BMS has not received a control command for a number of seconds.  |  | 46 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSReasonINTERNALCOMMS | Internal Comms issue. A device connected to the BMS is not responding  |  | 47 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSReasonOVERVOLT | Cell over-voltage detected  |  | 48 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSReasonUNDERVOLT | Cell under-voltage detected  |  | 49 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSReasonOVERTEMP | Cell over-temperature detected  |  | 50 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSReasonUNDERTEMP | Cell under-temperature detected  |  | 51 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSReasonPRESSURE | Pressure issue  |  | 52 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSReasonHUMIDITY | Humidity issue  |  | 53 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSReasonVOC | VOC (Volatile Organic Compounds) issue  |  | 54 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSReasonNOX | NOx (Nitrogen Oxides) issue  |  | 55 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSReasonPRECHARGE | Precharge failure  |  | 56 | 1 | False | 1 | 0 | N/A | N/A | little_endian |

---

## BMSCurrentData
- ID: 0x607 (1543)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Current measurement data.

| Name | Comment&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Unit | Start Bit | Length | Signed | Scale | Offset | Min | Max | Byte Order |
|------|---------------------------|---|--------|------------|--------|-------|--------|-----|-----|------|
| InstantaneousCurrent | Instantaneous current measurement  | A | 0 | 32 | True | 0.001 | 0 | N/A | N/A | little_endian |
| FilteredCurrent | Filtered current measurement  | A | 32 | 32 | True | 0.001 | 0 | N/A | N/A | little_endian |

---

## BMSVoltageData
- ID: 0x608 (1544)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Voltage measurement data.

| Name | Comment&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Unit | Start Bit | Length | Signed | Scale | Offset | Min | Max | Byte Order |
|------|---------------------------|---|--------|------------|--------|-------|--------|-----|-----|------|
| BatteryVoltage | Battery voltage measurement  | V | 0 | 32 | True | 0.001 | 0 | N/A | N/A | little_endian |
| LoadVoltage | Load voltage measurement  | V | 32 | 32 | True | 0.001 | 0 | N/A | N/A | little_endian |

---

## BMSAuxiliaryData
- ID: 0x609 (1545)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Auxiliary data.

| Name | Comment&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Unit | Start Bit | Length | Signed | Scale | Offset | Min | Max | Byte Order |
|------|---------------------------|---|--------|------------|--------|-------|--------|-----|-----|------|
| AuxiliaryVoltage | Auxiliary voltage measurement  | V | 0 | 32 | True | 0.001 | 0 | N/A | N/A | little_endian |
| Power | Power measurement  | W | 32 | 32 | True | 0.001 | 0 | N/A | N/A | little_endian |

---

## BMSSoCData
- ID: 0x60a (1546)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Battery SoC estimations

| Name | Comment&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Unit | Start Bit | Length | Signed | Scale | Offset | Min | Max | Byte Order |
|------|---------------------------|---|--------|------------|--------|-------|--------|-----|-----|------|
| SoCPercentage | Battery SoC Percentage  | % | 0 | 16 | False | 0.1 | 0 | N/A | N/A | little_endian |
| SoCCapacity | Battery SoC in Ah  | Ah | 16 | 16 | False | 0.1 | 0 | N/A | N/A | little_endian |
| OCV_mV | Estimated Open Circuit Voltage in mV  | V | 32 | 16 | False | 0.001 | 0 | N/A | N/A | little_endian |
| SoHPercentage | Estimated SoH Percentage  | % | 48 | 16 | False | 0.1 | 0 | N/A | N/A | little_endian |

---

## BMSSoPData
- ID: 0x60c (1548)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: State of Power Information

| Name | Comment&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Unit | Start Bit | Length | Signed | Scale | Offset | Min | Max | Byte Order |
|------|---------------------------|---|--------|------------|--------|-------|--------|-----|-----|------|
| SoPMaxCurrentDischarge | Max Allowable Discharge Current  | A | 0 | 32 | True | 0.001 | 0 | N/A | N/A | little_endian |
| SoPMaxCurrentCharge | Max Allowable Charge Current  | A | 32 | 32 | True | 0.001 | 0 | N/A | N/A | little_endian |

---

## NodeInfo
- ID: 0x60d (1549)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Node information

| Name | Comment&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Unit | Start Bit | Length | Signed | Scale | Offset | Min | Max | Byte Order |
|------|---------------------------|---|--------|------------|--------|-------|--------|-----|-----|------|
| TotalPackVoltage | Total pack voltage measurement  | V | 0 | 32 | False | 0.001 | 0 | N/A | N/A | little_endian |
| PackBalanceThreshold | Pack balance threshold measurement  | V | 32 | 16 | False | 0.001 | 0 | N/A | N/A | little_endian |
| TotalCellsBalancing | Total cells balancing status  |  | 48 | 16 | False | 1 | 0 | N/A | N/A | little_endian |

---

## NodeCellInfo
- ID: 0x60e (1550)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Cell Voltage Statistics

| Name | Comment&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Unit | Start Bit | Length | Signed | Scale | Offset | Min | Max | Byte Order |
|------|---------------------------|---|--------|------------|--------|-------|--------|-----|-----|------|
| MaxCellVoltage | Maximum cell voltage measurement  | V | 0 | 16 | False | 0.001 | 0 | N/A | N/A | little_endian |
| MaxCellVoltageNodeID | Node ID for max cell voltage  |  | 16 | 8 | False | 1 | 0 | N/A | N/A | little_endian |
| MaxCellVoltageCellID | Cell ID for max cell voltage  |  | 24 | 8 | False | 1 | 0 | N/A | N/A | little_endian |
| MinCellVoltage | Minimum cell voltage measurement  | V | 32 | 16 | False | 0.001 | 0 | N/A | N/A | little_endian |
| MinCellVoltageNodeID | Node ID for min cell voltage  |  | 48 | 8 | False | 1 | 0 | N/A | N/A | little_endian |
| MinCellVoltageCellID | Cell ID for min cell voltage  |  | 56 | 8 | False | 1 | 0 | N/A | N/A | little_endian |

---

## NodeTempInfo
- ID: 0x60f (1551)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Cell Temperature Statistics

| Name | Comment&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Unit | Start Bit | Length | Signed | Scale | Offset | Min | Max | Byte Order |
|------|---------------------------|---|--------|------------|--------|-------|--------|-----|-----|------|
| MaxTemperature | Maximum temperature measurement  | C | 0 | 16 | True | 0.1 | 0 | N/A | N/A | little_endian |
| MaxTemperatureNodeID | Node ID for max temperature  |  | 16 | 8 | False | 1 | 0 | N/A | N/A | little_endian |
| MaxTemperatureSensorID | Sensor ID for max temperature  |  | 24 | 8 | False | 1 | 0 | N/A | N/A | little_endian |
| MinTemperature | Minimum temperature measurement  | C | 32 | 16 | True | 0.1 | 0 | N/A | N/A | little_endian |
| MinTemperatureNodeID | Node ID for min temperature  |  | 48 | 8 | False | 1 | 0 | N/A | N/A | little_endian |
| MinTemperatureSensorID | Sensor ID for min temperature  |  | 56 | 8 | False | 1 | 0 | N/A | N/A | little_endian |

---

## Node&#x1D4A9;VoltageInfo  

**Note!** *For brevity, node messages are described once, where &#x1D4A9; describes the node number (up to a maximum of 32 nodes).*

- ID: 0x610 + (&#x1D4A9; &times; 0x7)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Voltage information of the node

| Name | Comment&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Unit | Start Bit | Length | Signed | Scale | Offset | Min | Max | Byte Order |
|------|---------------------------|---|--------|------------|--------|-------|--------|-----|-----|------|
| Node&#x1D4A9;TotalVoltage | Sum of the voltage of the cells in the node  | V | 0 | 32 | False | 0.001 | 0 | N/A | N/A | little_endian |
| Node&#x1D4A9;HighResistanceCellSense | Indication that a cell is reading high resistance  |  | 48 | 16 | False | 1 | 0 | N/A | N/A | little_endian |

---

## Node&#x1D4A9;CellVoltages1  

**Note!** *For brevity, node messages are described once, where &#x1D4A9; describes the node number (up to a maximum of 32 nodes).*

- ID: 0x611 + (&#x1D4A9; &times; 0x7)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Node cell voltage measurements (1 of 4)

| Name | Comment&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Unit | Start Bit | Length | Signed | Scale | Offset | Min | Max | Byte Order |
|------|---------------------------|---|--------|------------|--------|-------|--------|-----|-----|------|
| Node&#x1D4A9;Cell01 | Cell 01 measured voltage  | V | 0 | 16 | False | 0.001 | 0 | N/A | N/A | little_endian |
| Node&#x1D4A9;Cell02 | Cell 02 measured voltage  | V | 16 | 16 | False | 0.001 | 0 | N/A | N/A | little_endian |
| Node&#x1D4A9;Cell03 | Cell 03 measured voltage  | V | 32 | 16 | False | 0.001 | 0 | N/A | N/A | little_endian |
| Node&#x1D4A9;Cell04 | Cell 04 measured voltage  | V | 48 | 16 | False | 0.001 | 0 | N/A | N/A | little_endian |

---

## Node&#x1D4A9;CellVoltages2  

**Note!** *For brevity, node messages are described once, where &#x1D4A9; describes the node number (up to a maximum of 32 nodes).*

- ID: 0x612 + (&#x1D4A9; &times; 0x7)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Node cell voltage measurements (2 of 4)

| Name | Comment&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Unit | Start Bit | Length | Signed | Scale | Offset | Min | Max | Byte Order |
|------|---------------------------|---|--------|------------|--------|-------|--------|-----|-----|------|
| Node&#x1D4A9;Cell05 | Cell 05 measured voltage  | V | 0 | 16 | False | 0.001 | 0 | N/A | N/A | little_endian |
| Node&#x1D4A9;Cell06 | Cell 06 measured voltage  | V | 16 | 16 | False | 0.001 | 0 | N/A | N/A | little_endian |
| Node&#x1D4A9;Cell07 | Cell 07 measured voltage  | V | 32 | 16 | False | 0.001 | 0 | N/A | N/A | little_endian |
| Node&#x1D4A9;Cell08 | Cell 08 measured voltage  | V | 48 | 16 | False | 0.001 | 0 | N/A | N/A | little_endian |

---

## Node&#x1D4A9;CellVoltages3  

**Note!** *For brevity, node messages are described once, where &#x1D4A9; describes the node number (up to a maximum of 32 nodes).*

- ID: 0x613 + (&#x1D4A9; &times; 0x7)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Node cell voltage measurements (3 of 4)

| Name | Comment&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Unit | Start Bit | Length | Signed | Scale | Offset | Min | Max | Byte Order |
|------|---------------------------|---|--------|------------|--------|-------|--------|-----|-----|------|
| Node&#x1D4A9;Cell09 | Cell 09 measured voltage  | V | 0 | 16 | False | 0.001 | 0 | N/A | N/A | little_endian |
| Node&#x1D4A9;Cell10 | Cell 10 measured voltage  | V | 16 | 16 | False | 0.001 | 0 | N/A | N/A | little_endian |
| Node&#x1D4A9;Cell11 | Cell 11 measured voltage  | V | 32 | 16 | False | 0.001 | 0 | N/A | N/A | little_endian |
| Node&#x1D4A9;Cell12 | Cell 12 measured voltage  | V | 48 | 16 | False | 0.001 | 0 | N/A | N/A | little_endian |

---

## Node&#x1D4A9;CellVoltages4  

**Note!** *For brevity, node messages are described once, where &#x1D4A9; describes the node number (up to a maximum of 32 nodes).*

- ID: 0x614 + (&#x1D4A9; &times; 0x7)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Node cell voltage measurements (4 of 4)

| Name | Comment&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Unit | Start Bit | Length | Signed | Scale | Offset | Min | Max | Byte Order |
|------|---------------------------|---|--------|------------|--------|-------|--------|-----|-----|------|
| Node&#x1D4A9;Cell13 | Cell 13 measured voltage  | V | 0 | 16 | False | 0.001 | 0 | N/A | N/A | little_endian |
| Node&#x1D4A9;Cell14 | Cell 14 measured voltage  | V | 16 | 16 | False | 0.001 | 0 | N/A | N/A | little_endian |

---

## Node&#x1D4A9;CellTemps  

**Note!** *For brevity, node messages are described once, where &#x1D4A9; describes the node number (up to a maximum of 32 nodes).*

- ID: 0x615 + (&#x1D4A9; &times; 0x7)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Node thermistor temperature measurements

| Name | Comment&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Unit | Start Bit | Length | Signed | Scale | Offset | Min | Max | Byte Order |
|------|---------------------------|---|--------|------------|--------|-------|--------|-----|-----|------|
| Node&#x1D4A9;Temp01 | Thermistor 01 temperature measurement  | C | 0 | 16 | True | 0.1 | 0 | N/A | N/A | little_endian |
| Node&#x1D4A9;Temp02 | Thermistor 02 temperature measurement  | C | 16 | 16 | True | 0.1 | 0 | N/A | N/A | little_endian |
| Node&#x1D4A9;Temp03 | Thermistor 03 temperature measurement  | C | 32 | 16 | True | 0.1 | 0 | N/A | N/A | little_endian |
| Node&#x1D4A9;Temp04 | Thermistor 04 temperature measurement  | C | 48 | 16 | True | 0.1 | 0 | N/A | N/A | little_endian |

---

## Node&#x1D4A9;Stats  

**Note!** *For brevity, node messages are described once, where &#x1D4A9; describes the node number (up to a maximum of 32 nodes).*

- ID: 0x616 + (&#x1D4A9; &times; 0x7)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Node cell statistics

| Name | Comment&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Unit | Start Bit | Length | Signed | Scale | Offset | Min | Max | Byte Order |
|------|---------------------------|---|--------|------------|--------|-------|--------|-----|-----|------|
| Node&#x1D4A9;ConnectedCells | Number of cells detected on the node  |  | 0 | 8 | False | 1 | 0 | N/A | N/A | little_endian |
| Node&#x1D4A9;DisconnectedCells | Number of cells that are configured but not detected on the node  |  | 8 | 8 | False | 1 | 0 | N/A | N/A | little_endian |
| Node&#x1D4A9;ConnectedTempSensors | Number of connected thermistors on the node  |  | 16 | 8 | False | 1 | 0 | N/A | N/A | little_endian |
| Node&#x1D4A9;DisconnectedTempSensors | Number of thermistors that are configured but not detected on the node  |  | 24 | 8 | False | 1 | 0 | N/A | N/A | little_endian |
| Node&#x1D4A9;CellBalanceCommandSent | Cell balance command has been send to the node  |  | 32 | 16 | False | 1 | 0 | N/A | N/A | little_endian |
| Node&#x1D4A9;CellBalanceStatus | Status of cell balancing on the node  |  | 48 | 16 | False | 1 | 0 | N/A | N/A | little_endian |

---

## Node&#x1D4A9;Diagnostics  

**Note!** *For brevity, node messages are described once, where &#x1D4A9; describes the node number (up to a maximum of 32 nodes).*

- ID: 0x617 + (&#x1D4A9; &times; 0x7)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Node diagnostics

| Name | Comment&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Unit | Start Bit | Length | Signed | Scale | Offset | Min | Max | Byte Order |
|------|---------------------------|---|--------|------------|--------|-------|--------|-----|-----|------|
| Node&#x1D4A9;Type | Type of the node  |  | 0 | 8 | False | 1 | 0 | N/A | N/A | little_endian |
| Node&#x1D4A9;Address | Address of the node  |  | 8 | 8 | False | 1 | 0 | N/A | N/A | little_endian |
| Node&#x1D4A9;UARTResult | Latest result of UART communications  |  | 16 | 16 | False | 1 | 0 | N/A | N/A | little_endian |
| Node&#x1D4A9;State | State of the node  |  | 32 | 16 | False | 1 | 0 | N/A | N/A | little_endian |
| Node&#x1D4A9;StateTimer | Time node has spent in the current state  |  | 48 | 16 | False | 1 | 0 | N/A | N/A | little_endian |

---

## ContactorDiagnostics
- ID: 0x6f0 (1776)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Contactor diagnostics information

| Name | Comment&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Unit | Start Bit | Length | Signed | Scale | Offset | Min | Max | Byte Order |
|------|---------------------------|---|--------|------------|--------|-------|--------|-----|-----|------|
| ContactorDesiredState | Intended state of the contactors  |  | 0 | 32 | False | 1 | 0 | N/A | N/A | little_endian |
| ContactorActualState | Actual state of the contactors  |  | 32 | 32 | False | 1 | 0 | N/A | N/A | little_endian |

---

## DeviceWatchdogInfo
- ID: 0x6f1 (1777)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Information relating to internal watchdog status

| Name | Comment&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Unit | Start Bit | Length | Signed | Scale | Offset | Min | Max | Byte Order |
|------|---------------------------|---|--------|------------|--------|-------|--------|-----|-----|------|
| SelfTestTaskStatus | Self test task running state <ul><li>4: Fail</li><li>2: Fast</li><li>1: Slow</li><li>0: Ok</li></ul>  |  | 0 | 4 | False | 1 | 0 | N/A | N/A | little_endian |
| SensorTaskStatus | Sensor task running state <ul><li>4: Fail</li><li>2: Fast</li><li>1: Slow</li><li>0: Ok</li></ul>  |  | 8 | 8 | False | 1 | 0 | N/A | N/A | little_endian |
| TelemetryTaskStatus | Telemetry task running state <ul><li>4: Fail</li><li>2: Fast</li><li>1: Slow</li><li>0: Ok</li></ul>  |  | 16 | 8 | False | 1 | 0 | N/A | N/A | little_endian |
| CMUTaskStatus | CMU task running state <ul><li>4: Fail</li><li>2: Fast</li><li>1: Slow</li><li>0: Ok</li></ul>  |  | 24 | 8 | False | 1 | 0 | N/A | N/A | little_endian |
| BMSTaskStatus | BMS task running state <ul><li>4: Fail</li><li>2: Fast</li><li>1: Slow</li><li>0: Ok</li></ul>  |  | 32 | 8 | False | 1 | 0 | N/A | N/A | little_endian |
| SoXTaskStatus | SoX task running state <ul><li>4: Fail</li><li>2: Fast</li><li>1: Slow</li><li>0: Ok</li></ul>  |  | 40 | 8 | False | 1 | 0 | N/A | N/A | little_endian |
| WatchdogReset | State of the watchdog peripheral <ul><li>1: Fail</li><li>0: Ok</li></ul>  |  | 48 | 1 | False | 1 | 0 | N/A | N/A | little_endian |

---

## DeviceSelftestInfo
- ID: 0x6f2 (1778)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Result of various internal self testing

| Name | Comment&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Unit | Start Bit | Length | Signed | Scale | Offset | Min | Max | Byte Order |
|------|---------------------------|---|--------|------------|--------|-------|--------|-----|-----|------|
| SelftestResult | Reserved  |  | 0 | 64 | False | 1 | 0 | N/A | N/A | little_endian |

---

## NodeDiagnostics
- ID: 0x6f3 (1779)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: CMU controller diagnostic information

| Name | Comment&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Unit | Start Bit | Length | Signed | Scale | Offset | Min | Max | Byte Order |
|------|---------------------------|---|--------|------------|--------|-------|--------|-----|-----|------|
| ControllerType | Type of the CMU controller  |  | 0 | 8 | False | 1 | 0 | N/A | N/A | little_endian |
| CurrentState | State of the CMU controller  |  | 8 | 8 | False | 1 | 0 | N/A | N/A | little_endian |
| CurrentStateTimer | Time the controller has spent in the current state  |  | 16 | 16 | False | 1 | 0 | N/A | N/A | little_endian |
| CommsResult | Latest result of the CMU controller <--> CMU communication  |  | 32 | 16 | False | 1 | 0 | N/A | N/A | little_endian |

---

## NodeStats
- ID: 0x6f4 (1780)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Node statistics information

| Name | Comment&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Unit | Start Bit | Length | Signed | Scale | Offset | Min | Max | Byte Order |
|------|---------------------------|---|--------|------------|--------|-------|--------|-----|-----|------|
| TotalConfiguredNodes | Sum of nodes expected in the configuration  |  | 0 | 16 | False | 1 | 0 | N/A | N/A | little_endian |
| TotalConnectedNodes | Sum of nodes detected by the controller  |  | 16 | 16 | False | 1 | 0 | N/A | N/A | little_endian |
| TotalDisconnectedNodes | Sum of configured nodes not detected by the controller  |  | 32 | 16 | False | 1 | 0 | N/A | N/A | little_endian |

---

## NodeCellStats
- ID: 0x6f5 (1781)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Cell statistics information

| Name | Comment&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Unit | Start Bit | Length | Signed | Scale | Offset | Min | Max | Byte Order |
|------|---------------------------|---|--------|------------|--------|-------|--------|-----|-----|------|
| TotalConfiguredCells | Sum of cells expected in the configuration  |  | 0 | 16 | False | 1 | 0 | N/A | N/A | little_endian |
| TotalConnectedCells | Sum of cells detected by all nodes  |  | 16 | 16 | False | 1 | 0 | N/A | N/A | little_endian |
| TotalDisconnectedCells | Sum of configured cells not detected by all nodes  |  | 32 | 16 | False | 1 | 0 | N/A | N/A | little_endian |

---

## NodeTempStats
- ID: 0x6f6 (1782)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Thermistor statistics information

| Name | Comment&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Unit | Start Bit | Length | Signed | Scale | Offset | Min | Max | Byte Order |
|------|---------------------------|---|--------|------------|--------|-------|--------|-----|-----|------|
| TotalConfiguredTempSensors | Sum of thermistors expected in the configuration  |  | 0 | 16 | False | 1 | 0 | N/A | N/A | little_endian |
| TotalConnectedTempSensors | Sum of thermistors detected by all nodes  |  | 16 | 16 | False | 1 | 0 | N/A | N/A | little_endian |
| TotalDisconnectedTempSensors | Sum of configured thermistors not detected by all nodes  |  | 32 | 16 | False | 1 | 0 | N/A | N/A | little_endian |

---

## NodeStatusRegisters
- ID: 0x6f7 (1783)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Node controller status registers

| Name | Comment&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Unit | Start Bit | Length | Signed | Scale | Offset | Min | Max | Byte Order |
|------|---------------------------|---|--------|------------|--------|-------|--------|-----|-----|------|
| RXStatus | Node controller RX status register  |  | 0 | 8 | False | 1 | 0 | N/A | N/A | little_endian |
| TXStatus | Node controller TX status register  |  | 8 | 8 | False | 1 | 0 | N/A | N/A | little_endian |
| LSSMByteHWError | HW error reported by node controller  | BOOLEAN | 16 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| LSSMByteAliveCNTError | Incorrect alive count reported by node controller  | BOOLEAN | 17 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| LSSMByteCommandOP | Current command OP code  | BOOLEAN | 18 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| LSSMByteCommMismatchError | Communication mismatch error reported  | BOOLEAN | 19 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| LSSMByteAlertPacketError | Packet error reported  | BOOLEAN | 20 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| LSSMByteCommError | Comm error reported  | BOOLEAN | 21 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| LSSMByteAlertPacketStatusError | Packet status error reported  | BOOLEAN | 22 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| LSSMByteRXReady | Node controller ready to receive  | BOOLEAN | 23 | 1 | False | 1 | 0 | N/A | N/A | little_endian |
| GENStatus |   |  | 24 | 8 | False | 1 | 0 | N/A | N/A | little_endian |
| OPStateStatus |   |  | 32 | 8 | False | 1 | 0 | N/A | N/A | little_endian |
| BufferStatus |   |  | 40 | 8 | False | 1 | 0 | N/A | N/A | little_endian |
| WatchdogStatus |   |  | 48 | 8 | False | 1 | 0 | N/A | N/A | little_endian |
| GPIOStatus |   |  | 56 | 8 | False | 1 | 0 | N/A | N/A | little_endian |

---

## SensorData1
- ID: 0x6f8 (1784)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Sensor data 1

| Name | Comment&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Unit | Start Bit | Length | Signed | Scale | Offset | Min | Max | Byte Order |
|------|---------------------------|---|--------|------------|--------|-------|--------|-----|-----|------|
| Temperature1 | Thermistor 1 measured temperature  | C | 0 | 16 | True | 0.1 | 0 | N/A | N/A | little_endian |
| Temperature2 | Thermistor 2 measured temperature  | C | 16 | 16 | True | 0.1 | 0 | N/A | N/A | little_endian |
| Pressure | Measured pressure  | kPa | 32 | 16 | True | 0.1 | 0 | N/A | N/A | little_endian |
| Humidity | Measured humidity  | % RH | 48 | 16 | True | 0.1 | 0 | N/A | N/A | little_endian |

---

## SensorData2
- ID: 0x6f9 (1785)
- Length: 8
- Senders: ProhelionBmsD1000Gen2
- Comment: Sensor data 2

| Name | Comment&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Unit | Start Bit | Length | Signed | Scale | Offset | Min | Max | Byte Order |
|------|---------------------------|---|--------|------------|--------|-------|--------|-----|-----|------|
| VOC | Measured Volatile Organic Compound (VOC) concentration in parts per billion (ppb)  | ppb | 0 | 16 | False | 1 | 0 | N/A | N/A | little_endian |
| NOX | Measured Nitrous Oxide (NOx) concentration in parts per billion (ppb)  | ppb | 16 | 16 | False | 1 | 0 | N/A | N/A | little_endian |

---
