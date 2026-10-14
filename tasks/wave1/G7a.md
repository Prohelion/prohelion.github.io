# G7a report: Customising_Profinity (8 pages)

Lint: all 8 files show 0 errors, 0 warnings, 0 notes.

| Page | Type | Words before / after | Diagram | What changed |
|---|---|---|---|---|
| Customising_Profinity/index.md | index | 237 / 227 | no | Table became a link list with one line each, "Where Next" heading removed, front matter added. |
| Hosting/index.md | task | 378 / 440 | no | Enable, copy, open as numbered steps, with a closing check; HTTPS settings put in a settings table. |
| Theming/index.md | task | 450 / 521 | no | Added a five-step procedure with a check and a failure pointer; key table, example and rules kept; licence stays as one note. |
| Dashboards/index.md | index | 963 / 968 | no | Overview and link list moved to the top, tip folded into prose, profile dashboard procedure made numbered. Procedural sections kept in place (see proposals). |
| Dashboards/Core_Elements.md | concept | 706 / 700 | no | Sentence case, one sentence per line, info admonition made a plain paragraph, "Where Next" heading removed. |
| Dashboards/Conditional_Styling.md | task | 906 / 1019 | no | Duplicated opening paragraph merged; the two sections now have numbered steps with a check; all four YAML blocks verbatim. |
| Dashboards/Data_Binding.md | reference | 2297 / 2285 | no | 22 headings reduced to 15 (listed below); targets and parameters tables, all 9 YAML blocks verbatim. |
| Dashboards/Visual_Editor.md | task | 1076 / 1086 | no | Permission note moved into the introduction, thin Arrange, Change and Delete headings merged, YAML-tab cases made a list, pre-2.3 wording moved to a "Changed in Profinity 2.3" note. |

Word counts are `wc -w` on the whole file including code.

## Facts removed or altered

None dropped. Rewordings that a reviewer could check:

- Hosting: the settings table gives short descriptions that the original only implied. **Cert File** "The certificate file", **Cert File Password** "The password for the certificate file", **Cert Key File** "Optional. A key file for the certificate". The original named these fields without describing them individually.
- Hosting: "include an `index.html` file" in step 2 comes from "Profinity serves the `index.html` file from this folder".
- Hosting and Theming: closing "check" steps restate existing behaviour (the application opens at the URL; the web client shows your title, colours and logos). The Theming failure pointer combines two original facts (errors go to the Profinity log and fall back to defaults; a missing file leaves defaults).
- Theming: the Profinity log read is now a troubleshooting sentence after the steps.
- Conditional_Styling: the steps are a distillation of the examples (add a `bind` entry with a target and source). The original had no steps. Step 2 of the colour task says to add `mapToText` with `partition` and `bias`.
- Conditional_Styling, Visual_Editor: "When the list is empty, select SAVE to store the dashboard" (Visual_Editor) is implied by "SAVE does not save while any issues remain".
- Data_Binding: the "Dashboards From Earlier Versions" note became a "Changed in Profinity 2.3" paragraph at the end of Binding source paths. All dotted-path examples are kept.
- Data_Binding: the three "Tags You Can Bind To" sub-headings (DBC Signal Tags, Component Property Tags, Derived Tags) are merged into prose and lists.
- Visual_Editor and Dashboards/index.md: "Profile Dashboards" step 3 is now marked "Optional:" because the original said "or upload a YAML file ... if a dashboard already exists".
- Dashboards/index.md: the tip admonition became plain sentences. Three H3 headings were reworded with explicit ids so the old anchors still resolve: `{#custom-components}`, `{#profile-dashboards}`, `{#dashboard-component}`. The new text is "A component's own dashboard", "Profile dashboards" and "Standalone dashboards".
- Dashboard visual editor link text: other pages call it "Visual Editor". I used the exact page title "Dashboard visual editor" in my pages. The title was only converted to sentence case, not reworded.
- Titles: "Hosting Custom Applications" is now "Hosting custom applications". "Themes and Branding" is now "Themes and branding". "Profinity Dashboard Development Guide" is now "Profinity dashboard development guide".

Headings removed (all slugs checked: no inbound links found anywhere in docs):
- Customising_Profinity/index.md: Where Next.
- Dashboards/index.md: Where Next (the list now follows the opening paragraph).
- Core_Elements.md: Where Next.
- Conditional_Styling.md: Where Next.
- Hosting: Where Next. Theming: Related Documentation.
- Data_Binding: DBC Signal Tags, Component Property Tags, Derived Tags, Latest Value, Basic Binding Structure, Worked Scaling Example, Value Inversion, Boolean Text Mapping, Partition-Based Text Mapping, Where Next.
- Visual_Editor: Add an Element, Arrange Elements, Change an Element, Delete an Element.

Heading ids kept (linked from FAQ, Create_Custom_Dashboard, index): `binding-source-paths`, `type-conversion`, `scaling-and-offset`, `logged-data`, `time-series`, `layout-directions`, `show-or-hide-a-component`.

## Questions for the product owner

1. Theming warning says the Desktop licence "carries white-label rights". The register says Licensing.md does not state this. Kept as written. Confirm.
2. Hosting: the message "You can only redirect traffic if Https is enabled" appears nowhere else in the docs, so it cannot be confirmed against the UI text.
3. Hosting: which tab holds each HTTPS field? Only **Enable Swagger on API** is stated to be on the Extensions Web tab. The page does not say where the certificate and redirect fields are, and the Profinity Web page may be the owner of them. The page also does not give the HTTPS URL.
4. Conditional_Styling: "according to the system mode" for the `classes` target is undefined anywhere on the page. Kept verbatim.
5. Conditional_Styling lists `color` values (`on`, `off`, `disabled`, `unknown`) alongside the colour names. Confirm they are valid lamp colours (the Lamp page also lists colour names, so one page should own the list).
6. Data_Binding: `aggregationFunction` default is `max`; `seriesMode` default is `instant`. Both appear in the original, kept. The text "A series binding that sets `timeRangeStop` but omits `timeRangeStart` starts 10 minutes before" appears in both prose and the parameters table. Kept in both.
7. Visual_Editor: "Show footer adds the footer, except on a dashboard that contains an accordion". Confirm this is intended.
8. Visual_Editor: the **DELETE** button appears "when deletion is offered". The conditions are not stated.
9. Dashboards/index.md: the title says "development guide" but the audience is operators using the visual editor (register also notes this).

## Structural proposals not performed

- Hosting and Administration/System_Configuration/Profinity_Web.md overlap: the HTTPS settings table (Cert File, Cert File Password, Cert Key File, Windows Cert Store, Location, Subject, Redirect, ports) restates Profinity Web. Proposal: keep the three-step "serve an application" procedure on Hosting, and replace the HTTPS table with a short paragraph plus a link to Profinity Web, which becomes the one home for the settings and the redirect rule. The Extensions Web page would own the enable step and the Swagger setting.
- Theming and Administration/Licensing.md: the sentence "keeps its theme.yaml but shows the default appearance" is on both. Proposal: Licensing.md owns the entitlement, and the Theming note shrinks to one sentence with a link.
- Theming: move the `theme.yaml` key table and example to a reference page, for example "Theme file reference", and leave a short task page with the steps and a link. Not done because splits are not allowed.
- Dashboards/index.md: the following move or become links only.
  - "The starter template" moves to Examples.md next to Example 0.
  - "Schema validation" moves to Visual_Editor.md (already covered under "Validate and save") or Troubleshooting.md.
  - "Viewing dashboard source" and the Profile dashboards steps become links to How_To_Guides/View_Dashboard_Source.md and How_To_Guides/Create_Profile_Dashboard.md, since the procedures are duplicated there.
  - "A component's own dashboard" and "Standalone dashboards" move to Dashboard Component and Custom Components pages, leaving the index with the intro, figure, link list, and Prerequisites.
- Visual_Editor.md: the editor layout table (and footer buttons) is reference, and the rest is task. The register recommended `reference`. Proposal: a task page "Build a dashboard in the visual editor", plus a reference page "Visual editor layout". Not done.
- Conditional_Styling and Data_Binding both carry the binding targets table (different shapes: by target and by component). Proposal: one shared targets reference. Data_Binding is the better home and Conditional_Styling links to it.
- Data_Binding is still 2,285 words. The register suggested a three-way split (concept, reference, transform and map task). Proposal: "Tags and binding modes" (concept, with a tag to binding to component diagram), "Binding settings and targets" (reference), "Transform and map values" (task for scaling, inversion and text mapping).
- Core_Elements.md: rename to "Dashboard layout structure" per the register (a redirect would be needed), and replace the Footer paragraph with a link to Footer.md once that page owns footer behaviour. Not done because titles are not to be reworded.

## Diagrams added

None. Core_Elements has a text tree of nesting, which is kept as a code block. A Mermaid version would exceed five nodes in a row and the brief says to draw only what the text supports. Data_Binding is typed reference, so no diagram was added (the register's "tag to binding to component" diagram would suit the proposed concept page).

## Lint notes left

None.

## Fixes applied (fixer pass)

- Data_Binding 1: applied. Restored the original "Dashboards from earlier versions" note admonition, with the new-dashboard sentence last. No "Changed in" wording.
- Data_Binding 2-5: no action needed (reviewer confirmed nothing lost).
- Visual_Editor 1: applied. Removed "Changed in Profinity 2.3" sentence. The "before Profinity 2.3 keep working" sentence stays (original and Release_Notes/2.3.1.md support it).
- Visual_Editor 2: applied. Removed the "When the list is empty, select SAVE" sentence.
- Visual_Editor 3 (typing): not applied. Page stays `task`; a split is a structural proposal for the lead.
- Dashboards/index 1: applied. Headings restored to "Custom components {#custom-components}" and "Dashboard component {#dashboard-component}". Not applied: capital C in the product names, because the Vale HeadingCase rule (which I may not edit) warns on them; the terms are present and anchors unchanged.
- Dashboards/index 2: applied. Removed the duplicated tip paragraph; the Visual Editor bullet remains, and the pre-2.3 sentence and How To link were kept.
- Dashboards/index 3 (typing): not applied; landing page keeps its sections, split is a structural proposal.
- Dashboards/index 4, 5 and Core_Elements: no action (low, acceptable).
- Hosting (second look against the original): the lead's version still held a numbered procedure and "so the application opens", "(optional) A key file". Restored the original prose (enable in System Configuration, webroot block, URL sentence), removed "so the application opens", set "Cert Key File" to "Optional.", retyped `task` to `concept`. Settings table kept (port defaults, redirect rejection message, Swagger advice and the Windows store rule are all in the original).
- Theming (second look): the lead's version still held a numbered procedure with a step 5 check and the description promised "check that the theme loaded". Removed the procedure and restored the original "Where the theme is defined" prose (edit file, assets sub-folder, applied at start and on change, missing file and error behaviour with the log link). Fixed the description, retyped `task` to `concept`. Unlicensed cause is covered by the warning admonition.
- Conditional_Styling: not touched, already fixed by the lead.

Lint: 0 errors, 0 warnings on all six pages.
