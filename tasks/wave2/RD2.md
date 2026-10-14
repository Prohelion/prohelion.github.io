# Review RD2: Scripting operations and script types (12 pages)

Method: scripted comparison of every fenced block and every tab label against `git show HEAD:`; word-level diff (whitespace ignored) of all prose and tables; lint run on all 12 files (0 errors, 0 warnings, 3 info notes); inbound anchor search across the 2.3 docs; the four screenshots were opened to check the rewritten alt text.

## Cross-cutting checks (items 1 to 7 of the assignment)

1. Code. Fenced blocks: identical text and identical order on all 12 pages (counts: Script_Operations/index 1, CANBus 12, Console 3, DBC 6, State 8, Tags 12; Script_Types/index 0, Receive 3, Rule 4, Run 3, Service 3, TagChange 6). Tab headers (`=== "C#"`, Python, Lua): identical lists, same order, none moved or relabelled (CANBus 12, Console 3, DBC 6, State 8, Tags 12, Receive 3, Rule 3, Run 3, Service 3, TagChange 6). No difference found.
2. CANBus "returns null".
   - Original: "**Milliseconds Valid** is shown only in Run On Receipt of CAN Message mode, and returns null (`None` in Python, `nil` in Lua) when no valid packet exists."
   - New: "The method returns null (`None` in Python, `nil` in Lua) when no valid packet exists. **Milliseconds Valid** is shown only in Run On Receipt of CAN Message mode."
   - Same meaning. Grammatically the original made the setting the subject, which is nonsense, and the sentence before it is about `LatestValidPacketReceivedByID()`. "The method" resolves to that method. Acceptable. The writer's open question 4 (is Milliseconds Valid visible outside Receive mode) is still open and is a product-owner question, not a defect.
3. Operations reference. No table row, method name, parameter, return type, unit or limit changed on CANBus, Console, DBC, State, Tags or the Script_Operations/index methods table. The word diff shows only heading case, comma additions, the removal of the "Usage" and "Basic Usage" headings and their one-line lead-ins, and the State "Thread safety and limits" paragraph split into one sentence per line (same sentences, same order, same content). Values kept: Milliseconds Valid default 5000, range 0 to 60000, 0 means never expire; `SendMessage()` returns the number of interfaces; `GetDbcSignal` throws `ArgumentException`; `Value` returns `NaN`.
4. Security. All warnings retain full text and consequence: "Scripts run inside Profinity" (Script_Types/index), "Paths are not a security boundary" and "A script can trigger itself" (Tags), "One call per tag" (TagChange), the licence note (Rule scripts, "Desktop, Server, and Enterprise" unchanged). The only admonition removed is the run-by-hand note (finding M1 below), which is not a security note.
5. ServiceScripts broken sentence. Unchanged and verbatim: "Profinity's built-in Python, C# and Lua service templates with both single-step and loop-style `run` patterns." It does not appear in the diff.
6. Shared shape. Nothing dropped from the five type pages. Trigger overlap text, Drop/Queue behaviour, defaults (Queue Depth 8, range 1 to 100), Maximum Run Time and `Profinity.ScriptCancelled` guidance are present on Receive, Rule and TagChange; Script_Types/index keeps the settings row and the health section. Settings now hold the settings and the old behaviour paragraphs sit under Behaviour. Slugs `#choosing-what-to-watch`, `#cooperative-cancellation`, `#trigger-overlap` still resolve. Removed slugs (`#performance`, `#choosing-which-packets-arrive`, `#status-while-running-as-a-rule-action`, `#the-getdbcsignal-method`, `#usage`, `#basic-usage`, `#setting-a-script-to-run-on-alert`) have no inbound links in the 2.3 docs. Inbound anchors that exist (`#tag-paths`, `#writing-tag-values`, `#component-and-firmware-settings`) all resolve.
7. Typing. All `reference`; acceptable for the operations pages. Mild notes (low): Script_Types/index is half concept ("choose a mode") and half reference (settings table); Script_Operations/index is a hub with a stray component-settings reference section (writer already proposes moving it).

Alt text: all four rewritten alt texts match the screenshots (mode drop-down lists the seven modes; Python Service template shows on_start and on_stop; Run template shows RunMe; Receive template shows the receive function). No invented content.

## Per page

### Script_Operations/index.md: PASS
1. low. Description says "Look up what a script can do through the Profinity object"; fine, no fact change.
2. low. Component and firmware settings section (and the `settings_map.yaml` reference) sits oddly on a hub page; writer already raised it.

### Script_Operations/CANBus.md: PASS
1. low. Note (2) above: meaning preserved.
2. low. Info note on short sections above tab groups; acceptable.

### Script_Operations/Console.md: PASS
No findings.

### Script_Operations/DBC.md: PASS
1. low. Heading slug changed from `the-getdbcsignal-method` to `getdbcsignal-method`; no inbound links.

### Script_Operations/State.md: PASS
No findings. Limits paragraph reordered into sentence-per-line with all content intact.

### Script_Operations/Tags.md: PASS
1. low. "Related Documentation" list became one sentence; the dropped links (Tag Change scripts, Tag tree path) are already linked in the body.

### Script_Types/index.md: PASS
1. low. The Receive row says "Answering a packet with a reply message"; the original said it is "normally used to answer a packet with a reply". The qualifier "normally" is gone. Suggest "Normally used for answering ...".
2. low. Figcaption "Script Mode Selection and Configuration in the Profinity UI" is still Title Case (also on Run, Receive and Service pages). Pre-existing; the linter does not catch it.

### Script_Types/ReceiveScripts.md: PASS
1. low. Figcaption Title Case (see above).
2. low. Settings table is faithful (Base Address, Address Range, Milliseconds Valid; defaults and range intact). Trigger Overlap is described under Behaviour but not in the table; this matches the original.

### Script_Types/RunScripts.md: PASS
1. low. Return-value rules moved from the example section to Behaviour; content identical. The sentence "The interfaces used by the C# sample are available to a script by default..." now sits in Example while return rules sit below; fine.
2. low. Figcaption Title Case.

### Script_Types/ServiceScripts.md: PASS (with the known broken sentence)
1. medium (carried over, not a writer fault). The broken sentence "Profinity's built-in Python, C# and Lua service templates with both single-step and loop-style `run` patterns." is still in the Example section. Needs the product owner's verb ("include" or "follow" are both plausible); do not guess.
2. low. Settings section is one sentence plus the screenshot, with no table. Acceptable, but the heading is thin; keep for the shared shape.
3. low. Figcaption Title Case.

### Script_Types/TagChangeScripts.md: FIX (minor)
1. medium (M1). The admonition "Running the Script by Hand Does Not Call This Method" became two plain sentences under Behaviour ("Run On Demand and scheduled runs do not call `OnTagChange` or `on_tag_change`. Only a change to a watched tag does, so test by changing the tag."). Wording is intact, but the original gave this a warning box because readers who run by hand and see nothing happen will think the script is broken. Suggest restoring it as a `!!! note` or keeping it as a warning, as the original did. It is not a harm warning, so medium rather than high.
2. low. Related Documentation became one sentence; dropped repeats are linked in the body.
3. low. Writing "the same value again does not call the method" now sits in Behaviour rather than beside the method arguments; content intact.

### Script_Types/Rule_Scripts.md: FIX (minor)
1. medium (M1). Same as TagChange: the run-by-hand admonition ("The Run Script action ... do not call `OnAlert` or `on_alert`") is now plain text under Behaviour. Restore as an admonition, or accept as a deliberate downgrade.
2. low. "Status While Running as a Rule Action" heading removed; the three status sentences (Not Run / Run N times / Running / Edit Script only) are intact under Behaviour.
3. low. Link text changed to "Application Config", "Actions" (target titles); targets unchanged. Fine.

## Heading-case false positives
None observed.

## Overlaps recorded (nothing to delete)
Trigger overlap on Script_Types/index, ReceiveScripts, Rule_Scripts, TagChangeScripts; Receive example and CAN text on CANBus and ReceiveScripts; State vs GlobalState guidance on Script_Types/index and State; computed-tag example on TagChangeScripts and Tags/Script_Driven_Derived_Tags.

## Overall summary
Code is byte for byte and in order on all 12 pages. No fact in the operations tables was changed, and every security warning keeps its full text. The CANBus clause rewrite is sound. The only non-trivial finding is the demotion of the run-by-hand admonition on Rule and TagChange pages (medium). The broken ServiceScripts sentence is still there as instructed. No invented content found.

## High severity findings
None.
