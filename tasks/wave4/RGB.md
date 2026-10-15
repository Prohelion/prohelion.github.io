# Review RGB: Write_Your_First_Script (edited) and Script_Examples (new)

Verdict: Write_Your_First_Script FIX (medium, troubleshooting dangling references). Script_Examples PASS (one low note). No high severity findings.

## 1. Fact ledger (original HEAD vs the two pages)
Compared by diff. The only lines removed from the tutorial are the front-matter description, one intro sentence, and the whole "More advanced examples" section. Everything else (prerequisites, warning, steps, code, Run the script, troubleshooting, next steps) is byte-identical.

Edited sentences, old and new:
1. Description. Old: "Enable scripting, add a script component, and run a first C# or Python script, then try DBC, CAN, and state examples." New: "Enable scripting, add a script component, and run a first C# or Python script, then find its output in the log." Supported by "the output appears in the Profinity log". OK.
2. Intro line 12. Old: "...runs it and finds the output, and then shows three more advanced examples." New: "...runs it and finds the output." Pure deletion of the promise. OK.
3. Added tutorial line 89: "For more examples, refer to [Script examples](...)". Replaces the section; links to the new page. OK.
4. Added Next steps bullet: "Script examples: reading a DBC signal, sending a CAN message, and persisting script state." Supported by the three moved headings. OK.

Moved text, all on the new page with wording unchanged (link paths adjusted only): examples intro (three sentences, Quick Start link, DBC link), timestamp sentence, three CAN-message sentences, all 3 headings (H3 to H2), all tabs. Every moved fact is present exactly once, with two exceptions below.

- Low: the "Scripts run with application permissions" warning (and its Scripting overview link) now exists on BOTH pages. The tutorial keeps it (correct, prerequisite for running scripts) and the new page copies it. This breaks "exactly one page" literally, but it is a safety warning, so duplication is the safer choice. Recommend keeping both and recording it as an accepted overlap.
- Low: the Next steps bullet "Script Operations: CAN bus, DBC, state, and console." is on the tutorial and its text is reused as the new page's closing sentence. Harmless.

## 2. New text (new page only)
- "This page holds worked script examples that read a DBC signal, send a CAN message and persist script state." Source: the three moved headings. OK.
- "To add a script component and run a first script, refer to [How to write your first script]" Source: tutorial intro "adds a script component, writes a run script ... runs it". OK.
- "Scripting needs a **Desktop**, **Server**, or **Enterprise** licence. Refer to [Licensing]." Source: tutorial "A Desktop, Server, or Enterprise licence. An unlicensed instance cannot add or run scripts. Refer to Licensing." Supported. It is a rewording, but the meaning does not widen. OK.
- Warning admonition: same wording as the tutorial. OK.
- Closing: "For the full operations, refer to Script Operations: CAN bus, DBC, state, and console." Source: Next steps bullet. OK. (Slightly awkward colon form; low, optional: drop the colon list.)
- New page description: "Worked C# and Python examples that read a DBC signal, send a CAN message, and keep a run count in script state, using the Example Profile." "Run count" is from the code (`runCount`), "Example Profile" from the intro sentence. Supported. 70-160 chars: about 143, OK.
Nothing unsupported. The new page does not state that scripting must be enabled or how to create the component; it correctly links to the tutorial instead of copying. Type `reference` with a prose intro, a warning and example tabs is acceptable; no numbered procedure.
- Low: tutorial `last_reviewed` still 2026-10-14 although the page was edited; the new page has 2026-10-15. Set the tutorial to 2026-10-15 for consistency.

## 3. Troubleshooting items that refer to moved content
A reader of the tutorial alone can no longer follow two of the three:
- "The DBC signal is null or missing": the tutorial now has no DBC signal, no DBC viewer mention outside this item, and no DBC link (the DBC link and case-sensitivity explanation moved). The reader has no DBC example in the tutorial path. Medium.
- "A syntax error appears": "add one API (DBC, CAN bus or state) at a time" refers to the moved examples and to APIs the tutorial never introduces. Medium. The compile/syntax advice itself still works.
- "The script does not run": self-contained. OK.

Proposed fix, inventing nothing (add links only, text unchanged):
- Item 2, append: "Refer to [Script examples](../Developing_with_Profinity/Scripting/Script_Examples.md) and [DBC](../Developing_with_Profinity/Scripting/Script_Operations/DBC.md)."  Both targets already carry these facts (the DBC link and the case-sensitivity sentence).
- Item 3, change "(DBC, CAN bus or state)" to "(DBC, CAN bus or state, as in [Script examples](...))" or append "Refer to [Script examples](...) for DBC, CAN bus and state." 
Alternative: move both items to the examples page as a short Troubleshooting section, leaving the tutorial with one item; the link fix is smaller and preserves the original wording, so prefer it.

## 4. Linear first-run path
Steps are intact and in order: Enable scripting (4 steps), Add a script component (5 steps), Write the script (C#, Python), Run the script, Troubleshooting, Next steps. No steps lost or added. The tutorial now ends at the run and log output, which is a cleaner first run. Low: the "Run the script" section still ends with a sentence on schedules, as in the original; fine. Existing gap, not a regression: the tutorial tells the reader to select Lua Script but gives no Lua code (writer noted it).

## 5. Links, anchors and lint
- `node scripts/lint-docs.js docs/.../Profinity_Version_2.3 --details`: 187 pages, 0 errors, 0 warnings, 70 info notes (none in a link rule). Both pages alone: 0 errors, 0 warnings, 1 info each (Structure, short sections: tutorial 4, examples 2).
- Searched docs for `Write_Your_First_Script.md#`, `more-advanced-examples`, `reading-a-dbc-signal-value`, `sending-a-can-message`, `persisting-script-state`: no hits except the tutorial's own new links (no links target moved headings).
- Low: `docs/llms-full.txt` holds the old description (generated; regenerate, as the writer noted).
- Suggestion (not required): link Script_Examples from Scripting/index.md and Script_Operations/index.md so readers find it besides the nav.

## 6. .pages
`Developing_with_Profinity/Scripting/.pages` parses as valid YAML: nav = [index.md, Supported_Languages, Script_Types, Script_Operations, Script_Examples.md]. The file exists next to the .pages and matches the sibling style (directories bare, files with .md). Entry is right. Placing it last is sensible.

## Summary
High: none. Medium: 2 (troubleshooting items 2 and 3 point at removed content; fix by adding links). Low: duplicated permissions warning (accept), tutorial last_reviewed not bumped, llms-full.txt stale, optional inbound links to the new page.
