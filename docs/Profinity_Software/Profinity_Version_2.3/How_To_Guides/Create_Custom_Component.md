---
title: How to Create a Custom Component
description: "Add a Custom Component to a profile and attach an optional DBC file, dashboard, script, and actions."
---

# How to Create a Custom Component

Add a device Profinity does not already ship by creating a Custom Component in the active profile. The [DBC file](../CAN_Utilities/CAN_Bus_DBC.md) and the dashboard are both optional. A DBC file is what the Messages and Signals viewer and CAN-signal dashboard [bindings](../Customising_Profinity/Dashboards/Data_Binding.md) read, and when no dashboard is uploaded Profinity writes a starter dashboard named after the component, which you then build out in the [dashboard visual editor](../Customising_Profinity/Dashboards/Visual_Editor.md).

What each file does is in [Custom Components](../Developing_with_Profinity/Custom_Components/index.md). How the component behaves once it is in the profile is in [Custom Components](../Components/Custom_Components/index.md).

## Prerequisites

- The `ComponentModify` permission, which allows components to be added
- (Optional) A DBC file, needed for the Messages and Signals viewer or for dashboard bindings that read CAN signals
- (Optional) A dashboard YAML file, a main script (`.cs`, `.py`, or `.lua`), or the other pack files described in the authoring reference

## Steps

### Step 1: Add the component

1. Select **ADD COMPONENT** in the side menu (or on the home page)
2. Select **Custom Component**
3. Enter a **Name** that is unique in the profile, and save

### Step 2: Attach pack files

Open the component settings and use the **Pack files** tab.

| Section | Field | Use it for |
|---------|-------|------------|
| Device | **Upload DBC File** | The `.dbc` file, if the device needs one |
| Presentation | **Upload Dashboard** | A finished dashboard YAML file |
| Behaviour | **Actions YAML file** | `actions.yaml`, for menu actions |
| Behaviour | **Rules YAML file** | Rules for this component's tags |
| Maps | **Settings Map YAML file** | Extra settings fields |
| Maps | **Firmware Map YAML file** | Firmware settings fields |
| Firmware | **Firmware Actions YAML file** | `firmware.yaml`, naming the load and save scripts |

Leave a field empty when that file is not needed. With **Upload Dashboard** empty, Profinity writes the starter dashboard and the dashboard editor opens on that file. Once a DBC file is set, the component menu includes **Edit DBC File** and, after the file parses, **Messages and Signals**.

If the device's CAN identifiers use a different base address than the DBC was written for, enable **Rebase DBC** and set **Rebase Address**.

### Step 3: (Optional) Add a main script

On the **Scripts** tab, set **Main Script** to a `.cs`, `.py`, or `.lua` file in the component folder. **Auto Start Main Script** starts that service when the profile loads. Leave auto start off when the operator should start it from the menu, and add a `mainScriptToggle` entry to `actions.yaml` so Connect / Disconnect appears. See the authoring reference for that file.

### Step 4: Check the component

1. Confirm the component is in the side menu and opens its dashboard
2. Where a DBC file was uploaded, open **Messages and Signals** and confirm the expected messages are arriving
3. Where a main script was set, connect it and confirm the tags the script publishes are updating on the dashboard

[CAN log replay](./Replay_CAN_Logs.md) can supply recorded traffic while the DBC and the dashboard are being checked.

## Related Documentation

- [Custom Components](../Components/Custom_Components/index.md) — the component in a profile, including Messages and Signals
- [Authoring a Custom Component](../Developing_with_Profinity/Custom_Components/index.md) — files, scripts, maps, and packs
- [How to Create a Custom Dashboard](./Create_Custom_Dashboard.md)
- [CAN bus DBC](../CAN_Utilities/CAN_Bus_DBC.md)
- [Dashboard Development Guide](../Customising_Profinity/Dashboards/index.md)
