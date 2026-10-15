# RV3: review of novel_3.md (98 sentences)

Method: each sentence was found in the new page and traced to the HEAD text (the old page, or `git grep` on HEAD for pages that did not exist at HEAD). The verdict counts add up to 98.

## Counts per file (GLUE / REWORD / NEW-FACT)

| File | GLUE | REWORD | NEW-FACT |
|---|---|---|---|
| How_To_Guides/Replay_CAN_Logs.md (10) | 2 | 8 | 0 |
| Components/Loggers/InfluxDB_v1_Logger.md (9) | 2 | 7 | 0 |
| Profinity_AI/AI_Skills.md (7) | 3 | 4 | 0 |
| Profinity_AI/Install_AI_Skills.md (6) | 2 | 4 | 0 |
| Administration/index.md (5) | 5 | 0 | 0 |
| CAN_Utilities/Logging_Replaying_CAN_Bus_Messages.md (5) | 3 | 2 | 0 |
| Installation/Docker_One_Line_Installer.md (4) | 3 | 1 | 0 |
| Tags/Create_a_Collection.md (5) | 2 | 3 | 0 |
| Dashboards/Data_Binding.md (4) | 4 | 0 | 0 |
| Dashboards/Transform_and_Map_Values.md (4) | 3 | 0 | 1 |
| Components/CAN_Bus_Protocols/index.md (3) | 3 | 0 | 0 |
| Dashboards/Troubleshooting.md (3) | 1 | 2 | 0 |
| Tags/Tag_Tree_Path.md (3) | 1 | 2 | 0 |
| Battery_Management_Systems/Prohelion_BMU.md (3) | 2 | 1 | 0 |
| Dashboards/Binding_Settings_Reference.md (3) | 3 | 0 | 0 |
| Mobile/Troubleshoot_Profinity_Mobile.md (3) | 3 | 0 | 0 |
| Tags/Webhook_and_MQTT_Rule_Actions.md (3) | 2 | 1 | 0 |
| Scripting/Script_Types/TagChangeScripts.md (2) | 0 | 2 | 0 |
| Tags/Rules.md (2) | 0 | 1 | 1 |
| Chargers_and_Power/Charger_Components.md (2) | 1 | 1 | 0 |
| Motor_Controller/WaveSculptor.md (2) | 2 | 0 | 0 |
| MCP_Server/Tool_Reference.md (2) | 1 | 1 | 0 |
| Security/SSO_and_Sign_In.md (1) | 0 | 1 | 0 |
| System_Configuration/index.md (1) | 0 | 1 | 0 |
| Script_Types/ReceiveScripts.md (1) | 0 | 1 | 0 |
| Installation/Windows_Installation.md (1) | 1 | 0 | 0 |
| Tags/Derived_Tags.md (1) | 1 | 0 | 0 |
| Tags/Create_Collections_Rules_and_Bindings_from_Tags.md (1, title only) | 1 | 0 | 0 |
| **Total** | **50** | **46** | **2** |

## NEW-FACT items (2)

| file | sentence | verdict | evidence |
|---|---|---|---|
| Customising_Profinity/Dashboards/Transform_and_Map_Values.md | "Binding settings change the value that a component shows without changing the tag." | NEW-FACT | See 1 below. |
| Tags/Rules.md | "This page covers writing rules, and Complete rules.yaml example shows a full rules.yaml with every setting explained." | NEW-FACT (minor overclaim) | See 2 below. |

1. Transform_and_Map_Values.md, opening sentence.
   - New text: "Binding settings change the value that a component shows without changing the tag."
   - HEAD Data_Binding.md, "Data binding syntax": "the binding settings can transform the value, convert its type, and map it to text."
   - The departure is "without changing the tag". HEAD does not say whether the tag is left unchanged.
   - Fix: restore the original wording, "Binding settings can transform the value, convert its type, and map it to text."
   - Alternative: "needs product owner" if the no-write-back behaviour is meant to be stated.

2. Rules.md, intro sentence.
   - New text: "...shows a full `rules.yaml` with every setting explained."
   - HEAD Rules.md, "A complete rules.yaml example": "shown here in full so that every setting is in one place". The same text now opens Rules_YAML_Example.md.
   - HEAD claims the example is shown in full. It does not claim that every setting is explained.
   - The prose after the YAML covers many settings but not all of them, so "every setting explained" overstates.
   - Fix: change to "shows a full `rules.yaml`", or "shows a full `rules.yaml` with every setting in one place".

## Borderline items judged REWORD, for the reviewer's attention

- Docker_One_Line_Installer.md: "To update the installation, run `~/profinity-docker/update.sh`, or refer to Update the Profinity Docker image."
  - HEAD says only that `update.sh` runs `docker compose pull` and `docker compose up -d`, and gives the same two commands under "Update the image".
  - The new sentence is the natural reading, so it is not flagged. Its carry-over of the original's "Configuration and profiles are kept as long as PROFINITY_HOME..." caveat was not checked.
- Logging_Replaying_CAN_Bus_Messages.md: "Replayed messages are processed as if they had been received from the bus, so they mix with any live traffic."
  - This is a shortened version of the HEAD warning box. The summary drops the "disconnect the adapter or isolate the live hardware" advice.
  - It now points to Replay_CAN_Logs.md, which keeps the full warning. This is acceptable because the full-strength warning sits on the procedure page.
- SSO_and_Sign_In.md: the wording is the same as HEAD, but HEAD had it in a `!!! warning "Saving restarts Profinity"` box and it is now a plain paragraph. This is a reader-visible weakening of prominence, not of meaning. Suggest restoring the admonition.

## Invented steps or checks in task pages

None found in Replay_CAN_Logs, Install_AI_Skills, Docker_One_Line_Installer or Create_a_Collection. Every step traces to HEAD.

## Thin pages

None under about 150 words of real content. The smallest are CAN_Bus_Protocols/index.md (155 words, an index page) and Create_a_Collection.md (205 words, a task page with 4 steps).

## Anchors and other reader-visible losses

- Tag_Tree_Path.md lost its "Setting the tag tree path" and "Changing the path on a deployed component" sections. Both now sit on Nest_a_Component_in_the_Tag_Tree.md, including the warning about absolute binds and Historian data, so there is no loss.
- Data_Binding.md links to the new page titled "Create collections, rules, and dashboard bindings from tags" using the old link text "Tag Linking". This is a cosmetic mismatch.
