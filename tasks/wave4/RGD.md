# Review: Components/Logging_Modes.md (new concept page)

Verdict: FIX. No invented component, number or name. Two wording statements are wider than their sources (F1, F2), and a few smaller points need tidying. Lint: page 0 errors, 0 warnings (3 SerialComma info notes on lines 16, 27, 66, which are false positives); whole 2.3 folder 0 errors, 0 warnings, 70 notes.

## 1. Source ledger (paths relative to Profinity_Version_2.3/)
IL = Loggers/InfluxDB_Prometheus_Logger.md, FL = Loggers/File_Loggers.md, SQL = Historians/TAG_SQL_Historian.md, IH = Historians/InfluxDB_Historians.md, MQ = Publishers_and_Subscribers/MQTT_Publisher.md, WH = Webhook_Publisher.md, CD = Cloud_Dashboard/index.md, TRS = Tag_Relays/Tag_Relay_Sender.md.

| Line | Sentence | Support | Verdict |
|---|---|---|---|
| 11 | Logging mode decides what a component sends or writes for members of its selected collections on each interval | IL:38 "determines what Profinity sends to the database on each interval"; FL:69 "writes the current value of every collection member on the interval" | Supported |
| 12 | Three modes | IL:41-43 | Supported |
| 16 Snapshot | current value of every member each interval, "whether or not the value changed" | FL:69 "writes the current value of every collection member on the interval"; MQ:80/WH:53 "regardless of whether the value changed"; IL:41 | Supported (the "regardless" wording is on MQ and WH only; low) |
| 17 On Change | "only values that have changed" | CD:55 "sends only values that have changed"; MQ:80 "only when a member's value has changed". But IL:42 "every change recorded ... during the interval", FL:69/SQL:58 "writes value changes" | WIDER than source, see F1 |
| 18 Everything | every sample, including unchanged | IL:43; FL:69; CD:55; WH:53 | Supported |
| 20 | "Snapshot is the default on every page that states a default" | IL:41 "the default"; IL:71, IH:70, FL:69, SQL:58, MQ:80, WH:53, CD:55 all give Snapshot. No page names another default (Environment_Variables.md:87 `logType: Snapshot` is an example, not a default statement) | Supported, but phrased as a note about the docs rather than the product, see F3 |
| 21 | Everything gives the most detailed recording ... resolution of measurement required | IL:45, verbatim | Supported only on IL, which says it for the InfluxDB logger and "other collection-based loggers" (IL:38). Acceptable. No other page repeats it. Low. |
| 25 | Snapshot: interval is how often current value of each member is sent or written | FL:68; WH:54 "how often a full publish runs"; MQ:81; SQL:60 "controls snapshot timing" | Supported |
| 26 | On Change/Everything: interval is how often pending changes or samples are sent, or flushed to file or database | FL:68 "how often pending changes or samples are flushed"; SQL:60 "how often changes and samples are flushed to the database"; WH:54/MQ:81 "how often accumulated changes are sent" | Supported |
| 27 | MQTT, Webhook, file/tag loggers, TAG SQL "state this explicitly" | MQ:81, WH:54, FL:68, SQL:60 | Supported |
| 28 | IL and IH "say the mode sets what is sent on each interval" | IL:71, IH:70 "Sets what is sent on each interval" | Supported |
| 28 | Log_Data_to_Cloud_Influx describes On Change as "sending the changes recorded during the interval" | How_To_Guides/Log_Data_to_Cloud_Influx.md:62 | Supported |
| 32-40 | Component list (7 bullets, 8 components) | v1 Logger IL:71; v2/v3 IH:70; TAG File and SFTP FL:23-32, 69; SQL:58; MQ:80; WH:53; CD:55 | Complete and correct, see section on the list below |
| 42 | Tag Relay Sender lists "Snapshot interval (seconds)" and no Logging mode | TRS:39 (settings table, lines 36-45 contain no Logging mode) | Supported (absence is read from the settings table) |
| 43 | Full snapshot of selected collections at a fixed interval | TRS:11 "sends them, as a full snapshot at a fixed interval" | Supported |
| 44 | Guide "shows where to set the mode in each logger and publisher" | Configure_Data_Logging.md:55, 73, 99, 108 cover TAG File/SFTP, InfluxDB, MQTT, Webhook only | WIDER, see F4 |
| 48 | DBC Notification Mode shown when On Change in TAG File Logger, TAG SFTP Logger, TAG SQL Historian, with choices Value Change Only and Every Decoded Physical Sample | FL:70 (section covers both TAG loggers, FL:60-62); SQL:59; Configure_Data_Logging.md:57 | Supported |
| 49 | Everything always records every decoded sample | SQL:59; FL:70 "Everything always uses Every Decoded Physical Sample" | Supported |
| 50 | Refer to FL and SQL | n/a | OK |
| 54 | Pages agree on the three modes and Snapshot default | see 20 | Supported, but the next sentence is incomplete, see F5 |
| 59-61 | Names: Logging Interval (Sec) on v1 Logger and Influx historians; Update Interval (Seconds) on FL, MQ, WH, SQL, CD | IL:70, IH:69; FL:68, MQ:81, WH:54, SQL:60, CD:53 | Supported |
| 62-64 | Range: minimum 1 (IL, IH); 10 to 86400 (FL, MQ, WH, SQL, CD) | IL:70, IH:69; FL:68, MQ:81, WH:54, SQL:60, CD:53 | Supported |
| 65-66 | Default: CD 60; all others 10 | CD:53; IL:70, IH:69, FL:68, MQ:81, WH:54, SQL:60 | Supported |
| 67-70 | On Change wording per page | IL:42; MQ:80, WH:53; CD:55; FL:69, SQL:58 | Supported verbatim |
| 71 | DBC row | FL:70, SQL:59 | Supported |

Component list check: no component is missing and none is wrongly included. Components with a Logging mode in the docs: InfluxDB v1 Logger, InfluxDB v2/v3 Historian, TAG File Logger, TAG SFTP Logger, TAG SQL Historian, MQTT Publisher, Webhook Publisher, Cloud Dashboard. The Prometheus Logger (Update Interval 10 to 86400, IL:95) and CAN File/SFTP Loggers (FL:56 "do not use tag collections") have no Logging mode and are correctly omitted. IL:38 says the setting applies to "the other collection-based loggers", which the page's list covers.

## 2. Conflicts (all found in the table; none silently resolved)
- Interval name (Logging Interval (Sec) vs Update Interval (Seconds)): in table.
- Interval range (minimum 1 vs 10 to 86400): in table.
- Default interval (60 vs 10): in table.
- On Change wording: in table. Not in the table, minor: Everything wording ("every sample" on SQL:58 and WH vs "including unchanged values" on FL:69, IL:43) and Snapshot wording on SQL:58 ("writes the current values"). These are consistent in meaning; low.
- Not in the table but a real difference between pages: Tag Relay Sender interval is 5 to 86400, default 60 (TRS:39). It is not a logging-mode component, so omission is acceptable; optionally add a row since the page mentions the Sender.
- Prometheus Logger Update Interval is 10 to 86400 with no mode. Out of scope.

## 3. Anchor
- `# Logging modes {#logging-modes}` is present (line 9).
- Current inbound links all point at the old target Loggers/InfluxDB_Prometheus_Logger.md#logging-modes, and the heading "Logging modes" (IL:36) still exists, so they resolve today. Links to retarget to `../Logging_Modes.md#logging-modes` (or `Logging_Modes.md#logging-modes` for Cloud) once the lead chooses:
  - Historians/TAG_SQL_Historian.md:58
  - Historians/InfluxDB_Historians.md:70
  - Loggers/File_Loggers.md:73 (`InfluxDB_Prometheus_Logger.md#logging-modes`)
  - Cloud_Dashboard/index.md:55
  - Loggers/InfluxDB_Prometheus_Logger.md:71 (same-page `#logging-modes`; stays valid if the IL section stays)
- Nothing links to Logging_Modes.md yet. MQ and WH do not link to any modes page (no change needed unless the lead wants one). No other page contains the anchor text. If IL's "Logging modes" section is later removed or reduced, the same-page link at IL:71 must be updated. Retargeted links will resolve because the page and anchor exist; verify with the linter after retargeting.

## 4. Lint
0 errors, 0 warnings on the page and the whole 2.3 folder. Front matter complete; description is 156 characters (within 70 to 160). One sentence per line holds except line 28 (one long sentence, see F6).

## 5. Navigation
Add `Logging_Modes.md` to docs/Profinity_Software/Profinity_Version_2.3/Components/.pages. The file lists folders only; there is no top-level page in that nav list, so the lead can add `- Logging_Modes.md` (e.g. after `- Tag_Relays`, or before `- Loggers`, since Loggers/Historians/Publishers are the components it concerns). Also consider links from Loggers/index.md, Historians/index.md and Publishers_and_Subscribers/index.md. Not edited.

## Findings
1. (F1, HIGH) Line 17 "**On Change** sends or writes only values that have changed." is wider than its sources. FL:70 states that with DBC Notification Mode set to Every Decoded Physical Sample, On Change writes "a line for every decoded sample of that signal, including repeats", and IL:42 says "every change recorded". The page's own DBC section contradicts "only values that have changed". Correction: "On Change sends or writes value changes." (FL:69, SQL:58 wording), leaving the stricter "only when a member's value has changed" wording in the table row for MQ/WH/CD, and add "see DBC notification mode" or the exception.
2. (F2, MEDIUM-HIGH) Line 16 "whether or not the value changed" is stated on MQ and WH only. Safe in substance, but the same sentence is applied to every component. Either keep (inferred from "current value of every member on each interval") or quote MQ/WH wording in a per-page row.
3. (F3, MEDIUM) Line 20 "Snapshot is the default on every page that states a default" is meta wording about the docs and could be read as "not every component". Rewrite as "The default is Snapshot on every component page that lists a default", or state it as a fact with the table (all seven pages give Snapshot). Line 54 repeats it.
4. (F4, MEDIUM) Line 44 "shows where to set the mode in each logger and publisher" is wider than the guide: it has no TAG SQL Historian or Cloud Dashboard section, and lists no mode for the Prometheus or CAN loggers. Correction: "shows where to set the mode in the TAG File Logger, TAG SFTP Logger, InfluxDB loggers and historians, MQTT Publisher and Webhook Publisher."
5. (F5, LOW) Line 55 "They differ in the interval setting, as follows." but the table also holds On Change wording and DBC rows. Reword to "They differ in the following ways." The DBC row is a presence note rather than a difference; consider moving it out or labelling it "Setting shown only on some pages".
6. (F6, LOW) Line 28 is one 60-word sentence; split it. The two blank first-column cells in the table (rows 60-61, 63-64, 66, 68-70) lose meaning for screen readers and when a row is read alone; repeat the label in each row.
7. (F7, LOW) Line 21 is sourced only from the InfluxDB Logger page; fine, but note it is unique to IL, and the "choose the mode by the resolution of measurement required" advice is not on any other page.
8. (F8, LOW) Omitted facts that the DBC section could carry (not an error): "Tags that are not DBC signal leaves always follow value-change behaviour" (FL:70) and that DBC means CAN database file (FL:70, SQL:59). Also IL:39 "Nothing is logged until at least one tag collection is selected in Collections" is not repeated; fine because component pages own it.

## High-severity list
- F1 (line 17, On Change "only values that have changed" contradicted by FL:70 DBC behaviour and IL:42). F2 is borderline and listed as medium-high.
