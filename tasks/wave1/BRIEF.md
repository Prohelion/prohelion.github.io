# Wave 1 writer brief: refactor Profinity 2.3 pages to the style guide

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
