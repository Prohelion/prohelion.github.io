# Consolidation proposal: one home per fact

You approved a consolidation pass after the structural wave. I measured first, because the rewrites already removed most duplication. Nothing here has been changed. Approve or reject each item in [manual-checks.md](manual-checks.md).

## What the measurement found
Sentences of 70 characters or more that appear word for word on more than one 2.3 page: **25** (of roughly 8,000). By number of pages: 17 on two pages, 4 on four pages, 3 on five pages, 1 on six pages. The earlier audit counted 144 duplicate flags, but those were broader (paraphrases and repeated sections) and most were fixed by the rewrites, the structural moves and the new pages.

## Left alone on purpose
- **Industrial protocol boilerplate.** BACnet, EtherNet/IP, Modbus and S7 share about 7 sentences each (the licence pointer, the Change Settings sentence, the log-level sentence, "polled values behave like any other tag", "the first success is the first poll in which every point reads correctly"). The style guide treats a repeated template across sibling pages as intentional, so a reader of one protocol page sees the same facts as on the next. Consolidating would force every protocol page to send the reader elsewhere for facts they need at that point.
- **Task steps that repeat** (for example "Select the pencil (Edit Dashboard) icon..." on four dashboard pages, "Select ADD COMPONENT at the bottom of the dialog..." on two how-tos). Each task page must be followable on its own.
- **Warnings** that sit on both pages where the reader acts (the scripting permissions warning on the tutorial and the examples page, the Server licence note on the Docker and service pages).
- **Closing "refer to" sentences** that link the same target from two pages.

## Proposed: one consolidation
**Logging mode definitions.** The three modes are defined once on [Logging modes](../docs/Profinity_Software/Profinity_Version_2.3/Components/Logging_Modes.md) and restated on six component pages. Replace each restatement with one short sentence that still names the three modes, so the page reads on its own, plus a link:

| Page | Restatements |
|---|---|
| Components/Publishers_and_Subscribers/MQTT_Publisher.md | 3 |
| Components/Publishers_and_Subscribers/Webhook_Publisher.md | 3 |
| Components/Loggers/File_Loggers.md | 3 |
| Components/Loggers/InfluxDB_Prometheus_Logger.md | 3 (and the sentence "Everything gives the most detailed recording..." which is now on both pages) |
| Components/Historians/TAG_SQL_Historian.md | 1 |
| Components/Cloud_Dashboard/index.md | 1 |

Risk: a setting row that today defines each mode in full becomes one line plus a link, so a reader must follow a link for the full wording. The component pages also differ in places (interval name and range, the DBC notification mode on the tag loggers and TAG SQL), so each page must keep any difference it states. I would keep those in place and move only the shared definitions.

## Not possible without a product answer
**Auto Connect timing.** The CAN adapter and Connect to CAN bus pages say a component connects "when Profinity starts", while about ten other pages say "when the profile loads". This is a contradiction, not duplication: one answer, then one fix pass.

## Recommendation
Do the logging mode consolidation only, after you have read the Logging modes page and the six pages it affects. Skip the rest.
