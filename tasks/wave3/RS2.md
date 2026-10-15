# Review RS2: Overlay_Elements (new), Image, Model, Actions, Toggles

Method: committed versions extracted with `git show HEAD:`, diffed against the working tree. Every old line that is absent from the union of the new page and the edited page was listed. The only absent lines are the ones that changed link targets or were replaced by a pointer (listed below). Lint run on the whole 2.3 folder (186 pages, 0 errors, 0 warnings) and on the five pages (0 errors, 0 warnings, 1 info note: Toggles line 18 serial comma, which is pre-existing text and an info only).

## Overlay_Elements.md (new): PASS with low findings
1. (low) First sentence defines "overlay elements" rather than stating the page purpose; the purpose is the second sentence ("This page holds the parameters and rules that the two components share."). Suggest swapping the order, or merging into one opening sentence.
2. (medium) The Display types YAML examples use percentage `x` and `y` with no `z`. These are Image-shaped, and the page now presents them as shared. The Model page requires `x`, `y` and `z` for data values. A Model reader copying the example gets an incomplete data value. Suggest one sentence stating that the examples use Image positions and that a Model data value also needs `z` (both facts are on the Image and Model pages already, so nothing is invented).
3. (low) Annotation lines intro ("Annotation lines connect elements (icons, data values, regions, or points) ... Lines are drawn automatically between connected elements") was Image text only. The Model page had no such statement. It is now stated above both the Image and Model tables. Not wrong, but it is Image wording extended to Model. Consider noting this in the report to the product owner.
4. No invented text found. Intro sentence 1 derives from Image intro; "The parameters are the same for an Image component and a Model component" derives from the Model original.

## Image.md: PASS
Fact ledger, all moved items found verbatim on Overlay_Elements.md: Action invocation table (8 rows incl. "Not used by overlays" notes), Layers table and YAML, three Display types examples and the status lamp paragraph, Annotation lines intro, table, both YAML examples. Icon source form: the original `icon` row text now exists as a sentence under "Icon source forms" (wording rearranged: "The `icon` parameter of an icon is the icon source: ..."; extension list, `/Profile/Images`, emoji, `M` path data, `<svg>` first path, "Any other text is displayed as text" all present). The Image `icon` row now only says "Refer to Icon source forms", so the Image page itself no longer lists the forms. That is acceptable under the move rule.
Image-only differences kept in place: percentage x/y, rectangular regions, tooltip on hover for icon `label`.
Links to moved headings updated and resolving (Layers, Image annotation lines, Action invocation x3, Icon source forms, Display types x2). The Image `### Display types` heading is replaced by one sentence and link.

## Model.md: PASS
Only the Annotation line parameters table moved (all 5 rows verbatim under "Model annotation lines" on the new page, including "in model space", optional `z`, "Elbows are not percentages"). Model-only differences kept in place: sphere region with x/y, x/y/z positions, point size `0.05` radius, icon `label` "does not show the label as a tooltip". The Model `annotationLines` row now links to Model annotation lines. Links resolve.

## Actions.md: PASS
Adds two sentences at line 47 to 48 linking to Action invocation. Accurate: the invoke types are the same ones used by the overlay and toggle `action` objects.

## Toggles.md: PASS with one medium note
The `action` row links to `Overlay_Elements.md#toggle-action-invocation`; the Toggle table (8 rows) matches the old Toggles table row for row, including the two Actions links and "Not used by toggles".
1. (medium, structure not fact) The Toggle page no longer carries its own action table, so a reader of Toggles must leave the page for the parameters of the one object the Toggle needs. Product-owner choice; no facts lost. Alternative: keep the Toggle table on Toggles.md and link from the overlay page.

## Check 2: two versions kept
Confirmed right. Overlay and Toggle action tables differ in every `value`, `confirmMessage`, `trackProgress` and `restartingOnSuccess` row ("Not used by overlays" versus actual behaviour) and in the Actions links. Image and Model annotation tables differ in elbows (percentages 0 to 100, x/y both required versus model space, optional `z`, not percentages) and in "element" versus "overlay element". No difference was erased or stated as true of both. Region rectangle versus sphere, and icon label tooltip versus accessible text, stay on their own pages and are not touched.

## Check 3: links
No lint Links errors. No page outside Interactive links to a moved heading (grep for the old slugs found only the new Actions.md link). Old redirects in mkdocs.yml are unaffected.

## Check 4: Component_Reference/index.md line 19
"Pages for components with overlay elements, such as Image and Model, cover what differs between the two, and the overlay tables they share are on Overlay elements." Accurate and links resolve. (low) "cover what differs between the two" is slightly awkward; "describe what differs between them" reads better. Also note the .pages entry was added.

## High severity findings
None.
