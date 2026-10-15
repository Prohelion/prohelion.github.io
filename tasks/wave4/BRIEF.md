# Wave 4 gap-filling brief: refactor Profinity 2.3 pages to the style guide

You are one of several agents rewriting pages of the Profinity 2.3 documentation in parallel. Each agent owns a separate list of pages. You rewrite your pages IN PLACE to follow the style guide, without losing or inventing any technical fact.

Repo root: /Users/ctuesley/Work/Profinity-Docs
Docs root: docs/Profinity_Software/Profinity_Version_2.3/  (page paths in your list are relative to it)
Original content of any page: `git show HEAD:docs/Profinity_Software/Profinity_Version_2.3/<path>`

## Read first
1. STYLE_GUIDE.md (whole file). It is the rulebook. Pay particular attention to: section 1 (front matter, page types and templates, headings), 2.3 to 2.6a (rhythm, tone, terminology, AI tells, structure has to earn its place), 2.8 (write for the user), 2.9 (search and AI readiness), 3 (images, Mermaid diagrams, admonitions), 5 (lists and procedures), 6 (links).
2. Three finished examples of the target quality: Getting_Started/Create_User.md (short task), Installation/Windows_Installation.md (task), Components/Publishers_and_Subscribers/MQTT_Publisher.md (component page with a quick start and a Mermaid diagram).
3. Context only: tasks/docs-audit-2-3.md section 2a, and the audit register file named in your assignment. Some register flags are superseded by section 2a (templates are maximums, a sentence can replace a heading, splits are ceilings).

## Hard rules
1. Edit ONLY the files in your list. Do not rename, move, delete or create any file. Do not edit mkdocs.yml, any .pages file, any other page, scripts, or the style guide. Do not run git commands that change state (no add, commit, checkout, stash, reset, restore).
2. Preserve every fact. Every value, default, range, name, step, warning, licence requirement, example and limitation in the original must survive in the rewrite. Do NOT add product facts that are not in the original page. If something looks wrong, unclear or contradictory, keep the original wording and record it under Questions in your report.
3. Keep anchors working. Other pages link to your headings. Changing only the capitalisation of a heading keeps its anchor. Do not reword a heading. If you must reword or remove a heading, add an explicit id equal to the old slug, for example `## New wording {#old-slug}`, so existing links still resolve.
4. Front matter on every page: keep `title` (convert to sentence case, product names keep their case), keep a `description` of 70 to 160 characters that says what the reader can do or find out, and add `type`, `owner: Documentation` and `last_reviewed: 2026-10-14`. `type` is one of tutorial, task, reference, concept, component, index. Dashboard widget pages under Component_Reference are `reference`. Category landing pages are `index`.
5. Style, in short: sentence case headings; one sentence per source line; procedures as numbered imperative steps with the condition first and the result after; serial comma; Australian spelling; no contractions, em dashes, emoji, marketing words, "just", "simply", "easily", "please", "e.g." or "i.e."; present tense; "refer to" not "see"; exact page titles as link text; UI labels in bold; code values in code format; link the first mention of a concept that has its own page. Remove release-status wording ("Early Adopter", "currently available for..."). Convert version history ("renamed in 2.3", "previously") into a short "Changed in Profinity 2.3: ..." note at the end of the relevant section, only where it matters to the reader.
6. Restraint (style guide 2.6a). Use only the structure a page needs. Remove headings over one or two sentences, bold lead-in phrases, tables for short lists, and "Related documentation" lists that only repeat links already in the text. Keep a related-links sentence or list where it carries links the text does not. At most one or two admonitions, only for harm or data loss; keep a licence requirement as one short note. Keep tables that hold multi-attribute data such as settings. The page should read as if a person explained the product, not as a form being filled in.
7. Diagrams. For `component` and `concept` pages whose text clearly describes a data flow or relationship, add ONE Mermaid diagram following style guide section 3 exactly (figure and figcaption, left to right, five or fewer nodes in a row, short labels, no arrow labels, subgraphs only to show where parts run, no colours or styling). Draw only what the page text states. If the text does not support a diagram, add none. Report every diagram you add so a person can check it.
8. Do not split, merge or move content between pages. If you think a page should be split, merged or moved, write the exact proposal in your report instead.
9. Images: keep the file paths and figures. Improve alt text so it says what the image shows. Keep captions.
10. Audience (style guide 2.8): no class names, file paths in the source repository, internal plans, ticket numbers or design history. Keep names the user sees or types.

## Check your work
From the repo root, run `node scripts/lint-docs.js <file> <file> ... --details` on exactly your files. Your files must show 0 errors and 0 warnings. Fix notes that are real (for example a genuine missing serial comma). Do not run `mkdocs build`, and do not lint other agents' files.
Then read each page once as a reader would, aloud in your head. If it reads like a form being filled in, remove structure.

## Report
Write your report to the path named in your assignment (markdown). Include:
- A table: page, type chosen, words before and after, diagram added (yes or no), one line on what changed.
- Facts removed or altered: expected to be none. List anything you dropped or reworded in a way that could change meaning, with the original text.
- Questions for the product owner: contradictions, unclear claims, values you could not confirm.
- Structural proposals not performed: splits, merges, moves, with exact page names and the content that would move.
- Diagrams added, with the sentence in the page that supports each.
- Lint notes left, and why.
Your final reply must be only the report path and a five-line summary.


## Lessons from wave 1 (these override anything above that is less strict)
Independent reviewers checked wave 1 and found these mistakes. Do not repeat them.
1. NEVER invent a procedure, step, permission, prerequisite, check, result, or description of what a setting does. Nine invented statements were found in three pages. When you turn prose into numbered steps, use only the actions the original page states, in the original order. If the original gives no procedure, do not create one: type the page as concept or reference. If the original has no verification step, do not write one: list the gap under Questions. A sentence such as "You need the X permission", "Check that it shows...", "create the file if it does not exist" must exist in the original.
2. Keep every warning, caution, limit and data-loss note at full strength. If you turn an admonition into prose, put it next to the step or setting it concerns and keep the consequence. Safety, firmware, charging, credentials and licence notes stay as admonitions.
3. Do not lowercase a product or feature name to satisfy the heading-case linter (for example Custom Components, Dashboard Component, Kiosk Mode, Plugin Manager, System Configuration). Keep the correct capitalisation. Warnings that come only from product or feature names in headings are acceptable: list each in your report under "Heading-case false positives" so the lead can add them to the rule. Fix every other warning and every error.
4. Do not remove question headings from FAQ-style pages, or any heading a reader would scan or search for. Remove only headings over one or two sentences that name nothing a reader would look for.
5. "Changed in Profinity 2.3" or "New in Profinity 2.3" notes only where the original page states the change or Release_Notes/2.3.1.md supports it. Otherwise state the current behaviour plainly.
6. Mermaid diagrams: draw only nodes and arrows that the page text states. Do not add subgraphs, arrows or labels the text does not support. No diagram on reference pages.
7. Code blocks and YAML, JSON, C#, Python and Lua examples must stay byte for byte unless you are fixing a pure whitespace problem. Never retype a value.
8. Anchors: when other pages link to a heading, keep its slug (capitalisation changes are safe; wording changes need an explicit {#old-slug}). Before you remove or reword a heading, search the docs tree (`grep -rn "<slug>" docs`) for links to it.
9. Page type must fit the content: a page with no numbered procedure cannot be `task`.
10. The facts below are verified against the code or confirmed by the product owner. Apply them to the pages where they are wrong, and nowhere else:
   - Desktop mode (F1): user accounts and roles exist on a Desktop host ONLY when a Server licence is applied. Pages that say a Desktop installation has no accounts or roles at all must say it needs a Server licence (a Desktop installation without a Server licence runs as a single built-in administrator). Administration/Licensing.md already says this correctly.
   - Profile folders (F2): the engine creates four folders for a profile, `images`, `models`, `styles` and `content`, and the stylesheet is lowercase `profile.css`. Administration/Profiles.md says three folders and `Profile.css`: correct it.
   - A desktop licence does not allow browser sign-in from another machine; that needs a Server licence (F5).
   - Docker: both the one-line installer with manual updates, and a compose file with the Watchtower updater, are supported (F4).
   - macOS data folder: `~/Library/Application Support/Prohelion/Profinity` (F3).
11. Where two pages repeat the same content, do not delete either. Record the overlap in your report. The only exception is when your assignment says otherwise.
12. Do not edit the 2.3 root index.md or any page outside your list.


## Wave 3 rules: moving, splitting and merging content (these override anything above that conflicts)
This wave changes the structure of a few pages, as the product owner approved. Your assignment says exactly what to move, create or merge. Everything else in this brief still applies, in particular: never invent a fact, keep every warning at full force, keep code and tables byte for byte, keep anchors working.
1. MOVING CONTENT IS NOT REWRITING. When a section moves to another page, move its sentences, tables, code and figures with their wording unchanged (you may adjust only the heading level, link paths and the sentence that introduces it in its new home). Every fact on the old page must exist on exactly one page afterwards. Where a moved section leaves a gap, leave ONE short sentence and a link to the new home.
2. CHECKLIST OF FACTS. Before you edit, list every fact, value, default, warning, example and link in the sections you will move or merge (in your report, under "Fact ledger"). After you edit, tick each one against the new location. Anything you cannot place is a failure: say so in your report instead of dropping it.
3. NEW PAGES: create only the page(s) named in your assignment, with full front matter (title in sentence case, description 70 to 160 characters, type, owner: Documentation, last_reviewed: 2026-10-15), one H1 matching the title, and one sentence per line. Do not create any other file.
4. YOU DO NOT EDIT: mkdocs.yml, any .pages file, any page not in your assignment, and you do NOT delete or rename any file. The lead adds navigation, redirects and deletes old files after review.
5. INBOUND LINKS. Other pages link to headings you move. Before you move anything, search the whole docs tree (`grep -rn "<file>.md#<slug>" docs`) and list every inbound link to every moved or merged heading. Update links inside the pages you own. For links in pages you do not own, DO NOT edit them: list each in your report under "Inbound links to fix" as `file:line | old link | new link`, so the lead can apply them mechanically.
6. After editing, run `node scripts/lint-docs.js <every file you edited or created> --details`: 0 errors and 0 warnings. Links errors count: every link and anchor in your files must resolve (the old pages that will be redirected still exist while you work, so you may link to them only where your assignment says).
7. Report to the path in your assignment: pages changed and created, the fact ledger with the new location of each item, inbound links to fix, questions, and anything you decided not to do and why. Final reply: the report path and a five-line summary.


## Wave 4 rules: writing new content from existing facts (these override anything above that conflicts)
This wave creates pages and tables that do not exist yet. The product owner approved the items, on one condition: NO NEW FACTS. Everything you write must already be stated on an existing page of the 2.3 docs (or in a page of the code repository that your assignment names).
1. SOURCE LEDGER. For every sentence, table cell and step you write, record in your report the page and the exact quoted sentence that supports it. If you cannot quote a supporting sentence, do not write it. A reader-friendly rewording is allowed, but the meaning must not widen: if the source says "on Windows", you may not say "on all platforms".
2. STEPS AND CHECKS. A tutorial or task may contain only actions that existing pages state, in an order the pages support. A result or checkpoint ("you should see...") may be written only if an existing page states that result. Where a tutorial would normally have a checkpoint and no page states one, write none and list it under Questions.
3. Where the existing pages disagree with each other (a value, a name, a behaviour), do not choose: keep the statement from each source, mark the difference in your report under "Conflicts between sources", and in the page write only what all sources agree on.
4. Create only the files named in your assignment. Do not edit any existing page except the ones your assignment lists. The lead adds navigation and links to the new page from elsewhere. Do not delete or rename anything.
5. New pages need full front matter (title in sentence case, description 70 to 160 characters, type, owner: Documentation, last_reviewed: 2026-10-15), one H1 matching the title, one sentence per line, a first sentence that states the page purpose, and links to the pages that own each fact (link, do not copy, anything longer than one sentence).
6. Lint (`node scripts/lint-docs.js <files> --details`): 0 errors and 0 warnings. Every link and anchor must resolve.
7. Report: files created and edited, the SOURCE LEDGER (page, quote, where used), conflicts between sources, questions, and anything you decided not to write and why. Final reply: the report path and a five-line summary.
