---
title: State Component
description: "State machine visualisation component using Mermaid flowcharts to display system states and transitions."
---

# State

State machine visualisation component. State components display the current state of a system using Mermaid flowcharts, showing state transitions and current position.

<figure markdown>
![State component showing state machine visualisation with Mermaid flowchart](../../images/state.png)
<figcaption>State component showing state machine visualisation with Mermaid flowchart</figcaption>
</figure>

**Best for:** System state visualisation, process flow display, state machine representation, complex system status

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `id` | string | No | None | Not used by the web interface |
| `class` | string | No | None | Not used by the web interface |
| `label` | string | No | None | Not used by the web interface |
| `model` | string | Yes | None | Mermaid state machine definition that lists the states and the transitions between them. Without a model, the component shows that no model is available |
| `value` | string | No | None | Identifier of the active state, which the diagram highlights. The identifier must match a node identifier in `model`, for example `IDLE` for the node `IDLE(Idle)` |
| `enabled` | boolean | No | `true` | Not used by the web interface |
| `visible` | boolean | No | `true` | Not used by the web interface |
| `bind` | array | No | None | Data binding. Bind a tag to the `value` target to drive the highlighted state. Only the `value` target is handled |

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
                  source: /Prohelion BMU/Properties/State/Controller/CurrentState/Name
                  toType: string
```
