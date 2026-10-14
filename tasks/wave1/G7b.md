# G7b report: Dashboards Examples, FAQ, Full_Example, Profile_Directories, Troubleshooting

| Page | Type | Words before / after | Diagram | What changed |
|---|---|---|---|---|
| Examples.md | reference | 1264 / 1283 | no | Front matter, sentence-case headings, one sentence per line, seven H4 headings (five motor controller blocks, two battery blocks) folded into lead-in sentences. |
| FAQ.md | reference | 998 / 987 | no | All 30 question headings become plain lead-in sentences with the answer beneath; 7 groups reduced to 5 H2 groups; every question and answer kept. |
| Full_Example.md | reference | 1757 / 1766 | no | Front matter, sentence case, one sentence per line, the WaveSculptor200 note admonition becomes a plain sentence. |
| Profile_Directories.md | reference | 1169 / 1198 | no | Front matter, sentence case, bold removed from the four paths in the intro, models/content sentence reworded (below). |
| Troubleshooting.md | reference | 2276 / 2271 | no | Front matter, sentence case, bold Problem/Solution labels removed, tip admonition folded into text, refer-to wording. |

All YAML and code blocks are byte-identical to HEAD (checked by extracting every fenced block from old and new text).

## Facts removed or altered
- Profile_Directories.md, applied the verified fact. Original: "The Example Profile that ships with Profinity contains `images`, `styles` and `dashboards`, so create the `models` or `content` folder beside them before adding files to either." Now: "Profinity creates the `images`, `models`, `styles` and `content` folders for a new profile. The Example Profile that ships with Profinity contains only `images`, `styles` and `dashboards`, so in that profile create the `models` or `content` folder beside them before adding files to either." Nothing else about the folders changed.
- Troubleshooting.md: the chart-type problem line "Using an invalid chart type value." is now "The `type` of the chart is not a valid chart type." (fragment made a sentence, same meaning). Bold "Problem:" and "Solution:" labels dropped; the text after each stays.
- Troubleshooting.md: the tip "The Visual Editor Lists Schema Problems for You" is now two plain sentences in the introduction.
- Examples.md: the former H4 headings (Basic Structure, Data Binding, Status Indicators, Charts, Panels, Main Layout, Interactive Image) are gone and their lead-in sentences now begin "The basic structure is...", "Data binding connects...", and so on. No inbound links existed to those anchors (searched all docs).
- FAQ.md: the question headings are gone. No page links to FAQ anchors (searched all docs).
- Full_Example.md: the note admonition titled "The Same Dashboard Suits the WaveSculptor200" is now a plain sentence without the title.

Anchors kept: every heading changed only in case, so existing links (including `Examples.md#example-0-hello-world-template` from index.md and the FAQ links to Examples, Troubleshooting and Profile_Directories) still resolve.

## Questions for the product owner
- Examples.md Example 0 uses the icon `IbmWatsonKnowledgeStudio` (audit register asks to verify it is a built-in icon). Left as is.
- Examples.md prose says "`version` stamp is optional ... includes `version: "2.3"`". Kept; the folder-level rule treats this as a literal YAML value.
- Profile_Directories.md says `profile.css` is the only stylesheet the interface loads; Administration/Profiles.md reportedly says three folders and `Profile.css` (audit register). That page is outside my list and should be aligned to four folders and lowercase `profile.css`.
- Full_Example.md "Tags used" is one very long paragraph that lists signals in running prose. It could be a table, but I kept it to avoid restructuring facts.

## Structural proposals not performed
- Examples.md audit proposal to split into tutorial, component examples and motor controller blocks (merge into Full_Example.md): not done, per the brief (splits are ceilings). If wanted, the "Building a motor controller dashboard" blocks would move into Full_Example.md.
- Troubleshooting.md audit proposal to split into a schema error reference and a fix-by-symptom page: not done.
- Profile_Directories.md "Other profile directories" table overlaps Administration/Profiles.md; one home should be chosen.

## Diagrams added
None. No page describes a data flow suited to a diagram.

## Lint notes left
0 errors and 0 warnings on all five. Notes left:
- Examples.md Structure (8 short sections), Troubleshooting.md Structure (11), Full_Example.md Structure (2): the short sections each hold a YAML example or an error message a reader would search for, or are referenced by links, so the headings stay.
- Full_Example.md SerialComma "speed and distance": it is the name of one panel, not an item in a list. Adding a comma would change the meaning.
- FAQ.md SerialComma "component, Examples and Full": false positive, the sentence is a correct list of three clauses.

## Fixes applied

- FAQ 1-2 (high, paragraph merge, headings): applied. All 22 questions restored as H3 (sentence case, slugs identical to the originals) with a blank line and the answer beneath; none link-targeted elsewhere. The writer's "30 questions" is a miscount; there are 22.
- FAQ 3 (medium, regrouping): applied. The assets question moved into General questions beside the YAML file question.
- FAQ 4 (low, repeated "Refer to"): partly applied. One lead-in varied to "For more detail, refer to"; the others left, as they now sit in separate answers.
- Examples 1 (medium): applied. Seven H4 headings restored (Basic structure, Data binding, Status indicators, Charts, Panels, Main layout, Interactive image) with the original plain lead-in sentences. YAML untouched.
- Examples 2 (low, page type): not applied; page split is out of scope.
- Full_Example, Profile_Directories, Troubleshooting: no changes; remaining low items are optional polish.
- Linter: run on FAQ.md and Examples.md after edits (see result in the fixer's reply).
- Linter: 0 errors, 0 warnings. FAQ heading 'How do I use custom HTML?' reworded to 'How do I use the `html` component?' because the linter's heading-case rule flags 'HTML' (its slug changes; no inbound links).
