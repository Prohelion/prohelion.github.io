# FIX_CK: fixes applied from CK4, CK5 and CK6

Paths are relative to docs/Profinity_Software/Profinity_Version_2.3/.

## SFTP expansion (lead instruction, all pages)
- Tags/Log_Tags_to_a_File.md, Components/Loggers/index.md, Components/Loggers/CAN_File_and_SFTP_Loggers.md, Components/Loggers/Tag_File_and_SFTP_Loggers.md, CAN_Utilities/Logging_Replaying_CAN_Bus_Messages.md: "Secure File Transfer Protocol (SFTP)" changed to "SSH File Transfer Protocol (SFTP)". Replay_CAN_Logs.md and Configure_Data_Logging.md already used the SSH form. The reports do not cite code for the expansion.

## Components/Loggers/File_Logger_Rotation_Archive_and_SFTP.md (CK4 Q1)
- Failure paragraph now gives the CAN message ("Failed to transfer archived file via SFTP"), the TAG message, and the two shared connection messages, each with file name and reason.

## Components/Loggers/CAN_File_and_SFTP_Loggers.md (CK4 Q2)
- Added a sentence for **Update Interval (Seconds)**: default 10, 10 to 86400, seconds between background updates. The page has no settings table, so it is a sentence, with neutral wording as the report advised.

## Components/Historians/InfluxDB_Historians.md (CK4 Q3, Q4, Q5)
- Added the **Auto Connect** row (On, start with Start Logger when off).
- Log message form now reads "Retrying every 5 s."
- Added the Good-quality-only sentence.

## Components/Historians/TAG_SQL_Historian.md (CK4 Q3, Q4)
- Added the **Auto Connect** row and the Good-quality-only sentence. The `Quality` column description now says it is always Good (report's "side effect to document"). The 5 second retry was already stated.

## Components/Loggers/InfluxDB_v1_Logger.md (CK4 Q4)
- Added the Good-quality-only sentence. Retry and Auto Connect already correct.

## Components/Loggers/Prometheus_Logger.md (CK4 Q4)
- Added "A tag that is not Good quality is reported as NaN." I read PrometheusMetricHost.cs ProcessLog (read-only) as the report asked: the value starts as NaN and is set only for a Good, recent sample (within the valid time), so the statement holds.

## Components/Tag_Relays/Tag_Relay_Receiver.md (CK4 Q5)
- Retry now "every 5 seconds". Q6 (Auto Connect) was CONFIRMED, no change.

Loggers and Historians index tables: no retry column, nothing to correct (report Q5).

## Components/CAN_Bus_Protocols/CAN_Bus_Adapter_Settings.md (CK4 Q9)
- V2 bus number: "Profinity accepts 0 to 32767" (contradicted claim).
- Added the one Tritium or Virtual adapter per bus number rule.
- Not added: **Allow Loopback Traffic** and the adapter **Auto Connect** default, because the report gives no description of their effect. Listed under Still open.

## Components/Chargers_and_Power/Charger_Settings.md (CK4 Q8)
- Notes for the five limit rows now state units (volts, amps, watts) and "from 1 to ...". Defaults were CONFIRMED, unchanged.

## Components/Chargers_and_Power/Start_a_Charge.md (CK4 Q10)
- Intro now gives the exact **Ready** text "Charger is ready. You can start charging."
- Added step 5 (check the charge started: STOP, Charging Status message, DC OUTPUT green, chart above zero) and the fallback to Charging troubleshooting, as the report wrote it.

## Components/Industrial_Protocols/OPC_UA_Client.md (CK4 Q11)
- Added a one-sentence check (Connected, CONNECTED true, `Points` tags with Good quality) before the troubleshooting section.
- Corrected "marked as bad quality": a point not yet read is Unavailable, a failed read is Bad. Heading unchanged so the anchor holds.

## Components/Industrial_Protocols/OPC_UA_Server.md (CK4 Q11)
- Dashboard: RECEIVED and SENT "do not count client requests".
- Added the verification sentence (Listening, connect a client to the Bind URL, browse Objects > Profinity, read `ns=2;s=<full tag ID>`).
- Added the address space timing (built at start, restart needed for new tags) and BadNoData for a tag with no sample.

## How_To_Guides/Add_Component_to_Profile.md (CK5 Q3, Q4, Q5)
- Step 1: label is **ADD COMPONENT** (no "+"), available on the homepage and at the bottom of the sidebar, and the homepage tile is hidden when the home screen turns Add Component off. Step 3 already named the dialog button correctly.
- Status colour table rewritten to the report's mapping: Green On, Amber Warning (not yellow), Red Error, Grey Idle, Outlined Off, Empty N/A. The follow-on sentence about a component that stays red or grey now matches. The report did not verify CAN adapter overrides of Status (Still open).
- Remove a component: **DELETE COMPONENT**, confirm in the Delete component dialog, and rules using the component as an action lose that action.

## How_To_Guides/Connect_to_CAN_Bus.md, Components/CAN_Bus_Protocols/CAN_Bus_Adapter_Troubleshooting.md, Components/CAN_Bus_Protocols/index.md (CK5 Q5)
- "yellow" changed to "amber" for component status (two places in Connect_to_CAN_Bus, three in the troubleshooting page, one in the index). Yellow alert triangles and heatmap colours on other pages are not status lamps and were left.
- Getting_Started/index.md holds no "+ ADD COMPONENT" text, so no change.

## CAN_Utilities/Send_Receive_CAN_Bus_Messages.md (CK5 Q1)
- Range now "1 to 4,294,967,295 ms, or blank (or 0) to send once"; SEND versus START button; the two editor messages replaced with the ones the report quotes (the old "Value must be a valid integer" text was contradicted). Label **Interval [ms]** was already used here.

## How_To_Guides/Send_Receive_CAN_Bus.md (CK5 Q1)
- Label corrected from "Interval (ms)" to **Interval [ms]**, range given, blank or 0 sends once, SEND versus START.

## How_To_Guides/Replay_CAN_Logs.md (CK5 Q2)
- Slider: can be dragged at any time; release during playback jumps and keeps playing; paused or stopped sets the resume position.
- CAN_Utilities/Logging_Replaying_CAN_Bus_Messages.md has no slider text, so only the SFTP expansion changed there.

## Mobile/Connect_Profinity_Mobile_to_a_Server.md and Mobile/index.md (CK6 Q8)
- Step 3 now says the app opens the server's web sign-in page inside the app (user name and password, or single sign-on and two-factor), and that Kiosk Mode signs in automatically as the kiosk user.
- index.md Login modes: Password mode described as the web sign-in page opened in the app; added that the app has no mode switch and Kiosk Mode is a server setting.
- Deliberately not documented: the Kiosk badge in the discovery list and the kioskEnabled property mismatch. Defect to report (code, not docs): Profinity-Mobile/src/services/profinityApi.ts:18 reads `kioskEnabled`, but the engine sends `kioskModeEnabled` (ActiveProfileController.cs:39-40), so the app always opens `/login` and the Kiosk badge never shows.

## Administration/System_Configuration/Security/SSO_and_Sign_In.md (CK5 Q6)
- No change: it already says **Sign-in method** with values **Local** and **Sso**. Mobile prose uses "SSO" in prose, which matches the report.

## Tags/Log_Tags_to_a_File.md (CK5 Q7)
- Step 3 gives the Auto Connect default and the Start Logger and Stop Logger actions; added the collection requirement and the save-restart behaviour.
- The loggers' component pages already said Auto Connect is on by default, so they were left.

## Tags/Create_a_Collection.md (CK5 Q8)
- Step 2 now says **Display name** for the name entered.
- Added: the collection appears in Tag Explorer's collection picker under its display name; the editor generates the id (`Collection1`, `Collection2`, ...), the **Collection id** field is read-only, rules use the id not the display name, and the YAML example uses the id shown in the editor.

## Tags/Rules_YAML_Example.md (CK5 Q8)
- Prose and the one code line `collection: CellVoltages` changed to `Collection1` (the code line is a value the report proves is not what the editor generates; the one-line change is the only code edit on this page).
- `Customising_Profinity/Dashboards/Motor_Controller_and_Battery_Examples.md` line 187 `DBC/CellVoltages/Cell1` is a tag path example, not a collection id, so it was left.

## Dashboard examples (CK5 Q10)
- `DBC/StateOfCharge/SOCPercent` is not a real path (message is `PackStateOfCharge`). Changed to `DBC/PackStateOfCharge/SOCPercent` in Customising_Profinity/Dashboards/Motor_Controller_and_Battery_Examples.md (note and code), Component_Reference/Interactive/Image.md and Component_Reference/Interactive/Overlay_Elements.md. These are relative paths for a component that owns the dashboard, as Data_Binding.md explains.
- Motor_Controller_and_Battery_Examples.md placeholder note reworded to say the path must match the tags of the reader's own component.
- Added a one-sentence placeholder note for `DBC/Temperature/Value` and `DBC/Voltage/Value` in Image.md and Overlay_Elements.md, which had none. Examples.md and Component_Examples.md already carry placeholder notes.
- `DBC/BusMeasurement/BusVoltage` is a real WaveSculptor22 message and signal, left as is. `IbmWatsonKnowledgeStudio` CONFIRMED, no change.

## Tags/Create_a_Derived_Tag.md, Tags/Create_Collections_Rules_and_Bindings_from_Tags.md, Tags/Nest_a_Component_in_the_Tag_Tree.md (CK5 Q9)
- Derived tag: success toast "Derived tags saved", failure "Save failed:" plus the validation error, and the tag appears in Tag Explorer at its mount path. No claim about live values.
- Context menu: "Rules on this Tag" and "Rules impacted by this tag" list matches as source and rule name (the in-UI check that a rule is attached), and the actions open a draft that is not created until saved.
- Nesting: tags appear in Tag Explorer under the folder. The exact setting label was already given on the page (**Tag tree path**), so no field name was invented.

## Administration/Licensing.md (CK6 Q1, Q7)
- Three-layer rule: now "set of available components" (not features), `custom.yaml` lowercase, links to Choose available components (the owner page), and states that a licensed feature is controlled by the licence alone apart from scripting, which `config.yaml` can also switch off. The report suggested naming the `Scripts` setting but asked to verify the UI name first, so the setting is not named. Front matter description also changed to lowercase `custom.yaml`.

## Administration/Choose_Available_Components.md (CK6 Q7, Q10)
- Added a short "Why a component can be unavailable" section (licence, then `custom.yaml`, then `config.yaml`).
- **Disabled (Custom.yaml)** line now names the `custom.yaml` file in the `config` folder that Profinity only reads, and says config-level disables show Disabled, Disabled (group) or Disabled (component).
- Theming/index.md needs no change: it already says only that themes need a licence.

## Installation/Applying_a_Licence.md (CK6 Q2)
- Upload row now quotes the message "License is not valid for this instance." for a file issued for a different machine, and says it is not saved. The `WrongInstance` row says it is the **State** after a `license.yaml` is copied into the `license` folder. Administration/Trial_Desktop_Use_and_Fingerprint.md was CONFIRMED and not touched.

## Installation/Linux_and_macOS_Installation.md, Run_as_a_Linux_Service.md, Linux_and_macOS_Archive_Installation.md, Run_as_a_macOS_Service.md (CK6 Q3, Q4)
- Linux_and_macOS_Installation.md: added that on macOS the default is `~/Library/Application Support/Prohelion/Profinity` so the `chown` advice does not apply; troubleshooting bullet is now Linux only and describes the logged `Unable to create directory` message followed by a failure to save configuration, instead of "fails to start".
- Run_as_a_Linux_Service.md: same symptom wording. Linux_and_macOS_Archive_Installation.md: bullet reworded to match and scoped to Linux.
- Run_as_a_macOS_Service.md: "read the log in the Console application" replaced with the `profinity_<date>.log` file in the `logs` folder of the artefacts directory, plus the note that launchd discards console output unless `StandardOutPath` and `StandardErrorPath` are added. The sample plist (a code block) was not changed, because the report only offers the keys as an optional suggestion.
- Artifacts_Directory.md already holds the Windows and macOS paths and lowercase `config.yaml`/`custom.yaml`, and its `Config.yaml` mention is the pre-2.3 name. No change.

## Developing_with_Profinity/Scripting/Script_Types/ServiceScripts.md (CK6 Q6)
- "all four lifecycle methods" reworded to "the start, stop, pause and continue methods".
- Added the C# sentence: extend `ProfinityBaseService` (only `OnStart` mandatory); a class that extends `ProfinityScript` and implements `IProfinityServiceScript` directly must implement all five methods.
- Fixed the verbless fragment about the built-in templates. The claim about single-step and loop-style patterns is the page's own and was not verified against the templates (the report did not locate them), so a person should check it.

## Profinity_AI/Install_AI_Skills.md (CK6 Q9)
- Added the `npx skills add ./profinity-ai-skills --list` line (README-sourced). Zip name, "no wrapping folder" and "contact Prohelion" were CONFIRMED and kept. The file-server URL pattern was not added because the report says to keep "Contact Prohelion".

## Tags/Alerts.md and Tags/Webhook_and_MQTT_Rule_Actions.md (CK6 Q11)
- Alerts: the script receives the level as `RuleLevel`; the Webhook and MQTT JSON has no level field, so add `{RuleLevel}` to the rule message. Tags/Actions.md already lists `{RuleLevel}` (checked).
- Webhook page: `triggeringTags` rows carry `tagId`, `value` and `quality` only, unlike script `TriggeredTags` rows (which also carry MetaType). Rule_Scripts.md already lists MetaType, so no change there.

## No change (CONFIRMED or already correct)
- CK4 Q6 (relay Auto Connect), Q7 (BMS table), Q8 defaults, Q9 V1 0 to 13 and defaults. CK5 Q6 SSO page, Q10 icon. CK6 Q5 (UI schema route), Q10 (Disabled (Custom.yaml) is correct), Q1 other `config.yaml` uses.

## Still open
- OPC UA certificate rejection: the `rejected` folder and exact message are not verifiable in code (CK4 Q11). OPC_UA_Client.md still mentions a server certificate in the `rejected` folder as a cause, unchanged. The server side must not promise a "certificate rejected" message.
- Whether the `npx skills` tool has its own `list` subcommand for installed skills: external tool, not in the repo (CK6 Q9).
- Where the Start Logger action appears in the web UI (CK5 Q7): the text says "run **Start Logger** on the logger component" and does not name a menu.
- CAN adapter Status wording: whether a connected CAN adapter shows green on On, per Add_Component_to_Profile.md status table (CK5 Q5). The troubleshooting page's own Green/Grey rows were left except for yellow to amber.
- Tritium adapter **Allow Loopback Traffic** (UDP only, default Off) and **Auto Connect** (default On): not added, as the reports give no description of their effect (CK4 Q9).
- Exact name of the scripting setting in `config.yaml` (code is `AppSettings.Scripts.Enabled`); Licensing.md does not name it (CK6 Q7).
- Optional report suggestions not applied: Sender row "Shown for both protocols" (CK4 Q6), a BMS sentence for M48 Gen2, C48 Gen2 and C20 Gen1 (CK4 Q7), adding Auto Connect and retry columns to the index tables, and the `StandardOutPath` keys in the sample plist (CK6 Q4).
- Mobile code defect to raise with the mobile owner (not documented): `kioskEnabled` versus `kioskModeEnabled` in Profinity-Mobile/src/services/profinityApi.ts:18. Also for developers: the Tritium bus number validation message says 0 to 65535 but the Range stops at 32767 (CK4 Q9), and the charger start log says 15 seconds while the loop is about 5 seconds (CK4 Q10).
