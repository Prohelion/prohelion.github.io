# How the documentation review works

This guide is for the person running a review of the Profinity 2.3 documentation.
[REVIEW_GUIDE.md](../REVIEW_GUIDE.md) holds the method that a reviewer follows, and [STYLE_GUIDE.md](../STYLE_GUIDE.md) holds the rules a page is judged against.
This page explains how the pieces fit together and which commands to run.

## What a review does

A review reads every page as a customer with only the product and these docs, checks it against the Style Guide, and records what it finds.
It produces a score for each page and section, a ranking from best to worst, and a ledger of findings that is worked down over time.
It judges the writing and the reader's journey. It does not check that a fact is correct. Facts are checked against the Profinity source code before any fix.

## The pieces

| Piece | Where | What it does |
|---|---|---|
| The method | `REVIEW_GUIDE.md` | The checks, the three severity groups, the scoring model, page shapes, calibration pages, and how to run agents |
| The rules | `STYLE_GUIDE.md` | What each page is judged against |
| The entry point | `scripts/review.js` | The standard tasks, run with `npm run review -- <task>` |
| The pre-pass | `scripts/review-pages.js` | Objective checks on every page, the phrasing export and apply step, and the scoring |
| The ledger tool | `scripts/review-ledger.js` | Records the status of each finding and scores from it |
| The ledger | `tasks/reviews/ledger.json` | Every finding, with a stable id and a status. This is the one place the state of the review lives |
| Reviewers | Claude agents | Read pages and write findings. The scripts prepare their inputs and print their briefs, and do not call a model |

Everything under `tasks/` is local and is not committed.
A dated copy of the ledger sits beside it, so make a fresh copy before a bulk change.

## The standard tasks

Run these from `scripts`, or with `npm --prefix scripts run -s review -- <task>` from the repository root.

| Task | What it does |
|---|---|
| `check` | Runs the lint, the build, the URL check and the tests, and says which passed. Run it before calling any docs change done. |
| `status` | Shows the ledger counts, the blockers still counting and the pages that have most, pages awaiting re-review, and the objective counts from the latest pre-pass |
| `prepass` | Runs the objective checks on every page and writes `tasks/reviews/prepass-latest.json` |
| `score` | Runs a fresh pre-pass, scores every page and section from the ledger, writes `ranking-latest.md` and `scores-latest.json`, and shows the change in the mean score since last time |
| `chunks [--run name]` | Splits the pages into chunks of up to 10, keeping each section together, ready for review agents. Writes to `tasks/reviews/<run>/chunks/`. |
| `phrasing [--run name]` | Exports every line that may use a negative where a positive form says the same thing, in batches of about 60 |
| `prompt <kind> <id>` | Prints the brief for an agent step: `page`, `blocker`, `section`, `sweep` or `meaning` |
| `all` | Runs `check`, `prepass`, `score` and `status` |

`<run>` defaults to today's date.

## How a full review runs

1. **Prepare.** Run `npm run review -- chunks`. This makes a fresh pre-pass and 34 or so chunk files.
2. **Test the brief.** Before the full run, have one reviewer review the three calibration pages with their findings hidden, and compare. Change the method only in `REVIEW_GUIDE.md`.
3. **Page review.** Give each chunk to one agent on the lowest-cost model that passed the test. `npm run review -- prompt page <id>` prints the brief. Each agent writes `findings-<id>.json`.
4. **Blocker pass.** Give each chunk to a second agent that looks only for blockers. `prompt blocker <id>` prints the brief.
5. **Section pass.** Give each top-level section to one agent that applies the cross-page checks. `prompt section <name>` prints the brief.
6. **Record.** Run `npm run review-ledger -- ingest tasks/reviews/ledger.json <files>...` with the findings, blocker and section files. It supersedes the open findings of every page and section in those files and adds the new ones. Fixed findings stay as history.
7. **Score and report.** Run `npm run review -- score`, then read `ranking-latest.md`. Spot-check the best-scoring pages and a sample of the blockers before publishing a ranking.

Claude Code can run steps 3 to 5 for you as parallel agents. Ask it to run the page review, blocker pass and section pass from the review guide, and give it the run name.

## How a fix cycle runs

Fix in waves: examples, contradictions, steps that destroy data, steps the reader cannot carry out, then the recurring patterns. Each wave follows the same loop.

1. **Check the claim against the code.** A finding is a lead, not a fact. Read the code that decides the behaviour, and drop the finding if the page is already right.
2. **Draft the fix** with the evidence.
3. **Decide.** The author accepts, edits or rejects each proposal.
4. **Apply** only what is accepted.
5. **Record.** `npm run review-ledger -- status tasks/reviews/ledger.json fixed --wave "<wave>" --note "<what changed>" --recheck <id>...` marks findings fixed and the page as awaiting re-review. Use `dropped` with the evidence for a finding that is not real.
6. **Re-review** the changed pages, then `ingest` the new findings. This clears the re-review mark.
7. **Check and commit.** Run `npm run review -- check`. Commit only when asked, one commit per wave, staging files by explicit path.

A fix is confirmed only when its page has been re-reviewed. Until then the ranking lists the page under "Awaiting re-review" and its score is not confirmed.

## The phrasing sweep

The positive-phrasing rule (Style Guide 2.4) needs every sentence fixed, not one finding per page, so it has its own pass.

1. `npm run review -- phrasing` exports the flagged lines in batches.
2. One agent per batch decides `keep` or `rewrite` for each line (`prompt sweep <batch>`).
3. A second agent checks each rewrite says the same thing (`prompt meaning <batch>`). A rewrite fails if it drops a fact, changes who does what, or turns a precondition into a trigger.
4. The author accepts, edits or rejects each rewrite, and `npm run review-apply-phrasing -- <decisions.json>` applies the accepted ones. It replaces a line only while the line still matches the original.
5. Verify the kept and applied lines against the code where the meaning is in doubt.

## How scoring works

Each page starts at 100 points across seven categories, and loses 10, 4 or 1 point for each blocker, improvement or polish finding.
One blocker caps a page at 69, and two or more cap it at 49.
Visual flow cannot be judged from Markdown source, so scores are provisional and out of the other 90 points.
The section score is the mean page score, less points for each cross-page finding (at most 30 in total), capped at 69 when the section has a section-level blocker or blockers on a fifth of its pages.
The lowest page is shown beside it, because a mean can hide one page that stops the reader.
The full model is in section 8 of `REVIEW_GUIDE.md`, and `scorePage` in `review-pages.js` implements it.

The objective checks on every page (paragraph length, troubleshooting tables, settings tables without a default column, a closing next step and others) come from a fresh pre-pass each time, so they update as pages change.
Findings that need a reader's judgement come from the ledger.

## Rules to keep

- **Check facts in the code.** Never write a fix from a finding alone.
- **Reference pages need no closing next step.** The Style Guide exempts them.
- **A precondition is not a trigger.** Write "needs a collection before it can start", and write "starts once X" only when X itself starts the action.
- **Method changes go in `REVIEW_GUIDE.md`,** not in a prompt or a scratch brief.
- **Use the cheapest model that works.** Haiku suits page reviews and sweeps, and sonnet suits reading code and judging behaviour.
- **Commit only on request,** and never add attribution lines.

## Limits

- Reviewers read Markdown source and cannot judge visual flow or screenshots.
- A single reviewer can miss a blocker or over-grade a minor one. The blocker pass and a spot-check exist for that reason.
- Some negatives are right: safety prohibitions, symptoms, states defined by an absence, and contrasts the reader needs. A line that a sweep kept, or whose rewrite you rejected, goes into `scripts/phrasing-keep.json` and is not flagged again. Add every kept or rejected line there after each sweep.
- The ledger is local. Back it up if the review matters to anyone else.
- The scripts prepare agent inputs and print their briefs. Running the agents needs Claude Code.
