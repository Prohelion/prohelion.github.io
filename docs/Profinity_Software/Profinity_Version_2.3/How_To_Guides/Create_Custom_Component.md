---
title: How to create a Custom Component
description: "Create a new Custom Component in the active profile, then attach an optional dashboard, main script, actions, or DBC file."
type: task
owner: Documentation
last_reviewed: 2026-10-20
---

# How to create a Custom Component

For a first Custom Component, follow [Make your first Custom Component](../Developing_with_Profinity/Custom_Components/First_Custom_Component.md).
You can create a new component in the active profile by adding a Custom Component.
A Custom Component needs only a name, and every file attached to it is optional.
When you upload no dashboard, Profinity writes a starter dashboard named after the component.
You then build out the starter dashboard in the [Dashboard visual editor](../Customising_Profinity/Dashboards/Visual_Editor.md).
[Custom Components](../Developing_with_Profinity/Custom_Components/index.md) describes the files you can attach.
[Using a Custom Component](../Components/Custom_Components/Using_a_Custom_Component.md) describes the finished component.

## Add the component

Adding a component needs the **Modify components** permission.

1. Select **ADD COMPONENT** in the side menu or on the home page.
2. Select **Custom Component**.
3. Enter a **Name** that is unique in the profile, and save.

The component appears in the side menu and is ready to use with its starter dashboard.

## Attach pack files

Open the component settings and use the **Pack files** tab.
Every field on the tab is optional, so leave a field empty when that file is not needed.
The format of each YAML file is defined in [Custom Component files](../Developing_with_Profinity/Custom_Components/Files.md).

| Section | Field | Use it for |
|---------|-------|------------|
| Device | **Upload DBC File (Optional)** | A `.dbc` file describing the device's CAN messages |
| Presentation | **Upload Dashboard (Optional)** | A finished dashboard YAML file |
| Behaviour | **Actions YAML file (Optional)** | `actions.yaml`, for menu actions |
| Behaviour | **Rules YAML file (Optional)** | Rules for this component's tags |
| Maps | **Settings Map YAML file (Optional)** | Extra settings fields |
| Maps | **Firmware Map YAML file (Optional)** | Firmware settings fields |
| Firmware | **Firmware Actions YAML file (Optional)** | `firmware.yaml`, naming the load and save scripts |

With **Upload Dashboard (Optional)** empty, Profinity writes the starter dashboard and the dashboard editor opens on that file.

## Add a main script

A main script is optional.
On the **Scripts** tab, set **Main Script (Optional)** to a `.cs`, `.py`, or `.lua` file in the component folder.
**Auto Start Main Script** starts that service when the profile loads.
Leave auto start off when the user should start the service from the menu.
Then add a `mainScriptToggle` entry to `actions.yaml` so that Connect / Disconnect appears.
Refer to [Menu actions](../Developing_with_Profinity/Custom_Components/Menu_Actions.md) for that entry, and to [Main script](../Developing_with_Profinity/Custom_Components/Main_Script.md) for the service.

A main script runs without a CAN database (DBC) file, and dashboard [bindings](../Customising_Profinity/Dashboards/Data_Binding/index.md) can read the tags it publishes.

## Describe CAN messages with a DBC file

A [DBC file](../CAN_Utilities/CAN_Bus_DBC.md) is needed only when Profinity should decode the CAN messages the device sends.
Profinity then shows the decoded messages in **Messages and Signals**, and CAN-signal bindings can read them.
Once a DBC file is set in **Upload DBC File (Optional)**, the component menu includes **Edit DBC File**.
After the file parses, the menu also includes **Messages and Signals**.

A minimal DBC file that describes one message with one signal shows what the viewer and the bindings read.
The message in this example is named `Temperature` and carries one signal named `Value`.
After you attach the file, **Messages and Signals** lists `Temperature` with its signal `Value`.
A dashboard binding reads the signal with the source `DBC/Temperature/Value`.

```text
VERSION ""

NS_ :

BS_:

BU_: Sensor

BO_ 256 Temperature: 8 Sensor
 SG_ Value : 0|16@1+ (0.1,0) [0|150] "C" Vector__XXX
```

If the device's CAN identifiers use a different base address than the DBC was written for, enable **Rebase DBC** and set **Rebase Address**.

## Check the component

1. Confirm the component is in the side menu and opens its dashboard.
2. If you set a main script, connect it and confirm that the tags the script publishes are updating on the dashboard.
3. If you attached a DBC file, open **Messages and Signals** and confirm that the expected messages are arriving.

[How to replay CAN bus logs](./Replay_CAN_Logs.md) shows how to supply recorded traffic while you check a DBC file and the dashboard.

Next, refer to [How to create a custom dashboard](./Create_Custom_Dashboard.md) to build the dashboard for the component.
The [Profinity dashboard development guide](../Customising_Profinity/Dashboards/index.md) is the full dashboard reference.
