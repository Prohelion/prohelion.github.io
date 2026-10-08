---
title: Custom Components
description: "Author a Custom Component from DBC, dashboard, script, action, and map files, and optionally pack it for another Profinity installation."
---

# Custom Components

A Custom Component is a component built from the files uploaded for it, with no compiling. As of Profinity 2.3 those files can include a [DBC (CAN database)](../../CAN_Utilities/CAN_Bus_DBC.md) file, a dashboard, a rules file, a main script, `actions.yaml`, `settings_map.yaml`, `firmware_map.yaml` and `firmware.yaml`. Adding the component in a profile and uploading those files is enough to run it, and packing is a separate step used only when the same component is to be installed somewhere else. A pack needs four of the files: `component_metadata.yaml`, `settings_map.yaml`, `firmware_map.yaml` and `actions.yaml`.

Day-to-day behaviour in a profile, including the Messages and Signals viewer, is covered under [Custom Components](../../Components/Custom_Components/index.md). The click path to add one is [How to Create a Custom Component](../../How_To_Guides/Create_Custom_Component.md). How this type compares with a dynamic-link library (DLL) plugin is covered on [Component Types](Component_Types.md).

<figure markdown>
![Custom Component settings showing script and actions fields](../../images/2.3-custom-component-settings.png)
<figcaption>Custom Component Settings With Pack Files and Scripts</figcaption>
</figure>

Settings for an authored component are **Settings**, **Pack files**, **Scripts** and **Security**. **Pack files** is split into **Device** (the DBC), **Presentation** (the dashboard), **Behaviour** (actions and rules), **Maps** (settings and firmware maps) and **Firmware** (`firmware.yaml`). The upload fields are **Upload DBC File (Optional)**, **Upload Dashboard (Optional)**, **Rules YAML file (Optional)**, **Actions YAML file (Optional)**, **Settings Map YAML file (Optional)**, **Firmware Map YAML file (Optional)** and **Firmware Actions YAML file (Optional)**, and **Rebase DBC** and **Rebase Address** sit in a separate **DBC Settings** group. **Scripts** holds **Main Script (Optional)** and **Auto Start Main Script**. A component created from an installed pack hides **Pack files** and **Scripts**, and the operator edits **Name**, **Tag tree path**, menu placement and the fields from `settings_map.yaml`.

## Files

| File | Required to run | Required to pack | Role |
|------|----------|----------|------|
| DBC (`.dbc`) | No | No | CAN message and signal database for the Messages and Signals viewer and for dashboard bindings that read CAN signals |
| Dashboard (`.yaml`) | Profinity writes one if omitted | No | The component page. The default file name is the component name with a `.yaml` extension |
| Rules YAML | No | No | Rules evaluated when this component's tags change |
| `actions.yaml` | No | Yes | Menu actions: a button, a service toggle, or the Connect / Disconnect control for the main script |
| Main script (`.cs`, `.py` or `.lua`) | No | No | Long-running service that publishes tags. Started by **Auto Start Main Script** or by Connect / Disconnect |
| `settings_map.yaml` | No | Yes | Extra settings fields shown on the component |
| `firmware_map.yaml` | No | Yes | Firmware settings fields shown on the component |
| `firmware.yaml` | No | No | Scripts for load, save, and any further firmware actions |
| `component_metadata.yaml` | No | Yes | Catalogue name, description, and which files the pack binds |

Every Profinity YAML document in that set carries `version: "2.3"`. A component can mix script languages, and Profinity runs each script in the language its file extension indicates (`.cs`, `.py` or `.lua`). `profinity-component-pack validate` and `pack` stop with `Missing required file:` followed by the file name when any of the four pack files is absent, even if the component runs without it in a profile.

## DBC File

Use **Upload DBC File (Optional)** when the device's CAN traffic should appear as Messages and Signals, or when the dashboard binds signals from that database. The component runs with the field left empty. **Rebase DBC** and **Rebase Address** shift the loaded message identifiers onto the base address the device actually uses.

**Edit DBC File** opens the DBC editor once a file is set, and a saved change is picked up automatically. The viewer is documented in [CAN Bus DBC](../../CAN_Utilities/CAN_Bus_DBC.md).

## Dashboard

The dashboard YAML is the component's page. Profinity writes a starter file, named after the component, when **Upload Dashboard (Optional)** is left empty, and the dashboard editor replaces that starter. Layout, elements, and the visual editor are the [Dashboard Development Guide](../../Customising_Profinity/Dashboards/index.md).

A binding that reads a CAN signal uses the DBC names. A binding that reads a value the main script published uses a tag path. A relative path, with no leading slash, is resolved against the component's own place in the tag tree, so it follows the component if **Tag tree path** changes. An absolute path begins with `/` and is a literal reference to some other place in the tree. A dashboard should use a relative path in place of the `{COMPONENT_NAME}` placeholder. See [Data Binding](../../Customising_Profinity/Dashboards/Data_Binding.md) and [Tag Tree Path](../../Tags/Tag_Tree_Path.md).

## Rules

**Rules YAML file** is an optional rules document for this component, evaluated when its tags change. Alerts raised from those rules appear in [Alerts](../../Tags/Alerts.md). Menu actions in `actions.yaml` are a separate mechanism from rule actions.

## Main Script

**Main Script** is a service script, in C#, Python, or Lua, that keeps running until Disconnect or until the component shuts down. **Auto Start Main Script** starts it when the profile loads. With auto start left off, the operator starts and stops it from a Connect / Disconnect menu item, which is a `mainScriptToggle` entry in `actions.yaml`.

The script owns its telemetry. It creates branches and leaves under the component in the tag tree and publishes with the script tag API (`SetValue`, `ClearValue`, `MarkStale`), and the dashboard binds those paths directly. On Disconnect the current values are cleared and marked stale, and the branches stay in place so dashboard bindings remain valid. Script types and the tag API are in [Scripting](../Scripting/index.md).

## Menu Actions in actions.yaml

`actions.yaml` declares the component menu entries that run scripts.

| `kind` | What the operator gets |
|--------|------------------------|
| `button` | Runs `script` once when the menu item is chosen |
| `toggle` | Starts and stops a service `script`, and publishes that running state on the component |
| `mainScriptToggle` | Connect / Disconnect for **Main Script**. The script is the **Main Script** field on the **Scripts** tab |

| Field | Required | Meaning |
|-------|----------|---------|
| `id` | Yes | Unique name for the entry |
| `displayName` | Yes | Label on the menu item. The older key `name` is still accepted |
| `kind` | Yes | `button`, `toggle` or `mainScriptToggle` |
| `script` | For `button` and `toggle` | A path relative to the component folder, such as `scripts/calibrate.cs`. A path that leaves the component folder is rejected |
| `icon` | No | One of `None`, `Adapters`, `Battery`, `MotorControllers`, `Chargers`, `PowerTrackers`, `Custom`, `Cloud`, `Loggers`, `Scripts`, `Clipboard`, `Dashboard`, `Setup`, `Update`, `Discover`, `Start`, `Pause`, `Stop`, `Cancel`, `Edit`, `Upload`, `Download`, `Send`, `Hamburger`, `Config`, `Alerts`, `Utilities`, `Tags`, `Admin`, `Accounts`, `Logout`, `Login`, `Password`, `AddComponent`, `ProfinityLogs`, `Profiles`, `Information`, `Feedback`, `RuleActions`, `AiAssistant` or `Historians`. An omitted icon is shown as `Custom` |
| `iconPath` | No | An image in the component folder, used instead of a built-in icon |

An entry with an unsupported `kind` or `icon`, or without a `script` on a `button` or `toggle`, fails with a message such as `Menu action 'zero' has unsupported kind` that names the entry, and the same check runs under `profinity-component-pack validate`.

```yaml
version: "2.3"
menuActions:
  - id: connect
    displayName: Connect / Disconnect
    icon: Start
    kind: mainScriptToggle
  - id: zero
    displayName: Zero Calibration
    icon: Start
    kind: button
    script: scripts/calibrate_zero.py
```

## Settings and Firmware Maps

`settings_map.yaml` adds fields to the component settings, grouped into sections and categories, with a name, a type and a default. `firmware_map.yaml` does the same for firmware settings. A script reads the saved values with `Profinity.ComponentSettings` for the settings map and `Profinity.FirmwareSettings` for the firmware map, which is how a serial port, a baud rate or a CAN export flag reaches the main script without a code change (see [Component and Firmware Settings](../Scripting/Script_Operations/index.md#component-and-firmware-settings)). An edit to either map shows up on the settings dialog.

A serial device, for example, keeps its COM port and baud rate in `settings_map.yaml`, as in this excerpt from the G-STAR IV sample component:

```yaml
version: "2.3"
sections:
  - id: comms
    label: Communications
    categories:
      - id: serial
        label: Serial Settings
        fields:
          comPort:
            name: COM Port
            type: STRING
            default: COM_PROFINITY_TEST_HARNESS
            required: true
          baudRate:
            name: Baud Rate
            type: LIST
            default: 4800
            values:
              "4800": "4800"
              "9600": "9600"
              "57600": "57600"
```

Each field is keyed by the identifier a script passes to `GetValue`, and `type` is `STRING`, `LIST`, `BOOL` or `UINT32` in this sample. The firmware page derived from the device's own configuration sentences lives in `firmware_map.yaml`, which uses the same layout. Packing that folder is described below.

## Firmware Actions in firmware.yaml

`firmware.yaml` names the scripts behind the firmware actions. `loadScript` and `saveScript` are the load and save operations, and `actions` lists any further firmware operations, each with an `id`, a display name, and a `script`. An action can require the operator to upload a file first by setting `uploadFileType` and `uploadFileExtension`. Until this file is set, the **Scripts** tab points back at **Pack files** and **Firmware**.

```yaml
version: "2.3"
loadScript: scripts/load_firmware.py
saveScript: scripts/save_firmware.py
```

The fields the operator edits on the firmware page come from `firmware_map.yaml`. The scripts that apply those values come from `firmware.yaml`.

## Packing

A Custom Component that lives in one profile never needs a pack. `component_metadata.yaml` is what turns the same folder into a bundle another installation can add by name. It carries `version: "2.3"`, `name`, `description`, `author`, `pluginVersion`, `requiredSdkVersion`, `componentType: CustomComponent`, and the file bindings the host should load, such as `mainScript`, `dbcFile` and `dashboardFile`. `name` must be usable as a folder name, and validation fails with `Component name is not a valid folder name` otherwise. `allowMultiple: true` lets a profile hold more than one instance of the component, and `componentGroup: Custom` sets the catalogue group the component appears under. The file also accepts `id`, `displayName`, `iconPath`, `productImagePath`, `firmwareFeed`, `firmwareFeedLocal`, `firmwareManifest`, `deviceIdFilter`, `rebaseDbc`, `rebaseAddress`, `licenseRequirement`, `licenseFeature` and `licenseComponent`.

```yaml
version: "2.3"
name: G-STAR IV Python
description: SiRFstar IV G-STAR IV GPS reference component (Python scripts)
author: Profinity
pluginVersion: 1.0.0
requiredSdkVersion: ">=1.0.0"
componentGroup: Custom
componentType: CustomComponent
allowMultiple: true
mainScript: scripts/gps_main.py
dbcFile: GStarIV.dbc
dashboardFile: gstar_iv.yaml
```

[`profinity-component-pack`](Component_Pack_CLI.md) validates that folder and writes a `.zip`, or a content `.nupkg` when the output name ends in `.nupkg`. A `.nupkg` requires `pluginVersion` and a non-empty `author`. The bundle is still `CustomComponent` plus these files. A compiled assembly installed through **Components & Plugins** is a [DLL plugin](../Plugins/index.md), and the two are packed and installed separately.

A content pack can be uploaded under **ADMIN** → **Components & Plugins**, after which **ADD COMPONENT** lists the `name` from `component_metadata.yaml`. Adding that entry creates a profile instance with **Pack files** and **Scripts** hidden. The same bundle can be installed directly on the Profinity machine with `profinity-component-pack install`, which extracts it into the profile's `components` folder. The tool ships in the [Profinity SDK](../SDK.md) kit.

## Related Documentation

- [Using Custom Components](../../Components/Custom_Components/index.md): using one in a profile
- [How to Create a Custom Component](../../How_To_Guides/Create_Custom_Component.md)
- [Component Types](Component_Types.md)
- [Component Pack CLI](Component_Pack_CLI.md)
- [Dashboard Development Guide](../../Customising_Profinity/Dashboards/index.md)
- [Scripting](../Scripting/index.md)
- [Profinity SDK](../SDK.md)
