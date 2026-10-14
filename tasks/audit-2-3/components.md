# Components/ documentation structure audit (Profinity 2.3)

**Scope:** all 29 `.md` pages under `Components/` in `Profinity_Version_2.3/`. Read-only audit. No docs were edited.
**Method:** read every page in full or by heading. Checked duplicate phrases with `grep -rF` across the whole Profinity_Version_2.3 tree. Checked relative links (all resolve). Checked folders for index pages.
**Rules applied:** STYLE_GUIDE.md sections 1 (front matter, page types, heading hierarchy), 5 (lists and procedures), and the component page shape. Reviewer notes applied where they concern Components/ (see "Reviewer notes status" below).

**Word counts** are approximate, from `wc -w`, and include front matter.
**TITLE_CASE_HEADINGS** counts are a heuristic (H2 to H4 headings with multiple capitalised words). They include "Related Documentation" and "Connection Settings"-style headings, which are title case under the sentence-case rule. Treat as approximate.

**Front matter:** none of the 29 pages has a `type:`, `owner:` or `last_reviewed:` field. Every page has `title` and `description` only. So every declared_type is `none`.

---

## Page audit table

Issue codes follow the brief. `OTHER:` notes are short free text.

| path (rel. to docs root) | words | current_type | declared_type | issues | recommended_action |
|---|---|---|---|---|---|
| Components/Battery_Management_Systems/index.md | 1548 | mixed: category index + component + reference + task (firmware) | none | MIXED_TYPES:reference,task,concept; TOO_LONG_SPLIT; MISSING_QUICKSTART; MISSING_TAGS_SECTION; MISSING_EXAMPLE; MISSING_TROUBLESHOOTING; NO_DIAGRAM_BUT_NEEDS_ONE; TASK_NOT_NUMBERED (firmware flashing is prose); TITLE_CASE_HEADINGS (~2); OTHER:category index used as a component page; model table links 3 of 6 models | SPLIT_INTO:Battery_Management_Systems/index (overview and model table), BMU (component), BMU_Configuration_and_Admin_Unlock (task), BMU_Firmware_Flashing (task) |
| Components/CAN_Bus_Protocols/CAN_Bus_Adapters.md | 1495 | mixed: reference (per-adapter parameters) + task (add) + troubleshooting + concept (bit rate, bridge bus numbers) | none | MIXED_TYPES:reference,task,troubleshooting,concept; TOO_LONG_SPLIT; MISSING_QUICKSTART; NO_DIAGRAM_BUT_NEEDS_ONE; MISSING_EXAMPLE; OTHER:no index.md in CAN_Bus_Protocols; OTHER:settings tables have no Type column; OTHER:adapter names differ from the Virtual page title ("Tritium Can to Ethernet Bridge" casing); TITLE_CASE_HEADINGS (~3) | SPLIT_INTO:CAN_Adapters/index (adapter table), Adapter_Auto_Discovery (task), Adapter_Settings (reference per adapter), Adapter_Status (troubleshooting). Bit-rate and bridge bus-number text goes to a concept page |
| Components/CAN_Bus_Protocols/Virtual_CAN_Adapter.md | 905 | mixed: component settings + concept (multi-protocol V1/V2, multi-client TCP) | none | MIXED_TYPES:component,concept; MISPLACED:V1/V2 and multi-client sections describe bridge behaviour, not this component; DUPLICATE_OF:Components/CAN_Bus_Protocols/CAN_Bus_Adapters.md (bus-number warning, paraphrased); MISSING_QUICKSTART; MISSING_EXAMPLE; MISSING_TROUBLESHOOTING (one sentence only); OTHER:states no tags produced, which should be stated in a Tags section; OTHER:no Type column in settings table; TITLE_CASE_HEADINGS (~4) | SPLIT_INTO:Virtual_CAN_Adapter (component: settings, quick start, troubleshooting) and MOVE_TO:Solar_Car_Racing/CAN_Ethernet_Bridge (multi-protocol and multi-client concept). Keep the four topology figures with the concept |
| Components/Chargers_and_Power/index.md | 1679 | mixed: concept (charge control rationale) + reference (settings) + task (start a charge) + troubleshooting | none | MIXED_TYPES:concept,reference,task,troubleshooting; TOO_LONG_SPLIT; MISSING_QUICKSTART; MISSING_TAGS_SECTION; MISSING_EXAMPLE; NO_DIAGRAM_BUT_NEEDS_ONE (charge sequence: charger, BMU, precharge, engage); NO_VERIFY_STEP (start-a-charge steps end at "Press START" with no check of the result); TITLE_CASE_HEADINGS (~6); OTHER:category named "Chargers & Power Supplies" but page title "Chargers and Power Supplies"; OTHER:top paragraph is a long concept lead-in before any task | SPLIT_INTO:Chargers/index (overview, types, pre-reqs), Charger_Settings (reference), Start_a_Charge (task with verify step), Charge_Troubleshooting (message table). Move the D1000 control rationale to a link to the BMS concept |
| Components/Cloud_Dashboard/index.md | 555 | component | none | MISSING_TAGS_SECTION; MISSING_EXAMPLE; NO_DIAGRAM_BUT_NEEDS_ONE (data path to cloud); TITLE_CASE_HEADINGS (~2); MISPLACED:single component at Components root, not in a category; OTHER:product-positioning paragraph ("Rules, Dashboards and Tag Relays cover many functions") will go stale and belongs in a concept or release note; OTHER:settings table is the closest to the target layout (Name, Default, Notes) | KEEP (conform to template). MOVE_TO:Components/Cloud/Prohelion_Cloud_Dashboard.md if the Cloud category is created (see catalogue) |
| Components/Connections_and_Reconnecting.md | 660 | concept (shared behaviour and status model) | none | MISPLACED:sits at Components root; no category; WEAK_TITLE (a reader searching "offline" or "reconnect" will not expect this title; "How connections start, fail and recover" is clearer); NO_DIAGRAM_BUT_NEEDS_ONE (Off/On/Error state diagram); TITLE_CASE_HEADINGS (~4); OTHER:conflicts with BACnet page on log level (this page: first read or write failure is a warning; BACnet: point read failures are debug). One is wrong. Verify before fixing; OTHER:names Rinstrum, which has no page in this section; OTHER:status colours on the CAN adapter page (grey, yellow, red) are not reconciled with the Off/On/Error model here | MOVE_TO:Components/Common_Behaviour/Connections_and_Reconnecting.md (concept) and rename. Add cross-links from each component. Resolve the log-level conflict |
| Components/Custom_Components/index.md | 737 | concept (overview) with partial reference (DBC and dashboard capability) | none | MIXED_TYPES:concept,reference; MISSING_QUICKSTART; MISSING_SETTINGS_TABLE (Pack files, Scripts and Security are described in prose); MISSING_TAGS_SECTION; MISSING_EXAMPLE; MISSING_TROUBLESHOOTING; NO_DIAGRAM_BUT_NEEDS_ONE (component-type comparison); TITLE_CASE_HEADINGS (~1); OTHER:reviewer asked for the DBC and Dashboards sections to become links to the capability pages. Only partly done: "Optional Capabilities" still explains DBC parse failure and the Rebase DBC setting; OTHER:"Distributing as a Plugin" overlaps the authoring guide under Developing_with_Profinity/Custom_Components | REWRITE_TO_TYPE:component. Trim DBC and dashboard text to one-line summaries with links. Move the plugin distribution steps to the authoring guide and link |
| Components/Dashboard/index.md | 331 | component (thin) | none | MISSING_QUICKSTART (partial); MISSING_SETTINGS_TABLE (one setting, in prose); MISSING_TAGS_SECTION; MISSING_EXAMPLE (binding example is prose only); MISSING_TROUBLESHOOTING; NO_DIAGRAM_BUT_NEEDS_ONE; TITLE_CASE_HEADINGS (~2); OTHER:the "Visual Editor" screenshot is useful and should stay | KEEP (expand to the component template). Keep the absolute-path tag binding example |
| Components/Historians/InfluxDB_v2_Historian.md | 594 | component | none | DUPLICATE_OF:Components/Historians/InfluxDB_v3_Historian.md (near-identical intro, warning, settings, log messages, related links); DUPLICATE_OF:Components/Loggers/InfluxDB_Prometheus_Logger.md (Health Check and Cloud warning; Logging mode row); NO_DIAGRAM_BUT_NEEDS_ONE (write and read path); MISSING_QUICKSTART; MISSING_TAGS_SECTION; MISSING_EXAMPLE; OTHER:troubleshooting is a paragraph inside "Adding" and not a section | KEEP. Remove the duplicated Cloud and Logging mode text and link to one canonical place |
| Components/Historians/InfluxDB_v3_Historian.md | 577 | component | none | DUPLICATE_OF:Components/Historians/InfluxDB_v2_Historian.md; DUPLICATE_OF:Components/Loggers/InfluxDB_Prometheus_Logger.md; NO_DIAGRAM_BUT_NEEDS_ONE; MISSING_QUICKSTART; MISSING_TAGS_SECTION; MISSING_EXAMPLE; OTHER:troubleshooting inline as in v2 | KEEP. Dedupe as for v2. Consider one shared InfluxDB historian page with two settings tables if the duplication is judged too high |
| Components/Historians/TAG_SQL_Historian.md | 899 | component + reference (table layout, connection strings) + troubleshooting | none | MIXED_TYPES:component,reference; NO_DIAGRAM_BUT_NEEDS_ONE; MISSING_QUICKSTART; MISSING_TAGS_SECTION (the Table Layout partly covers this; needs a tags-produced statement); DUPLICATE_OF:Components/Loggers/InfluxDB_Prometheus_Logger.md (Logging mode and DBC Notification Mode definitions); TITLE_CASE_HEADINGS (~6); OTHER:"Moving a Component Starts a New History" is concept text sitting in a troubleshooting area | KEEP. Keep table layout and connection strings as the component's reference section. Move the history-path warning under a concept link |
| Components/Historians/index.md | 484 | category index with concept lead-in and decision table | none | DUPLICATE_OF:Components/Loggers/InfluxDB_Prometheus_Logger.md (version-choice paragraph and "logger versus historian" paragraph); TITLE_CASE_HEADINGS (~2); OTHER:reviewer diagram request is met (shared data-out figure present); OTHER:"Which InfluxDB Component Do I Need" is a decision guide placed in an index; a short table would serve better | KEEP. Use a version-to-component table and link to the Loggers page for v1. Change the heading to sentence case |
| Components/Industrial_Protocols/BACnet.md | 1050 | component | none | DUPLICATE_OF:Components/Industrial_Protocols/Modbus.md (licence callout, Dashboard section, "Polled values behave like any other tag" paragraph, reconnect text); MISSING_QUICKSTART; MISSING_SETTINGS_TABLE (no Type or Default column, defaults in cells); MISSING_TAGS_SECTION (point map is implied tags; state tags produced); MISSING_EXAMPLE; NO_DIAGRAM_BUT_NEEDS_ONE; TITLE_CASE_HEADINGS (~3); OTHER:"If a Point Shows Bad Quality" is one 200-word paragraph; OTHER:version callout ("Profinity 2.3 Supports BACnet/IP Only") is release-note content | KEEP. Use Modbus as the shape model, then add the template sections |
| Components/Industrial_Protocols/EtherNet_IP.md | 910 | component | none | DUPLICATE_OF:Components/Industrial_Protocols/Modbus.md (boilerplate as BACnet); MISSING_QUICKSTART; MISSING_SETTINGS_TABLE; MISSING_TAGS_SECTION; MISSING_EXAMPLE; NO_DIAGRAM_BUT_NEEDS_ONE; TITLE_CASE_HEADINGS (~3); OTHER:default Data type is Dword, while Modbus and S7 default to Word. Confirm this is intended; OTHER:version callout ("Profinity 2.3 Reads Tags by Name") is release-note content | KEEP |
| Components/Industrial_Protocols/Modbus.md | 984 | component | none | DUPLICATE_OF:Components/Industrial_Protocols/BACnet.md; MISSING_QUICKSTART; MISSING_SETTINGS_TABLE (has Applies-to column; no Type or Default); MISSING_TAGS_SECTION; MISSING_EXAMPLE; NO_DIAGRAM_BUT_NEEDS_ONE; TITLE_CASE_HEADINGS (~3); OTHER:Dashboard section links "a dashboard" to ../Dashboard/index.md (the Dashboard Component page), not to the dashboards concept; OTHER:version callout ("Profinity 2.3 Supports Modbus Master Only") is release-note content | KEEP. Best protocol-page model (point map, Applies-to column, bad-quality causes) |
| Components/Industrial_Protocols/OPC_UA.md | 1326 | mixed: two components (client, server) + certificates reference + shared dashboard boilerplate | none | MIXED_TYPES:component,component,reference; TOO_LONG_SPLIT; MISSING_QUICKSTART; MISSING_TAGS_SECTION; MISSING_EXAMPLE; NO_DIAGRAM_BUT_NEEDS_ONE; DUPLICATE_OF:Components/Industrial_Protocols/S7.md (symbolic-tag advice, phrased in both); DUPLICATE_OF:Components/Industrial_Protocols/Modbus.md (dashboard and polled-values boilerplate); TITLE_CASE_HEADINGS (~7); OTHER:"Listening Address" explains what older versions saved as the default. That is version history; OTHER:certificate folder paths for three platforms are reference content in a component page | SPLIT_INTO:OPC_UA_Client (component), OPC_UA_Server (component), OPC_UA_Certificates (reference) |
| Components/Industrial_Protocols/S7.md | 1010 | component | none | DUPLICATE_OF:Components/Industrial_Protocols/Modbus.md (boilerplate); MISSING_QUICKSTART; MISSING_SETTINGS_TABLE; MISSING_TAGS_SECTION; MISSING_EXAMPLE; NO_DIAGRAM_BUT_NEEDS_ONE; TITLE_CASE_HEADINGS (~3); OTHER:PLC prerequisites (Put/Get, optimised blocks) sit in a warning box and not in a Prerequisites section before the first step; OTHER:the "S7 PLC" component name differs from the page title "S7" | KEEP. Move prerequisites into a labelled section |
| Components/Industrial_Protocols/index.md | 466 | category index (concept lead-in and table) | none | DUPLICATE_OF:the licence callout in all five protocol pages; TITLE_CASE_HEADINGS (~2); OTHER:the "Typical Use" column is useful; keep it. The Industrial Protocols licence and installation story should live once, here or in a shared concept page | KEEP |
| Components/Loggers/File_Loggers.md | 1247 | mixed: four components (CAN file, CAN SFTP, Tag file, Tag SFTP) + shared reference (SFTP, archive, rotation) + task (download) | none | MIXED_TYPES:component x4,reference,task; TOO_LONG_SPLIT; MISSING_QUICKSTART; MISSING_TROUBLESHOOTING (one SFTP sentence); MISSING_TAGS_SECTION (tag loggers describe the CSV header fields, which belongs in a tags or output section); MISSING_EXAMPLE; TITLE_CASE_HEADINGS (~7); DUPLICATE_OF:Components/Loggers/InfluxDB_Prometheus_Logger.md (Logging mode definitions); DUPLICATE_OF:Components/Publishers_and_Subscribers/MQTT_Publisher.md (Logging mode definitions, again); OTHER:file name "File_Loggers" does not match title "File and Tag Loggers"; OTHER:Update Interval range (10 to 86400) differs from the InfluxDB Logging Interval (minimum 1) | SPLIT_INTO:Loggers/CAN_File_and_SFTP_Loggers (component), Loggers/Tag_File_and_SFTP_Loggers (component), Loggers/Log_Archive_and_Rotation (reference, shared), Loggers/Download_Logs (task) |
| Components/Loggers/InfluxDB_Prometheus_Logger.md | 1192 | mixed: concept (logging modes) + component (InfluxDB v1 Logger) + component (Prometheus Logger) | none | MIXED_TYPES:concept,component,component; TOO_LONG_SPLIT; MISPLACED:two unrelated components on one page; MISSING_QUICKSTART; MISSING_TAGS_SECTION; MISSING_EXAMPLE (Prometheus has a URL only); MISSING_TROUBLESHOOTING (v1 has none; Prometheus has one paragraph); DUPLICATE_OF:Components/Historians/InfluxDB_v2_Historian.md (Match the Component warning; Health Check Cloud warning); TITLE_CASE_HEADINGS (~2); OTHER:reviewer note partly met. The page now says v2 and v3 are historians, but it is still titled as one logging page and mixes two loggers; OTHER:the Logging Modes section is the canonical definition, referenced by six other pages | SPLIT_INTO:Loggers/InfluxDB_v1_Logger (component), Loggers/Prometheus_Logger (component), Loggers/Logging_Modes (concept, canonical) |
| Components/MPPT/index.md | 627 | component | none | MISSING_QUICKSTART (settings are prompted at add; say so as a quick start); MISSING_SETTINGS_TABLE (Parameter, Description, Default; no Type); MISSING_TAGS_SECTION; MISSING_EXAMPLE; MISSING_TROUBLESHOOTING; NO_DIAGRAM_BUT_NEEDS_ONE (CAN data path); DUPLICATE_OF:Components/Battery_Management_Systems/index.md (add-device sentence and Change Settings sentence); TITLE_CASE_HEADINGS (~1); OTHER:component page named index.md inside a folder with no category page; OTHER:MPPT Events colour table is reference content in a component page | KEEP. MOVE_TO:Components/Devices/Elmar_Solar_MPPT.md (catalogue naming) |
| Components/Motor_Controller/index.md | 1285 | mixed: component + reference (limit and error tables) + task (configure) + task (flash) | none | MIXED_TYPES:component,reference,task,task; TOO_LONG_SPLIT; MISSING_QUICKSTART; MISSING_SETTINGS_TABLE (no Type or Default); MISSING_TAGS_SECTION; MISSING_EXAMPLE; MISSING_TROUBLESHOOTING (one inline "If the dashboard shows no data" paragraph); NO_DIAGRAM_BUT_NEEDS_ONE; NO_VERIFY_STEP (Setup and Config is a three-step sequence with no check that the configuration succeeded); TASK_NOT_NUMBERED (flashing is one prose paragraph); DUPLICATE_OF:Components/Battery_Management_Systems/index.md (parallel "Updating the configuration" and "Flashing the firmware" sections); OTHER:Windows-only warning is good but sits in the middle of the task | SPLIT_INTO:Devices/WaveSculptor (component), WaveSculptor_Limits_and_Errors (reference), Configure_WaveSculptor (task), Flash_WaveSculptor_Firmware (task) |
| Components/Publishers_and_Subscribers/MQTT_Publisher.md | 1099 | component | none | DUPLICATE_OF:Components/Publishers_and_Subscribers/Webhook_Publisher.md ("rather than Loggers" rationale, Logger Settings table, trigger modes); DUPLICATE_OF:Components/Connections_and_Reconnecting.md (retry and outage text, paraphrased); DUPLICATE_OF:Components/Loggers/InfluxDB_Prometheus_Logger.md (Logging mode definitions, restated); MISSING_QUICKSTART; MISSING_TAGS_SECTION (publisher consumes collections; say so); MISSING_EXAMPLE (no sample JSON or Sparkplug topic example in the settings path); NO_DIAGRAM_BUT_NEEDS_ONE (data path to broker); TITLE_CASE_HEADINGS (~5); OTHER:"Logger Settings" heading on a publisher page, misleading; OTHER:"Profinity 2.3 renamed the component from MQTT Logger" is release-note content; OTHER:"In both modes" in the Status section has no referent | KEEP. Rename the heading to "Collection and trigger settings" |
| Components/Publishers_and_Subscribers/MQTT_Subscriber.md | 1264 | mixed: component + concept (Sparkplug behaviour) | none | MIXED_TYPES:component,concept; TOO_LONG_SPLIT; MISSING_QUICKSTART; MISSING_TROUBLESHOOTING (inline in Status); NO_DIAGRAM_BUT_NEEDS_ONE (Sparkplug-to-tag path); DUPLICATE_OF:Components/Connections_and_Reconnecting.md ("Reconnection" section); DUPLICATE_OF:Components/Tag_Relays/index.md (Tag Relay versus Sparkplug callout); TITLE_CASE_HEADINGS (~12, heuristic); OTHER:read-only tag warning restated from Tag Relay Receiver in different words | SPLIT_INTO:Publishers_and_Subscribers/MQTT_Subscriber (component), Sparkplug_Behaviour (concept) |
| Components/Publishers_and_Subscribers/Webhook_Publisher.md | 953 | component | none | DUPLICATE_OF:Components/Publishers_and_Subscribers/MQTT_Publisher.md (Logger Settings and trigger modes); MISSING_QUICKSTART; MISSING_TAGS_SECTION (exposes LastDeliverySuccess and LastDeliveryError, but in a sub-table, not a Tags section); NO_DIAGRAM_BUT_NEEDS_ONE; TITLE_CASE_HEADINGS (~6); OTHER:"Destination Addresses Are Not Restricted" is a useful security warning. Keep it | KEEP. Best sibling for payload example, authentication table and delivery health |
| Components/Publishers_and_Subscribers/index.md | 365 | category index with decision table | none | DUPLICATE_OF:Components/Publishers_and_Subscribers/MQTT_Publisher.md (rationale for category placement); DUPLICATE_OF:Components/Publishers_and_Subscribers/MQTT_Subscriber.md (Tag Relay callout); NO_DIAGRAM_BUT_NEEDS_ONE (direction of data for the three components); OTHER:category named "Publishers & Subscribers" in the product, but the page title is "Publishers and Subscribers"; OTHER:licence callout repeated on each child page | KEEP. Remove the repeated rationale text and align the category name |
| Components/Tag_Relays/Tag_Relay_Receiver.md | 956 | component | none | DUPLICATE_OF:Components/Tag_Relays/Tag_Relay_Sender.md (MQTT settings table, Trust all server certificates, client ID, credentials, snapshot topic rows); DUPLICATE_OF:Components/Tag_Relays/index.md (diagram and "How the components fit together"); DUPLICATE_OF:Tags/Tag_Relay.md (collision and read-only rules); MISSING_QUICKSTART (lives only on index); MISSING_EXAMPLE (prefix example is prose only); TITLE_CASE_HEADINGS (~5); OTHER:Auto Connect sits under "MQTT Settings" but also applies to the HTTPS protocol choice | KEEP. Reuse Sender as the layout model |
| Components/Tag_Relays/Tag_Relay_Sender.md | 1063 | component | none | DUPLICATE_OF:Components/Tag_Relays/Tag_Relay_Receiver.md (MQTT settings and certificates); DUPLICATE_OF:Components/Tag_Relays/index.md (sender prefix example and diagram); DUPLICATE_OF:Tags/Tag_Relay.md (snapshot interval default and collision rules); MISSING_QUICKSTART; MISSING_TAGS_SECTION (exports tags; state that tags are read, not produced); MISSING_EXAMPLE; TITLE_CASE_HEADINGS (~6); OTHER:Troubleshooting is organised by symptom and status code, which is the right shape | KEEP. Best overall component model in this section |
| Components/Tag_Relays/index.md | 565 | mixed: concept (how components fit) + task (Setting Up a Relay) | none | MIXED_TYPES:concept,task; MISPLACED:setup procedure belongs in its own task page; NO_PREREQS (needs collections, the Receive external tags permission, and the Data Relay licence stated as a list before step 1); TASK_NOT_NUMBERED (steps 2 and 3 each contain several actions); DUPLICATE_OF:Components/Publishers_and_Subscribers/MQTT_Subscriber.md (not the same feature callout); DUPLICATE_OF:Tags/Tag_Relay.md (How the components fit together); TITLE_CASE_HEADINGS (~3); OTHER:reviewer note asks for a rewrite of this page, not yet done | SPLIT_INTO:Tag_Relays/index (overview and concept), Tag_Relays/Set_Up_a_Tag_Relay (task with prerequisites, one action per step, and a verify step) |

---

## Proposed component catalogue

### Problems the current layout causes

- Two categories have no index page: `CAN_Bus_Protocols/` and `Loggers/`.
- Four component pages are named `index.md` (BMS, Chargers, MPPT, Motor Controller). Several folders therefore contain only one component, and the folder name does not say what the page is.
- Two pages sit loose at the root of `Components/` (`Connections_and_Reconnecting.md`, `Cloud_Dashboard/`). They are not in a category.
- Category names in the product and in page titles disagree: "Publishers & Subscribers" versus "Publishers and Subscribers", and "Chargers & Power Supplies" versus "Chargers and Power Supplies".
- Three pages (`InfluxDB_Prometheus_Logger`, `File_Loggers`, `OPC_UA`) each hold two to four components. Two others (`Battery_Management_Systems`, `Motor_Controller`) hold a component plus its tasks and reference tables.
- Licence, installation, dashboard-permission and reconnect boilerplate is repeated on about 12 pages. It should be stated once per category or in a common concept page.

### Proposed top-level layout

```
Components/
  index.md                          Overview: what a component is, the categories, how to add one (links to the task)
  Common_Behaviour/
    Connections_and_Reconnecting.md Concept: Auto Connect, status (Off/On/Error), retry timing, logs
    Logging_Modes.md                Concept and canonical reference: Snapshot, On Change, Everything
  Loggers/
    index.md                        NEW category page: logger comparison table
    CAN_File_and_SFTP_Loggers.md
    Tag_File_and_SFTP_Loggers.md
    Log_Archive_and_Rotation.md     Reference, shared by file loggers
    Download_Logs.md                Task
    InfluxDB_v1_Logger.md
    Prometheus_Logger.md
  Historians/
    index.md                        Decision table (which InfluxDB or SQL component)
    InfluxDB_v2_Historian.md
    InfluxDB_v3_Historian.md
    TAG_SQL_Historian.md
    Designated_Reader.md            Concept: one historian serves long-range queries (optional; currently in index)
  Publishers_and_Subscribers/
    index.md                        Category table and direction of data
    MQTT_Publisher.md
    Webhook_Publisher.md
    MQTT_Subscriber.md
    Sparkplug_Behaviour.md          Concept, split from subscriber
  Tag_Relays/
    index.md                        Overview and concept (rewritten per reviewer note)
    Set_Up_a_Tag_Relay.md           Task
    Tag_Relay_Sender.md
    Tag_Relay_Receiver.md
  Industrial_Protocols/
    index.md                        Category table, licence and install in one place
    Common_Settings_and_Point_Maps.md  Concept: shared reconnect, poll, timeout, quality model
    BACnet.md
    EtherNet_IP.md
    Modbus.md
    S7.md
    OPC_UA_Client.md
    OPC_UA_Server.md
    OPC_UA_Certificates.md          Reference
  CAN_Adapters/                     Renamed from CAN_Bus_Protocols
    index.md                        NEW: adapter table and selection guide
    Adapter_Auto_Discovery.md       Task
    Adapter_Settings.md             Reference (per adapter)
    Adapter_Status.md               Troubleshooting
    Virtual_CAN_Adapter.md          Component (concept moved to Solar_Car_Racing)
  Devices/                          Built-in device components
    index.md                        NEW: device overview (optional)
    Battery_Management_Systems/
      index.md                      Overview and model table (all six models linked)
      BMU.md                        Component
      BMU_Configuration_and_Admin_Unlock.md  Task
      BMU_Firmware_Flashing.md      Task
    Chargers/
      index.md                      Overview and supported chargers
      Charger_Settings.md           Reference
      Start_a_Charge.md             Task
      Charge_Troubleshooting.md
    Elmar_Solar_MPPT.md
    WaveSculptor.md
    WaveSculptor_Limits_and_Errors.md  Reference
    Configure_WaveSculptor.md          Task
    Flash_WaveSculptor_Firmware.md     Task
  Dashboards_and_Custom/
    Dashboard_Component.md
    Custom_Component.md             Component page (reviewer note: DBC and dashboard detail by link)
  Cloud/
    Prohelion_Cloud_Dashboard.md
```

Notes:
- `Devices/` is a proposal. It is needed because three device pages are currently named `index.md`. The alternative is to keep the device folders and rename their pages to match the component name.
- Keep the file names in `Title_Case_With_Underscores`, which matches the existing component files. The title inside each page is sentence case.
- Each category index page gets the same four sections: what the category holds, a comparison table, licence, and related pages.

### Comparison table design (category pages)

Use one table per category, with these columns:

| Column | Content | Example |
|---|---|---|
| Component | Linked name, as shown in ADD COMPONENT | MQTT Publisher |
| Direction | In, Out, Both, or Internal | Out |
| Transport and protocol | Short list | MQTT, JSON or Sparkplug B |
| Selects data by | Collections, Points, CAN signals, None | Collections |
| Licence | Feature name and editions | Data Relay: Server, Enterprise |
| Auto Connect default | On or Off | On |
| Retry interval | Fixed value or setting name | 5 s, or Reconnect delay (ms) |
| Diagram | Yes or No | Yes |

Keep the table to eight columns. Put any row-level detail on the component page, not in the table.

### Settings table design (component pages)

| Column | Content |
|---|---|
| Name | The label as shown in the UI, in bold |
| Type | Text, Integer (min to max), Boolean, Choice (list), Secret (stored encrypted), Collection |
| Default | Value, or None when required |
| Effect | One sentence on what changes |

Use a separate "Required" marker in the Name column, not a separate column. No current component page has a Type column, so every page will change in this respect.

### Component page template (apply to every component)

1. Front matter with `type: component`, `owner`, `last_reviewed`.
2. One-sentence purpose and category.
3. Licence line (one line, linked).
4. Data-flow diagram (one per component, not a shared category figure).
5. Quick start (minimum configuration, in a numbered list, with a verify step).
6. Settings table (Name, Type, Default, Effect).
7. Tags produced or consumed.
8. Status states and what each means.
9. Example configuration.
10. Troubleshooting (by symptom, three most likely causes).
11. Related components.

### Components with inconsistent structure, and the best model page to follow

**Best model pages (use these as the template):**
- Overall shape and troubleshooting by symptom: `Components/Tag_Relays/Tag_Relay_Sender.md`.
- Settings table with Default and Notes columns: `Components/Cloud_Dashboard/index.md`, with the default and effect columns from `Components/Historians/InfluxDB_v2_Historian.md`.
- Payload example, authentication table and delivery health with tags exposed: `Components/Publishers_and_Subscribers/Webhook_Publisher.md`.
- Protocol point maps (Applies-to column, bad-quality causes): `Components/Industrial_Protocols/Modbus.md`.

**Inconsistent pages, compared with the model:**

| Page | Differences from the model |
|---|---|
| Industrial_Protocols: BACnet, EtherNet_IP, Modbus, S7, OPC_UA | Use Modbus as model. No quick start, no diagram, no Type or Default column, no tags section, no example. BACnet, EtherNet/IP, Modbus and S7 repeat the same boilerplate. OPC_UA holds two components and a reference page. |
| Historians: InfluxDB_v2, InfluxDB_v3 | Use Tag_Relay_Sender for layout. No diagram, no quick start, no tags section. Troubleshooting is a paragraph, not a section. Near-duplicate of each other. |
| Historians: TAG_SQL | Use Tag_Relay_Sender for layout. No diagram, no quick start, no tags section. Reference tables are mixed in with the component. |
| Loggers: File_Loggers | Four components on one page. No quick start, no diagram of its own (shares a category figure), no troubleshooting section. |
| Loggers: InfluxDB_Prometheus_Logger | Two components and a concept on one page. No quick start. Prometheus has no example config. |
| Publishers: MQTT_Publisher | Use Webhook_Publisher for settings and examples. "Logger Settings" heading is wrong for a publisher. No diagram, no quick start, no example. |
| Publishers: MQTT_Subscriber | Use Webhook_Publisher for examples. Sparkplug behaviour is a concept mixed into the component. Troubleshooting is in Status. No diagram. |
| Tag_Relays: index | Use Tag_Relay_Sender for the component layout. This page is a concept and a task; the task should move. |
| Tag_Relays: Tag_Relay_Receiver | Use Tag_Relay_Sender as the model. Reasonable, but no example config and no quick start. |
| CAN_Bus_Protocols: CAN_Bus_Adapters | Use Tag_Relay_Sender for layout. Multi-adapter reference, task and troubleshooting on one page. No quick start. No tags statement. |
| CAN_Bus_Protocols: Virtual_CAN_Adapter | Use Cloud_Dashboard for the settings table. Concept sections (V1/V2, multi-client) make it a bridge explainer. No troubleshooting section. |
| Chargers_and_Power/index | Use Cloud_Dashboard for the settings table. Start-a-charge is a task with no verify step. Concept, reference, task and troubleshooting on one page. |
| Battery_Management_Systems/index | Use Tag_Relay_Sender for layout. Category index used as a component. Firmware procedures are tasks inside the component. Model table links only three of six models. |
| Motor_Controller/index | Use Tag_Relay_Sender for layout. Limit and error reference tables are inside the component. Flashing and configuring are tasks in prose. No Default column. |
| MPPT/index | Use Cloud_Dashboard for the settings table (it is the closest, with Parameter, Description and Default). No troubleshooting, no tags section, no example, no diagram. Named index.md. |
| Dashboard/index | Use Cloud_Dashboard for the settings table. Thin: one setting in prose, no troubleshooting, no tags section. |
| Custom_Components/index | Use Tag_Relay_Sender for layout. Reads as a concept overview. Settings (Pack files, Scripts, Security) are in prose. |
| Connections_and_Reconnecting | Concept, so it does not follow the component template. Its state and retry tables are the reference that component pages should link to. |

---

## Reviewer notes status (Components/ only)

| Reviewer note | Status in this section |
|---|---|
| InfluxDB and Prometheus logging: clarify that v2 and v3 are historians | Partly met. Text now says so. The page still mixes two loggers and a concept. Split recommended. |
| Diagram on File, Tag and Historians | Met for File loggers and Historians index (shared category figure). Not met per component. |
| Tag Relays rewrite | Not met. Index still mixes concept and task. Split recommended. |
| Tag Relay images | Met (diagram on index, sender and receiver). The same figure repeats three times. |
| Custom Components index: DBC and Dashboard sections | Partly met. Sections still explain DBC parse failure and the Rebase DBC setting. Trim to links. |

Not in this section but noted: the M48 Gen1 terminating-resistor note belongs to the M48 Gen1 procedure page. The BMS page links to it from its "Flashing" section, and the reviewer's point affects that link.

---

## Section-level observations

- The single biggest structural issue is the mix of types. Of 29 pages, about 14 combine two or more types (component, reference, concept, task, troubleshooting). Splitting the eight longest of these would address most of the length problem.
- Duplication is high and concentrated. Industrial boilerplate appears on five pages. Logging-mode definitions are restated on about eight pages, although the InfluxDB and Prometheus page is meant to be the canonical version. The "rather than Loggers" rationale appears on two publisher pages and again on the category page. The InfluxDB Cloud health-check warning appears on three pages.
- Structure does not follow the component template. No page has a Type column or a tags section. Only a few pages (Cloud Dashboard, the two InfluxDB historians, Chargers) have a Default column. Quick starts are missing across the section.
- Two folders need index pages (`Loggers/`, `CAN_Bus_Protocols/`), and four component pages should be renamed or moved so that each folder reads as a category.
- The category names in the product ("Publishers & Subscribers", "Chargers & Power Supplies") do not match the page titles. Align them once.
- Version callouts ("Profinity 2.3 Supports ...", "renamed from MQTT Logger", "older versions saved as the default") are release-note content. They should move to the release notes, or be stated once as a plain fact.
- Two claims conflict and need checking before any rewrite: the log level for read failures (Connections page says warning; BACnet page says debug), and the EtherNet/IP default Data type (Dword) against Modbus and S7 (Word).
- The shared "Data out of Profinity" figure is used on three pages (Historians index, File Loggers, InfluxDB and Prometheus Logging). It is useful at category level, but component pages (historians, loggers, publishers) still need their own data-flow diagram, as the component template requires.
