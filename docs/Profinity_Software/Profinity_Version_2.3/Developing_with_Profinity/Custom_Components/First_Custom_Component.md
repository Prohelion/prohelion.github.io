---
title: Make your first Custom Component
description: "Add a Custom Component with a dashboard, main script, menu actions, and optional DBC and firmware files."
type: tutorial
owner: Documentation
last_reviewed: 2026-10-20
---

# Make your first Custom Component

This tutorial adds a [Custom Component](../../Components/Custom_Components/Using_a_Custom_Component.md) named Hello.

[Download the Hello component pack :material-download:](hello.zip){ .md-button }

The Hello pack already contains every file this tutorial uses: `hello.dbc`, `hello.yaml`, `actions.yaml`, `firmware_map.yaml`, `firmware.yaml`, `scripts/hello.py`, `scripts/load_firmware.py`, and `scripts/save_firmware.py`.
It also holds `settings_map.yaml` and `component_metadata.yaml`, which the last step of this path uses to pack the folder.
Unzip the pack, create the Hello component in Profinity, and attach the pack files to it in the steps that follow.
The tutorial lists the content of each file so you can read it, and you do not write any of them.
The pack includes a CAN database (DBC) file so this path can bind a CAN signal, and firmware files so the component can show an Output Limit field.
A Custom Component does not need a DBC file or firmware files.

At the end, the component:

- Publishes a `count` tag.
- Lists a Temperature message.
- Shows those values on its page.
- Has **Connect / Disconnect** in the menu.
- Shows an **Output Limit** firmware field.

The path takes about 20 minutes.

## What you need

- Profinity 2.3 running, with an active [profile](../../Getting_Started/Profiles.md).
- A **Desktop**, **Server**, or **Enterprise** licence, which includes Custom Plugins and Scripting.
  Refer to [Licensing](../../Licensing.md).
- The **Modify components**, **View tags**, **View firmware**, **Modify firmware**, and **Allow firmware actions** permissions.
  Refer to [Roles and permissions](../../Administration/Users_and_Access/Roles_and_Permissions.md).
- Scripting enabled on the [Application Config](../../Administration/System_Configuration/Application_Config.md) tab of System Configuration.

!!! warning "Scripts run with application permissions"
    A script runs inside Profinity with the same operating system permissions as the application, so review any script before running it.

## Add the component

To add the component:

1. Select **ADD COMPONENT** in the side menu.
2. Select **Custom Component**.
3. Enter `Hello` as the **Name**.
4. Select **ADD COMPONENT**.

The component appears in the side menu and opens its starter dashboard.

## Add a DBC file

A [DBC file](../../CAN_Utilities/CAN_Bus_DBC.md) names the CAN messages the component can decode.
This example uses a DBC file.
A Custom Component does not need one.

1. Open `hello.dbc` from the unzipped pack. It contains this DBC:

    ```text
    VERSION ""

    NS_ :

    BS_:

    BU_: Sensor

    BO_ 256 Temperature: 8 Sensor
     SG_ Value : 0|16@1+ (0.1,0) [0|150] "C" Vector__XXX
    ```

    The file describes one message named `Temperature` with one signal named `Value`.

2. On the **Hello** dashboard, select the three bar settings icon in the dashboard menu to open the settings.
3. Select the **Pack files** tab.
4. Set **Upload DBC File (Optional)** to `hello.dbc`.
5. Select **SAVE**.

The component menu includes **Messages and Signals** and **Edit DBC File**.

## Add the main script

A [main script](Main_Script.md) is a long-running service that publishes tags for the component.

1. Open `scripts/hello.py` from the unzipped pack. It contains this Python:

    ```python
    import time

    _run_count = 0

    def on_start():
        global _run_count
        _run_count = 0
        return True

    def run():
        global _run_count
        while not Profinity.ScriptCancelled:
            _run_count = _run_count + 1
            Profinity.Tags.SetValue("count", _run_count)
            time.sleep(1)
        return True
    ```

    The script publishes a tag named `count` under the component once a second.

2. Copy the `scripts` folder from the unzipped pack into the Hello folder under `components` in the active profile, so that `scripts/hello.py` resolves.
   The profile sits in the `profiles` folder of the [Artefacts directory](../../Installation/Artifacts_Directory.md).
3. Open the settings from the three bar icon.
4. Select the **Scripts** tab.
5. Set **Main Script (Optional)** to `scripts/hello.py`.
6. Turn on **Auto Start Main Script**.
7. Select **SAVE**.

Profinity starts the main script because **Auto Start Main Script** is on.
Select **TAG UTILITIES** in the side menu to open the [Tag Explorer](../../Tags/index.md), expand **Hello**, and find `count`.
The value increases once a second.

## Add a dashboard

The dashboard is the component's page.
This file binds `count` from the main script and `DBC/Temperature/Value` from the DBC file.

1. Open `hello.yaml` from the unzipped pack. It contains this dashboard:

    ```yaml
    version: "2.3"
    dashboard:
        items:
            - row:
                direction: vertical
                items:
                - group:
                    class: statscontainer
                    items:
                        - pill:
                            icon:
                                image: IbmWatsonKnowledgeStudio
                            items:
                            - pillgroup:
                                items:
                                - value:
                                    label: COUNT
                                    precision: 0
                                    bind:
                                      - target: value
                                        source: count
                                - value:
                                    label: TEMPERATURE
                                    precision: 1
                                    bind:
                                      - target: value
                                        source: DBC/Temperature/Value
    ```

2. Open the settings from the three bar icon.
3. Select the **Pack files** tab.
4. Set **Upload Dashboard (Optional)** to `hello.yaml`.
5. Select **SAVE**.

The **Hello** page shows **COUNT** updating once a second.
**TEMPERATURE** stays empty until a CAN frame for that message arrives.

## Add menu actions

`actions.yaml` adds items to the component menu.
This file adds **Connect / Disconnect** for the main script.

1. Open `actions.yaml` from the unzipped pack. It contains this YAML:

    ```yaml
    version: "2.3"
    menuActions:
      - id: connect
        displayName: Connect / Disconnect
        icon: Start
        kind: mainScriptToggle
    ```

2. Open the settings from the three bar icon.
3. Select the **Pack files** tab.
4. Set **Actions YAML file (Optional)** to `actions.yaml`.
5. Select **SAVE**.

The **Hello** menu includes **Connect / Disconnect**.

## Add firmware

A [firmware map](Firmware_Maps.md) adds firmware fields on the component.
The load and save scripts are named in `firmware.yaml`.
Refer to [Firmware actions](Firmware_Actions.md).
This example uses a firmware map and firmware scripts.
A Custom Component does not need them.

1. Open `firmware_map.yaml` from the unzipped pack. It contains this YAML:

    ```yaml
    version: "2.3"
    sections:
      - id: limits
        displayName: Limits
        categories:
          - id: output
            displayName: Output
            fields:
              outputLimit:
                name: Output Limit
                type: UINT16
                default: 100
                units: "%"
                min: 0
                max: 100
                index: 0x10
    ```

2. Open `scripts/load_firmware.py` from the unzipped pack. It contains this Python:

    ```python
    Profinity.FirmwareSettings.SetValue("outputLimit", 80)
    print("Firmware settings loaded")
    ```

3. Open `scripts/save_firmware.py` from the unzipped pack. It contains this Python:

    ```python
    value = Profinity.FirmwareSettings.GetValue("outputLimit")
    print(value)
    ```

4. Check that the `scripts` folder is in the Hello folder, which you copied in the main script step.

5. Open `firmware.yaml` from the unzipped pack. It names the load and save scripts and contains this YAML:

    ```yaml
    version: "2.3"
    loadScript: scripts/load_firmware.py
    saveScript: scripts/save_firmware.py
    ```

6. Open the settings from the three bar icon.
7. Select the **Pack files** tab.
8. Set **Firmware Map YAML file (Optional)** to `firmware_map.yaml`.
9. Set **Firmware Actions YAML file (Optional)** to `firmware.yaml`.
10. Select **SAVE**.

The settings show a **Limits** tab with **Output Limit** at 100.
On **Firmware Utilities**, select **LOAD SETTINGS**.
**Output Limit** changes to 80.

## Next steps

- Change the dashboard in the visual editor, as described in [How to create a custom dashboard](../../How_To_Guides/Create_Custom_Dashboard.md).
- Replay CAN traffic so **TEMPERATURE** shows a value, as described in [How to replay CAN bus logs](../../How_To_Guides/Replay_CAN_Logs.md).
- Write `component_metadata.yaml` and pack the folder so another installation can add it by name.
  The file is described in [Component metadata](Component_Metadata.md), and the commands are on [Component Pack CLI](../SDK/Component_Pack_CLI.md).
  The downloaded pack already includes `settings_map.yaml` and `component_metadata.yaml`.
