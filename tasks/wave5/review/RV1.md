# RV1 report: novel_1.md (98 sentences)

Result: 0 NEW-FACT. Every sentence is GLUE or REWORD. Each was traced to HEAD text (File_Loggers.md, OPC_UA.md, Running_As_Service.md, Zip_Installation.md, Environment_Variables.md, Tag_Tree_Path.md, Logging_Replaying_Tags.md, Chargers_and_Power/index.md, BMS/index.md, Licensing.md, Mobile/index.md and others).

## Counts per file (GLUE / REWORD)

| File | Sentences | GLUE | REWORD | NEW-FACT |
|---|---|---|---|---|
| Components/Loggers/Tag_File_and_SFTP_Loggers.md | 12 | 3 | 9 | 0 |
| Installation/index.md | 8 | 8 | 0 | 0 |
| Components/Industrial_Protocols/OPC_UA_Server.md | 7 | 2 | 5 | 0 |
| How_To_Guides/Send_Receive_CAN_Bus.md | 6 | 1 | 5 | 0 |
| Installation/Run_as_a_Linux_Service.md | 6 | 1 | 5 | 0 |
| Components/Industrial_Protocols/index.md | 5 | 1 | 4 | 0 |
| Installation/Set_Environment_Variables.md | 5 | 3 | 2 | 0 |
| Administration/Profiles.md | 4 | 2 | 2 | 0 |
| Components/Motor_Controller/index.md | 4 | 3 | 1 | 0 |
| Installation/Running_As_Service.md | 4 | 4 | 0 | 0 |
| Tags/Nest_a_Component_in_the_Tag_Tree.md | 4 | 1 | 3 | 0 |
| Mobile/index.md | 3 | 2 | 1 | 0 |
| Administration/License_Page.md | 3 | 3 | 0 | 0 |
| Components/Chargers_and_Power/Start_a_Charge.md | 3 | 2 | 1 | 0 |
| Customising_Profinity/Dashboards/Motor_Controller_and_Battery_Examples.md | 3 | 1 | 2 | 0 |
| Tags/Log_Tags_to_a_File.md | 3 | 1 | 2 | 0 |
| Administration/Logs_Config.md | 2 | 1 | 1 | 0 |
| Components/Historians/TAG_SQL_Historian.md | 2 | 2 | 0 | 0 |
| Getting_Started/index.md | 2 | 2 | 0 | 0 |
| Components/Battery_Management_Systems/Update_BMU_Configuration_and_Firmware.md | 2 | 0 | 2 | 0 |
| Components/Industrial_Protocols/OPC_UA_Certificates.md | 2 | 0 | 2 | 0 |
| Installation/Linux_and_macOS_Installation.md | 2 | 0 | 2 | 0 |
| Tags/Replay_a_Tag_Log.md | 2 | 1 | 1 | 0 |
| Customising_Profinity/Dashboards/FAQ.md | 1 | 1 | 0 | 0 |
| Installation/Artifacts_Directory.md | 1 | 1 | 0 | 0 |
| Release_Notes/2.3.1.md | 1 | 1 | 0 | 0 |
| Components/Chargers_and_Power/Charging_Troubleshooting.md | 1 | 1 | 0 | 0 |
| Total | 98 | 48 | 50 | 0 |

(GLUE/REWORD split is approximate for borderline link sentences. None of them state a new fact either way.)

## NEW-FACT items

None.

## Checks worth a note (not NEW-FACT)

- Tag_File_and_SFTP_Loggers: "Both loggers have Auto Connect... " and "It creates its files under tag_logs/" are narrowed from "all four" and "the CAN File Logger ... and the TAG File Logger". The narrowing is valid because the CAN loggers moved to their own page. The "Download" section dropped the CAN link name correctly.
- Start_a_Charge: "Before a first charge, set the limits described in Charger settings" is a link sentence. The full warning ("Set the supply and charge limits before charging") now sits only in Charger_Settings.md (line 47). A reader who follows the task page gets the pointer but not the warning's strength inline. Optional: repeat the one-line warning on Start_a_Charge. This is a loss of emphasis, not an invented fact.
- Profiles.md: the numbered kiosk steps and the sentence "Kiosk Mode applies only while the profile is active, and normal login is required when a profile without it becomes active" were removed from this page. Confirm that Kiosk_Mode.md or Set_Up_Profinity_as_Kiosk.md still states it (not in my batch).
- Send_Receive_CAN_Bus.md: the "Send a CAN packet" steps are the original steps, with the warning moved here from the reference page and the reference page pointing to it. No invented step. The reference page lost its "If a packet does not appear on the bus, check that a CAN bus adapter is connected and that the current user holds Send CAN messages" troubleshooting line (not in my batch). Check that it survives in the how-to.

## Invented steps or checks in task pages

None found in the batch. Linux service, Set environment variables, Nest a component, Log tags, Replay and Send CAN steps all trace to HEAD.

## Thin pages (under about 150 words of real content)

- Components/Motor_Controller/index.md: about 60 words, a hub of three link bullets. Acceptable for an index page, and each link has a one-line description that matches its target.
- Installation/Running_As_Service.md: about 270 words of real content, so not thin. It is now mostly a licence note plus three links.
- Mobile/index.md: intro plus diagram plus two links. It is a concept page whose procedural content moved to the Connect and Troubleshoot pages. Acceptable.

## Reader-visible anchor loss

None seen in my batch.
