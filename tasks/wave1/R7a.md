# R7a: review of G7a (Customising_Profinity, 8 pages)

Method: read the original (`git show HEAD:`) and the rewrite for every page, diffed code blocks and tables mechanically, ran `node scripts/lint-docs.js` on the 8 files (0 errors, 0 warnings, 0 notes) and on the whole 2.3 folder with `--details`. The three whole-folder Links errors ("APIs/index.md does not exist") are in `Integrating_to_Profinity/APIs/index.md` and `MCP_Server/index.md`, not in any page in this batch. Inbound links to these pages were searched across `docs/`.

Checks that passed:
- Data_Binding: 9 of 9 YAML blocks are byte-identical to HEAD. Both tables are identical apart from "See" becoming "Refer to" and the link text case in two cells of the parameters table. The targets table is identical.
- Conditional_Styling: all 4 YAML blocks and the targets table are identical (one serial comma added in the `visible` row).
- Visual_Editor, Core_Elements, Dashboards/index: no code blocks or tables changed.
- Inbound anchors that resolve: `Data_Binding#binding-source-paths`, `#type-conversion`, `#time-series`, `#scaling-and-offset`, `#logged-data`, `#binding-targets`, `#text-mapping`, `Core_Elements#layout-directions`, `Conditional_Styling#show-or-hide-a-component`, `Dashboards/index#binding-source-paths` targets. No inbound link points at any removed heading slug. The three `{#id}` anchors on Dashboards/index (`custom-components`, `profile-dashboards`, `dashboard-component`) equal the old slugs.
- White-label wording (Theming warning, Customising index, OEM sentences) is unchanged in substance from the original.
- Every mode, tab (DESIGN, YAML), button (NEW FROM TEMPLATE, RELOAD, SAVE, DELETE), inspector switch, permission note and the `Show footer` accordion exception survived in Visual_Editor. Dashboards/index kept every section, permission and link. The visual editor has no keyboard shortcuts or numeric limits in the original, so none were lost.
- No Mermaid diagrams on any page.

## Customising_Profinity/index.md: PASS
1. low. Inline links on "Dashboards", "theme", "hosted web application" were removed from the intro and the OEM link now appears only in the list. Nothing lost. No action.

## Hosting/index.md: FIX
1. high (invented). "You need" style claims: `Copy the application files into the webroot folder ... including an index.html file.` The original only says Profinity serves `index.html` from the folder when no path is requested. "including an index.html file" turns that into a requirement. Suggest "The folder needs an `index.html` file, which Profinity serves when a browser requests the server without a URL path." Or drop the clause since the sentence after the code block already says it.
2. high (invented). Table row `**Cert Key File** | Optional. A key file for the certificate.` The original only lists the name, "optionally". Description of what the key file is for is not supported. Suggest "Optional." with no description, or flag to product owner.
3. high (invented). Table rows `**Cert File** | The certificate file.` and `**Cert File Password** | The password for the certificate file.` These restate the field names, supported by the original wording "a certificate file with its password", so low risk, but `IP Port for Http | The HTTP port.` and `IP Port for Https | The HTTPS port.` are tautologies. Treat as acceptable but the table adds no information; a sentence would do.
4. medium (invented). Step 3 / paragraph after the code block: "...serves the `index.html` file from this folder, so the application opens." The original did not state an outcome sentence. Remove "so the application opens" or keep only the URL form.
5. medium (structure). The `{Artifacts}/webroot` code block now sits after the numbered list and refers to a step that has already gone by. Put the path inline in step 2 or place the block within the step.
6. medium (invented). The writer's "closing check" (step 3 reads as a check). Supported only by the existing URL sentence; acceptable if wording stays as in the original ("opened at").
7. medium (typing). Page typed `task` but holds a settings reference table plus an HTTPS concept section. Mixed jobs. Either type as `task` and move the table out, or accept and note.
8. low. Last paragraph still ends with two links and no heading; fine.

## Theming/index.md: FIX
1. high (invented). Step 1: "Open `themes/theme.yaml` on the Profinity host, or create it if it does not exist." The original says a missing file leaves defaults; it never says to create the file. Suggest "Create or edit `themes/theme.yaml`" is also unsupported; use "Edit `themes/theme.yaml` on the Profinity host" as the original did, and say a missing file leaves the defaults.
2. high (invented). Intro: "You need file access to the Profinity host." Not in the original (the original says "Edit `themes/theme.yaml` on the Profinity host"). Delete or reword.
3. high (invented / changed). Step 5: "Open the web client and check that it shows your title, colours, and logos." The original says the web client shows them, not how to confirm. Combined with the failure pointer ("If the web client still shows the defaults, read the Profinity log"), it omits the other original cause: an unlicensed instance shows the default appearance. Add "or the instance is unlicensed" to the pointer, or remove the check.
4. medium (structure). Step 2 says "as listed in the next section", but the keys table comes after the steps, so the procedure cannot be followed in order. Move the table before the steps or link to it.
5. medium (style). Pre-steps summary paragraph plus the licence warning plus the steps plus the log paragraph before the first heading makes the page long to reach the reference. Consider the proposed split in G7a.
6. low. Description: "and check that the theme loaded" repeats the unsupported check.
7. low. Colour rule and fallback sentence moved from after the example to before it. Fine, nothing lost.

## Dashboards/index.md: FIX
1. medium (changed meaning). Heading `### Standalone dashboards {#dashboard-component}` replaces "Dashboard Component". The section describes the built-in Dashboard Component, and "standalone dashboards" is a new term; a reader searching for the component name will not find it. Restore "Dashboard Component" (sentence-case form: "Dashboard Component" is a product name). Likewise "A component's own dashboard" for "Custom Components" drops the product term "Custom Component".
2. medium (structure). The link list now sits above Prerequisites and is followed by a prose paragraph that repeats the first bullet ("Build dashboards in the visual editor first..."). The visual editor appears three times in the first screen. Drop the duplicated tip paragraph or the first bullet.
3. medium (typing). Typed `index` but still carries prerequisites, a starter-template procedure, schema validation and a profile dashboard procedure. G7a lists this as a proposal. Mixed jobs remain.
4. low. "Optional:" prefix added to Profile dashboard step 3 is supported by the original "or upload ... if a dashboard already exists".
5. low. Link text "Visual Editor" became "Dashboard Visual Editor" (matches the page title). Other pages still say "Visual Editor"; acceptable.

## Dashboards/Core_Elements.md: PASS
1. low. The info admonition became a plain paragraph and "See" became "Refer to"; no facts lost. Intro sentence is long (three clauses, "and the complete Full Example shows them all"). Consider splitting.
2. low. Several sentences still use "...and..." chains over 40 words (the `items` sentence listing containers). Polish only.

## Dashboards/Conditional_Styling.md: FIX
1. high (typo). Front matter description: "or enabled state state from a live tag value". Duplicate word; fix to "enabled state from".
2. high (changed meaning). Colour task step 4: "Check the display. A value below the first threshold takes the first colour, and a value at or above it takes the next." This is true only for `bias: right`; the original says with `bias: left` a value equal to a threshold takes the label before it, and the original example sentence ("a value below `1` takes the first colour and a value of `1` or more takes the second") describes the specific bias-right example. Restate as "With `bias: right`, ..." or point to the bias sentence.
3. high (invented). Intro: "You need a dashboard open for editing, which needs the **Modify dashboards** permission, and the path of the tag that drives the component." The original page does not state this; it comes from Dashboards/index. Not wrong, but new to this page. Remove or confirm.
4. high (invented). Show/hide steps 1 and 2: "In the component, add an entry to its `bind` list with `target: visible` and a `source` that is the path of the controlling tag." and "Save the dashboard." The original has no procedure. The steps are YAML-oriented and do not say whether to use the visual editor or the YAML tab. Step 3 "Check the display. When the tag value is `0` the component is hidden, and when it is `1` the component is shown." was a sentence about the example readout and is now generalised to any `visible` binding. Either present as the original prose, or state the steps and that they apply in the YAML tab, and keep step 3 tied to the example.
5. high (invented). Colour task steps 1 to 3 ("In the lamp, add an entry to its `bind` list with `target: color`...", "Add a `mapToText` value with a `partition` list that alternates a label and a threshold, and set `bias`.", "Save the dashboard."). Distilled from the examples, not stated in the original. Same remedy as item 4.
6. medium (structure). The steps now precede the example that they describe ("The following readout...", "The following lamp..."), and the stale-tag explanation ("A `visible` binding only changes the display when it receives a value...") follows the example, so the numbered task is interrupted by reference content. Consider placing the example inside the steps.
7. medium (typing). Typed `task`, but the page opens with a reference table of targets and then two short procedures. Mixed jobs.
8. low. Original duplicated opening paragraph was merged; confirm nothing was lost: the merged paragraph keeps all clauses.

## Dashboards/Data_Binding.md: FIX
1. medium (release-status wording). "Changed in Profinity 2.3: new dashboards use the slash form shown on this page..." Style guide forbids release-status wording. Reword: "New dashboards use the slash form shown on this page ... Dashboards written before Profinity 2.3 may use dots..." as the original note did, or keep the admonition.
2. medium (heading removal, content check). All content under the 10 removed headings survived:
   - DBC Signal Tags, Component Property Tags, Derived Tags: intro sentences, all 3 + 3 bullets, "suit" sentences and the Derived Tags link survive under "Tags you can bind to". The Derived Tags link moved into the first sentence ("A [derived tag](...)"); the "and are described in Derived Tags" wording was dropped but the target is kept.
   - Latest Value: text now in the "Binding modes" intro. The sentence "The default mode ... shows only the latest value" survives.
   - Basic Binding Structure, Worked Scaling Example, Value Inversion, Boolean and Partition Text Mapping: intros and prose survive, rewritten as "To invert...", "The readout in the next example...", "A boolean mapping gives...", "A partition-based mapping gives...". The last two intro sentences are new but restate what `trueValue`/`falseValue` and `partition` do.
   - Where Next: link paragraph survives at the end with no heading.
3. low (readability). A page that mixes concept (tags, modes) with reference (parameters, targets) and several mini tasks stays at about 2,300 words; G7a proposes a split. Agree.
4. low. "Scaling and offset" now holds the scaling example and the invert example under one heading; "To invert a boolean or numerical value" is the only sentence tying it to the heading.
5. low. Unsupported-looking sentence check: "The readout in the next example shows a raw value that is a temperature in tenths of a kelvin" is the original sentence, reworded from "The readout below". Not invented.

## Dashboards/Visual_Editor.md: FIX
1. medium (release-status wording). "Changed in Profinity 2.3: the visual editor became the primary way to build a dashboard." The original wording was "From Profinity 2.3, the visual editor is the primary way...". Both are release-status. Delete the sentence; keep "Dashboards created before Profinity 2.3 keep working unchanged".
2. medium (invented, mild). Validate and save: "When the list is empty, select **SAVE** to store the dashboard." New sentence, implied by "SAVE shows a message and does not save while any issues remain". Acceptable but flagged as a closing check; remove or keep as the writer disclosed.
3. medium (typing). Typed `task`, but the page opens with a layout reference table including the Footer buttons. Mixed jobs; G7a proposes a split.
4. low. Merging Add, Arrange, Change and Delete under "Build a dashboard" is fine; "Because a new element always goes first, drag it in the tree" lost the cross-reference "as described in the next section" and the next sentence now covers it. No fact lost.
5. low. Open step 2 now holds two sentences (the pencil icon and the DESIGN mode); original step 3 text about the YAML tab is now an "Optional" step. Order and content preserved.
6. low. Permission note was moved into the intro as a plain sentence; all content kept.

## Overall summary
No facts were dropped. Code blocks and tables are verbatim and anchors that other pages link to still resolve; the linter is clean on all 8 pages. The main risk is invented procedure text: Hosting, Theming and Conditional_Styling gained numbered steps, a closing check and short setting descriptions that the original did not contain. Two of these change meaning (Theming failure pointer omits the licence cause; the Conditional_Styling colour check is true only for `bias: right`). Release-status wording ("Changed in Profinity 2.3") appears in Data_Binding and Visual_Editor, and the Dashboards/index headings drop the product names "Custom Component" and "Dashboard Component". Product-owner questions in G7a match the original wording, which is unchanged.

## High severity findings
1. Hosting: "including an `index.html` file" added as a requirement.
2. Hosting: Cert Key File description "A key file for the certificate" not in the original.
3. Theming: "or create it if it does not exist" added to step 1.
4. Theming: "You need file access to the Profinity host" added.
5. Theming: step 5 check and "If the web client still shows the defaults, read the Profinity log" omit the unlicensed-instance cause.
6. Conditional_Styling: front matter description typo "state state".
7. Conditional_Styling: colour step 4 states a threshold rule that is true only for `bias: right`.
8. Conditional_Styling: intro adds the Modify dashboards permission requirement.
9. Conditional_Styling: show/hide steps 1 and 2 and colour steps 1 to 3 are invented procedure, with no indication of visual editor versus YAML tab; step 3 generalises an example outcome.
