# Manual checks and approvals for the 2.3 docs refactor

You said you would do the manual checks at the end and approve each item. Tick a box when you have checked and approved the item, and write a note after it if something needs changing. Nothing here has been verified against the running product unless it says so. Detailed context for every item is in the reports in [wave1/](wave1/) (G = writer, R = reviewer) and [wave2/](wave2/).

Status: nothing approved yet. Last updated 2026-10-15.

## 0. Security and privacy (do these first)

- [ ] **Revoke or rotate the service account token.** A full token was visible in `images/2.3-service-account-token-dialog.png`. The image is now redacted, but the original is still in git history on the pushed `origin/feature/Profinity_2_3`. Rotation is the only real fix; rewriting history is optional.
- [ ] `system_logs.png` shows a local user path. Retake or crop it.
- [ ] `system_info.png` shows version 2.3.1.0 next to a "Current release 2.2.5" history, and names individual developers. Retake or crop it.
- [ ] Three Python script screenshots have captions that mention elements the image does not show. Retake the images or trim the captions.

## 0a. Engineering findings (not documented as intended behaviour)

- [ ] InfluxDB v2 and v3 historians run a `/health` check about every 30 seconds that ignores the **Health Check** setting. This may be a bug for InfluxDB Cloud users.
- [ ] The V2 bridge bus number is really limited to 0 to 32767, although the validation message says 65535.
- [ ] In the boolean rule path, an alert that clears during a silence does not run its clear actions, and the stale silence stays until its time passes.
- [ ] Collection `id` immutability is a UI convention only. The engine accepts a hand-edited `id` as a new collection.

## 0b. Verified automatically (no action needed unless you disagree)

- Lint: all 187 pages, 0 errors and 0 warnings. Mkdocs build: no warnings. Crawl of the built site: 0 broken links and 0 broken anchors.
- All 16 Mermaid diagrams have valid syntax. Image alt text: 120 images checked by vision agents, 39 weak alts rewritten.
- Facts checked against the code (branch `bugfix/2.3-bugfix-2`) and fixed in the docs where wrong: Auto Connect timing, InfluxDB log messages, Hosting ports, conditional styling `classes`, the Visual Editor DELETE button, uploaded plugins needing Custom Plugins, the SSO client secret error, the profile `models` folder, the first API call permission and response, the Actions built-ins and PagerDuty, silence expiry, script-driven derived tags needing Scripting, Run On Alert scripts needing Server, Custom Components needing Desktop, Theming white-label wording, Collections `id`, AI skills and derived tags.
- Confirmed with no change: the MCP server needs the AI feature and its ten tools are read-only, stateless transport, the seven AI skill names, `version: "2.3"` in Collections.
- Still not provable from the repo: the five MCP protocol revisions (they come from the bundled SDK 2.2.0).
- Items in sections 2 and 3 that match the list above can be ticked without further checking.

## 1. Look at the rendered pages

### 1.1 Mermaid diagrams (16)
Drawn from the page text and checked against it by a reviewer, never against the product. Check each renders, reads clearly at normal width, and shows only true relationships.

- [ ] [MQTT Publisher](../docs/Profinity_Software/Profinity_Version_2.3/Components/Publishers_and_Subscribers/MQTT_Publisher.md)
- [ ] [MQTT Subscriber](../docs/Profinity_Software/Profinity_Version_2.3/Components/Publishers_and_Subscribers/MQTT_Subscriber.md)
- [ ] [Webhook Publisher](../docs/Profinity_Software/Profinity_Version_2.3/Components/Publishers_and_Subscribers/Webhook_Publisher.md)
- [ ] [Modbus](../docs/Profinity_Software/Profinity_Version_2.3/Components/Industrial_Protocols/Modbus.md)
- [ ] [BACnet](../docs/Profinity_Software/Profinity_Version_2.3/Components/Industrial_Protocols/BACnet.md)
- [ ] [EtherNet IP](../docs/Profinity_Software/Profinity_Version_2.3/Components/Industrial_Protocols/EtherNet_IP.md)
- [ ] [S7](../docs/Profinity_Software/Profinity_Version_2.3/Components/Industrial_Protocols/S7.md)
- [ ] [OPC UA](../docs/Profinity_Software/Profinity_Version_2.3/Components/Industrial_Protocols/OPC_UA.md) (the diagram implies nothing about the server republishing client data; the page adds a sentence that the server exposes the readable scalar tags in the tag tree)
- [ ] [InfluxDB historians](../docs/Profinity_Software/Profinity_Version_2.3/Components/Historians/InfluxDB_Historians.md) (one merged diagram for v2 and v3)
- [ ] [TAG SQL Historian](../docs/Profinity_Software/Profinity_Version_2.3/Components/Historians/TAG_SQL_Historian.md)
- [ ] [File Loggers](../docs/Profinity_Software/Profinity_Version_2.3/Components/Loggers/File_Loggers.md)
- [ ] [InfluxDB Prometheus Logger](../docs/Profinity_Software/Profinity_Version_2.3/Components/Loggers/InfluxDB_Prometheus_Logger.md) (the arrow points from the Prometheus server to the logger, because Prometheus pulls)
- [ ] [index](../docs/Profinity_Software/Profinity_Version_2.3/Components/Battery_Management_Systems/index.md)
- [ ] [index](../docs/Profinity_Software/Profinity_Version_2.3/Components/Motor_Controller/index.md)
- [ ] [index](../docs/Profinity_Software/Profinity_Version_2.3/Components/Cloud_Dashboard/index.md)
- [ ] [Derived Tags](../docs/Profinity_Software/Profinity_Version_2.3/Tags/Derived_Tags.md)

### 1.2 Read aloud, "does it sound like a person wrote it"
The linter and reviewers cannot judge this. Suggested sample (one of each kind). Say if a page reads like a form being filled in, and I will remove structure.

- [ ] [Windows Installation](../docs/Profinity_Software/Profinity_Version_2.3/Installation/Windows_Installation.md): short task
- [ ] [Docker Installation](../docs/Profinity_Software/Profinity_Version_2.3/Installation/Docker_Installation.md): long task with a warning
- [ ] [Quick Start](../docs/Profinity_Software/Profinity_Version_2.3/Getting_Started/Quick_Start.md): tutorial, rewritten to one Windows path
- [ ] [Modbus](../docs/Profinity_Software/Profinity_Version_2.3/Components/Industrial_Protocols/Modbus.md): component page with diagram
- [ ] [FAQ](../docs/Profinity_Software/Profinity_Version_2.3/Customising_Profinity/Dashboards/FAQ.md): FAQ with restored question headings
- [ ] [index](../docs/Profinity_Software/Profinity_Version_2.3/Customising_Profinity/Hosting/index.md): page where nine invented statements were removed
- [ ] [Alerts](../docs/Profinity_Software/Profinity_Version_2.3/Tags/Alerts.md): reference page after a fix pass
- [ ] [Roles and Permissions](../docs/Profinity_Software/Profinity_Version_2.3/Administration/Users_and_Access/Roles_and_Permissions.md): long reference
- [ ] [Write Your First Script](../docs/Profinity_Software/Profinity_Version_2.3/How_To_Guides/Write_Your_First_Script.md): tutorial with script tabs
- [ ] [index](../docs/Profinity_Software/Profinity_Version_2.3/index.md): the 2.3 home page, your text with my edits

### 1.3 New and changed navigation
- [ ] The six landing pages read well and the left navigation shows the right order: Getting started, Installation, Administration, Users and access, Loggers, CAN bus adapters.
- [ ] Page titles in the navigation are now sentence case and verb-first for tasks (for example "Install Profinity on Windows", "Apply a licence"). URLs did not change. Confirm you are happy with the new titles.
- [ ] [Tag layer](../docs/Profinity_Software/Profinity_Version_2.3/Tags/index.md) is longer than a landing page should be: it keeps the Tag Explorer, permissions and API paragraphs because no other page states those facts. Accept, or ask me to move them.
- [ ] [Release notes](../docs/Profinity_Software/Profinity_Version_2.3/Release_Notes/2.3.1.md) are titled "Profinity 2.3 release notes" in the navigation while the file is still 2.3.1.md.

### 1.4 Images and alt text
Alt text was rewritten from the images, but writers opened them only where noted. Check each says what the image shows.
- [ ] Administration: Profiles menu image, Menu layout image, Feedback image (fixed after review, see [RA1](wave2/RA1.md))
- [ ] Integrating: the three images on the APIs and MCP pages ([RI1](wave2/RI1.md))
- [ ] Developing, Scripting: four rewritten alt texts ([RD2](wave2/RD2.md))
- [ ] Wave 1 pages, where writers kept existing images and improved alt text without a separate review of each image

## 2. Product facts to confirm
I did not guess any of these. The pages keep the original wording, and each question is waiting for a product answer. Full wording is in the writer reports.

### 2.1 Settled earlier (confirm they match the product)
- [ ] F1 Desktop mode: accounts and roles exist on a Desktop host ONLY when a Server licence is applied. Applied to Manage users and Roles and permissions.
- [ ] F2 Profiles have four folders (`images`, `models`, `styles`, `content`) and the stylesheet is lowercase `profile.css`. Applied to Profiles and Profile directories. Open question: what does the `models` folder hold?
- [ ] F3 macOS data folder is `~/Library/Application Support/Prohelion/Profinity`. Applied to the 2.3 release notes.
- [ ] F4 Docker: the one-line installer with manual updates and a compose file with Watchtower are both supported. The Docker page mentions the Watchtower file but does not link it. Is it published anywhere?
- [ ] F5 A desktop licence does not allow browser sign-in from another machine.
- [ ] F6 Read failures log Warning first, Debug on repeats, Info on recovery, for all five industrial protocols (checked in code).
- [ ] F10 `ADAPTER_IP` and `ADAPTER_PORT` are not built in variables.
- [ ] F8 The Actions page says "two built-in actions" and lists four, and the diagram alt text names PagerDuty. Not resolved. Check the image `2.3-diagram-rule-actions.png`.
- [ ] F9 Profinity AI capability claims: "correlates signals across devices", "matches alerts to documentation", "compares against history", "proposes a likely root cause", the Cell 12 example, and that the MCP server is read-only.


### 2.2 Components: devices
- [ ] [index](../docs/Profinity_Software/Profinity_Version_2.3/Components/Battery_Management_Systems/index.md): M48 Gen2, C48 Gen2 and C20 Gen1 have no linked pages while other models do. Intended? The D1000 Gen2 V1.1 row links the V1.2 page: is there a V1.1 page?
- [ ] [index](../docs/Profinity_Software/Profinity_Version_2.3/Components/Chargers_and_Power/index.md): "Charger Power Limit ... If unsure, use maximum voltage multiplied by maximum current, or less." kept as written. Confirm.
- [ ] [index](../docs/Profinity_Software/Profinity_Version_2.3/Components/Motor_Controller/index.md): Setup and Config says the WaveSculptor becomes active "over a TCP connection" but the firmware text says UDP. Which is right?

### 2.3 Components: protocols and logging
- [ ] [Modbus](../docs/Profinity_Software/Profinity_Version_2.3/Components/Industrial_Protocols/Modbus.md): Modbus Dashboard says STATUS shows "Connected or Disconnected" but Connections and reconnecting says Off, On, Error.
- [ ] [EtherNet IP](../docs/Profinity_Software/Profinity_Version_2.3/Components/Industrial_Protocols/EtherNet_IP.md): EtherNet/IP `Boolean` is 1 byte, S7 says 1 bit. Both kept as written. Confirm.
- [ ] [OPC UA](../docs/Profinity_Software/Profinity_Version_2.3/Components/Industrial_Protocols/OPC_UA.md): Does the OPC UA server have read failures to log? The pages claim the log-level behaviour for the client only. Also confirm whether the "Changed in Profinity 2.3" label on the listening-address note is wanted (removed in review).
- [ ] [InfluxDB v2 Historian](../docs/Profinity_Software/Profinity_Version_2.3/Components/Historians/InfluxDB_Historians.md): Health check is described differently on the v1 logger ("at regular intervals") and the v2 and v3 historians ("when the component connects"). Real difference? The v2 and v3 pages also log "Failed to start the InfluxDB logger": confirm the shipped text.
- [ ] [TAG SQL Historian](../docs/Profinity_Software/Profinity_Version_2.3/Components/Historians/TAG_SQL_Historian.md): No Allow Retrieval setting and no default for the designated reader: is the SQL historian always retrievable? Should "Logger settings" read "Recording settings"?
- [ ] [File Loggers](../docs/Profinity_Software/Profinity_Version_2.3/Components/Loggers/File_Loggers.md): Update Interval is 10 to 86400 on file loggers but the InfluxDB Logging Interval minimum is 1. "Archive File Limit" is asked for on SFTP loggers that do not show "Archive the Logs". Intended?
- [ ] [CAN Bus Adapters](../docs/Profinity_Software/Profinity_Version_2.3/Components/CAN_Bus_Protocols/CAN_Bus_Adapters.md): V1 bridges are said to support bus numbers 0 to 15 but Profinity accepts 0 to 13 for V1 (default 13).
- [ ] [index](../docs/Profinity_Software/Profinity_Version_2.3/Components/Loggers/index.md): The Virtual CAN page is titled "Prohelion Virtual CAN Bus Adapter" but the landing pages call it "Virtual CAN adapter". Align the title or the link text?

### 2.4 Components: publishers and relays
- [ ] [MQTT Subscriber](../docs/Profinity_Software/Profinity_Version_2.3/Components/Publishers_and_Subscribers/MQTT_Subscriber.md): The control that switches the subscriber on when Auto Connect is off is named "Connect"; Tag Relay Sender uses "Start Sender". Confirm the labels.
- [ ] [Tag Relay Receiver](../docs/Profinity_Software/Profinity_Version_2.3/Components/Tag_Relays/Tag_Relay_Receiver.md): A relay post to more than one HTTPS receiver: confirm 409 is the code.
- [ ] [index](../docs/Profinity_Software/Profinity_Version_2.3/Components/Tag_Relays/index.md): The setup order (token noted before the sender is added) was split into its own step. Intended?
- [ ] [Webhook Publisher](../docs/Profinity_Software/Profinity_Version_2.3/Components/Publishers_and_Subscribers/Webhook_Publisher.md): Confirm `GET /api/v2/Tags/Sample/{path}` is still the right route to quote.

### 2.5 Tags, CAN utilities, Mobile and AI
- [ ] [Collections](../docs/Profinity_Software/Profinity_Version_2.3/Tags/Collections.md): Should the page state that 2.3 writes collections YAML with `version: "2.3"` and that a collection id cannot be changed once created? Neither is supported by the existing pages, so nothing was added.
- [ ] [Alerts](../docs/Profinity_Software/Profinity_Version_2.3/Tags/Alerts.md): "Silence alert for 1 hour": what happens when the hour ends? Not stated, not added.
- [ ] [Script Driven Derived Tags](../docs/Profinity_Software/Profinity_Version_2.3/Tags/Script_Driven_Derived_Tags.md): Do scripts used as derived tags need the Scripting feature, and what should a reader check in Tag Explorer?
- [ ] [Derived Tags](../docs/Profinity_Software/Profinity_Version_2.3/Tags/Derived_Tags.md): Is the "state restored from the alert log" claim and the "rule expressions are not checked" sentence current?
- [ ] [CAN Bus DBC](../docs/Profinity_Software/Profinity_Version_2.3/CAN_Utilities/CAN_Bus_DBC.md): "For the moment, the DBC Viewer is the only DBC feature": still true? Also confirm the Send/Receive UI (send arrow, space bar) is unchanged in 2.3.
- [ ] [OEM White Label](../docs/Profinity_Software/Profinity_Version_2.3/Mobile/OEM_White_Label.md): Partner-only build guide (BUILD.md, WHITE-LABEL.md, npm scripts): is it meant to be public? Does `discovery.profinityHeartbeatVersion` need updating at each release?
- [ ] [AI Skills](../docs/Profinity_Software/Profinity_Version_2.3/Profinity_AI/AI_Skills.md): Skill display names versus the in-product names (`profinity-dashboard-builder` and so on). Is the tool list "Claude Code, Cursor, Codex, ChatGPT" current?

### 2.6 Customising dashboards
- [ ] [index](../docs/Profinity_Software/Profinity_Version_2.3/Customising_Profinity/Theming/index.md): "The Desktop licence carries white-label rights": Licensing does not say this. Confirm.
- [ ] [index](../docs/Profinity_Software/Profinity_Version_2.3/Customising_Profinity/Hosting/index.md): Which tab holds each HTTPS field, and what is the HTTPS URL? The message "You can only redirect traffic if Https is enabled" appears nowhere else.
- [ ] [Conditional Styling](../docs/Profinity_Software/Profinity_Version_2.3/Customising_Profinity/Dashboards/Conditional_Styling.md): "According to the system mode" for the `classes` target is undefined. Are `on`, `off`, `disabled`, `unknown` valid lamp colours?
- [ ] [Visual Editor](../docs/Profinity_Software/Profinity_Version_2.3/Customising_Profinity/Dashboards/Visual_Editor.md): "Show footer ... except on a dashboard that contains an accordion": intended? When is the DELETE button offered?
- [ ] [Examples](../docs/Profinity_Software/Profinity_Version_2.3/Customising_Profinity/Dashboards/Examples.md): Is the icon `IbmWatsonKnowledgeStudio` in Example 0 a built-in icon?
- [ ] [Image](../docs/Profinity_Software/Profinity_Version_2.3/Customising_Profinity/Dashboards/Component_Reference/Interactive/Image.md): Conflicts across Image, Model, Actions and Toggles: tooltip behaviour of icon labels, which widgets support `confirmMessage`, `trackProgress` and `restartingOnSuccess`, and the type of Toggle `value`.
- [ ] [Panel](../docs/Profinity_Software/Profinity_Version_2.3/Customising_Profinity/Dashboards/Component_Reference/Layout/Panel.md): `menu` is accepted on Footer and Panel but not displayed, and Menu `location` accepts right and left but the side menu does not use them: keep documented?

### 2.7 Administration
- [ ] [Licensing](../docs/Profinity_Software/Profinity_Version_2.3/Administration/Licensing.md): What does "The Machine Fingerprint / REST API could go" mean in your review notes? Custom components is Yes for Unlicensed while Custom plugins is No: intended? Service accounts say MCP needs the "AI" feature but Licensing lists "Profinity AI": which name?
- [ ] [Components and Plugins](../docs/Profinity_Software/Profinity_Version_2.3/Administration/Components_and_Plugins.md): Do uploading and enabling a plugin both need the Custom Plugins feature, or only one?
- [ ] [Manage Users](../docs/Profinity_Software/Profinity_Version_2.3/Administration/Users_and_Access/Manage_Users.md): The default `admin` password `password` is published here and in the Security guide. Keep it public?
- [ ] [MFA Account Management](../docs/Profinity_Software/Profinity_Version_2.3/Administration/Users_and_Access/MFA_Account_Management.md): Retitle to "Reset MFA or password for a user" for search? (Title kept to protect links.)
- [ ] [SSO and Sign In](../docs/Profinity_Software/Profinity_Version_2.3/Administration/System_Configuration/Security/SSO_and_Sign_In.md): The Client secret can be empty "only when the identity provider allows public clients": what does the user see if it is missing?
- [ ] [AI Settings](../docs/Profinity_Software/Profinity_Version_2.3/Administration/System_Configuration/AI_Settings.md): The permission is said to be in the "Desktop role", but accounts on Desktop need a Server licence (F1). Reword? Does local password policy need no licence on Desktop?
- [ ] [Profinity Web](../docs/Profinity_Software/Profinity_Version_2.3/Administration/System_Configuration/Profinity_Web.md): `Config.yaml` versus `config.yaml` capitalisation across pages.

### 2.8 Developing and integrating
- [ ] [SDK](../docs/Profinity_Software/Profinity_Version_2.3/Developing_with_Profinity/SDK.md): No verification step exists for `profinity-script sim` or a plugin upload: what should the reader check? Are Custom Plugins and Scripting both "from the Desktop edition up"?
- [ ] [index](../docs/Profinity_Software/Profinity_Version_2.3/Developing_with_Profinity/Custom_Components/index.md): Does a saved DBC editor change really get picked up automatically? Is "older key `name`" still wanted?
- [ ] [ServiceScripts](../docs/Profinity_Software/Profinity_Version_2.3/Developing_with_Profinity/Scripting/Script_Types/ServiceScripts.md): Broken sentence left verbatim: "Profinity's built-in Python, C# and Lua service templates with both single-step and loop-style `run` patterns." Missing verb: include, provide or follow?
- [ ] [CANBus](../docs/Profinity_Software/Profinity_Version_2.3/Developing_with_Profinity/Scripting/Script_Operations/CANBus.md): "Milliseconds Valid" is shown only for Run On Receipt but `LatestValidPacketReceivedByID` is described for any script. Confirm for Run mode. One clause was reordered so "returns null" refers to the method.
- [ ] [index](../docs/Profinity_Software/Profinity_Version_2.3/Developing_with_Profinity/Scripting/index.md): The release notes say rule scripts need the Server edition; the Scripting page never says so. Add it?
- [ ] [index](../docs/Profinity_Software/Profinity_Version_2.3/Integrating_to_Profinity/APIs/index.md): The API contract paragraph describes a committed OpenAPI snapshot and a pre-release check: cut as release-process detail? Example credentials and the Python MCP example were not run.
- [ ] [index](../docs/Profinity_Software/Profinity_Version_2.3/Integrating_to_Profinity/MCP_Server/index.md): Protocol revision `2026-07-28` and the "stateless" description are unverified.

### 2.9 How-to guides and getting started
- [ ] [Connect Profinity to AI](../docs/Profinity_Software/Profinity_Version_2.3/How_To_Guides/Connect_Profinity_to_AI.md): The optional curl example puts the service-account password on the command line. Add a warning or a safer example?
- [ ] [Connect to CAN Bus](../docs/Profinity_Software/Profinity_Version_2.3/How_To_Guides/Connect_to_CAN_Bus.md): Auto Connect: this page says "when Profinity starts"; Add component, Configure data logging and about ten others say "when the profile loads". Which is right? Fix all pages together.
- [ ] [Configure Data Logging](../docs/Profinity_Software/Profinity_Version_2.3/How_To_Guides/Configure_Data_Logging.md): The Prometheus section has no final "Select ADD COMPONENT" step. Omitted on purpose?
- [ ] [Create New Profile](../docs/Profinity_Software/Profinity_Version_2.3/How_To_Guides/Create_New_Profile.md): No verification step exists. What should the reader check?
- [ ] [Log Data to Cloud Influx](../docs/Profinity_Software/Profinity_Version_2.3/How_To_Guides/Log_Data_to_Cloud_Influx.md): `transmitter` is "currently always empty in Profinity 2.3": true of the shipped release?
- [ ] [Send Receive CAN Bus](../docs/Profinity_Software/Profinity_Version_2.3/How_To_Guides/Send_Receive_CAN_Bus.md): Desktop "runs as a built-in user that holds every permission": matches F1?
- [ ] [Set Up Profinity as Kiosk](../docs/Profinity_Software/Profinity_Version_2.3/How_To_Guides/Set_Up_Profinity_as_Kiosk.md): The macOS Automator path with escaped spaces and the Chrome and Chromium examples: confirm they work and are the only supported browsers.
- [ ] [Debug Dashboard Issues](../docs/Profinity_Software/Profinity_Version_2.3/How_To_Guides/Debug_Dashboard_Issues.md): Typed reference because it has no procedure. Keep, or move into the dashboard troubleshooting page?
- [ ] [Quick Start](../docs/Profinity_Software/Profinity_Version_2.3/Getting_Started/Quick_Start.md): `admin` / `password` on Windows with a Server licence is stated only here. The Change My Password path appears only here. The Example Profile "has three Elmar MPPTs" and BMS rules for Prohelion 12v and BMU: unverified.
- [ ] [2.3.1](../docs/Profinity_Software/Profinity_Version_2.3/Release_Notes/2.3.1.md): Breaking-change text names plugin SDK classes (`ManagedConnection`, `PolledDeviceController<TPoint>`, `DataSource.DefaultLocalSeriesTimeRangeStart`). Keep?

## 3. Decisions I made that need your approval
- [ ] **Not merged:** Adding components (15 inbound links), System logs (28), Visualising data (2) each do a distinct job, so merging would need about 45 link rewrites and redirects for little reader benefit. Confirm, or tell me to merge.
- [ ] **Release notes not split:** 28 of its heading anchors are linked from other pages, and the upgrade procedure was already moved to its own page.
- [ ] **Quick Start** is one linear Windows tutorial. The Linux and macOS steps were replaced by a link, after checking the Linux page states each fact. The Docker pointer and the "publicly documented credentials" rationale were restored.
- [ ] **Release-status wording removed** ("Early Adopter", "currently available for..."). The pages now assume general availability. The Linux and Docker install commands use GitHub release URLs, so they will not work until 2.3 is published there.
- [ ] **Heading case:** sentence case everywhere. Product and feature names keep their capitals through the linter's exception list in `.vale/styles/Prohelion/HeadingCase.yml`.
- [ ] **Attribution comment restored** on the Supported languages page (logo and Lua copyright). My own brief had told the writer to remove it.
- [ ] **FAQ:** all 22 question headings restored. One heading was reworded from "How do I use custom HTML?" to "How do I use the `html` component?" for the heading-case rule (old anchor changed, nothing links to it).
- [ ] **2.3 home page** (your text, my edits): "features" supplied after "other new 2.3", "powerful" became "richer", "impactful" became "biggest", the Rules link now points at the Rules page.
- [ ] **Components and Tags pages that mix jobs** were typed to the dominant job, not split.
- [ ] **Local git setting:** `core.excludesFile` is set to `/dev/null` in both the docs and code repos, so no global ignore rule applies. In the code repo this makes `Designs/` and `.claude/settings.local.json` appear as untracked. I did not touch the code repo's `.gitignore`.
- [ ] **Commits made in the docs repo** (branch `feature/Profinity_2_3`): `1183d5f`, `2307fe2`, `9d09cb7`, `d5daebe`, `6fa5868`, `5a7400a`. Approve, or tell me to revert any.

## 4. Open work I have not done
- [ ] **Structural proposals** from the writer reports: split Rules, Actions and Alerts (move action inheritance, dwell and deadband, rule state publishing), a shared overlay page for Image and Model, a Set up a Tag Relay task page, one InfluxDB historians page, moving Hosting and Theming overlaps, and others. Each changes URLs and needs redirects. Tell me which to do.
- [ ] **CI lint job:** `.github/workflows/ci.yml` only deploys from master, so nothing runs the linter. Decide whether to add a pull-request workflow.
- [ ] **Duplicate content kept on purpose** and recorded in the reports (token and 401/403 text on three pages, trigger overlap on four script pages, Custom Components DBC text on two pages).
- [ ] **`Camerons Document Review notes.md`** is untracked and untouched. Its items are mostly done; see section 6 of [docs-audit-2-3.md](docs-audit-2-3.md).

## 5. Added in waves 3 and 4 (structural moves and new content)
Status: written and independently reviewed, not yet approved by you. Detailed reports are in [wave3/](wave3/) and [wave4/](wave4/) .

### 5.1 Structural moves: check the content is where you expect it
- [ ] Rules, Actions and Alerts now have one job each: [Rules](../docs/Profinity_Software/Profinity_Version_2.3/Tags/Rules.md) holds dwell and deadband, rule evaluation and rule state publishing; [Actions](../docs/Profinity_Software/Profinity_Version_2.3/Tags/Actions.md) holds actions inherited down the rule tree; [Alerts](../docs/Profinity_Software/Profinity_Version_2.3/Tags/Alerts.md) holds alert levels. The worked-numbers sentence about a Warning on pack_temperature is deliberately on both Rules and Actions.
- [ ] [Overlay elements](../docs/Profinity_Software/Profinity_Version_2.3/Customising_Profinity/Dashboards/Component_Reference/Interactive/Overlay_Elements.md) is a new page holding the overlay tables Image and Model shared. Two tables only looked shared and are kept in two versions (Action invocation for overlays and for toggles, Annotation lines for Image and for Model). Toggles no longer holds its own action table: confirm you are happy that a Toggle reader follows a link.
- [ ] [Set up a tag relay](../docs/Profinity_Software/Profinity_Version_2.3/Components/Tag_Relays/Set_Up_a_Tag_Relay.md) is a new task page. Its seven steps are a faithful split of the original four (the wave 1 writer split them). Confirm the order, and that step 6 should read "If Auto Connect is off, select Start Sender".
- [ ] [InfluxDB historians](../docs/Profinity_Software/Profinity_Version_2.3/Components/Historians/InfluxDB_Historians.md) replaces the v2 and v3 pages. The old URLs redirect (checked in the build). Confirm there is no v2 or v3 difference the merge flattened. Settings are shown once with the v2 (Bucket, Organisation) and v3 (Database) differences in one table.

### 5.2 New content: the pages say only what existing pages already said. Check they are useful and true
- [ ] [Make your first API call](../docs/Profinity_Software/Profinity_Version_2.3/Integrating_to_Profinity/First_API_Call.md) is a new tutorial. It still lists "the full path of a tag" as a prerequisite but no existing page says how to find one, which permission the call needs, or what the response looks like. Product answers needed before it is a complete tutorial. The example body uses admin and password, which conflicts with the first admin sign-in forcing a password change.
- [ ] [Write your first script](../docs/Profinity_Software/Profinity_Version_2.3/How_To_Guides/Write_Your_First_Script.md) is now a pure first-run tutorial and [Script examples](../docs/Profinity_Software/Profinity_Version_2.3/Developing_with_Profinity/Scripting/Script_Examples.md) holds the examples. All 8 code blocks and tabs are present once. There is still no Lua tab.
- [ ] [Logging modes](../docs/Profinity_Software/Profinity_Version_2.3/Components/Logging_Modes.md) defines the three modes once. A reviewer found On Change contradicted by the DBC notification mode text, which is fixed by an exception sentence. The Auto Connect and interval-name differences between components are shown in a table, not resolved.
- [ ] Comparison tables on the Loggers, Historians, Publishers and subscribers, and Industrial protocols landing pages. Every cell was checked against its component page, but a wrong cell would mislead a reader, so check each table.
- [ ] The Components left menu now lists Connections and reconnecting and Logging modes at the top (the Connections page was previously missing from the menu).

### 5.3 Consolidation (not done, awaiting your approval)
Measured result: only 25 sentences of 70 characters or more still repeat word for word across the whole site. Most are legitimate sibling templates, procedural steps or warnings that belong where the reader acts. Proposal in consolidation-proposal.md.
- [ ] Approve or reject the consolidation proposal.
