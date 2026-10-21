---
title: 3D model component
description: "Show a 3D model that operators orbit and zoom, with clickable regions, icons, buttons, live data values and annotation lines in model space."
type: reference
owner: Documentation
last_reviewed: 2026-10-14
---

# 3D model component

A model component is an interactive three-dimensional view that loads one or more 3D model files from the `/Profile/Models` directory.
The user orbits and zooms the view.
The component overlays regions, icons, buttons, data values, points, and annotation lines at positions in the space of the model.
It is the three-dimensional counterpart of the [Image](Image.md) component, and uses the same overlay structure.
The action invocation, layer, icon source, display type and annotation line parameters are shared with the [Image](Image.md) component.
They are described on [Overlay elements](Overlay_Elements.md).

Use a model component for vehicle, battery pack and machine views in which components are located in three dimensions, and for interactive models with live data labels.
Use the [Image](Image.md) component for a flat diagram.

## Model files

Store model files in the `/Profile/Models` directory.
Refer to a model by its filename relative to that directory, including any subfolder, for example `engine.glb`.
The component loads GL Transmission Format (GLTF) files, including the binary GLB form, and Stereolithography (STL) and Wavefront OBJ files.
A model that uses external textures needs those texture files stored beside the model with the same folder structure.

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `id` | string | No | None | Set as the `id` attribute of the model container |
| `class` | string | No | None | Cascading Style Sheets (CSS) class added to the model container |
| `label` | string | No | None | Not used by the web interface |
| `models` | array | Yes | None | One or more model files, loaded into one shared coordinate space. At least one model is required. Refer to [Model entry parameters](#model-entry-parameters) |
| `upAxis` | string | No | `Y` | Up axis of the model, `Y` or `Z`. Use `Z` for models exported from computer-aided design (CAD) tools that use Z as the up axis |
| `cameraPosition` | array of number | No | `[5, 5, 5]` | Initial camera position as `[x, y, z]` |
| `cameraTarget` | array of number | No | `[0, 0, 0]` | Point that the camera looks at and orbits around, as `[x, y, z]` |
| `fov` | number | No | `50` | Vertical field of view of the camera in degrees |
| `layers` | array | No | None | Named layers for visibility toggles. The layer parameters are described in [Layers](Overlay_Elements.md#layers) |
| `regions` | array | No | None | Clickable spheres. Refer to [Region parameters](#region-parameters) |
| `icons` | array | No | None | Icons anchored in model space. Refer to [Icon parameters](#icon-parameters) |
| `buttons` | array | No | None | Buttons anchored in model space. Refer to [Button parameters](#button-parameters) |
| `dataValues` | array | No | None | Live data overlays. Refer to [Data value parameters](#data-value-parameters) |
| `points` | array | No | None | Anchor points for annotation lines. Refer to [Point parameters](#point-parameters) |
| `annotationLines` | array | No | None | Lines between overlay elements. Refer to [Model annotation lines](Overlay_Elements.md#3d-model-annotation-lines) |
| `bind` | array | No | None | [Data binding](../../Data_Binding/index.md) whose value replaces the overlay data of the model, using the same structure as the parameters above |
| `enabled` | boolean | No | `true` | Not used by the web interface |
| `unit` | string | No | None | Not used by the web interface. Set `unit` on each data value instead |
| `precision` | number | No | None | Not used by the web interface. Set `precision` on each data value instead |

### Coordinates

Every overlay position is given as `x`, `y` and `z` in model space, which uses the same units and axes as the loaded model files.
Each coordinate is a plain number, and a missing or non-numeric coordinate is read as `0`.
Positions are not percentages, which is the difference from an [Image](Image.md) component.
Multiple models share the same space.
The `size` of an icon is the only measurement in pixels.
The `size` of a point and the `radius` of a region are in model units.

### Model entry parameters

Each item in `models` has:

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `model` | string | Yes | None | Filename of the model in the `/Profile/Models` directory (GLB, GLTF, STL, or OBJ). If the file is missing or cannot be loaded, the component shows "Error loading 3D model" instead |
| `layer` | string | No | None | Identifier of a layer. The model is hidden when that layer is switched off |

### Region parameters

A region is a clickable sphere in model space.
A region also takes the [Region parameters](Overlay_Elements.md#region-parameters) that the image shares, including its `action`.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `x` | number | Yes | None | Position along the X axis of the model |
| `y` | number | Yes | None | Position along the Y axis of the model |
| `z` | number | Yes | None | Position along the Z axis of the model |
| `radius` | number | Yes | None | Radius of the clickable sphere in model units, for example `0.3` |
| `visible` | boolean | No | `true` | When `false`, the sphere is not drawn and the clickable area remains |

### Icon parameters

An icon also takes the [Icon parameters](Overlay_Elements.md#icon-parameters) that the image shares, including `icon` and `action`.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `x` | number | Yes | None | Position along the X axis of the model |
| `y` | number | Yes | None | Position along the Y axis of the model |
| `z` | number | Yes | None | Position along the Z axis of the model |
| `label` | string | No | None | Accessible alternative text for the icon. The web interface does not show the label as a tooltip |

### Button parameters

A button also takes the [Button parameters](Overlay_Elements.md#button-parameters) that the image shares, including `label` and `action`.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `x` | number | Yes | None | Position along the X axis of the model |
| `y` | number | Yes | None | Position along the Y axis of the model |
| `z` | number | Yes | None | Position along the Z axis of the model |

### Data value parameters

A data value also takes the [Data value parameters](Overlay_Elements.md#data-value-parameters) that the image shares, including `bind` and `displayType`.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `x` | number | Yes | None | Position along the X axis of the model |
| `y` | number | Yes | None | Position along the Y axis of the model |
| `z` | number | Yes | None | Position along the Z axis of the model |
| `label` | string | No | The `id` | Caption of the overlay |
| `value` | number or string | No | None | Placeholder value shown before the bound value arrives |
| `maxValue` | number | No | None | Maximum of the bar chart scale when `displayType` is `graph` |

The display types behave as described in [Display types](Overlay_Elements.md#display-types), including the rule that a `status` data value takes its colour from the bound value.

### Point parameters

A point also takes the [Point parameters](Overlay_Elements.md#point-parameters) that the image shares.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `x` | number | Yes | None | Position along the X axis of the model |
| `y` | number | Yes | None | Position along the Y axis of the model |
| `z` | number | Yes | None | Position along the Z axis of the model |
| `size` | number | No | `0.05` | Radius of the point sphere in model units |

## Example

This example places a region, an icon, a button, a data value, a point and an annotation line on `engine.glb`, a model file stored in the `/Profile/Models` directory.

``` yaml
dashboard:
  items:
    - row:
        items:
          - model:
              models:
                - model: "engine.glb"
              upAxis: "Y"
              cameraPosition: [5, 5, 5]
              cameraTarget: [0, 0, 0]
              fov: 50
              layers:
                - id: "Hotspots"
                  label: "Hotspots"
                  defaultVisible: true
                - id: "Data"
                  label: "Data values"
                  defaultVisible: true
              regions:
                - id: "region_front"
                  x: 1.0
                  y: 0.5
                  z: 0.0
                  radius: 0.3
                  action:
                    invoke: Navigate
                    target: "/component?componentId=Front%20Assembly"
                  label: "Front assembly"
                  layer: "Hotspots"
              icons:
                - id: "icon_top"
                  x: 0
                  y: 1.2
                  z: 0
                  icon: "Power.svg"
                  size: 24
                  label: "Power"
                  action:
                    invoke: Navigate
                    target: "/component?componentId=Power%20Supply"
                  layer: "Hotspots"
              buttons:
                - id: "unlock_3d"
                  x: 0.0
                  y: 0.0
                  z: 0.6
                  label: "Unlock"
                  action:
                    invoke: Component
                    actionId: unlock
                  layer: "Hotspots"
              dataValues:
                - id: "battery_3d"
                  x: -0.8
                  y: 1.0
                  z: 0.2
                  label: "Battery"
                  bind:
                    - target: value
                      source: "/Prohelion BMU/DBC/PackStateOfCharge/SOCPercent"
                  unit: "%"
                  precision: 2
                  layer: "Data"
              points:
                - id: "point_a"
                  x: 0.3
                  y: 0.2
                  z: 0.4
                  size: 0.08
                  color: "#2eb757"
                  layer: "Hotspots"
              annotationLines:
                - id: "line_region_icon"
                  fromId: "region_front"
                  toId: "icon_top"
                  elbows:
                    - x: 0.5
                      y: 0.8
                      z: 0.2
```

## Viewer controls

The user orbits and zooms the model with the pointer.
Three controls sit over the view:

- **Reset view** returns the camera to its starting position.
- **XYZ** shows or hides a readout of the camera position, the point that the camera looks at and the field of view.
- **Fullscreen** switches the view to and from full screen.

While a model loads, the component shows the message "Loading 3D model...".
