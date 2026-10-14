# R7b review: Dashboards Examples, FAQ, Full_Example, Profile_Directories, Troubleshooting

Method: extracted every fenced block from `git show HEAD:` and from the working file for each page and diffed them; read the full `git diff HEAD` for each page; ran `node scripts/lint-docs.js` on each page and on the whole 2.3 folder; searched `docs/` for links to these pages.

## Cross-cutting results

- Code and YAML blocks: byte-identical to HEAD on all five pages (diff of extracted fences is empty for each). Confirmed.
- Linter on the five pages: 0 errors, 0 warnings (5 info notes). Whole 2.3 folder: 5 errors, none on these pages (Logging.md Abbreviations, MCP_Server/index.md three Links to a missing `APIs/index.md`, index.md Marketing). Pre-existing and outside this list.
- Inbound anchors: the only links into these pages are `Examples.md#example-0-hello-world-template` (index.md, still resolves), `Profile_Directories.md#profileimages` (Troubleshooting, still resolves) and the FAQ's own links. No page links to a removed FAQ anchor or a removed Examples H4 anchor. Confirmed.
- No Mermaid diagrams on any page.
- Writer report inaccuracy: it says FAQ had "30 question headings". It had 22 (`### ` count 22 at HEAD). The rewrite has 22 question lines. Nothing dropped or merged (I compared the question list line by line in the diff). The "30" is a counting error in the report only.

## Examples.md: verdict FIX

1. (medium) Removing the seven H4 headings left five motor controller blocks and two battery blocks as run-on lead-in sentences that no longer read naturally: "A status indicator is a lamp that lights with the `Online` flag:", "A chart is a time series of the bus current:", "A panel is a titled group of related lamps:", "The main layout is a pill with...", "The interactive image is an Image of...". These are definitions rather than introductions, and a reader can no longer jump to or scan the building blocks. Suggested: keep short plain lead-ins ("This block adds a lamp that lights with the `Online` flag:") or, better, restore the H4s given they hold a YAML example each (the linter only raised an info note). The page's own `Structure` note is info, not a requirement.
2. (low) Page mixes tutorial progression (Examples 0-4) with a copy-paste reference of components. The writer declared `reference`; `tutorial` or `how-to` would fit the first half better. Writer already flagged the split as not done; I agree it is a ceiling, not a defect.
3. No dropped or invented facts found. All numbers, names, the `version: "2.3"` sentence and the `profile.css` sentence preserved.

## FAQ.md: verdict REWORK

1. (high for usability, not a lost fact) The question lines now sit directly above the answer with no blank line, for example `What is a Profinity dashboard?` then `A Profinity dashboard is...`. `mkdocs.yml` has no `nl2br` extension, so standard Markdown joins these into one paragraph. Each question will render run into the first sentence of its answer, in ordinary body text, with no bold, no line break and no anchor. The writer's own "one sentence per line" convention is what makes this fail. The page will read as 22 undifferentiated paragraphs. I did not render the site; this follows from the extension list in mkdocs.yml and standard Markdown behaviour.
2. (high) Should the question headings be restored: yes, I would restore them, as H3 under the five H2 groups. Reasons:
   - A FAQ is the textbook case where a heading names the topic the reader is looking for. Style guide 2.9 says headings name the topic. Readers scan a FAQ by question; the toc.integrate side navigation currently lists only five groups instead of 22 questions, and in-page search and browser find lose their landing points.
   - Anchors for deep links (for example from support replies or other pages) disappear. None exist today, but the page is exactly the kind people link to.
   - The 2.6a rule (remove headings over one or two sentences) is aimed at padding headings over short sections. Here the heading is the question itself, the content is the answer, and the question cannot be cut without losing the page's function. The linter only raised an info note, which supports keeping them.
   - If the writer's reading of 2.6a is to be kept, the minimum fix is a blank line between question and answer and bold on the question; that removes the paragraph merge but still gives no anchors or nav entries. Restoring H3 is the better fix.
3. (medium) Content was regrouped, not only de-headed. "Where do I put images, styles, and content files?" moved from the old Profile Assets group into "Component and layout questions", and the old Layout group was merged into it. "How do I arrange components horizontally" and "show or hide sections conditionally" are now in the Component group, and the asset question sits after them. This is a defensible grouping but the order is odd (asset storage placed between layout and data binding). Suggested: move it into "General questions" next to the YAML file question, or keep a small assets group.
4. (low) Mixed "See" to "Refer to" conversion is fine, but "Refer to [Troubleshooting]" etc. at the start of a sentence on its own line gives 8 near-identical lead-ins. Vary or fold into the previous sentence.
5. Content: all 22 questions and answers present. Compared answers line by line; facts (minimum 1000 ms `refreshInterval`, `Modify dashboards` permission, `profile.css`, link targets, anchors) unchanged. No drops.

## Full_Example.md: verdict PASS

1. (low) The "WaveSculptor200" note admonition became a plain sentence, but the sentence now sits as a short orphan paragraph after the three-patterns paragraph. It reads acceptably. No fact lost (WaveSculptor200 sends the same messages and signals; tags apply to both).
2. (low) The "Tags used" paragraph is a very long, nested-parenthesis sentence (`root mean square (RMS)`, `back electromotive force (back-EMF)`) and the first sentence runs about 100 words. The writer noted this; I agree a table or list would serve the reader better, but this is polish, not a defect.
3. Facts: 200 ms and one second broadcast rates, seven limit flags, eight of nine error flags, `ErrorBadMotorPositionHallSeq` not bound, the 1.9 V rail, all preserved. "performance, and" serial comma added; American spelling none. No invention.

## Profile_Directories.md: verdict PASS

1. Product fact check: the rewrite says "Profinity creates the `images`, `models`, `styles` and `content` folders for a new profile. The Example Profile that ships with Profinity contains only `images`, `styles` and `dashboards`, so in that profile create the `models` or `content` folder beside them before adding files to either." That is exactly the verified fact. The lowercase folder names and capitalised URL paths sentence is retained, and `profile.css` is lowercase everywhere (the `@import` and "loads only the file named `profile.css`" sentences unchanged).
2. The tree diagram is a code block and is unchanged, so it still lists `models` and `content`. Combined with the new sentence this is consistent.
3. Nothing else about the folders changed: formats `.glb .gltf .stl .obj`, 2 MB image limit, image extensions, built-in-first lookup, sanitiser element lists and the "other directories" table are identical in substance.
4. (low) Bold removed from the four paths in the intro: correct, now code only.
5. (low) Cross-page conflict noted by the writer is real: `Administration/Profiles.md` line 58 still says "three folders" and `Profile.css`. Outside this list; should be fixed in a later batch.

## Troubleshooting.md: verdict PASS

1. All symptoms and fixes present. Every exact error string survived: `must NOT have additional properties`, `must have required property 'type'`, `must have required property 'readout'`, `must have required property 'items'`, `must be equal to one of the allowed values`, the path example `/dashboard/items/0/row/items/0/chart: must NOT have additional properties`, and the full load-error screen text "The dashboard's saved layout doesn't match the current schema. Reset it from the template, or open Edit Dashboard to repair the file manually." Button names `Reset from Template`, `Schema validation issues`, `SAVE` and `DESIGN` unchanged. Valid chart types list unchanged. Headings kept, so `#image-does-not-appear`, `#data-not-updating`, `#charts-not-rendering` still resolve.
2. (medium) Dropping the bold `Problem:` / `Solution:` labels leaves the error sections as two bare sentences with a code block in between. Because the problem and fix are now unlabelled, the fix sentence ("Change `charttype` to `type`:") reads clearly enough, but the "Problem" statement in several sections is now a bare fact ("Pill components use `items`... not `groups`.") that does not say it is the cause. Acceptable; if the owner wants clearer cause and fix, add the words "This happens because" or "To fix it". Not a defect.
3. (low) Two sentences remain on one line in the `Readout`, `Panel` and `Tab` error sections ("...pill. Without the wrapper..."), unlike the rest of the page which is one sentence per line. Inconsistent but harmless in rendering.
4. (low) The tip admonition was folded into the introduction, and the order changed: the "The editor checks the dashboard YAML..." sentence now comes first, then the Schema validation issues sentence. Meaning preserved.
5. (low) The chart-type "Problem" was changed from "Using an invalid chart type value." to "The `type` of the chart is not a valid chart type." Same meaning.

## Overall summary

Code blocks are identical on all five pages and the linter is clean with no broken links. Profile_Directories, Full_Example and Troubleshooting preserve all facts and are ready. Examples needs lead-in wording fixed (or H4s restored). FAQ needs rework: removing the question headings plus one-sentence-per-line causes each question to merge into its answer paragraph, and the headings should come back as H3 under the five groups. The writer's "30 questions" is actually 22, with none lost.

## High severity findings

1. FAQ.md, all 22 question/answer pairs: question line directly above answer with no blank line, no `nl2br` in `mkdocs.yml`, so they render as one paragraph each.
2. FAQ.md, whole page: removing question headings removes scan, anchor and navigation value on the one page where the question is the topic. Recommend restoring as H3 headings.

No high-severity facts lost or invented on any page.
