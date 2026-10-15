# RV4: Wave 5 review of novel sentences, batch 4 (97 sentences, 27 files)

Result: 94 GLUE or REWORD, 3 NEW-FACT. Every sentence was found in the new page and traced to HEAD text or checked as pure navigation.

## NEW-FACT items (full)

### 1. Administration/Trial_Desktop_Use_and_Fingerprint.md, opening paragraph, sentence 1
New text: "A Profinity instance that has no licence file is either on a one-time 14-day local trial or, on a Desktop host, in free personal use."

HEAD (Administration/Licensing.md, "The 14-day local trial"): "A Profinity instance that has never had a licence applied issues itself a one-time, 14-day, server-tier trial automatically on first startup, provided the installer build has trial issuance enabled; some OEM-customised builds may not offer this local trial." HEAD also says that when the trial ends the instance "drops to the same unlicensed entitlement set a Desktop installation uses".

Departure: the either/or states are exhaustive in the new text. They are not in HEAD, for two reasons.
- OEM builds without trial issuance have no trial.
- An instance whose trial has expired still has no licence file, but it is neither on the trial nor on Desktop free use.

The qualifier "provided the installer build has trial issuance enabled" is dropped. The condition "never had a licence applied" is also changed to "has no licence file".

Proposed fix: restore the original conditions. For example: "A Profinity instance that has never had a licence applied starts a one-time 14-day local trial on first startup, if the installer build offers it. A Desktop host has a separate free personal-use policy instead."

### 2. Administration/Trial_Desktop_Use_and_Fingerprint.md, opening paragraph, sentence 2
New text: "A licence file that Prohelion signs for the instance's fingerprint replaces both."

HEAD never says that a licence file "replaces" the trial and free use. HEAD says the following.
- After the trial, features become unavailable "until a suitable commercial or extended evaluation licence is uploaded".
- On Desktop, a trial or commercial `license.yaml` installed manually is "validated and applied in the same way as on a server host".
- A rejected upload leaves the existing licence in effect.

Departure: this is a new summary claim that merges two behaviours. It also says nothing about what happens to the unlicensed-use or trial state on a Desktop host.

Proposed fix: delete the sentence, or reword it to HEAD's claims: "Applying a valid licence file signed for the instance's fingerprint gives the instance the entitlements of that licence." Mark it "needs product owner" if the "replaces" wording is wanted.

### 3. Getting_Started/Quick_Start.md, Next steps, "Profinity dashboard development guide shows data from your components and builds your own dashboard."
HEAD had two separate links. "Dashboard Development Guide builds your own dashboard." and "Visualising Data shows data from your components." (the second is the deleted `Visualising_Data.md`).

Departure: the new sentence puts both claims on the Dashboard guide link. This is low severity. It is only a fault if the Dashboards index does not cover showing component data.

Proposed fix: restore "builds your own dashboard" alone, or confirm that the guide shows component data, in which case it is a REWORD.

## Counts per file (GLUE / REWORD)
| File | Sentences | GLUE | REWORD | NEW-FACT |
|---|---|---|---|---|
| Components/Loggers/index.md | 9 | 2 | 7 | 0 |
| Tags/index.md | 9 | 9 | 0 | 0 |
| Components/Industrial_Protocols/OPC_UA_Client.md | 8 | 3 | 5 | 0 |
| Developing_with_Profinity/Scripting/Script_Types/RunScripts.md | 6 | 0 | 6 | 0 |
| Administration/Trial_Desktop_Use_and_Fingerprint.md | 6 | 2 (heading, refer-to) | 2 | 2 |
| Components/Chargers_and_Power/index.md | 5 | 4 | 1 | 0 |
| Installation/Run_as_a_Windows_Service.md | 5 | 2 | 3 | 0 |
| Administration/Licensing.md | 4 | 3 (links, heading with preserved anchor) | 1 | 0 |
| Components/Battery_Management_Systems/index.md | 4 | 4 | 0 | 0 |
| Customising_Profinity/Dashboards/Examples.md | 4 | 2 | 2 | 0 |
| Tags/Email_and_Slack_Rule_Actions.md | 4 | 2 | 2 | 0 |
| Installation/Docker_Installation.md | 3 | 3 | 0 | 0 |
| Administration/Choose_Available_Components.md | 3 | 0 | 3 | 0 |
| Components/CAN_Bus_Protocols/CAN_Bus_Adapter_Troubleshooting.md | 3 | 3 | 0 | 0 |
| Customising_Profinity/Dashboards/Component_Examples.md | 3 | 1 | 2 | 0 |
| Tags/Create_a_Derived_Tag.md | 3 | 2 | 1 | 0 |
| Administration/Kiosk_Mode.md | 2 | 0 | 2 | 0 |
| Components/Historians/InfluxDB_Historians.md | 2 | 2 | 0 | 0 |
| Getting_Started/Quick_Start.md | 2 | 1 | 0 | 1 |
| Administration/Install_and_Manage_Plugins.md | 2 | 1 | 1 | 0 |
| Components/Chargers_and_Power/Charger_Settings.md | 2 | 2 | 0 | 0 |
| Customising_Profinity/Dashboards/Schema_Validation_Errors.md | 2 | 2 | 0 | 0 |
| Release_Notes/Breaking_Changes_2_3.md | 2 | 2 | 0 | 0 |
| Administration/Users_and_Access/MFA_Account_Management.md | 1 | 0 | 1 | 0 |
| Developing_with_Profinity/Scripting/Script_Types/ServiceScripts.md | 1 | 0 | 1 | 0 |
| Integrating_to_Profinity/index.md | 1 | 1 | 0 | 0 |
| Tags/Tag_Expressions.md | 1 | 1 | 0 | 0 |

## Notes on the borderline REWORD calls (no action needed)
- Components/Loggers/index.md: the table was rebuilt. The "Direction: Out" column is new but trivial. "Selects data by: the CAN bus, not tag collections" is HEAD's File_Loggers.md line 56 ("they do not use tag collections").
- Administration/Licensing.md: "even if `config.yaml` holds another value" is not in HEAD's Licensing.md. It is in HEAD's Profinity_Web.md note, which says the same thing, so the claim is supported.
- Tags/Email_and_Slack_Rule_Actions.md: "send a notification each time a tag rule transitions" is explicit in HEAD for Email and Webhook/MQTT. For Slack it is inferred from "when a rule fires" and the `{Transition}` placeholder. This is acceptable.
- MFA_Account_Management.md: "requires the user to choose a new password at the next sign-in" is the same fact as HEAD's "sets Require password change on next login".
- Components/Industrial_Protocols/OPC_UA_Client.md: client-only wording of the dashboard and certificate text, split from the combined OPC_UA.md. All facts are in HEAD.
- Run_as_a_Windows_Service.md: the Event Viewer and "file not found" lines are the Windows-only parts of HEAD's Running_As_Service.md troubleshooting.

## Invented steps or checks in task pages
None found in Run_as_a_Windows_Service.md, Create_a_Derived_Tag.md, Kiosk_Mode.md or the Kiosk how-to. The Kiosk and derived-tag steps match HEAD.

## Thin or repeat pages
Components/Chargers_and_Power/index.md and Components/Battery_Management_Systems/index.md are now link lists of fewer than 150 words. This is acceptable for index pages, but the BMS index lost HEAD's model table and base-address defaults. Those presumably live in Prohelion_BMU.md. I did not check where they went, because it is outside this batch.

## Broken anchors or reader-visible losses
None seen in this batch. The Licensing heading keeps its old anchor via `{#hardware-requirements-and-remote-access}`.
