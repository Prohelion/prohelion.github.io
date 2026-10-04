---
title: Accordion Component
description: "Collapsible sections for organising dashboard content that can be expanded and collapsed on demand."
---

# Accordion

Collapsible sections for organising content. Accordions keep dashboards uncluttered by letting users expand and collapse sections of information as needed.

<figure markdown>
![Accordion component displaying collapsible sections for organising dashboard content](../../images/accordion.png)
<figcaption>Accordion component displaying collapsible sections for organising dashboard content</figcaption>
</figure>

**Best for:** Detailed information that is not always needed, settings panels, secondary data, keeping dashboards uncluttered

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `id` | string | No | None | Not used by the web interface |
| `class` | string | No | None | CSS class added to the accordion element |
| `label` | string | Yes | None | Caption of the button that expands and collapses the section |
| `defaultExpanded` | boolean | No | `false` | Whether the accordion starts expanded when the dashboard loads. The accordion remains collapsible by the user either way, and an accordion that omits the parameter starts collapsed |
| `visible` | boolean | No | `true` | When `false`, or when bound to `false`, the whole accordion is hidden |
| `bind` | array | No | None | Data binding. The `visible` target shows and hides the accordion |
| `items` | array | Yes | None | Accordion sections, where each item must be an object that contains a `row` |

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
                          value: "2.3.0"
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

**Nested Accordions:**

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

**Conditional Content:**

Use data binding to conditionally show content within accordions. Rows do not accept `visible` or `bind`, so the visibility binding is placed on a component inside the row, such as a readout:

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

**Complete Example with All Features:**

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
                          value: "2.3.0"
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
```
