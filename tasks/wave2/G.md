# Wave 2 report G (Getting_Started and Release_Notes)

## Pages

| Page | Type | Words before | Words after | Diagram | Change |
|---|---|---|---|---|---|
| Getting_Started/Quick_Start.md | tutorial | 1475 | 1441 | no | One Windows route; Linux/macOS/Docker tip replaced by one sentence; tips and notes folded into prose; roles pointer added; sentence-case headings |
| Getting_Started/Profiles.md | concept | 232 | 264 | yes | Diagram added; "More Information" heading removed; alt text improved |
| Getting_Started/Adding_New_Components.md | task | 689 | 712 | no | Add and remove procedures numbered using only the stated actions; admonitions to prose; status table kept under its own heading |
| Getting_Started/Profinity_Log.md | reference | 145 | 161 | no | Admonition to prose; alt text from the real image |
| Getting_Started/Visualising_Data.md | concept | 138 | 155 | no | Sentence per line, alt text, wording tidy |
| Release_Notes/index.md | index | 97 | 105 | no | Consistent punctuation (colon), links use new titles |
| Release_Notes/2.2.5.md | reference | 604 | 615 | no | Retitled; sentence-per-line; sentence-case headings |
| Release_Notes/2.3.1.md | reference | 2539 | 2544 | no | Retitled; sentence-per-line; sentence-case headings; nothing removed |

## Quick_Start removals (checked against Installation/Zip_Installation.md and Windows_Installation.md)

1. Tip "On macOS or Linux, see the Linux and macOS Installation Guide. For Docker deployments, see the Docker Installation Guide." Replaced by one sentence linking Zip_Installation.md. The Zip page covers Linux and macOS installs. The Docker pointer is dropped, because the decision was one sentence linking Zip only (Zip and Windows pages both link to Docker installation).
2. Sentence "installations that run Profinity as a web service, such as Docker and Linux ... create an `admin` user with the password `password` and require a new password at the first sign in". Kept for the Windows Server licence case (Windows_Installation.md says the `admin` account is created with a required password change; the `password` value is only stated in the Zip and Docker pages, so I kept `password` in Quick_Start). The Docker and Linux parts are dropped from Quick_Start: Zip_Installation.md states them for Linux and Docker_Installation.md for Docker.
3. Warning "Change the Default Password" was scoped to "Docker and Linux installations". It is now scoped to "If you sign in as the default `admin` user", keeping the consequence and the **ADMIN > Change My Password** path. Zip_Installation.md does not state the Change My Password path (it links to the Security guide instead). Nothing in Quick_Start is lost, but see Questions.
4. "Release-status wording": no "Early Adopter" text existed in Quick_Start. The description no longer says "Windows or Linux".
5. The roles sentence: Quick_Start has no user-creation step (only a Next steps bullet), so the sentence "Before you create users, read the **Choose roles** section of Create a user" is placed after the Create a user bullet in Next steps.

## Facts removed or altered

- Quick_Start tip admonitions ("Replay Controls", "Read an Existing Dashboard", "Read an Existing Rule", "Rules Editor Permissions") are now prose with the content kept. The "Read an Existing Rule" tip is reworded as "To find what would make a rule fire, note the condition it uses, then find the tag it watches in Tag Explorer" (original: "to see what would make it fire").
- Quick_Start steps "Click **Play**" and "clicking on the dashboard element" became "Select" (wording only).
- Quick_Start "Step 4" heading text "Run the Example CAN Log" kept; "Making Your First Edit" became "Make your first edit" (task heading verb). Nothing links to either anchor.
- 2.2.5: link "Upgrading From 2.2" (2.3.1.md#upgrading-from-22) now links "Upgrade from Profinity 2.2" to ../Installation/Upgrade_From_2_2.md, the page that section already points to.
- Adding_New_Components: the "Duplicate Component Names" info admonition and "Add a Protocol Adapter First" info admonition are prose; "You can change the properties later" moved after the add steps. Anchor `#adding-components-to-your-profile` (H1) kept for the link from Add_Component_to_Profile.md.
- Profiles.md concept page keeps `ACTIVATE`, `Add profile`, `Upload Profile Pack` text; "More Information" heading removed.
- 2.3.1: no sentence removed. Serial commas added in real lists. The description is shortened to 70 to 160 characters and drops "publishers and subscribers" and "how to".

## Questions for the product owner

1. Quick_Start Step 1: the `admin`/`password` default on Windows with a Server licence is stated only in Quick_Start (Windows_Installation.md says only that `admin` is created and must change its password). Confirm `password` applies there.
2. The Change My Password path (ADMIN, then Change My Password pill) appears only in Quick_Start. Confirm it and whether Security or Create_User should carry it.
3. Quick_Start Step 2 says an unlicensed Desktop installation runs for personal, non-commercial use, while 2.3.1 says unlicensed keeps core features and Desktop hosts do not start the trial. Consistent, but the "personal, non-commercial" wording appears only here.
4. Quick_Start says "A signed-in `admin` user holds both" permissions, but a Desktop installation without a Server licence signs in with a built-in account, not `admin`. Left unchanged.
5. Quick_Start Step 3 says the Example Profile includes three Elmar MPPTs and Step 6 says BMS rules exist for Prohelion 12v and BMU. Not verified against the product.
6. Adding_New_Components has no verification other than the sidebar icon appearing. No verify step added.
7. 2.3.1 "Upgrading from 2.2" section is now one sentence pointing to Installation/Upgrade_From_2_2.md (the page already existed in this state).
8. 2.3.1 Breaking changes "Connections Start in Error Instead of Failing" and "Default Series Window" contain plugin SDK class names (`ManagedConnection`, `PolledDeviceController<TPoint>`, `DataSource.DefaultLocalSeriesTimeRangeStart`). Kept, because the brief says remove nothing.
9. Release_Notes/2.3.1.md file name says 2.3.1 but the page is titled "Profinity 2.3 release notes". The style rule says only the release notes page may use 2.3.1; the file name is untouched.

## Structural proposals not performed

- Release_Notes/2.3.1.md, sentences that would belong in a separate breaking-changes page: everything under the "Breaking changes" H2 (Security file format, Settings in config.yaml, Site sign-in method, Licensing, REST API errors, Data locations, YAML documents, Firmware passcodes, BACnet device instance, Auto Connect replaces Auto Start, Connections start in Error instead of failing, Default series window is now ten minutes, Windows install with a Server licence accepts remote connections, OPC UA server listens on this computer only by default). Also the opening-section sentence "It also changes where Profinity stores data on Linux, how `/api/v2` reports errors, and which features an instance without a licence can use. Anyone upgrading from 2.2 should read ... [Breaking changes](#breaking-changes) before they upgrade a production system." The "Known issues" H2 could be its own known-issues page. The "Related documentation" list repeats links already in the text and could go in a merge.
- Plugin-author sentences ("For plugin authors, `ManagedConnection` ..." and the whole "Default series window" section) could move to a developer page.
- Adding_New_Components, Profinity_Log and Visualising_Data: left in place for the lead's merges (Add_Component_to_Profile, Logs_Config, Dashboards index).

## Diagrams added

- Profiles.md: `flowchart LR` Profile to Components, Dashboards, and Settings. Supported by "Add profile creates a new profile, which keeps its own set of components, dashboards and settings" (original wording; I placed the supporting sentence "Each profile keeps its own set of components, dashboards, and settings" before the figure). Three nodes, no labels, no subgraph.

## Lint notes left

- 2.2.5.md line 65 HeadingCase warning for "Battery Management Systems (BMS)": feature name (heading case false positive).
- 2.3.1.md line 160 HeadingCase warning for "Auto Connect replaces Auto Start": both are UI setting names (heading case false positive). Slug unchanged.
- Structure info notes on 2.2.5 (3 short sections) and 2.3.1 (4 short sections): short sections kept because they are anchored or release-note entries. Remaining SerialComma notes: "publishers and subscribers" is one feature pair (false positive), plus link-text matches such as "Roles and Permissions, SSO and Sign-In", "Tags, Alerts and Tag Tree Path", "Editor, Components and Plugins", and headings.
- Heading case false positives to add to the rule: Auto Connect, Battery Management Systems.

## Overlaps recorded

- Adding_New_Components status colour table duplicates Add_Component_to_Profile.md (lead's merge).
- Quick_Start Step 2 licence steps repeat Applying_a_Licence.md; Step 4 repeats Replay_CAN_Logs.md; Step 5 repeats View_Dashboard_Source.md. All kept as the tutorial path.
- 2.2.5 migration rules overlap Artifacts_Directory.md.

## Fixes applied

- Quick_Start 1 (Docker pointer): applied. Intro now links Install Profinity with Docker.
- Quick_Start 2 (credentials rationale): applied. Step 1 again says Docker, Linux and Server-licence Windows installs create `admin`/`password`; the warning again names Docker and Linux.
- Quick_Start 3 to 6: no change needed. Step 6 wording for Desktop without a Server licence remains a question for the product owner. The Linux and macOS step lists were not restored.
- Profiles 1 (diagram): applied. Diagram and its supporting sentence's figure removed; the sentence stays.
- Profiles 2, 3: no action needed.
- Adding_New_Components 1 (typing): partly applied. Kept type `task`, procedure and status-colour reference in place; the procedure gained its own heading "Add a component".
- Adding_New_Components 2 (ADD COMPONENT dialog button not stated in the original): not applied; Question for the product owner.
- Adding_New_Components 3, 4: not applied, reviewer judged acceptable.
- Lint: 0 errors, 0 warnings on all three pages.
