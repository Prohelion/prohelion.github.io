# FIX_TAGS: real tag paths in the dashboard example pages

## Tag path format (evidence)
- Full path = `<parent path>/<component name>/DBC/<DBC message name>/<signal name>`, with no parent path when the component is mounted at the profile root.
  - Profinity-SDK/Profinity-Component-SDK/Models/DataStore/ComponentTagRootResolver.cs:36-47 (root = parent path + "/" + component name).
  - Profinity-Engine/Tags/ProfileTagTreeBuilder.cs:33-57 (component node named `Settings.Name`, with a `DBC` child node).
  - Profinity-Engine/Tags/Dbc/DbcTagNode.cs:14,49-62 (`DBC` node, one child per message name, then signals).
- The component name is the name given in the Profile, not the component type, so it is user-chosen (plans/2.3/A26-Absolute-Relative-Tag-Paths.md:18-19: a relative path has no name, a cross-component path needs a leading `/`).
- The leading `/` is the absolute form the docs already use (Data_Binding.md:42, Lamp.md:75).
- Shipped examples confirm `<name>/DBC/Message/Signal`: Profinity-Engine/Templates/Dashboard/InteractiveImageExample.yaml:153 (`Prohelion BMU/DBC/PackStateOfCharge/SOCPercent`).
- I could not confirm the Tag Explorer display itself (the live MCP server was unreachable), but the tree is built by the code above.

## Replacements
Components used: WaveSculptor22 named `WS22`; Prohelion BMU (D1000 Gen1) named `Prohelion BMU`; Prohelion D1000 Gen2 BMS named `D1000 Gen2 BMS`.

| Page | Old | New | Evidence |
|---|---|---|---|
| Examples.md (Examples 2, 3, 4) | DBC/Temperature/Value | /D1000 Gen2 BMS/DBC/SensorData1/Temperature1 | Profinity-Components-Core/Components/Devices/Prohelion/D1000Gen2/D1000Gen2Bms.dbc:1365-1366 (C) |
| Examples.md (Example 2) | DBC/Pressure/Value | /D1000 Gen2 BMS/DBC/SensorData1/Pressure | D1000Gen2Bms.dbc:1368 (kPa) |
| Examples.md (Example 3) | DBC/Status/Online | /D1000 Gen2 BMS/DBC/BMSInfo/BMSStateENABLED | D1000Gen2Bms.dbc:21,27 |
| Motor_Controller_and_Battery_Examples.md | DBC/BusMeasurement/BusVoltage | /WS22/DBC/BusMeasurement/BusVoltage | .../WaveSculptor22/WaveSculptor22.dbc:66-68 |
| Motor_Controller_and_Battery_Examples.md | DBC/BusMeasurement/BusCurrent | /WS22/DBC/BusMeasurement/BusCurrent | WaveSculptor22.dbc:66-68 |
| Motor_Controller_and_Battery_Examples.md | DBC/PackStateOfCharge/SOCPercent | /Prohelion BMU/DBC/PackStateOfCharge/SOCPercent | .../D1000Gen1/D1000Gen1Bms.dbc:119-121 |
| Motor_Controller_and_Battery_Examples.md | DBC/CellVoltages/Cell1 | /D1000 Gen2 BMS/DBC/Node01CellVoltages1/Node01Cell01 | D1000Gen2Bms.dbc:123-124 (V) |
| Component_Examples.md | DBC/Voltage/Value | /D1000 Gen2 BMS/DBC/BMSVoltageData/BatteryVoltage | D1000Gen2Bms.dbc:79-80 (V) |

Changes other than `source`:
- Each page's intro now names the assumed component and says the component name in the path is the name given in the Profile.
- The "tag paths are placeholders" sentences are removed.
- Examples.md Example 3 lead sentence now says `BMSStateENABLED` instead of the `Online` flag.
- Motor_Controller_and_Battery_Examples.md and Component_Examples.md keep one sentence saying image names are placeholders.

## Left unchanged (no real signal found), for your decision
1. Motor_Controller_and_Battery_Examples.md, "Status indicators": `source: DBC/Status/Online` (lamp labelled "Online"). The WaveSculptor22 has no online or heartbeat flag in WaveSculptor22.dbc. Nearest real flags are the `Status` message limit and error flags (for example `/WS22/DBC/Status/LimitBusCurrent`), but they mean "limit active" and would contradict the green "Online" label and the sentence "lights with the `Online` flag". Options: change the label and sentence, or use a D1000 Gen2 BMS `BMSInfo/BMSStateENABLED` lamp.
2. Component_Examples.md, Table example: `source: DBC/CellData/Values`. No DBC signal holds a table of cells. The real tag is `/Prohelion BMU/Properties/PackData/Nodes/Values` (used in Component_Reference/Data/Tables.md:94), but its row fields are `name`, `cell1mV`, `cell2mV` and so on, and the example's `accessorKey` values (`name`, `voltage`, `temperature`) would not match, so I did not swap it without changing the headers.

## Things to know
- Examples.md Example 2: the Pressure readout has `unit: "hPa"` but the real signal is in kPa (0.1 scale), so the unit or the label needs a decision (I was told not to change other YAML).
- The Motor controller battery section uses two components (Gen1 for state of charge, whose existing `gain: 100` was kept, and Gen2 for the per-cell voltage), because the Gen1 DBC has no per-cell signal and reports min and max cell voltage in mV.
- Examples.md and Component_Examples.md use Gen2 names; the Prohelion BMU in other pages is Gen1.

## Checks
- `node scripts/lint-docs.js <three files> --details`: 0 errors, 0 warnings, 2 info notes (structure, short sections; pre-existing).
- `node validate-dashboard-examples.js` defaults to the old `Extending_Profinity/Dashboards` path, so I ran it with `--docs docs/Profinity_Software/Profinity_Version_2.3/Customising_Profinity/Dashboards`: 57 valid, 10 correctly rejected, 0 invalid.
