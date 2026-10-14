# Wave 1 fixer brief: apply an independent reviewer's findings

An independent reviewer checked a writer's rewrite of some Profinity 2.3 pages and wrote a report. You apply the fixable findings, in place, to the same pages.

Repo root: /Users/ctuesley/Work/Profinity-Docs. Docs root: docs/Profinity_Software/Profinity_Version_2.3/. Original of any page: `git show HEAD:docs/Profinity_Software/Profinity_Version_2.3/<path>`.
Read first: /private/tmp/claude-502/-Users-ctuesley-Work-Profinity/184608cd-2b3c-464a-bb2a-fc9747896461/scratchpad/wave1/BRIEF.md (the writer rules still apply to you, in full) and STYLE_GUIDE.md.

## What to do
1. Read your reviewer report, and the writer's report for context (paths in your assignment).
2. Apply every HIGH and MEDIUM finding that has a clear fix. Apply LOW findings that are quick and safe. Do not apply a finding that would drop or invent a fact.
3. Edit only the pages in your list. Do not rename, move, delete or create files. No git commands that change state. Do not run `mkdocs build`.
4. After editing, run `node scripts/lint-docs.js <your files> --details`: 0 errors and 0 warnings.
5. Append a section "Fixes applied" to YOUR report file (path in your assignment): for each finding, applied, partly applied or not applied, with a one-line reason for anything not applied.
Final reply: the report path and a five-line summary only.

## Decisions already made (follow them)
- Facts: never add a statement the original page does not support. If a fix seems to need new information, leave the text and list it under Questions in your report.
- A procedure the original page did not contain must not be invented. Where a page was turned into numbered steps that the original did not state, restore the original prose.
- Warnings, cautions and limits that were turned into prose must regain their force: put the warning next to the step or setting it concerns, in a short admonition if it concerns harm or data loss, otherwise as a plain sentence that states the consequence.
- "Changed in Profinity 2.3" or "New in Profinity 2.3" notes only where the original page or Release_Notes/2.3.1.md supports them. Otherwise write a plain statement of the current behaviour.
- Mermaid diagrams: remove or correct any node or arrow the page text does not state. Keep at most one diagram per page, small (style guide section 3).
- Page typing: if a page's `type` does not match its content, change the `type` to the true one (the linter requires numbered steps only for task and tutorial). Do not split pages. Landing pages (`index`) may keep short decision or orientation text.
- FAQ pages: question headings are the topic (style guide 2.9). Restore each question as a heading (H3 under the H2 groups), keep the answers directly beneath.
- Reference pages do not need a next-step line.
- Keep explicit {#id} anchors that preserve old slugs.
