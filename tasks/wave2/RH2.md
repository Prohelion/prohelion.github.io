# Review RH2: How_To_Guides (10 pages)

Method: compared each page with `git show HEAD:` original, ran `node scripts/lint-docs.js` on the ten pages (0 errors, 0 warnings, 3 info notes), grepped the docs tree for anchored links into these pages (none), and extracted and compared every fenced code block of Write_Your_First_Script (8 blocks, identical to the original after removing list/tab indentation).

## index.md: PASS (one low finding)
1. Low. The index lists all 17 guides that exist in the folder (Add_Component, Add_Images, Configure_Data_Logging, Connect_Profinity_to_AI, Connect_to_CAN_Bus, Create_Custom_Component, Create_Custom_Dashboard, Create_New_Profile, plus the ten under review). Every link target exists. The "Environment variables" entry (Installation/Environment_Variables.md) is not a guide in this folder but was in the original.
2. Descriptions match their pages. Checked: Create_Profile_Dashboard (visual editor, upload, remove), Style (`profile.css`, groups and readouts), View (component or profile dashboard), Debug (four symptoms), Send_Receive (view, send once, schedule), Replay, Log_Data (v2 Historian, data written), Kiosk (Kiosk Mode and a fullscreen browser on three operating systems), Write_Script (enable, component, first script, DBC/CAN/state examples).
3. Low. Mixed link-text case remains (sentence case for these ten, Title Case for others); already recorded by the writer. Lead to align once all waves are done.
4. Low. "Most guides list what they need first" replaced "Each guide lists..."; this is accurate (Debug has none), not an invented fact.

## Create_Profile_Dashboard.md: PASS
Every numbered step maps to the original in the same order (turn on: 5 steps; build: 4 steps; upload: 3; remove: 3). Prerequisites, "starter dashboard" sentence, "DESIGN is an outline and not a live preview" check, schema-validation sentence and the data-loss warning (file deleted, not recoverable, copy first, error to log on delete failure) are all intact at full strength. No invented step.
1. Low. "Check the Dashboard" heading removed, text kept after step 4. Acceptable (one short section).

## Debug_Dashboard_Issues.md: FIX (one medium, one low)
No procedure was invented. All four symptoms, causes and fixes survive, including the message "This dashboard no longer matches the schema", the buttons **Reset from Template** and **View Logs**, the `SOCPercent` path example, the three code blocks (bind, TEST readout 42.5, `<img>`), the case-sensitivity note, the `profile.css`/`link` note and the log instructions. All three related links are folded into the last sentence.
1. Medium (serial comma, answers question 6). The front-matter description is a real missing serial comma: "a dashboard that does not load, a readout with no data, a missing image or a style that has no effect" needs a comma before "or". STYLE_GUIDE.md line 135 requires it. Fix: "...a missing image, or a style that has no effect, and the usual fix for each." The linter does not check this. Same comma-less "A, B or C" lists occur in body prose of the original pages and were left (for example "Bytes, Int16, Int32, Floats or Raw Data" in Send_Receive, "a missing colon, wrong indentation, an invalid property name, or ..." is correct). Lead may want a sweep.
2. Low. The **Reset from Template** data-loss warning ("loses every customisation") is kept in prose beside the button. Force is retained, but lesson 2 prefers an admonition for data-loss notes; consider a `!!! warning`.
3. Low. `type: reference` with a "How to ..." title and the intro "This guide needs access to..." still reads as a task. Typing is right (no procedure); consider a title such as "Dashboard problems and fixes" if the lead allows a title change (check inbound links first).

## Log_Data_to_Cloud_Influx.md: PASS
All sign-up and credential steps survive and are split in the original order: sign up, create organisation, create bucket, generate token with write permissions, note organisation, bucket, token and URL; self-hosted: install, start service, create bucket and token with both `influx` commands. Component, connection (all six fields, health check false for Cloud), interval/mode/collections, save and start (**ADD COMPONENT**/**SAVE**, Auto Connect default), verify (4 steps with the Flux query), data structure (measurement, six tags, field, timestamp), example data point, non-DBC tag note, and the read-back query are all present and unchanged. "Related" InfluxDB docs and Configure Data Logging links kept in the closing sentence; the logger reference is linked in the introduction.
1. Low. Bold dropped from the data structure item labels (Measurement, Tags, Fields, Timestamp). Fine under the style guide.
2. Low. Self-hosted step 3 merges "create a bucket" and "generate an API token" into one step with "for example"; no content lost.
3. Question 2 in the writer report (`transmitter` always empty) is the original's wording, not new.

## Replay_CAN_Logs.md: PASS
Three steps, prerequisites (incl. Logs from InfluxDB or Prometheus cannot be replayed), control section and troubleshooting match the original. No invented content.
1. Low. The "How to Send and Receive CAN Bus Messages" related link now survives only as the "CAN Activity panel" link; acceptable. The Create_Custom_Component link was moved into a closing sentence in Troubleshooting; the sentence is the original's description, so OK.

## Send_Receive_CAN_Bus.md: PASS
Permission check was prose and is now 4 numbered steps, each of which is stated in the original, in order (ADMIN, Users & Groups, user account, check roles, change roles and Save). The session-revocation and Desktop sentences are kept. Seven send steps, column table, toggles, scheduled packet notes and three troubleshooting entries match.
1. Low. Added "To set one up, refer to Connect to CAN Bus." This is a link, not a fact; accepted.
2. Low. The Desktop sentence ("runs as a built-in user that holds every permission") is the original's wording and consistent with F1 (single built-in administrator); no change needed. Writer's question 3 can be closed.

## Set_Up_Profinity_as_Kiosk.md: PASS (one low finding)
Per-OS steps follow the original order and wording: Windows 4, Linux 3, macOS 4. The Chrome path, systemd unit and macOS script survive byte for byte. Security: the sentence "Confirm that the kiosk user holds only the permissions the display needs, for example a read-only role built from view permissions only, because anyone at the display inherits them." is verbatim in a warning admonition, which raises its prominence rather than lowering it. The "Start Profinity before the browser" warning is also verbatim. The licence prerequisite (Server feature, no user on Desktop) and the "choose one with minimal permissions" note are intact. No invented step or check; the Test Kiosk Mode steps are the original's.
1. Low. The closing sentence "To run Profinity as a service, refer to Running as a Service" sits at the end of the "The display or performance is poor" troubleshooting entry, where it does not belong. Move it to the browser-start-order entry ("The browser does not start"), which concerns startup order.
2. Low. The paragraph on token expiry and chart polling follows the admonition without a lead-in; unchanged from the original.

## Style_Dashboard.md: PASS
Two create steps are both stated in the original ("Create the `styles` folder ... if it does not exist" then create `profile.css`). Both CSS blocks and the YAML block unchanged. Artefacts directory paths for Windows, macOS (matches F3), Linux and Docker kept. Check paragraph kept.
1. Low. Related list folded into one link; Profile Directories and HTML links remain in the body.

## View_Dashboard_Source.md: PASS
Component path 3 steps, profile path 3 steps, copy path 4 steps, each action stated in the original in the same order. The ADMIN, Profile route for finding the setting is kept as prose. No invented permission or verification.
1. Low. "Open the YAML source ... modify them" reads slightly oddly (original "dashboards ... modify them"); polish only.

## Write_Your_First_Script.md: PASS
Code check: extracted all fenced blocks from the original and the rewrite and compared them after stripping common indentation. 8 of 8 identical, same order: C# run script, Python run script, DBC read (C# and Python tabs), CAN send (C# and Python tabs), state (C# and Python tabs). Note that the original has no Lua tab (only C# and Python), so there is none to preserve; Lua appears only in prose. The only removal is the "shown in tabs" sentence. The `=== "C#"` and `=== "Python"` tab markers are intact. Warning "Scripts run with application permissions" kept as an admonition with full text. Step lists match the original; the Run the script and Log Script Output paragraphs are unchanged.
1. Low. Troubleshooting question headings kept per lesson 4 (linter info notes only).
2. Low. Writer's structural proposal (split tutorial from cookbook) is reasonable; the page mixes a tutorial with a three-example cookbook. Type `tutorial` is acceptable as it stands.

## Wave 1 lessons check
- Invented steps, permissions, checks, results: none found in any of the ten pages. Every numbered step traces to an original sentence.
- Warnings that lost force: none. Kiosk permission consequence raised to an admonition; profile-dashboard deletion warning and scripts permission warning intact. Only the Debug "Reset from Template" note is prose (low).
- Product names lowercased: none. Heading-case false positives: none raised.
- Question headings removed: none that readers scan; only "Check the Dashboard" (one sentence) removed.
- Invented "New in 2.3" notes: none.
- Diagrams: none on these pages.
- Code byte for byte: verified for Write_Your_First_Script; others read by eye, no differences found (Kiosk, Style, Log_Data, Debug).
- Anchors: no inbound anchored links to any of the ten pages.
- Overlaps recorded by the writer are accurate; nothing was deleted.

## Overall summary
Nine of ten pages pass; Debug_Dashboard_Issues needs one description fix. No facts lost or invented, no broken links, no code changes. The index lists all 17 guides with correct descriptions. The kiosk permission warning is at full force. Remaining items are polish.

## High severity findings
None.

## Medium severity findings
1. Debug_Dashboard_Issues front-matter description: add the serial comma before "or a style that has no effect".
