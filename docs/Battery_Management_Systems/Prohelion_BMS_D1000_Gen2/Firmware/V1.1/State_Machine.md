---
title: Prohelion BMS D1000 Gen2 - BMS State Machine
---

This section provides information on the BMS State Machine. The BMS State Machine is responsible for engaging and disengaging the battery contactors (main and charge outputs). The BMS State Machine continuously monitors the status all of sensors and external devices to ensure the battery stays within it's safe area of operation.

## State Machine Diagram

``` mermaid
stateDiagram-v2
  [*] --> INITIALISE
  INITIALISE --> CALIBRATE
  CALIBRATE --> SAFE
  SAFE --> ACTIVE: Errors Cleared
  ACTIVE --> SAFE
  state ACTIVE {
        [*] --> IDLE: IDLE Command
        IDLE --> CONNECT: CONNECT Command
        IDLE --> CONDITION: CONDITION Command
        CONDITION --> IDLE: IDLE Command
        CONNECT --> PRECHARGE: ENABLE Command
        PRECHARGE --> ENABLED: Precharge Passed
        ENABLED --> CHARGE: CHARGE Command
        CHARGE --> ENABLED: ENABLE Command
        ENABLED --> IDLE: IDLE Command
    }
  
```

## State Descriptions

| **STATE**      | **Contactors Engaged** | **Balancing Enabled** | **Description** |
|----------------|------------------------|-----------------------|-----------------------|
| **INITIALISE** | NONE                   | NO                    | Initialises all the peripherals and external devices |
| **CALIBRATE**  | NONE                   | NO                    | Performs self-calibration and start self-tests     |
| **SAFE**       | NONE                   | NO                    | Ensure the system is in a safe state by disabling all contactor outputs |
| **IDLE**       | NONE                   | NO                    | Signals that the system is ready to be enabled |
| **CONNECT**    | 1                      | NO                    | Engages the main negative contactor and connects the battery negative to the load negative, allowing the BMS to measure the load voltage |
| **PRECHARGE**  | 1 & 2                  | NO                    | Engages the precharge contactor and waits for the load voltage to reach the battery voltage, monitors for precharge faults | 
| **ENABLED**    | 1 & 3                  | YES                   | Engages the main positive contactor and monitors for any safety faults | 
| **CHARGE**     | 1 & 3 & 4 & 5          | YES                   | Engages the positive and negative charge contactors, allows a session charging to begin | 
| **CONDITION**  | NONE                   | YES                   | Allows condition of cells without enabling contactors |


