---
title: Accordion Component
---

# Accordion

Collapsible sections for organizing content. Accordions help keep dashboards clean by allowing users to expand and collapse sections of information as needed.

**Best for:** Detailed information that's not always needed, settings panels, secondary data, keeping dashboards uncluttered

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | optional (string) | Unique identifier for the accordion |
| `class` | optional (string) | CSS class for styling |
| `label` | required (string) | Section label |
| `visible` | optional (boolean) | Whether the accordion is visible |
| `bind` | optional (array) | Data binding configuration |
| `items` | required (array) | Array of row objects within the accordion |

**Basic Example:**

``` yaml
dashboard:
  items:
    - accordion:
        label: "System Details"
        items:
          - row:
              items:
                - readouts:
                    items:
                      - readout:
                          label: "Uptime"
                          value: "72:15:30"
                      - readout:
                          label: "Version"
                          value: "2.1.0"
```

**Data Binding for Visibility:**

Control accordion visibility based on system state or conditions:

``` yaml
dashboard:
  items:
    - accordion:
        label: "Advanced Settings"
        visible: true
        bind:
          - target: visible
            source: '{COMPONENT_NAME}.Settings.ShowAdvanced'
            toType: boolean
        items:
          - row:
              items:
                - readouts:
                    items:
                      - readout:
                          label: "Debug Mode"
                          value: "Enabled"
```

**Nested Accordions:**

Accordions can be nested within other accordions for hierarchical organization:

``` yaml
dashboard:
  items:
    - accordion:
        label: "System Configuration"
        items:
          - row:
              items:
                - accordion:
                    label: "Network Settings"
                    items:
                      - row:
                          items:
                            - readouts:
                                items:
                                  - readout:
                                      label: "IP Address"
                                      value: "192.168.1.100"
                                  - readout:
                                      label: "Port"
                                      value: "8080"
                - accordion:
                    label: "Security Settings"
                    items:
                      - row:
                          items:
                            - readouts:
                                items:
                                  - readout:
                                      label: "SSL Enabled"
                                      value: "Yes"
                                  - readout:
                                      label: "Authentication"
                                      value: "Required"
```

**Conditional Content:**

Use data binding to conditionally show different content within accordions:

``` yaml
dashboard:
  items:
    - accordion:
        label: "Component Status"
        items:
          - row:
              items:
                - lamps:
                    items:
                      - lampgroup:
                          items:
                            - lamp:
                                color: "green"
                                label: "Status"
                                enabled: true
                                bind:
                                  - target: enabled
                                    source: '{COMPONENT_NAME}.Status.Online'
                                    toType: boolean
                                  - target: color
                                    source: '{COMPONENT_NAME}.Status.Color'
                                    toType: string
          - row:
              visible: true
              bind:
                - target: visible
                  source: '{COMPONENT_NAME}.Status.HasWarnings'
                  toType: boolean
              items:
                - readouts:
                    items:
                      - readout:
                          label: "Warning Count"
                          bind:
                            - target: value
                              source: '{COMPONENT_NAME}.Status.WarningCount'
```

**Complete Example with All Features:**

``` yaml
dashboard:
  items:
    - accordion:
        id: "main-accordion"
        class: "system-accordion"
        label: "System Information"
        visible: true
        bind:
          - target: visible
            source: '{COMPONENT_NAME}.Settings.ShowSystemInfo'
            toType: boolean
        items:
          - row:
              items:
                - readouts:
                    items:
                      - readout:
                          label: "Uptime"
                          value: "72:15:30"
                      - readout:
                          label: "Version"
                          value: "2.1.0"
          - accordion:
              label: "Detailed Metrics"
              items:
                - row:
                    items:
                      - chart:
                          type: "line"
                          bind:
                            - target: value
                              source: '{COMPONENT_NAME}.Metrics.History'
```
