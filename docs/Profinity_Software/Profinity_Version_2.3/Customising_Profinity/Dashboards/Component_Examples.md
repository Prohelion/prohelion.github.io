---
title: Dashboard component examples
description: "Copy dashboard YAML for an HTML component, an Image component with regions and data values, and a Table with a heat map."
type: reference
owner: Documentation
last_reviewed: 2026-10-15
---

# Dashboard component examples

These examples show the HTML, Image, and Table components, and every YAML block validates against the dashboard schema.
The examples assume a Prohelion D1000 Gen2 BMS component that is named `D1000 Gen2 BMS` in the Profile.
The component name in each tag path is the name given to the component in the Profile, so change it to match your own component, and find the tags in the [Tag Explorer](../../Tags/index.md).
Image names such as `StatusIcon.svg` are placeholders, so replace them with files in the `images` directory of the profile, or the images do not appear.

## HTML component example

An [HTML](./Component_Reference/Content/HTML.md) component shows custom HTML content with references to profile assets:

``` yaml
dashboard:
  items:
    - row:
        items:
          - html:
              class: "info-box"
              content: |
                <div class="info-box__header">System Information</div>
                <div class="info-box__content">
                  <p>This dashboard monitors system status.</p>
                  <img src="/Profile/Images/system-diagram.svg" alt="System Diagram" />
                </div>
```

The `info-box` classes are styled by rules in the `profile.css` file of the `/Profile/Styles` directory, because the HTML sanitiser removes a `link` element from `content`.

## Image component example

An interactive image with a region, an icon and a data value:

``` yaml
dashboard:
  items:
    - row:
        items:
          - image:
              image: "DeviceDiagram.png"
              icons:
                  - id: "status-icon"
                    x: 50
                    y: 30
                    icon: "StatusIcon.svg"
                    size: 32
                    action:
                      invoke: Navigate
                      target: "/component?componentId=Status"
                    label: "Status"
              regions:
                  - id: "main-region"
                    x: 20
                    y: 20
                    width: 60
                    height: 40
                    action:
                      invoke: Navigate
                      target: "/component?componentId=Main"
                    label: "Main Component"
                    visibleBorder: true
              dataValues:
                  - id: "voltage-display"
                    x: 50
                    y: 10
                    label: "Voltage"
                    displayType: "text"
                    bind:
                      - target: value
                        source: /D1000 Gen2 BMS/DBC/BMSVoltageData/BatteryVoltage
                    unit: "V"
                    precision: 2
```

The `x`, `y`, `width` and `height` values are percentages of the image size, and `action` is an object whose `invoke` value is `Navigate`, `Component`, `System` or `Endpoint`.

## Table component example

A [Table](./Component_Reference/Data/Tables.md) with a heat map and highlighting:

``` yaml
dashboard:
  items:
    - row:
        items:
          - table:
              tableHeaders:
                - header:
                    accessorKey: name
                    value: "Cell Name"
                - header:
                    accessorKey: voltage
                    value: "Voltage (V)"
                - header:
                    accessorKey: temperature
                    value: "Temperature (°C)"
              heatmap: true
              highlightMin: true
              highlightMax: true
              highlightAtOrBelow: 2.5
              alertAtOrBelow: 2.0
              precision: 3
              bind:
                - target: value
                  source: DBC/CellData/Values
```

The `heatmap` setting colours cells on a green to yellow scale between the minimum and maximum, `highlightAtOrBelow` highlights cells at or below 2.5, and `alertAtOrBelow` applies alert colouring to low values at or below 2.0.

[Component Reference](./Component_Reference/index.md) describes every parameter of each component, and [Examples](./Examples.md) builds a dashboard step by step.
