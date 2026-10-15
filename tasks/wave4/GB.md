# Report GB: split Write_Your_First_Script

## Files
- Edited: How_To_Guides/Write_Your_First_Script.md
- Created: Developing_with_Profinity/Scripting/Script_Examples.md (title "Script examples", type reference, last_reviewed 2026-10-15)
Lint: 0 errors, 0 warnings, one info note on each page (short sections). Links resolve.

## Fact ledger (original section -> new location)
- Sections Enable scripting, Add a script component, Write the script (C#, Python), Run the script, Troubleshooting (3 items), prerequisites, permissions warning: unchanged, tutorial. C# and Python blocks untouched (the original has no Lua tab; none added).
- "More advanced examples" intro (Example Profile, example_log.csv, Quick Start link, case-sensitive Component/Message/Signal, DBC viewer, DBC link): moved verbatim to Script_Examples intro (link paths adjusted only).
- Reading a DBC signal value (C#/Python tabs and timestamp sentence), Sending a CAN message (properties sentences, CanBusPacket availability, CAN bus safety warning, C#/Python tabs), Persisting script state (C#/Python tabs): moved verbatim, headings H3 -> H2.
- Headings "More advanced examples", "Reading a DBC signal value", "Sending a CAN message", "Persisting script state" no longer on tutorial. No inbound links to these anchors exist in the docs tree.
- Tutorial edits: front matter description and intro sentence no longer promise examples; one sentence and link replace the section; Next steps gains a Script examples link first. Scripting overview, Supported Languages, Script Types and Script Operations links kept.

## Source ledger (new sentences only; everything else is moved text)
- "This page holds worked script examples that read a DBC signal, send a CAN message and persist script state." : original headings "Reading a DBC signal value", "Sending a CAN message", "Persisting script state".
- "To add a script component and run a first script, refer to..." : tutorial: "This guide adds a script component, writes a run script that prints a message, runs it and finds the output".
- "Scripting needs a Desktop, Server, or Enterprise licence. Refer to Licensing." : "A **Desktop**, **Server**, or **Enterprise** licence. An unlicensed instance cannot add or run scripts."
- Warning admonition: copied from the tutorial warning (same wording), link to the Scripting overview as in the original.
- Closing line "For the full operations, refer to Script Operations: CAN bus, DBC, state, and console.": tutorial Next steps, "Script Operations: CAN bus, DBC, state, and console."
- Description of Script_Examples: "Worked C# and Python examples that read a DBC signal, send a CAN message, and keep a run count in script state, using the Example Profile." Supported by the example code (runCount) and the Example Profile sentence.
- Tutorial description "then find its output in the log": "the output appears in the Profinity log".
- Tutorial Next steps line for Script examples: the three headings above.

## Inbound links to fix
None needed. Pages that link to the whole tutorial (no anchors): Scripting/index.md:61, Script_Types/Rule_Scripts.md:119, Script_Types/TagChangeScripts.md:172, How_To_Guides/index.md:46. Optional lead change: add Script_Examples.md to Scripting navigation and link it from the Scripting overview.
docs/llms-full.txt:219 holds the old tutorial description (generated file; regenerate).

## Conflicts between sources
None found.

## Questions
- The tutorial troubleshooting items "The DBC signal is null or missing" and "A syntax error appears" (add DBC, CAN bus or state one at a time) refer to the moved examples. Kept in the tutorial as instructed; the lead may want to link them to Script examples or move them.
- The original has no Lua code and no checkpoint after the examples; none added.
- The original tutorial has no Lua tab even though it tells the reader to select the Lua Script component.

## Not done
- Did not edit mkdocs.yml, .pages or other pages.
