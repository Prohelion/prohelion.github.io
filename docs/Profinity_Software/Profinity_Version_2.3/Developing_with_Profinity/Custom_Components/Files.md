---
title: Custom Component files
description: "Look up every file a Custom Component can include, which ones a pack requires, and which upload field holds each file."
type: reference
owner: Documentation
last_reviewed: 2026-10-20
---

# Custom Component files

A [Custom Component](index.md) is assembled from these files.
Each file is optional when the component runs in one profile.
A pack requires four of them: `component_metadata.yaml`, `settings_map.yaml`, `firmware_map.yaml`, and `actions.yaml`.

<figure markdown>
![The Custom Component dialog on its Settings tab, with Name and Tag Tree Path fields, a Rebase DBC tick box, and tabs for Pack Files, Scripts and Security.](../../images/custom-component-settings.png)
<figcaption>Custom Component settings with pack files and scripts</figcaption>
</figure>

Settings for an authored component are **Settings**, **Pack files**, **Scripts**, and **Security**.
**Pack files** groups the uploads into **Device**, **Presentation**, **Behaviour**, **Maps**, and **Firmware**.
**Rebase DBC** and **Rebase Address** sit in **DBC Settings**.
**Scripts** holds **Main Script (Optional)** and **Auto Start Main Script**.

| Upload field | File |
|--------------|------|
| **Upload DBC File (Optional)** | DBC |
| **Upload Dashboard (Optional)** | Dashboard |
| **Rules YAML file (Optional)** | Rules YAML |
| **Actions YAML file (Optional)** | `actions.yaml` |
| **Settings Map YAML file (Optional)** | `settings_map.yaml` |
| **Firmware Map YAML file (Optional)** | `firmware_map.yaml` |
| **Firmware Actions YAML file (Optional)** | `firmware.yaml` |

A component created from an installed pack hides **Pack files** and **Scripts**.
The operator then edits **Name**, **Tag tree path**, menu placement, and the fields from `settings_map.yaml`.

| File | Required to run | Required to pack | Role |
|------|-----------------|------------------|------|
| [DBC](DBC_Dashboard_and_Rules.md#dbc-file) (`.dbc`) | No | No | CAN message and signal database for Messages and Signals, and for dashboard bindings that read CAN signals |
| [Dashboard](DBC_Dashboard_and_Rules.md#dashboard) (`.yaml`) | Profinity writes one if omitted | No | The component page. The default file name is the component name with a `.yaml` extension |
| [Rules YAML](DBC_Dashboard_and_Rules.md#rules) | No | No | Rules evaluated when this component's tags change |
| [`actions.yaml`](Menu_Actions.md) | No | Yes | Menu actions: a button, a service toggle, or Connect / Disconnect for the main script |
| [Main script](Main_Script.md) (`.cs`, `.py`, or `.lua`) | No | No | Long-running service that publishes tags. Started by **Auto Start Main Script** or by Connect / Disconnect |
| [`settings_map.yaml`](Settings_and_Firmware_Maps.md) | No | Yes | Extra settings fields shown on the component |
| [`firmware_map.yaml`](Settings_and_Firmware_Maps.md) | No | Yes | Firmware settings fields shown on the component |
| [`firmware.yaml`](Firmware_Actions.md) | No | No | Scripts for load, save, and any further firmware actions |
| [`component_metadata.yaml`](Packing.md) | No | Yes | Catalogue name, description, and which files the pack binds |

Every Profinity YAML document in that set carries `version: "2.3"`.
A component can mix script languages.
Profinity runs each script in the language of its file extension: `.cs`, `.py`, or `.lua`.

`profinity-component-pack validate` and `pack` stop with `Missing required file:` followed by the file name when any of the four pack files is absent.
The component still runs in a profile without those files.
The pack file itself is on [Packing a Custom Component](Packing.md), and the commands are on [Component Pack CLI](../SDK/Component_Pack_CLI.md).
