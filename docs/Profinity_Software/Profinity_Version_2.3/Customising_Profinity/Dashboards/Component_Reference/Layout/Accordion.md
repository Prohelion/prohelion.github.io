---
title: Accordion Component
description: "Collapsible sections for organising dashboard content that can be expanded and collapsed on demand."
---

# Accordion

An accordion is a set of collapsible sections that the operator expands and collapses as needed, which keeps a dashboard uncluttered.

<figure markdown>
![Accordion component displaying collapsible sections for organising dashboard content](../../images/accordion.png)
<figcaption>Accordion component displaying collapsible sections for organising dashboard content</figcaption>
</figure>

## When to Use

Use an accordion for detailed information that is not always needed, such as settings and secondary data. Use [Tabs](../Interactive/Tabs.md) when the operator switches between whole views, because a tab strip shows one view at a time.

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `id` | string | No | None | Not used by the web interface |
| `class` | string | No | None | CSS class added to the accordion element |
| `label` | string | Yes | None | Caption of the button that expands and collapses the section |
| `defaultExpanded` | boolean | No | `false` | Whether the accordion starts expanded when the dashboard loads. The accordion remains collapsible by the user either way, and an accordion that omits the parameter starts collapsed |
| `visible` | boolean | No | `true` | When `false`, or when bound to `false`, the whole accordion is hidden |
| `bind` | array | No | None | [Data binding](../../Data_Binding.md). The `visible` target shows and hides the accordion |
| `items` | array | Yes | None | Accordion sections, where each item must be an object that contains a `row` |

A `row` does not accept `visible` or `bind`, so content inside an accordion is shown and hidden by binding `visible` on the accordion itself or on a component inside the row.

## Example

### Basic Example

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
                          value: "1.4.2"
```

### Data Binding for Visibility

Control accordion visibility based on system state or conditions:

``` yaml
dashboard:
  items:
    - accordion:
        label: "Advanced Settings"
        visible: true
        bind:
          - target: visible
            source: 'DBC/Settings/ShowAdvanced'
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

### Nested Accordions

Accordions can be nested within other accordions for hierarchical organisation:

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

### Conditional Content

To show content inside an accordion only under certain conditions, place the visibility binding on a component inside the row, such as the readout in this example:

``` yaml
dashboard:
  items:
    - accordion:
        label: "Component Status"
        defaultExpanded: true
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
                                value: 1
                                bind:
                                  - target: enabled
                                    source: 'DBC/Status/Online'
                                    toType: boolean
                                  - target: color
                                    source: 'DBC/Status/Color'
                                    toType: string
                - readouts:
                    items:
                      - readout:
                          label: "Warning Count"
                          bind:
                            - target: value
                              source: 'DBC/Status/WarningCount'
                            - target: visible
                              source: 'DBC/Status/HasWarnings'
                              toType: boolean
```

### Complete Example

``` yaml
dashboard:
  items:
    - accordion:
        id: "main-accordion"
        class: "system-accordion"
        label: "System Information"
        defaultExpanded: true
        visible: true
        bind:
          - target: visible
            source: 'DBC/Settings/ShowSystemInfo'
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
                          value: "1.4.2"
          - row:
              items:
                - accordion:
                    label: "Detailed Metrics"
                    items:
                      - row:
                          items:
                            - chart:
                                type: "line"
                                bind:
                                  - target: value
                                    source: 'DBC/Metrics/History'
                                    seriesMode: timeSeries
                                    timeRangeStart: "-5m"
                                    timeRangeStop: "0m"
```
