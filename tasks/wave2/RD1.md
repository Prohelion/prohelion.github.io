# Review RD1: Developing_with_Profinity (8 pages)

Paths relative to docs/Profinity_Software/Profinity_Version_2.3/Developing_with_Profinity/.

Checks run:
- `node scripts/lint-docs.js` on the 8 pages: 0 errors, 0 warnings. On the whole 2.3 folder there are 1 error and 17 warnings, none in these 8 pages and none of them Links errors. The failing pages are Component_And_Collection_Security, Script_Operations/DBC.md, Configure_Data_Logging and Connect_to_CAN_Bus.
- Every fenced block was extracted from original and rewrite and diffed for all 8 pages: 0 differences. The blocks are 2 in Plugins, 8 in Custom_Components/index and 2 in Component_Pack_CLI; the other pages have none.
- Commands, flags, defaults, package names, file names and error strings in the SDK, Plugins and Component_Pack_CLI diffs are all unchanged.
- Numbered steps: SDK (3 steps) and Plugins (4 steps) keep the original steps in the original order. No step, prerequisite or verification was added. Nothing was invented.
- Anchors: the only inbound anchors found are `#packing`, `#menu-actions-in-actionsyaml` and `#writing-and-testing-a-script`. All still resolve. A search for links to the removed slugs found none.

## index.md: PASS
1. low. The "New in Profinity 2.3: a Custom Component can include scripts, actions, and settings maps." note is supported by the original ("as of Profinity 2.3") and by Release_Notes/2.3.1.md line 70. It now sits detached after the licence sentence, away from the Custom Components bullet. Move it next to that bullet.
2. low. The licence sentence for scripting ("requires Desktop, Server or Enterprise ... unlicensed instance cannot add or run scripts") keeps its force, but it is now a loose paragraph after the list rather than attached to the Scripting entry. Acceptable. Consider an admonition or placing it in the Scripting bullet.
3. low. The "Where next" section is three sentences that were a list. This is fine.
No dropped or invented facts.

## SDK.md: FIX
1. medium (lesson 2). The `!!! info "The .NET 10 Runtime Is Required"` admonition became plain prose ("install the .NET 10 runtime or SDK ... before you run them"). Its consequence is intact, but a runtime prerequisite for running the tools should stay an admonition, next to the table. Restore it.
2. low. "Which piece to use" was folded into the paragraph about `Profinity.Sdk`. The content is complete, but its three sentences now sit under "What is in the kit" after an unrelated .NET sentence. Fine, but a reader scanning for "which tool do I need" has lost that heading (no inbound link exists).
3. low. The related-documentation list was dropped. The same links are still in the table and text (DLL Plugins, Component Pack CLI, Scripting). Component Types is kept as a closing sentence.
The licence admonition is retained at full strength. No invented step, check or prerequisite. The writer's questions about missing prerequisites and verification are genuine gaps, and none was filled in.

## Plugins/index.md: FIX
1. medium. The "Where plugins come from" section was dropped. Its sentence "The Profinity SDK page explains how to get `Profinity.Sdk` itself" is gone. "In Profinity 2.3, plugins install from a .nupkg or zip only, and there is no public NuGet feed" now sits as the second sentence of "Build and package a plugin", and that is supported by Release_Notes/2.3.1.md line 202. The "Profinity SDK kit" link in the first sentence covers the sense of the dropped sentence, so this is low to medium. Optionally restore "The Profinity SDK page explains how to get `Profinity.Sdk`".
2. low. The "Modify plugins" permission sentence gained a link to Roles and Permissions ("described in Roles and Permissions"). The page was in the original related list, so this is supported. The "Custom Plugins ... available from the Desktop edition upwards and not when unlicensed" statement is kept, but "Refer to Licensing" is now a separate sentence. Force is retained.
3. low. Bold was removed from the table type names (Component, Settings, Metadata). That is fine.
4. low. The numbered steps are unchanged except for a serial comma. The note that this is not a verified procedure (no prerequisites or verification) matches the original.
No dropped technical fact other than item 1.

## Custom_Components/index.md: FIX
1. medium. The new note "New in Profinity 2.3: a Custom Component is authored from this set of files." is vague and changes meaning. The original said "As of Profinity 2.3 those files can include [DBC, dashboard, rules, main script, actions, settings_map, firmware_map, firmware]". Release_Notes/2.3.1.md line 70 supports "Custom Components support actions, firmware scripts and settings maps". The note should say what is new: a Custom Component can carry scripts, actions, and settings and firmware maps. The index.md note says that already.
2. low. The note is placed after the settings paragraph, away from the sentence that listed the files.
3. low. Link text "Using Custom Components" became "Using a Custom Component" (the target page title). The related list was dropped, and every link is in the text, so no loss.
4. low. "Main script" and "DBC file" were lowercased in headings. Both are case-only changes, and slugs are unchanged. "Main Script" is a UI field label, so the heading-case rule may need the exception listed.
5. Judgement on keeping the DBC file and Dashboard sections: CONFIRMED CORRECT. Components/Custom_Components/index.md lacks the following facts, which exist only here:
   - **Rebase Address** and the **Upload DBC File (Optional)** field by name. The Components page links only to **Rebase DBC** via a How-to page.
   - "A saved change is picked up automatically" for **Edit DBC File**.
   - That the dashboard editor *replaces* the starter. The Components page says only that it opens the file.
   - Binding rules: CAN signals use DBC names, script-published values use a tag path, a relative path follows **Tag tree path**, an absolute path starts with `/`, and a relative path is used instead of `{COMPONENT_NAME}`.
   The Components page also contains facts this page lacks (parse failure leaves the component in the profile without Messages and Signals). So neither page can replace the other. Record the overlap and do not delete either.
6. Code blocks are byte-identical. The version-history note is not a duplicate of release notes. No invented text found. Packing steps are unchanged.

## Custom_Components/Component_Pack_CLI.md: PASS
1. low. The link text "Artifacts directory" became "Artefacts directory". It matches the target page title (`Artefacts directory`) and is a link-text change only. The placeholder `<Artifacts>` in the code block is unchanged, which is correct.
2. low. Intro sentences and the flag table are unchanged. Commands, flags, "Yes/No" required column and positional-argument rules all match the original. Nothing added.
3. low. "Component Types" is now a closing sentence, and the related list is dropped. No loss.

## Custom_Components/Component_Types.md: FIX
1. medium. The H1 was changed from "Custom Components and DLL Plugins" to "Component types" with `{#custom-components-and-dll-plugins}`. The old slug is preserved, so there is no broken anchor. The removed headings `custom-component` and `dll-plugin` have no inbound links.
2. medium. The closing sentence "Refer also to the Dashboard visual editor." is an orphan: the related list was collapsed into a sentence with no stated reason for the link. Either attach it to the Custom Component paragraph (for example, "a dashboard is built in the Dashboard visual editor") or drop it. The link is not stated in the original body.
3. low. Bold was removed from the two terms **Custom Component** and **dynamic-link library (DLL) plugin** where they are defined in the lead. Acceptable, though the terms are what readers scan for.
4. low. The thin headings "Custom Component" and "DLL Plugin" were folded into prose under Comparison. Content is complete. The page is `concept` and has no procedure, which is right.
No fact dropped or invented.

## Scripting/index.md: FIX
1. medium. The new opening sentence "Profinity scripting automates tasks, processes CAN messages and creates custom operations in C#, Python or Lua." was not in the original page. It is drawn from the original description (and Developing_with_Profinity/index.md), so it is not invented, but record it as an addition.
2. medium. The figure caption was changed from "React, Program and Share, All Built In" to "Rule actions, scripts, and Tag Relay, all built in". The new caption matches the alt text of the image. The caption is a descriptive rewrite, so keep it, but note that the change is deliberate.
3. low. The figure alt text for `app_configuration.png` was expanded to say the page holds **Enable Scripting**. This is stated in the preceding text. The caption still says "Profinity System Configuration" while the link now says "Application Config" (the page title). Mismatch is low severity. The writer's note is correct.
4. low. The "Rule Scripts" heading was folded into Script types as "New in Profinity 2.3: a script set to Run On Alert mode can be named as a rule action ... `TriggeredTags`". The original says "As of Profinity 2.3", and Release_Notes/2.3.1.md line 62 supports it. Release notes (lines 63, 120) also state that rule scripts need the Server edition. The page never said this, and neither did the original, so it is not lost. Worth raising as a gap, not as an error. No inbound links to `#rule-scripts`.
5. low. Link text now says "CAN Bus" and "Supported Operations". The target page titles are "CAN bus" and "Supported operations". Case differs only.
6. The warning "Profinity scripts execute with the same security permissions as Profinity itself" is preserved as an admonition with full force. The sentence that scripting is disabled until enabled, and the **Enable Scripting** step, are unchanged.

## Scripting/Supported_Languages/index.md: FIX
1. medium. Only the HTML comment was removed, as intended, but the comment held logo source and copyright attribution: "Lua: https://www.lua.org/images/ (lua-logo.gif), copyright 1998 Lua.org, graphic design by Alexandre Nakonechnyj", plus the C# and Python logo sources. The page does not currently render any logo (no image in the file), so the comment is dangling. However, it is the only record of the licence and attribution for those logos. Do not drop it without confirming that the images are not used elsewhere (a repo-wide search of HEAD finds the Lua credit only in this comment). Suggestion: keep the comment, or move the attribution to the site notices.
2. low. Front matter added (type reference, owner, review date), and sentences split to one per line. The text is otherwise unchanged. Table, headings and the Python 3 syntax list are unchanged.

## Cross-cutting
- Security and licensing force: the scripting execution warning, the licence admonitions (SDK, Scripting), the Desktop/Server/Enterprise statement (index.md) and the Custom Plugins licence feature (Plugins) all keep their strength. The only reduction is the .NET 10 admonition (SDK finding 1).
- "New in Profinity 2.3" notes: index.md, Custom_Components/index.md and Scripting/index.md. The first and third are supported by the original and by the release notes. The Custom_Components/index.md note is vague (see above). None is invented.
- Page typing: SDK is typed `reference` but contains a numbered procedure (script simulation). The writer flagged it. It is acceptable as a reference page with an embedded 3-step sequence, but keep it on the list for the page-split decision. Plugins is the same (4-step packaging).
- Overlaps (recorded, nothing deleted): the Custom_Components/index.md DBC and Dashboard sections and Components/Custom_Components/index.md; the pack files table and Component_Pack_CLI "What validation requires"; "Choosing between" in index.md and Component_Types.md; "no public NuGet feed" in SDK.md and Plugins/index.md.
- Heading-case false positives: none left in these 8 pages. Writer lowercased "Main Script" and "DBC File" in headings, so the lead may prefer to add them to the rule.

## Overall summary
All 8 pages pass the linter. Every code and command block is byte-identical. The CLI commands, flags, defaults and numbered steps match the originals, and nothing was invented. No link broke. No finding is high severity.

## High severity findings
None.

## Medium findings, in priority order
1. SDK.md: the .NET 10 runtime admonition was turned into prose.
2. Supported_Languages/index.md: the logo and copyright attribution comment was removed.
3. Custom_Components/index.md: the "New in Profinity 2.3" note is vague and no longer says what is new.
4. Component_Types.md: the orphaned "Refer also to the Dashboard visual editor" sentence.
5. Plugins/index.md: the sentence pointing at the SDK page for `Profinity.Sdk` was dropped.
6. Scripting/index.md: the new opening sentence and the caption change are additions to record.
