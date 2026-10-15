# Split "Extending Profinity" (2.3 docs)

Replaces `Extending_Profinity/` with four top-level 2.3 sections. 2.2 is untouched.
No BDD tooling in this repo, so verification is a clean mkdocs build (no new link warnings vs baseline) plus `scripts/verify-2.3-doc-urls.js`.

## Target structure
- **Tags**: index (was Tag_Layer), Tag_Relay, Tag_Linking, Tag_Tree_Path, Alerts, Actions (was Rule_Actions_And_Scripts), Collections, Derived_Tags, Tag_Expressions
- **Customising_Profinity**: Dashboards, Theming, Hosting, Mobile/OEM_White_Label
- **Integrating_to_Profinity**: APIs, MCP_Server (+ Scripting vs APIs comparison on the index)
- **Developing_with_Profinity**: SDK, Plugins, Scripting, Custom_Components (+ Component_Types, Component_Pack_CLI)
- **Administration**: Component_Catalog joins Menu_Layout

## Steps
- [x] Move files (git mv) per map; rewrite relative links everywhere under docs/
- [x] New index.md + .pages for each section; retire Extending_Profinity/index.md
- [x] Rename Rule_Actions_And_Scripts.md -> Actions.md
- [x] Update Version_2.3/.pages nav order
- [x] mkdocs.yml redirects for old 2.3 URLs
- [x] Update docs/llms.txt, docs/internal/*, scripts/verify-2.3-doc-urls.js
- [x] Verify: mkdocs build vs baseline, URL script

## Review
- 89 files moved, 54 pages had relative links rewritten; 69 redirects added for old 2.3 URLs (plus the existing OEM_White_Label redirect re-pointed).
- mkdocs build: same 13 non-spellcheck warnings as baseline (all pre-existing missing 2.3 images); spellcheck count unchanged (63).
- verify-2.3-doc-urls.js: 36/37 OK. The earlier D03 miss (stale RBAC_Permissions path) is fixed, so all 37 pass.
- Left alone: docs/internal/2.3-documentation-todo.md (historical log of old paths), all 2.2 content.
- Not committed.

---

# Batch 1: docs tooling and section landing pages (2.3 only)

Scope: `docs/Profinity_Software/Profinity_Version_2.3/` only. Rules: STYLE_GUIDE.md. Audit and batch order: tasks/docs-audit-2-3.md.
Decisions agreed: enforce with both Vale (prose rules) and a Node script (front matter, headings, llms.txt). Report on every page, fail only on pages that declare a `type` (refactored pages).
No BDD tooling in this repo. The red checkpoint is: the linter fails on a deliberately bad fixture, passes on a good one, and reports issues on current untouched pages.

## Steps
- [x] Install Vale (`brew install vale`)
- [x] `.vale.ini` and `styles/Prohelion/` rules: minimising words, contractions, em dashes, "e.g.", "please", sentence-case headings, "see" cross-references, future tense markers
- [x] `scripts/lint-docs.js`: front matter (`type`, `owner`, `last_reviewed`, `description` 70 to 160), heading hierarchy (one H1, no skips), thin sections, bold lead-ins, admonition count, then run Vale and merge results; fail only for pages with a `type`
- [x] Fixtures and `node --test` tests: bad fixture fails, good fixture passes, pilot pages pass
- [x] `scripts/generate-llms-txt.js`: rebuild the 2.3 section of `docs/llms.txt` from section landing pages, and write `docs/llms-full.txt` listing every 2.3 page with its description
- [x] Section landing pages: Getting_Started, Installation, Administration, Administration/Users_and_Access, Components/Loggers, Components/CAN_Bus_Protocols (short, link-only hubs, no new product claims)
- [x] npm scripts and a short "Checking a page" note in the repo README
- [x] Verify: mkdocs build with no new warnings, linter tests, run on all 2.3 pages and record the baseline counts

## Not in this batch
- CI changes. `.github/workflows/ci.yml` only deploys from master. Adding a lint job is a separate decision.

## Review
- Vale 3.24.0 installed. Rules in `.vale/styles/Prohelion/`, config in `.vale.ini`.
- `scripts/lint-docs.js` (structure checks plus Vale), tests in `scripts/lint-docs.test.js` (5 passing). The bad fixture fails with 8 errors and 2 warnings, the good fixture passes.
- Linting caught slips on the pilot pages before commit: missing serial commas (8) and a 183 character description. Both fixed.
- `scripts/generate-llms-txt.js` writes `docs/llms-full.txt` (182 pages). `docs/llms.txt` stays a small hand-written index with a pointer to it.
- Six `index` landing pages added, and `index` added as a page type in STYLE_GUIDE.md.
- Baseline across 182 pages (9 enforced), after checking findings in context and tightening the rules: 2 errors, 712 warnings, 340 notes. Largest: heading case 679 (all sampled hits valid), serial comma 259 (a heuristic, notes only), directional wording 21, descriptions outside 70 to 160 characters 10.
- Existing error-level hits, both valid: "powerful" in the 2.3 index.md, and "E.g." in Administration/System_Configuration/Logging.md.
- First run produced false positives, now fixed: "just" in "just opened" and "not just", "please" and "doesn't" inside quoted software messages, and "enrollment" in a shipped UI label. Quoted text and bold UI labels are now ignored, "just" is only flagged before an action verb, future tense checks only "will", and the admonition count is a note.
- mkdocs build: same 6 pre-existing warnings, none new.
- Not done: CI. `.github/workflows/ci.yml` only deploys from master, so no job runs the linter yet.
- Not committed.

---

# Batch 2: Getting started and installation (2.3 only)

Decisions (2026-10-14): both Docker routes are supported (installer with manual update, and the Watchtower compose file); Quick Start follows Windows with a link for Linux; Early Adopter release-status wording is removed from pages; the V1 migration page is kept and refactored to a task. Sentence case headings confirmed.

## Installation section (done, not committed)
- [x] Windows_Installation.md: task. F5 wording was already correct in the current text.
- [x] Applying_a_Licence.md: task, restart note moved into the steps.
- [x] Upgrade_From_2_2.md: new page, extracted from Release_Notes/2.3.1.md. The release notes keep a short pointer.
- [x] Release_Notes/2.3.1.md: macOS data location corrected to `~/Library/Application Support/Prohelion/Profinity` (F3).
- [x] Zip_Installation.md (Linux and macOS): task, hardware and licensing admonition removed, Early Adopter text removed.
- [x] Docker_Installation.md: task, Watchtower stated as an option with the volume warning (F4), broken "Directly Accessing Devices" link fixed.
- [x] Migration.md: task.
- [x] Artifacts_Directory.md: reference. Linux service layout moved to Running_As_Service, Docker volumes to Docker_Installation.
- [x] Running_As_Service.md: task, one page with three platform sections.
- [x] Security.md: sentence case, typed concept, thin HTTPS subheadings merged.
- [x] Environment_Variables.md link updated after the Docker heading rename.
- [x] lint-docs.js gained a link and anchor check (6 tests pass). It found 4 existing broken links outside batch 2: 3 in Integrating_to_Profinity/MCP_Server/index.md and 1 in Tags/Rules.md.

## Still to do in batch 2
- [ ] Getting_Started: Quick_Start (tutorial, Windows path), Profiles (concept), Create_User done, merge Adding_New_Components into How_To_Guides/Add_Component_to_Profile, merge Profinity_Log into Administration/Logs_Config, merge Visualising_Data into Customising_Profinity/Dashboards/index. Each merge needs a redirect and link updates.
- [ ] Release notes: split breaking changes and known issues from 2.3.1.md (ceiling, optional), retitle 2.2.5.

## Open
- The installer commands use GitHub release URLs. If 2.3 is not published there yet, these examples will not work until release. Confirm before publishing.
- The Watchtower compose file has no public link in the docs. Add one if the file is published.

---

# Wave 1: parallel refactor of Components, Tags, CAN Utilities, Customising, Mobile and Profinity AI (2.3 only)

Run 2026-10-14 and 2026-10-15. 11 Sonnet writers (in place, no moves or splits), 11 independent Sonnet reviewers, then 9 fixers applying the reviews. Briefs and every report are in tasks/wave1/ (BRIEF, REVIEW_BRIEF, FIX_BRIEF, G* writer reports with "Fixes applied", R* reviewer reports).

## Result
- Typed pages:      105 of      183 (was 18). Whole-2.3 lint: every typed page passes with 0 errors and 0 warnings. Heading-case warnings fell from 679 to 281.
- Mechanical fact check across 85 changed pages (every inline code value and number in the original must appear in the rewrite): only the version label "2.3" was missing on five pages, which was release-status wording removed on purpose.
- Reviewers found nine invented statements in Hosting, Theming and Conditional_Styling (G7a), all removed by restoring the original prose. They also found a dropped phrase in Component_Reference/index.md (fixed), and a FAQ whose question headings had been removed (restored).
- 16 Mermaid diagrams added to component and concept pages. None has been checked by a person against the product.

## Found along the way
- Caption.md, Lamp.md and Log.md under Customising_Profinity/Dashboards/Component_Reference/Data/ are ignored by the global gitignore rule "Data" (~/.gitignore_global line 12). They were never committed, so a build from git lacks them. Their text was checked against the old site/ build. Fixed at the source: the global rule was changed from Data to /Data (root-level only), so the three pages show as untracked and a normal git add picks them up. Root-level Data folders in the website repos are still ignored. Not yet committed.
- mkdocs does not validate anchors in this repo. scripts/lint-docs.js does.

## Not done
- No page was split, merged or moved. Each writer's proposals are in its report.
- Product questions are in each G report under "Questions".
- Not committed.

---

# Wave 2: Administration, Developing, Integrating, How-To, Getting Started and Release Notes (2.3 only)

Run 2026-10-15. 9 Sonnet writers, 9 independent reviewers, fixers for the groups that needed them. Briefs and every report are in tasks/wave2/ (BRIEF has a "Lessons from wave 1" section that was added after the wave 1 mistakes).

## Result
- Typed pages: 182 of 183. The one exception is the 2.3 root index.md, which had uncommitted edits before this work and was deliberately not touched. It has 1 lint error ("powerful") and 3 warnings (two Title Case headings, a long description), plus 3 spelling warnings in the mkdocs build.
- Whole-site lint: 0 errors and 0 warnings on every typed page. mkdocs build: 3 warnings, all in the root index.md (the three MCP Server link warnings are fixed).
- Mechanical fact check across 162 pages changed since HEAD: the only original tokens missing are the version label "2.3" (release-status wording removed on purpose) and `Profile.css` (corrected to `profile.css`, the verified F2 fact).
- Reviewers found no invented facts in wave 2 (the wave 1 brief lessons worked). Real defects found and fixed: empty list items on the MCP Server page (a new linter check, EmptyListItem, now catches this), the Lua and logo attribution comment (restored), wrong or unverified image alt text, an unsupported "three of them serve dashboard assets" sentence, warnings turned into prose (restored as admonitions), and "when" softened from "only when" in the Desktop accounts rule.
- Product facts applied: F1 (Desktop accounts only with a Server licence), F2 (four profile folders, `profile.css`).

## Decisions made without asking (please confirm)
- Getting Started merges NOT done: Adding_New_Components (15 inbound links), Profinity_Log (28), Visualising_Data (2) each do a distinct job, and merging would need about 45 link rewrites and redirects for little reader benefit. The two Add Component pages cross-link each other.
- Release notes 2.3.1 not split: 28 heading anchors are linked from other pages.

## Still open
- Commit (nothing from waves 1 or 2 is committed).
- Structural proposals in each G, D, I, H and A report (splits, shared overlay page, and so on).
- Product questions in each report. Largest themes: Auto Connect wording (starts with Profinity or when the profile loads), curl example with password on the command line, AI capability claims, rule scripts needing the Server edition.
- 16 Mermaid diagrams (all added in wave 1; wave 2 added none) are unchecked by a person.
- The 2.3 root index.md.
- CI lint job.

- Manual checks and approvals the user will do at the end: tasks/manual-checks.md (every item starts unticked).
