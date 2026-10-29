---
title: World-class documentation best practice
---

# World-class documentation best practice

This guide explains what world-class software documentation looks like and why. It is the target for the Profinity 2.3 docs. The rules writers follow page by page live in [STYLE_GUIDE.md](STYLE_GUIDE.md), and this guide does not repeat them.

## 1. How the two guides fit together

| | Best practice guide (this document) | Style guide |
|---|---|---|
| Answers | What are we aiming for, and why? | What exactly do I write on this page? |
| Contains | Principles, evidence, reference products, structure, tooling roadmap, awards | Page types and templates, voice, procedures, formatting, quality checks |
| Used by | Anyone planning, auditing or justifying the docs | Writers, reviewers, linters and AI assistants drafting pages |
| Changes | Rarely | Whenever a rule is refined |

Where this guide and the style guide appear to disagree, the style guide wins for what to write, and this guide is updated to match.

## 2. How to read the evidence

Documentation quality has no standard benchmark, and the well-known products below have not won a formal "best docs" award. Their standing comes from developer consensus and from the teams' own published accounts. Each claim is tagged:

- **Documented**: the team or a third party has published the practice.
- **Recognised**: an independent awards body has judged it.
- **Observed**: widely reported, but not verified in the research for this guide. Check the live site before citing it outside the team.

## 3. The reference set

| Product | Why it matters to Profinity | Evidence |
|---|---|---|
| Stripe | The most-cited benchmark. Working code on every page, and writing quality built into career ladders and reviews. | Documented ([Mintlify analysis](https://mintlify.com/blog/stripe-docs)) |
| Canonical (Ubuntu, MAAS) | The clearest structural model. Rebuilt its docs on Diátaxis. | Documented ([Canonical blog](https://ubuntu.com/blog/diataxis-a-new-foundation-for-canonical-documentation)) |
| Grafana | A complex, multi-component product. Redesigned its docs around how users search, with repeatable page structure and a public writers' toolkit. | Documented ([redesign post](https://grafana.com/blog/grafana-documentation-a-look-at-the-new-and-improved-design?pg=blog), [Writers' Toolkit](https://grafana.com/blog/grafana-labs-writers-toolkit-this-is-the-way?pg=blog)) |
| Google, Microsoft, Kubernetes, Django | Published style guides whose rules informed ours. | Documented ([Google](https://developers.google.com/style/highlights), [Microsoft](https://learn.microsoft.com/en-us/style-guide/welcome/), [Kubernetes](https://kubernetes.io/docs/contribute/style/style-guide/), [Django](https://docs.djangoproject.com/en/stable/internals/contributing/writing-documentation/)) |
| Home Assistant | The closest analogue: devices, integrations and a modern UI. Per-integration pages, with user and developer docs kept apart. | Observed |
| platformOS | Award-backed docs-as-code portal. Judges praised workflow, navigation and examples. | Recognised ([UKTC 2019](https://www.platformos.com/blog/post/platformos-developer-portal-wins-uk-technical-communication-award), [DevPortal Awards 2022](https://documentation.platformos.com/community/awards/dpa_best_overall_sme_devportal)) |
| Solo.io | STC Carolina chapter's highest honour for Gloo Gateway docs. | Recognised ([announcement](https://solo.io/blog/gloo-gateway-docs-award)) |
| IBM Cúram Kubernetes runbook | UKTC 2021 overall winner. | Recognised ([winners](https://istc.org.uk/professional-development-and-recognition/uk-technical-communication-awards/award-winners-2021/)) |

## 4. The eight principles

Each principle names the style guide section that applies it.

### 4.1 Separate the four kinds of content

Every page does one job. The Diátaxis model names four kinds, each serving a reader in a different state of mind: tutorial (learn by doing), how-to guide (get a job done), reference (look up a fact) and explanation (understand why). Mixed pages are the commonest failure in technical docs, because a page that teaches, instructs and describes at once serves none of those readers well.

Applied in: [Page types and templates](STYLE_GUIDE.md#page-types-and-templates).

### 4.2 Design for time to first success

The best product docs measure how quickly a new user reaches a first working result, and build one short, guaranteed path before adding breadth. For Profinity, that path takes a new user from installation to live data on a dashboard in one sitting, with no detours into configuration they do not yet need.

Applied in: the `tutorial` page type.

### 4.3 Show working, tested examples

Every page that tells the reader to do something includes a real example that has been run, not pseudocode. Examples are kept in step with the product and, where possible, checked automatically, as the repo already does for dashboard YAML.

An example that runs on one operating system only is incomplete for everyone else. Profinity runs on macOS, Windows, and Linux, so a bash-only command strands Windows readers, often at a step where an earlier tab has already created a different file name on their system.

Applied in: [Code and technical elements](STYLE_GUIDE.md#4-code-and-technical-elements).

### 4.4 Use a repeatable page shape

Pages of the same type have the same shape, so a reader who has seen one component page can find the same information on any other. Repeatable shapes also make docs faster to write and review.

The shape reaches inside sections too. Troubleshooting written as a "What you see", "Cause", and "What to do" table starts from the symptom the reader has, and the same table on sibling pages lets a reader move between them without relearning the layout.

Applied in: [Page types and templates](STYLE_GUIDE.md#page-types-and-templates).

### 4.5 Organise around the reader's tasks

Navigation follows what the reader is trying to do, not how the product is built. Section names are plain words a reader would search for. A wide product range without clear signposting is a navigation failure, not a content failure.

The reverse failure is a job split too finely. The 2.3 MCP setup was once six pages of about five steps each, and every page passed the rules on its own. The reader still had to find their place again at each page break, and the pages began to say "from the previous page", which no reader arriving from search can follow. Merging them into one task page with a section per stage shortened the path and removed the repeated facts that had started to disagree.

Applied in: [File organisation](STYLE_GUIDE.md#8-file-organisation).

### 4.6 Treat docs as code

The best teams keep docs in version control, review them in pull requests, and run automated checks in the build. Docs ship with the release they describe, and each version is kept.

Applied in: [Review and maintenance](STYLE_GUIDE.md#10-review-and-maintenance) and the roadmap in section 7 below.

### 4.7 Write for search and AI retrieval

Readers increasingly arrive from a search engine or an AI assistant, on one page, with no context. Current guidance from documentation vendors (Fern, Document360 and others, so treat it as directional) agrees on the page-level basics: self-contained pages, headings that name the topic, answer-first writing, strict heading hierarchy and complete examples. Serving clean Markdown alongside HTML and publishing a small `llms.txt` help, but they are a discovery layer and do not replace good pages. Pruning duplicate and stale content improves retrieval.

The 2.3 docs already have a `description:` on every page, and no page skips a heading level. Gaps are in the generated index and the page-level rules.

Applied in: [Search and AI readiness](STYLE_GUIDE.md#29-search-and-ai-readiness).

### 4.8 Give docs an owner and a place in the definition of done

Stripe credits its documentation quality to culture and process: leadership example, support for writers, and docs counted in performance reviews. A page with no owner decays, and a feature with no docs change is not finished.

Facts about other companies' products decay fastest, because they change on another company's release schedule and no Profinity change prompts a review. Dating them shows the reader how old the fact is, and a link to the vendor's page gives them the current answer.

Review is where decay and drift are caught. Reviewing a section as a whole, in the reader's order, finds the problems that a page-by-page check misses: repeated facts that disagree, a journey split over too many pages, and steps that depend on something set up later.

Applied in: the `owner` and `last_reviewed` front matter fields.

## 5. What a world-class page looks like

Every page, whatever its type, passes these eight tests. The style guide's quick reference carries the working version.

1. It has one purpose, stated in the first sentence.
2. Its title matches what the reader would search for.
3. Prerequisites come before the steps.
4. Steps can be followed without thought, one action each, with the expected result.
5. The example runs when copied.
6. It links to another page instead of duplicating its content.
7. It ends with a clear next step.
8. The tone is calm and exact, with no marketing language.

## 6. Structure for a complex, multi-component product

Profinity has a hardware-adjacent, integration-heavy shape. The documentation that handles this best shares four patterns.

1. **Five entry questions.** A reader can find any page from one of five questions: what is this and should I use it, how do I get started, how do I do a specific thing, what exactly does this do, and how do I extend or integrate it. The existing 2.3 sections map onto these, and the audit should confirm the mapping rather than reinvent it.
2. **A component catalogue.** Every component has its own page with the same sections, so readers choosing between them can compare. Profinity has 29 component pages today, and a catalogue index with a comparison table is the highest-value structural change for this audience.
3. **Hardware content stays in hardware manuals.** Profinity docs link to the hardware manual instead of copying from it. The review notes already flag the M48 Gen1 procedure for this.
4. **One home for each fact.** Settings, environment variables, licensing terms and fingerprints each have one authoritative page, and everything else links to it.

## 7. Tooling roadmap

World-class teams enforce what they can, so reviewers can spend time on what only a person can judge. This table is the working list for the docs repo.

| Check | Tool today | Gap | Status |
|---|---|---|---|
| Build succeeds, no new warnings | mkdocs build | None | In place |
| Spelling | mkdocs spellcheck | Keep the word list current | In place |
| Links and anchors | mkdocs build, `verify-2.3-doc-urls.js` | Missing images still warn | Partly in place |
| Dashboard YAML examples | `validate-dashboard-examples.js` | Extend to other example types | Partly in place |
| Style rules (banned words, sentence case, serial comma, contractions) | None | Add a prose linter such as Vale | To do |
| Page type and front matter conformity | None | Lint rule for `type`, `owner`, `last_reviewed` | To do |
| Description present and 70 to 160 characters | Front matter on all 177 pages | Lint rule to hold the range (8 pages exceed 160, 2 are under 70) | Partly in place |
| Heading hierarchy (one H1, no skipped levels) | None | markdownlint rule in CI | To do |
| `llms.txt` | Hand-maintained, lists 10 of 177 pages | Generate from page front matter at build time | To do |
| Markdown served for agents | Not checked | Confirm whether the host can serve `.md` or negotiate content | To do |
| Orphan and duplicate content | None | Periodic report | To do |
| Freshness | None | Report on pages past a review date | To do |

## 8. Awards and recognition

Formal recognition for documentation is a small niche. If the team wants third-party validation later, the traceable options are:

- [DevPortal Awards](https://devportalawards.org/): developer portals and API docs, peer reviewed. Vendors cannot enter.
- UK Technical Communication Awards (ISTC): broad product documentation, announced at TCUK.
- STC chapter competitions: Merit, Excellence and Distinguished levels. The international competition ended in 2017.

Entry windows, fees and eligibility for Australian entrants have not been checked.

## 9. Sources

- [How Stripe creates the best documentation in the industry](https://mintlify.com/blog/stripe-docs)
- [Diátaxis, a new foundation for Canonical documentation](https://ubuntu.com/blog/diataxis-a-new-foundation-for-canonical-documentation)
- [Grafana documentation: a look at the new and improved design](https://grafana.com/blog/grafana-documentation-a-look-at-the-new-and-improved-design?pg=blog)
- [Grafana Labs Writers' Toolkit](https://grafana.com/blog/grafana-labs-writers-toolkit-this-is-the-way?pg=blog)
- [Google developer documentation style guide](https://developers.google.com/style/highlights)
- [Microsoft Writing Style Guide](https://learn.microsoft.com/en-us/style-guide/welcome/)
- [Kubernetes style guide](https://kubernetes.io/docs/contribute/style/style-guide/)
- [Django: writing documentation](https://docs.djangoproject.com/en/stable/internals/contributing/writing-documentation/)
- [platformOS UKTC award](https://www.platformos.com/blog/post/platformos-developer-portal-wins-uk-technical-communication-award)
- [DevPortal Awards](https://devportalawards.org/)
- [UKTC 2021 winners](https://istc.org.uk/professional-development-and-recognition/uk-technical-communication-awards/award-winners-2021/)
- [Solo.io Gloo Gateway docs award](https://solo.io/blog/gloo-gateway-docs-award)
