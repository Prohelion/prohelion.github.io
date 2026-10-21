---
title: Overlay elements
description: "Reference for the action invocation, layers, icon sources, display types and annotation lines that the Image and 3D model components share."
type: reference
owner: Documentation
last_reviewed: 2026-10-15
---

# Overlay elements

Overlay elements are the regions, icons, buttons, data values, points, annotation lines and layers that the [Image](Image.md) and [3D model](Model.md) components position on a base image or in a model.
This page holds the parameters and rules that the two components share.
The parameters that differ between the two components stay on the [Image](Image.md) and [3D model](Model.md) pages.

## Action invocation

The `action` of a region, icon, or button is an action invocation, which is the same object that a [Toggle](../Interactive/Toggles.md) uses.
The [Actions](../Interactive/Actions.md#invoke-types) page describes the invoke types.
The parameters are the same for an [Image](Image.md) component and a [3D model](Model.md) component.

### Region, icon, and button actions

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `invoke` | string | No | `Component` | How a click is carried out, one of `Component`, `System`, `Endpoint` or `Navigate` |
| `actionId` | string | Conditional | None | Name of the action to run. Required when `invoke` is `Component` or `System` |
| `target` | string | Conditional | None | Location to navigate to. Required when `invoke` is `Navigate` |
| `endpointAction` | object | Conditional | None | Details of the HTTP request. Required when `invoke` is `Endpoint` |
| `value` | string | No | None | Payload posted with a `Component` or `System` request |
| `confirmMessage` | string | No | None | Not used by overlays. Only the `confirmMessage` of an `endpointAction` is honoured |
| `trackProgress` | boolean | No | None | Not used by overlays |
| `restartingOnSuccess` | boolean | No | None | Not used by overlays |

### Toggle action invocation

The `action` object of a [Toggle](../Interactive/Toggles.md) is an action invocation, which is the same object that the regions, icons, and buttons of an [Image](Image.md) or [3D model](Model.md) component use for their `action`.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `invoke` | string | No | `Component` | How a click is carried out, one of `Component`, `System`, `Endpoint` or `Navigate`. The [Actions](../Interactive/Actions.md#invoke-types) page describes each type |
| `actionId` | string | Conditional | None | Name of the action to run. Required when `invoke` is `Component` or `System` |
| `target` | string | Conditional | None | Location to navigate to. Required when `invoke` is `Navigate` |
| `endpointAction` | object | Conditional | None | Details of the HTTP request. Required when `invoke` is `Endpoint`. The [Actions](../Interactive/Actions.md#endpoint-action-parameters) page describes the parameters |
| `value` | string | No | None | Not used by toggles. Set `value` on the toggle itself to post a payload |
| `confirmMessage` | string | No | None | Message of a confirmation dialog shown before the action runs |
| `trackProgress` | boolean | No | None | Polls the progress of the action after a `Component` or `System` request |
| `restartingOnSuccess` | boolean | No | None | Shows a wait dialog after the action succeeds and polls until the engine is running again |

## Layers

Layers let the user show and hide groups of overlay elements.
The component displays a button for each layer.
An overlay element joins a layer through its `layer` parameter.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `id` | string | Yes | None | Layer identifier that the `layer` parameter of an overlay element refers to |
| `label` | string | No | The `id`, with underscores shown as spaces | Caption of the layer button |
| `defaultVisible` | boolean | No | `true` | Whether the layer is visible when the dashboard loads |

Two layers, one hidden when the dashboard loads:

```yaml
layers:
  - id: "Hotspots"
    label: "Hotspots"
    defaultVisible: true
  - id: "Data"
    label: "Data values"
    defaultVisible: false
```

## Icon source forms

The `icon` parameter of an icon is the icon source.
It takes one of these forms:

- An image filename from `/Profile/Images`, ending in `.png`, `.jpg`, `.jpeg`, `.gif`, `.svg` or `.webp`.
- An emoji character.
- Scalable Vector Graphics (SVG) path data that starts with `M`.
- An `<svg>` element, whose first path is used.

Any other text is displayed as text.

## Display types

The examples on this page use the Image position form, with percentage `x` and `y`.
On a [3D model](Model.md), every data value position also takes `z`, in model space.
Tag paths such as `DBC/Temperature/Value` are placeholders, so replace them with tags from your own component.

A text display shows the formatted value:

```yaml
dataValues:
  - id: "temperature"
    x: 30
    y: 40
    label: "Temperature"
    bind:
      - target: value
        source: 'DBC/Temperature/Value'
    displayType: "text"
    unit: "°C"
    precision: 1
```

A graph display shows a bar chart:

```yaml
dataValues:
  - id: "battery-soc"
    x: 70
    y: 40
    label: "SOC"
    bind:
      - target: value
        source: 'DBC/PackStateOfCharge/SOCPercent'
    displayType: "graph"
    maxValue: 100
    unit: "%"
    precision: 1
```

A status display shows a lamp.
A status data value is always lit.
The bound value supplies the colour of the lamp as a string such as `green`, `amber` or `red`, so bind the `color` target, as this example does.
A binding with the `value` target is also applied as the lamp colour.
The `lampColor` parameter is the colour shown until the bound colour arrives:

```yaml
dataValues:
  - id: "system-status"
    x: 50
    y: 60
    label: "Status"
    bind:
      - target: color
        source: 'Properties/StatusColourText'
        toType: string
    displayType: "status"
    lampColor: "grey"
```

## Annotation lines

Annotation lines connect icons, data values, regions, or points.
Optional waypoints, called elbows, route the line.

### Image annotation lines

Lines are drawn automatically between connected elements.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `id` | string | Yes | None | Unique identifier for the annotation line |
| `fromId` | string | Yes | None | Identifier of the element that the line starts from |
| `toId` | string | Yes | None | Identifier of the element that the line ends at |
| `elbows` | array | No | None | Bend points between the two elements. Each elbow has an `x` and a `y`, both required, as percentages of the image from `0` to `100` |
| `layer` | string | No | None | Identifier of the layer that controls the visibility of the line |

A direct line:

```yaml
annotationLines:
  - id: "direct-connection"
    fromId: "status-icon"
    toId: "voltage-display"
```

A line with waypoints:

```yaml
annotationLines:
  - id: "routed-connection"
    fromId: "sensor-icon"
    toId: "sensor-data"
    elbows:
      - x: 50
        y: 30
      - x: 70
        y: 50
```

### 3D model annotation lines

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `id` | string | Yes | None | Unique identifier for the annotation line |
| `fromId` | string | Yes | None | Identifier of the overlay element that the line starts from |
| `toId` | string | Yes | None | Identifier of the overlay element that the line ends at |
| `elbows` | array | No | None | Bend points between the two elements, in model space. Each elbow has `x` and `y`, both required, and an optional `z`. Elbows are not percentages |
| `layer` | string | No | None | Identifier of the layer that controls the visibility of the line |
