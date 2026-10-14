# Review RH1: How_To_Guides (8 pages)

Method: read each original (`git show HEAD:`) and rewrite side by side; programmatic diff of all fenced code blocks; ran the linter on the eight pages and on the whole 2.3 folder; grepped the docs tree for inbound anchor links.

## Checks run

- Code blocks: all fenced blocks (YAML, JSON, bash curl, `claude mcp add`, DBC example, directory tree) are identical to the originals on all eight pages, ignoring indentation only.
- Linter on the eight pages: 0 errors, 0 warnings, 4 notes (Structure, info). The writer's five heading-case warnings no longer appear.
- Linter on the whole 2.3 folder (183 pages): 0 Links errors and no Links finding of any kind. The folder has 1 error (Marketing, in Administration/Users_and_Access/Component_And_Collection_Security.md) and 4 warnings (3 HeadingCase, 1 Description). None is on any of these eight pages and none concerns a link. Saved output: scratchpad/wave2/lint_full_rh1.txt.
- Inbound anchors: the only inbound anchor link to any of the eight pages is Getting_Started/Adding_New_Components.md:61 to `Connect_to_CAN_Bus.md#troubleshooting`. `## Troubleshooting` exists on the page, so the slug resolves. Inside the pages, `#configure-an-influxdb-logger-or-historian` (Configure_Data_Logging) and `Data_Binding.md#binding-source-paths` still match. The removed "Step 1/2/3" and "Steps" headings have no inbound links.
- Invented steps: every numbered step was matched to a sentence in the original, in the same order (details per page below). I found no invented procedure, prerequisite, permission, expected result or verification.

## Add_Component_to_Profile.md: PASS

1. Low. The three steps follow the original sentence order (open ADD COMPONENT, select a type and fill the prompts, select ADD COMPONENT at the bottom). The "Connect the component" steps (click component, click Connect, wait for green and confirm data) are the original's single sentence split up. Nothing added.
2. Low. The Related list was dropped. Both targets are linked in the body (CAN Bus Adapters in the Adapters bullet, Adding Components in two places). No loss.
3. Low (editorial). The prerequisite "Some component types also need a licence" is the original's "where it needs one", so it is accurate.

## Add_Images_to_Dashboard.md: PASS

1. Low. Step 1 begins "Open the `images` folder of the profile directory". The original says only to create the folder if it does not exist and copy the file into it. "Open" is a trivial connective and is not an invented requirement. Acceptable. Optionally change it to "Go to".
2. Low. Platform paths, the Docker `PROFINITY_HOME` note, the lowercase and case-sensitivity warning, the no-restart note, the GIF limitation and the three failure causes are all present and unchanged. The bold lead terms were removed from the format list, which is fine.

## Configure_Data_Logging.md: PASS

Every setting, value, default and warning was confirmed against the original:
- Setting names and values: Remote Host, Remote Port, Remote server username, Remote server password, Remote Directory (must not start with `/`), Update Interval (Seconds), Logging mode (`On Change`, `Snapshot`, `Everything`), File Format (`CSV`, `JSON Lines`), DBC Notification Mode (`Value Change Only`, `Every Decoded Physical Sample`), Rotate By (No Rotation, Time, File Size), Rotation Interval (Sec), Rotate MB, Archive the Logs, Compress Logs, Limit Number of Archive Files, Archive File Limit.
- Paths and URLs: `can_bus_logs/`, `tag_logs/`, `archive`, `http://localhost:7065/metrics`, `mqtts://`.
- Behaviour and licensing: SFTP loggers always archive; at least one collection must be configured before a logger starts; Historians and Data Relay licence mapping; the InfluxDB v1/v2/v3 mismatch warning; the Sparkplug B pointer; the Auto Connect "on by default" sentence.

1. Low. The original intro sentence "A reader follows one destination, so this guide gives a short chooser..." was replaced by "Choose a destination in the table, add the component, then follow the section for that destination." This is accurate and it is the page's own structure. It is acceptable and arguably better, because the original sentence was builder-facing.
2. Low. The MQTT and Webhook sections now have two H3s under an H2, and the reference sentence moved to the top of the section. The original ended with that sentence. Content is unchanged. The H3 slugs are new and nothing links to them.
3. Low. Step 5 (archive) nests Compress Logs and the archive limit under the "File loggers can generate large files. To manage them:" lead-in. The original order and "optionally" are preserved ("Optional: Enable Compress Logs"). The step 5.3 ambiguity (the SFTP loggers do not show Archive the Logs, but Archive File Limit may still apply) is inherited from the original and the writer raised it. Not a rewrite defect.
4. Low. The Prometheus steps end without "Select ADD COMPONENT", exactly as the original. Nothing added. Whether the omission is intended is a content question for the owner, as the writer asked.
5. Medium (structure, optional). The page is about 1,600 words with four destinations. The writer proposes a split. I agree it is still one job (configure a destination), so this is not blocking.
6. Low. The Related list dropped MQTT Publisher and Webhook Publisher. Both are linked in the table and the section. No loss.

## Connect_Profinity_to_AI.md: PASS

1. Verified: the curl example is byte for byte identical, including the admonition text "which puts the password on the command line". No warning, caution or new claim was added. The admonition title changed from "Getting a Token From the API" to "Get a token from the API", which is a title-case fix only.
2. Low. "Step 2" in the Prerequisites became "the service account", and "the token from Step 2" became "the token from the previous section". The meaning is unchanged. The sentence "Three steps make the connection" became "Three stages", so numbered steps are not confused with the headings. Fine.
3. Low. "Click" changed to "Select" in the numbered steps (Save, + Add user, the user's row, Generate Token). This is a wording change only, with the same actions.
4. Low. "Refer to MCP Server for every tool and its parameters" was added to "What the AI tool can do". It moves the original Related-list description into prose and states nothing new.
5. Low. The "Steps" wrapper and "Step 1 to 3" headings were removed. No inbound links exist, so nothing breaks. Heading slugs changed (for example `step-1-enable-the-mcp-server-in-profinity` to `enable-the-mcp-server`), and a grep found nothing linking to the old ones.
6. Open question (carry to the owner, not a defect of the rewrite): the credential-on-the-command-line example keeps its original lack of a warning. Safety and credentials notes should be at full strength, and the original states the risk only as a descriptive clause. The writer left it unchanged, which is the correct behaviour for this task. Recommend a content decision on adding a warning or a safer example.

## Connect_to_CAN_Bus.md: PASS

Verified exactly: 9 to 30 V DC on pin 9 of the DB9 (13.8 V nominal), UDP and TCP port 4876 (installer opens it automatically), UDP 42000 for SocketCANd, 120 ohm termination at each end, 500 kbit/s defaults for PCAN BaudRate, Candapter BaudRate and the bridge (bridge default held in firmware), `sudo ip link set can0 up type can bitrate 500000`, Tritium V1/V2 and UDP/TCP and the TCP-only IP address, Allow Loopback Traffic (Tritium UDP only), the 30 seconds to a minute wait, the single TCP connection, and the SEND & RECEIVED CAN versus RECEIVED CAN permission note. All troubleshooting causes survived.

1. Low. The "Cable the adapter" prose became five conditional steps ("If you use a USB adapter ...", "If you use an Ethernet bridge ...", "If you use SocketCAN ..."). These follow the original sentence order and the conditions are the original's. The reset-button condition is kept ("if the bridge has previously been on another network"). Step 3 says "as described in SocketCAN" where the original said "as described above". Accurate but awkward. Suggested wording: "as described under SocketCAN".
2. Low. "Click the adapter in the sidebar, open Change Settings ... and save the adapter settings" replaces "the settings described below". It is equivalent, because the settings list follows.
3. Low. Peak USB steps 1 to 3 and the three bridge steps each match one clause of the original.
4. Medium (writer-raised, optional). The page is three jobs (USB/SocketCAN, bridge, troubleshooting) at about 1,150 words. It is not blocking. The page type is task, and the steps and troubleshooting are consistent with that.
5. Low. Related list: CAN Bus Adapters and Adding Components were dropped from it, and both are linked in the body. The two remaining items are kept.

## Create_Custom_Component.md: PASS

1. Verified: the pack-file table is identical to the original, row for row (Upload DBC File, Upload Dashboard, Actions YAML file with `actions.yaml`, Rules YAML file, Settings Map YAML file, Firmware Map YAML file, Firmware Actions YAML file with `firmware.yaml`, plus the Device, Presentation, Behaviour, Maps and Firmware sections). The DBC text block is identical. The explanation of `DBC/Temperature/Value`, **Rebase DBC**, **Rebase Address**, `mainScriptToggle` and the `.cs`, `.py`, `.lua` list is unchanged.
2. Low. "(Optional)" became "Optional:". Fine.
3. Low. The "Steps" wrapper was removed and the stage headings were promoted to H2. No inbound links exist.
4. Low. The Related list became one closing sentence, "Next, refer to How to create a custom dashboard ... and to the Dashboard Development Guide". The two links that were not in the body (Dashboard guide and Create_Custom_Dashboard) are kept, and the others are in the intro. No loss.

## Create_Custom_Dashboard.md: PASS

1. Verified: both YAML blocks and the step order are unchanged. The "Schema validation issues" and "SAVE blocked" warning and the DESIGN outline-versus-preview note are intact. The original's order of the schema sentence is now two sentences, with the same meaning.
2. Low. The bold "YAML alternative:" lead-ins became "As an alternative ..." sentences, which is correct per the style guide.
3. Low. The "practise without a device" sentence moved from the prerequisites section into a paragraph after the list. The content is unchanged.
4. Low. The Data Binding entry was dropped from Next steps. Data Binding is still linked in the body (`#binding-source-paths`), so there is no loss. Optional: restore the link for readers who scan the list.

## Create_New_Profile.md: PASS

1. Step 1 to 6 match the original in order: ADMIN, Profile pill, Add profile, Profile Name (with examples), optional description, save, then ACTIVATE (immediate, no restart). **Upload Profile Pack** is kept after the steps. The "each profile keeps its own components" note is kept. No invented check.
2. Low. The original separate section "Create the Profile" and "Activate the Profile" were merged into one numbered list. Activation is part of the original flow after creation, so this is correct. The result is a single six-step list with no headings, which is the right shape for a short task.
3. Low. The "Profinity Profiles" (Getting_Started/Profiles.md) Related link is now only the first-mention link on "profile" in the intro. Same target, so nothing is lost.
4. Low. The original has no verification step, so none is written. This is the correct handling.

## Inconsistency: Auto Connect (writer question 2), stated precisely

- The sentences were not altered. Connect_to_CAN_Bus line 78 reads "**Auto Connect**: enable to connect the adapter when Profinity starts." and is identical to the original. Add_Component_to_Profile ("With it on, the component connects when the profile loads") and Configure_Data_Logging ("starts the component when the profile is loaded, so with it off the component does not start when the profile loads") are likewise identical in substance to their originals.
- The wording differs across the docs tree, not only across these pages. "When Profinity starts" appears in Connect_to_CAN_Bus and in Components/CAN_Bus_Protocols/Virtual_CAN_Adapter.md (line 38: "Enables the adapter automatically when Profinity starts"). "When the profile loads" or "is loaded" appears in Release_Notes/2.3.1.md (line 162, which defines the setting as "connects a component when the profile loads"), Components/Connections_and_Reconnecting.md, File_Loggers, InfluxDB_Prometheus_Logger, MQTT_Subscriber, Tag_Relay_Receiver, Tag_Relay_Sender, Webhook_Publisher, Chargers_and_Power and Log_Data_to_Cloud_Influx.
- Release_Notes/2.3.1.md supports "profile loads" as the 2.3 behaviour. Recommend the owner confirm and then correct the CAN adapter wording to "when the profile loads". This is outside this review, so no edit is proposed to the page text here. Severity: medium, product-owner decision.

## Writer questions

- Q1 (curl password): see Connect_Profinity_to_AI finding 6.
- Q3 (Prometheus has no final ADD COMPONENT step): the original has none. Nothing was invented. Leave as is pending the owner.
- Q4 (Create_New_Profile has no verification): correct handling.
- Q8 (archive limit for SFTP loggers): inherited from the original, so it is a question for the owner and not a defect.

## Heading-case false positives

None remaining. The eight pages lint at 0 errors and 0 warnings. The writer's reported false positives ("Configure an MQTT Publisher or Webhook Publisher", "MQTT Publisher", "Webhook Publisher", "Peak USB adapters", "CAN to Ethernet bridges") are not flagged in the current run, so the linter exceptions are working. The three HeadingCase warnings in the folder are on other pages.

## Overlap noted, nothing deleted

Create_New_Profile with Getting_Started/Profiles.md; Add_Component_to_Profile with Getting_Started/Adding_New_Components.md; Configure_Data_Logging with Components/Loggers/File_Loggers.md and Log_Data_to_Cloud_Influx.md; Connect_to_CAN_Bus with Components/CAN_Bus_Protocols/CAN_Bus_Adapters.md; Create_Custom_Component with Developing_with_Profinity/Custom_Components/index.md.

## Overall summary

All eight pages PASS. No fact was lost, changed or invented that I could find, no step has no source sentence, and all code blocks, tables, ports, defaults and warnings survived exactly. Page types (task) fit, and no diagrams were added. The remaining items are low-severity wording polish and two product-owner questions (the Auto Connect wording, and whether the curl example should carry a warning).

## High severity findings

None.
