## System Wide State Diagram

``` mermaid
graph
    classDef empty height:0px,width:0px,stroke:none;

    SAFE(SAFE)
    IDLE(IDLE)
    INIT_START@{shape: dbl-circ, label: Boot} --> INITIALISE
    INITIALISE(INITIALISE)              -- Initialisation complete --> CALIBRATE
    CALIBRATE(CALIBRATE)                -- Contactors Open --> SAFE
    SAFE(SAFE)                          -- Faults Cleared & Idle Command --> IDLE

    CHARGE_INIT(CHARGE_INIT)            -- Idle Command             --> IDLE
    CONNECT(CONNECT)                    -- Idle Command             --> IDLE
    CHARGE_STOPPING(CHARGE_STOPPING)    -- Contactors Open          --> IDLE
    PRECHARGE(PRECHARGE)                -- Idle Command             --> IDLE
    ENABLED(ENABLED)                    -- Idle Command             --> IDLE

    IDLE                                -- Charge Init Command      --> CHARGE_INIT
    IDLE                                -- Connect Command          --> CONNECT

    CONNECT                             -- Fault                    -->  DISCONNECT
    PRECHARGE                           -- Fault                    -->  DISCONNECT
    ENABLED                             -- Fault                    -->  DISCONNECT
    CHARGE_INIT                         -- Fault                    -->  DISCONNECT
    CHARGE_CONNECT                      -- Fault                    -->  DISCONNECT
    CHARGE_ENABLED                      -- Fault                    -->  DISCONNECT
    CHARGE_STOPPING                     -- Fault                    -->  DISCONNECT
    DISCONNECT(DISCONNECT)              -- Time Passed              --> SAFE

    CHARGE_INIT(CHARGE_INIT)            -- Charge Enable Command    --> CHARGE_CONNECT
    CHARGE_CONNECT(CHARGE_CONNECT)      -- Precharge Passes         --> CHARGE_ENABLED
    CHARGE_CONNECT(CHARGE_CONNECT)      -- Idle Command             --> CHARGE_STOPPING
    CHARGE_ENABLED(CHARGE_ENABLED)      -- Idle Command             --> CHARGE_STOPPING


    CONNECT(CONNECT)                    -- Enable Command           --> PRECHARGE
    PRECHARGE(PRECHARGE)                -- Precharge Passes         --> ENABLED


```

## Initialisation State Diagram
``` mermaid
graph
    subgraph Initialisation
        INIT_START@{shape: dbl-circ, label: Boot} --> INITIALISE
        INITIALISE(INITIALISE) -- Initialisation complete --> CALIBRATE
        CALIBRATE(CALIBRATE) -- Contactors Open --> SAFE
        SAFE(SAFE) -- Idle Command --> IDLE(IDLE)
    end
```
## Discharging State Diagram
``` mermaid
graph
    subgraph Discharging
    
        direction TB
        IDLE(IDLE) -- Connect Command --> CONNECT
        CONNECT(CONNECT) -- Enable Command --> PRECHARGE
        PRECHARGE(PRECHARGE) -- Precharge Passes --> ENABLED

        CONNECT(CONNECT) -- Idle Command --> IDLE
        PRECHARGE(PRECHARGE) -- Idle Command --> IDLE
        ENABLED(ENABLED) -- Idle Command --> IDLE

        CONNECT -- Fault --> DISCONNECT
        PRECHARGE -- Fault --> DISCONNECT
        ENABLED -- Fault --> DISCONNECT
        DISCONNECT(DISCONNECT) -- Time Passed --> SAFE
        SAFE(SAFE) -- Faults Cleared, Idle Command --> IDLE
    end
```
## Charging State Diagram
``` mermaid
graph
    subgraph Charging
        direction TB
        IDLE(IDLE) -- Charge Init Command --> CHARGE_INIT
        CHARGE_INIT(CHARGE_INIT) -- Charge Enable Command --> CHARGE_CONNECT
        CHARGE_CONNECT(CHARGE_CONNECT) -- Precharge Passes --> CHARGE_ENABLED
        CHARGE_ENABLED(CHARGE_ENABLED) -- Idle Command --> CHARGE_STOPPING
        CHARGE_STOPPING(CHARGE_STOPPING) -- Contactors Open --> IDLE

        CHARGE_INIT(CHARGE_INIT) -- Idle Command --> IDLE
        CHARGE_CONNECT(CHARGE_CONNECT) -- Idle Command --> CHARGE_STOPPING

        CHARGE_INIT -- Fault --> DISCONNECT
        CHARGE_CONNECT -- Fault --> DISCONNECT
        CHARGE_ENABLED -- Fault --> DISCONNECT
        CHARGE_STOPPING -- Fault --> DISCONNECT

        DISCONNECT(DISCONNECT) -- Time Passed --> SAFE
        SAFE(SAFE) -- Faults Cleared, Idle Command --> IDLE
    end
```