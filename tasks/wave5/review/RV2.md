# RV2: Wave 5 review, novel batch 2 (98 sentences)

Method: for each listed sentence I opened the new page and found the source text in the HEAD docs (the original page, or the pages that held the text before the split). Result: 1 NEW-FACT (a dropped condition), 0 invented steps, 0 thin pages.

## Per-file counts (GLUE / REWORD / NEW-FACT)

| File | GLUE | REWORD | NEW-FACT |
|---|---|---|---|
| Components/Loggers/CAN_File_and_SFTP_Loggers.md | 3 | 8 | 0 |
| How_To_Guides/Add_Component_to_Profile.md | 1 | 7 | 0 |
| Components/Historians/index.md | 1 | 6 | 0 |
| Installation/Linux_and_macOS_Archive_Installation.md | 3 | 4 | 0 |
| Installation/Run_as_a_macOS_Service.md | 1 | 5 | 0 |
| Components/Loggers/Prometheus_Logger.md | 1 | 4 | 0 |
| Profinity_AI/AI_Skills_Reference.md | 3 | 2 | 0 |
| CAN_Utilities/Send_Receive_CAN_Bus_Messages.md | 2 | 2 | 0 |
| Components/Publishers_and_Subscribers/index.md | 1 | 3 | 0 |
| Integrating_to_Profinity/MCP_Server/index.md | 2 | 2 | 0 |
| Components/CAN_Bus_Protocols/CAN_Bus_Adapters.md | 3 | 0 | 0 |
| Components/Tag_Relays/index.md | 1 | 2 | 0 |
| Tags/Actions.md | 2 | 1 | 0 |
| Components/Battery_Management_Systems/BMU_Dashboard.md | 1 | 2 | 0 |
| Components/Loggers/File_Logger_Rotation_Archive_and_SFTP.md | 2 | 1 | 0 |
| Mobile/Connect_Profinity_Mobile_to_a_Server.md | 3 | 0 | 0 |
| Tags/Rules_YAML_Example.md | 1 | 2 | 0 |
| Developing_with_Profinity/Scripting/Script_Types/Rule_Scripts.md | 0 | 2 | 0 |
| Release_Notes/index.md | 2 | 0 | 0 |
| Components/CAN_Bus_Protocols/CAN_Bus_Adapter_Settings.md | 2 | 0 | 0 |
| Components/Motor_Controller/Update_WaveSculptor_Configuration_and_Firmware.md | 1 | 1 | 0 |
| Installation/Update_Docker_Image.md | 1 | 1 | 0 |
| Administration/System_Configuration/Profinity_Web.md | 1 | 0 | 0 |
| Administration/System_Configuration/Security/Two_Factor_Authentication.md | 0 | 0 | 1 |
| Customising_Profinity/Dashboards/Visual_Editor.md | 1 | 0 | 0 |
| Installation/Environment_Variables.md | 1 | 0 | 0 |
| Tags/Collections.md | 1 | 0 | 0 |
| Components/Motor_Controller/WaveSculptor_Dashboard.md | 0 | 1 | 0 |
| Total | 43 | 54 | 1 |

Sources found for the REWORD items: File_Loggers.md (CAN logger text, SFTP failure message, download link), Getting_Started/Adding_New_Components.md (add-component prerequisites, auto-discovery, status indicator), Components/Historians/index.md table (reflowed into a combined table), Installation/Zip_Installation.md (archive install, data directory, troubleshooting), Installation/Running_As_Service.md (macOS check, "file not found", licence), InfluxDB_Prometheus_Logger.md (Prometheus text, retry every 5 seconds), AI_Skills.md (skills needs, GPT limits), Publishers_and_Subscribers/index.md (retry table), Tag_Relays/index.md plus the sender and receiver pages (default protocol and Auto Connect values), Rule_Scripts.md (Drop and Queue), Docker_Installation.md (update the image).

## NEW-FACT items

### 1. Administration/System_Configuration/Security/Two_Factor_Authentication.md

New text: "A signed-in local user manages their own authenticator from the **Two-Factor Authentication** pill on the **ADMIN** page, as described in MFA Account Management."

Original (HEAD, same page, "Managing your own authenticator"): "While **Enforce two-factor for local users** is on, a signed-in local user can open the **Two-Factor Authentication** pill on the **ADMIN** page to see the enrolment status and the number of recovery codes remaining, to reset the authenticator, or to regenerate the recovery codes. The pill is shown only on sites that enforce two-factor authentication, so a user cannot enrol voluntarily on a site that does not."

Departure: the condition is dropped, so the sentence reads as if every signed-in local user always has the pill. The original says it appears only while two-factor is enforced. (The target page MFA_Account_Management.md, "Self-service management", still states the condition, so the fact is not lost from the docs, only from this sentence.)

Proposed fix: restore the condition: "While **Enforce two-factor for local users** is on, a signed-in local user manages their own authenticator from the **Two-Factor Authentication** pill on the **ADMIN** page, as described in [MFA Account Management](...#self-service-management)."

## Observations that are not NEW-FACT

- CAN_Utilities/Send_Receive_CAN_Bus_Messages.md: the warning admonition was cut to its first sentence, then "Read the warning in How to send and receive CAN bus messages before you send one." The full-strength warning (can start a motor controller, open a contactor or change a device setting; a scheduled packet keeps sending until deleted) is intact at How_To_Guides/Send_Receive_CAN_Bus.md#send-a-can-packet, and that anchor exists. No fact is lost across the docs, but a reader of the reference page alone now sees a shorter warning. Suggest restoring the full admonition on the reference page too (needs product owner view on duplication).
- Components/Battery_Management_Systems/BMU_Dashboard.md: "To change the settings that the BMU dashboard shows, refer to Update BMU configuration and firmware." is link glue, but imprecise: the dashboard does not show settings; the settings are in Change Settings (Firmware Settings tab). Suggest "To change the BMU configuration or flash its firmware, refer to ...".
- Components/Publishers_and_Subscribers/index.md: the new "Selects data by" column (Tag collections for both publishers, **Topic filter** for the MQTT Subscriber) is supported by the HEAD publisher intros and the MQTT Subscriber settings table, so I rated it REWORD.
- Components/Tag_Relays/index.md: the new "Default protocol" and "Auto Connect" columns match the HEAD sender and receiver settings tables (sender HTTPS default, receiver MQTT default, Auto Connect on; the receiver's Auto Connect applies with the MQTT protocol, which the cell states).
- Installation/Run_as_a_macOS_Service.md and Linux_and_macOS_Archive_Installation.md are new pages, so there is no HEAD original, but all listed sentences trace to Zip_Installation.md and Running_As_Service.md. Install steps, layout, banner and preflight text are copied verbatim from Zip_Installation.md. I found no invented steps.
- Release_Notes/index.md: the 2.3 summary line now lists "known issues" in place of HEAD's "how to upgrade from 2.2". The 2.3.1 notes do still contain a Known issues section, so it is accurate; the upgrade link text was simply dropped.

## Thin or repeating pages

None under 150 words. The smallest in this batch are Update_Docker_Image.md (250 words) and Run_as_a_macOS_Service.md (334 words), both with real procedures. AI_Skills_Reference.md repeats nothing: the seven-skills table now lives only there (AI_Skills.md no longer carries it).

## Broken or lost anchors with reader-visible loss

None seen. Link retargets I spot-checked resolve to existing pages: Visual_Editor.md now links Schema_Validation_Errors.md (1,102 words; was Troubleshooting), CAN adapters links CAN_Bus_Adapter_Troubleshooting.md, the Licensing "Remote web access needs Profinity Server" warning exists (HEAD line 65, now line 67).
