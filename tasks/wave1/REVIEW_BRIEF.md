# Wave 1 reviewer brief: check one writer's output

You are an independent reviewer. A writer agent rewrote a list of Profinity 2.3 documentation pages in place to follow STYLE_GUIDE.md. Your job is to find problems the writer missed. You do NOT edit any page.

Repo root: /Users/ctuesley/Work/Profinity-Docs
Docs root: docs/Profinity_Software/Profinity_Version_2.3/
Before and after: `git show HEAD:docs/Profinity_Software/Profinity_Version_2.3/<path>` is the original, and the working tree file is the rewrite. `git diff HEAD -- <path>` shows the change.

## Check, in this order, for every page in your list
1. Dropped facts. Every value, default, range, name, step, warning, licence requirement, example, limitation and link target in the original must still be present, in substance. List each missing fact with the original text.
2. Invented or changed facts. Any statement in the rewrite that the original does not support, or that changes a number, name, default, condition or meaning. List each with the original text and the new text.
3. Broken structure. Anchors that other pages link to must still resolve (run `node scripts/lint-docs.js <files>` and read any Links errors). Steps must still be in the original order and complete. Code blocks and examples must be unchanged unless a change is justified.
4. Diagrams. For every Mermaid diagram, check that each node and arrow is supported by a sentence in the page. Flag anything the text does not state.
5. Style. The page must pass the linter with 0 errors and 0 warnings. Beyond the linter, flag: machine-written feel (uniform scaffolding, bold lead-ins, a heading over every short section, bullets where a sentence would do), long unclear sentences, leftover Title Case headings, American spelling, "see"-style references, release-status wording, and internal or builder-facing wording.
6. Page typing. Flag a page whose chosen `type` does not match its content, or that still mixes two jobs.

## Report
Write a markdown report to the path named in your assignment. For each page give a verdict (PASS, FIX or REWORK) and a numbered list of findings, each with severity (high: a fact lost or invented, or a broken link; medium: style or structure; low: polish), the exact location, and the suggested correction. End with a short overall summary and a list of the high severity findings. Final reply: the report path and a five-line summary only.
