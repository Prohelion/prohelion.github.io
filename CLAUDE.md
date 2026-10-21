# Prohelion documentation (Profinity-Docs)

MkDocs Material site for Prohelion's documentation. The current work is Profinity 2.3 in `docs/Profinity_Software/Profinity_Version_2.3`. Hardware manuals (BMS, motor controllers, solar charge controllers, Solar Car Racing) sit beside it under `docs/`.

## Read first

- `STYLE_GUIDE.md` holds the rules. Read it before writing or editing any page. `BEST_PRACTICE_GUIDE.md` holds the reasoning behind them.
- `tasks/docs-readability-review.md` (local) records the last readability review, the decisions made and the open questions.

## Accuracy: when you are not sure, check the code

Never guess a default, a permission name, a limit, a UI label, a file location or a behaviour. Check the Profinity source code first (see STYLE_GUIDE.md section 10, "Accuracy").

- The source repository is the sibling checkout `../Profinity`. Read it only. Do not edit it from a docs task.
- Look in `Profinity-Components-Core` and `Profinity-Components-Plugins` for component settings and defaults, `Profinity-Engine/Model/Security` for roles and permissions, and `Profinity-Engine/Controllers` for API routes.
- When a page and the code disagree, fix the page to match the code. If the behaviour itself looks wrong, say so, and document what the code does.
- Never put class names, file paths or source references in a published page (STYLE_GUIDE.md 2.8).

## Scope

- Overhaul, style and refactor work applies to Profinity 2.3 only. Do not edit the 2.2 or older pages.
- Name the release "Profinity 2.3". Only the release notes page may say 2.3.1 or another patch number.
- Profinity 2.3 is not released, so do not add redirects for 2.3 pages. Rename or delete the page and update the links in the tree.
- Do not document internal client components (Rinstrum, Vaulta) in the 2.3 docs.
- Do not convert the PNG diagrams to Mermaid. They stay as images.

## Writing

- Australian English in prose. Never change literal identifiers, API fields, UI labels as shipped or quoted output.
- Start each sentence on a new line in the Markdown source.
- Keep technical detail out of user docs. Delete protocol and transport detail and hand-written client code instead of softening it.
- Give each fact one authoritative page and link to it. Examples: licence and sign-in rules live on `Installation/Applying_a_Licence.md` (anchor `#who-can-sign-in`), and Auto Connect defaults live on `Components/Connections_and_Reconnecting.md`.
- Do not add Co-Authored-By or "Generated with" lines, in commits or anywhere else.

## Checks

Run from the repository root unless stated. There is no BDD tooling for docs, so these checks stand in for it. Run them before calling a change done.

- Build: `venv/bin/mkdocs build -d <temp-dir>`. It must show no new warnings, including spellcheck. Add real product terms to `docs/known_words.txt` instead of rewording around them.
- Lint against the style guide: `cd scripts && node lint-docs.js`. Add `--details` for each finding. It must show 0 errors and 0 warnings.
- URL check: `node scripts/verify-2.3-doc-urls.js`. It reads the built `site/` and needs the dev server (`./start.sh`, then http://127.0.0.1:8000) for the HTTP part.
- Dashboard YAML examples: `cd scripts && npm run validate-dashboards`.
- Do not run the C# or React tests from the Profinity source repository for a docs change.

## Working rules

- Plan first for anything over three steps, and check in before a large change. For a sweep over many pages, split the work by folder across parallel agents, with no two agents on the same file.
- Do not split, rename or delete pages without agreement, because it changes links.
- `tasks/` is local. It is gitignored here. Never commit it.
- Stage files by explicit path. Do not run `git commit` until you are told to commit.
