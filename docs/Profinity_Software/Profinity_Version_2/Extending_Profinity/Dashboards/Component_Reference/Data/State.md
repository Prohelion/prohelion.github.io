---
title: State Component
---

# State

State machine visualization component. State components display the current state of a system using Mermaid flowcharts, showing state transitions and current position.

**Best for:** System state visualization, process flow display, state machine representation, complex system status

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | optional (string) | Unique identifier for the state component |
| `class` | optional (string) | CSS class for styling |
| `label` | optional (string) | Display label |
| `model` | required (string) | Mermaid flowchart definition |
| `value` | optional (string) | Current state value |
| `enabled` | optional (boolean) | Whether the state component is enabled |
| `visible` | optional (boolean) | Whether the state component is visible |
| `bind` | optional (array) | Data binding configuration |

**Example:**

``` yaml
dashboard:
  items:
    - row:
        items:
          - state:
              model: "flowchart LR\r\n\tERROR(Error)\r\n\tIDLE(Idle)\r\n\tENABLE(Enable)\r\n\tDISCOVERY(Discovery)\r\n\tMEASURE(Measure)\r\n\tPRECHARGE(Precharge)\r\n\tRUN(Run)\r\n\tIDLE --> ENABLE\r\n\tIDLE --> DISCOVERY\r\n\tENABLE --> MEASURE\r\n\tMEASURE --> PRECHARGE\r\n\tPRECHARGE --> RUN\r\n"
              bind:
                - target: value
                  source: Prohelion BMU.[Property].State.Controller.CurrentState.Name
                  toType: string
```
