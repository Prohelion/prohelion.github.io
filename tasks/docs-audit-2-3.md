# Profinity 2.3 docs: structure audit and proposed refactor

Scope: `docs/Profinity_Software/Profinity_Version_2.3/` only. Nothing outside it is touched.
Rules applied: [STYLE_GUIDE.md](../STYLE_GUIDE.md). Reasoning: [BEST_PRACTICE_GUIDE.md](../BEST_PRACTICE_GUIDE.md).
Status: read-only audit complete. No docs page has been edited. This is a proposal for review, not an agreed plan.

Per-page registers (one row per page, with issue codes and recommended action) are in [audit-2-3/](audit-2-3/):
[Administration](audit-2-3/administration.md), [Components](audit-2-3/components.md), [Customising](audit-2-3/customising.md), [Developing and integrating](audit-2-3/developing-integrating.md), [Getting started, installation, how-to and release notes](audit-2-3/getting-started-installation.md), [Tags, CAN, AI and mobile](audit-2-3/tags-can-ai.md).

## 1. Summary

176 of the 177 pages were audited by section (the 2.3 root `index.md` was not). Counts below were tallied from the per-page registers and are approximate, because an issue can be flagged more than once on a page.

| Finding | Count |
|---|---|
| Pages declaring a `type`, `owner` or `last_reviewed` | 0 |
| Pages recommended for split (Customising excluded, its register uses a different format) | 56 |
| Pages recommended for rewrite to a single type | 30 |
| Pages recommended for merge | 7 |
| Pages recommended to keep, with minor edits | 42 |
| `DUPLICATE_OF` flags | 144 |
| `MIXED_TYPES` flags | 92 |
| `TASK_NOT_NUMBERED` flags | 50 |
| `TOO_LONG_SPLIT` flags | 45 |
| `NO_DIAGRAM_BUT_NEEDS_ONE` flags | 45 |
| `NO_VERIFY_STEP` flags | 44 |
| `MISPLACED` flags | 22 |
| `NO_PREREQS` flags | 22 |

These counts were produced against the original, fuller page templates. Section 2a below explains how the restraint rule (style guide 2.6a) changes how to read them.

Good news from the checks run directly: all 177 pages have a `description`, no page skips a heading level, and the Customising section's links and images all resolve.

## 2. Main findings

1. **No page has a single job.** Most pages mix two to four types, so the page-type rule cannot be applied until pages are split.
2. **Duplication is the largest problem.** The same procedure or table appears in a feature page and a how-to (kiosk, profile creation, MFA, CAN replay, dashboard creation, environment variables, licensing), and boilerplate repeats across component pages.
3. **Procedures are written as prose** on about 50 pages, with no prerequisites or check that it worked.
4. **Components lack the component shape.** Quick starts, data-flow diagrams, Type columns and tags sections are missing almost everywhere.
5. **No first-success tutorial exists** for a new user, an integrator or a developer in the form the guides define. Quick Start has branches, and the existing first-script page is a how-to titled as a tutorial.
6. **Missing landing pages.** There is no index for Administration, Users_and_Access, Installation, Getting_Started, Loggers or CAN_Bus_Protocols.
7. **Search and AI.** `llms.txt` is hand-maintained and lists 10 of 177 pages. About 70 code examples in Developing and Integrating have no evidence they were run.

## 2a. Revisions after the restraint rule

The style guide now says structure has to earn its place (section 2.6a) and that page templates are maximums. That changes how the audit is read. The per-page registers have not been regenerated, so apply these adjustments when working from them.

**Flags that now mean less**

| Flag | Count | Now means |
|---|---|---|
| `NO_VERIFY_STEP` | 44 | A task of about five steps or fewer needs only a closing sentence. Flag it only if there is no check at all. |
| `NO_PREREQS` | 22 | On a short task, a sentence in the introduction is enough. A heading is needed only on longer procedures. |
| `TASK_NOT_NUMBERED` | 50 | Unchanged. Procedures stay numbered. |
| Component template gaps (`MISSING_QUICKSTART`, `MISSING_TAGS_SECTION` and similar) | many | Optional. Treat as a defect only where the component is complex enough to need the part. |
| `NO_DIAGRAM_BUT_NEEDS_ONE` | 45 | Unchanged for concept and component pages that explain a data flow. Do not add a diagram to a simple page. |

**Splits and new pages are ceilings, not targets.** The register proposes about 56 splits, a 20-page Tags list and a large component catalogue. Before any split, check that each resulting page has a real job and is more than a few lines long. If pieces would be thin, merge or keep them instead. The Tags list in particular should be treated as the most pages there could be.

**New dimension: over-structure.** A rough measure across all 177 pages (headings, sections, tables, admonitions and bold lead-ins; the heuristics are crude, so treat them as indicators):

| Measure | Pages |
|---|---|
| 1.5 or more headings per 300 words | 137 |
| Two or more sections under 35 words | 54 |
| Five or more table rows | 97 |
| Three or more admonitions | 23 |
| Three or more bold lead-in bullets | 5 |
| Dense bullet lists | 0 |

The existing docs are prose-heavy, not bullet-heavy. The problem is headings over very short sections. Pages with the most thin sections, to fix first when they are refactored:

| Page | Thin sections | Words |
|---|---|---|
| Customising_Profinity/Dashboards/Component_Reference/Interactive/Image.md | 25 | 2,130 |
| Customising_Profinity/Dashboards/FAQ.md | 19 | 1,071 |
| Customising_Profinity/Dashboards/Examples.md | 16 | 660 |
| Customising_Profinity/Dashboards/Troubleshooting.md | 10 | 1,498 |
| How_To_Guides/Configure_Environment_Variables.md | 8 | 498 |
| Customising_Profinity/Dashboards/Data_Binding.md | 8 | 1,940 |
| Customising_Profinity/Dashboards/Component_Reference/Interactive/Actions.md | 8 | 903 |
| How_To_Guides/Write_Your_First_Script.md | 7 | 1,071 |

Bold lead-in bullets are concentrated in Administration/Licensing.md (8), How_To_Guides/Connect_to_CAN_Bus.md (6), Configure_Data_Logging.md (5) and Log_Data_to_Cloud_Influx.md (4).

**Where the risk now sits.** The current content is not the problem. A mechanical conversion that gives every page the same "Before you begin", steps, "Check it worked" and "Related pages" scaffolding would create the machine-written look. Every batch therefore includes a read-aloud review by a person before the page is accepted.

## 3. Facts to confirm before any rewrite

These were reported by the audit agents and **have not been verified against the product**. Each needs a product answer, because rewriting around a wrong fact would copy the error.

| # | Conflict | Where |
|---|---|---|
| F1 | Does Desktop Mode have accounts and roles? Two pages say no, Licensing says a Desktop host with a Server licence creates the admin account. | Administration: Manage_Users, Roles_and_Permissions, Licensing |
| F2 | Profile folder count and `profile.css` case differ. | Customising/Profile_Directories vs Administration/Profiles |
| F3 | macOS data path differs: `~/.local/share/Prohelion/Profinity` in the 2.3.1 breaking changes, `~/Library/Application Support/Prohelion/Profinity` in Artifacts_Directory and the upgrade steps. | Release_Notes/2.3.1, Installation/Artifacts_Directory |
| F4 | The Docker page says the compose file includes Watchtower. The compose file shown does not. | Installation/Docker_Installation |
| F5 | Does a desktop licence allow browser sign-in? Your review notes say it needs a server licence. | Installation/Windows_Installation |
| F6 | Read-failure log level: warning on Connections, debug on BACnet. | Components |
| F7 | EtherNet/IP default Data type is Dword, Modbus and S7 are Word. | Components |
| F8 | "Two built-in actions" then four listed, and a diagram alt text names PagerDuty. | Tags/Actions |
| F9 | Capability claims in Profinity_AI/index need checking against the shipped product. | Profinity_AI |
| F10 | Docker Compose examples include `ADAPTER_IP` and `ADAPTER_PORT`, which Profinity does not read. | Installation/Environment_Variables |

Also to check: `docs/internal/` holds working files (open questions, TODOs, a writer brief). Confirm they are excluded from the published site.

## 4. Proposed target structure

Treat every list of new or split pages below as a ceiling (see section 2a): split only where each result is a real task or concept of reasonable length. Names below are sentence case for page titles. File and folder names keep the existing `Title_Case_With_Underscores` convention. Every move or rename needs a redirect in `mkdocs.yml`, and the anchor `Release_Notes/2.3.1.md#upgrading-from-22` is linked from six pages.

### 4.1 Section landing pages (new)

- `Getting_Started/index.md`, `Installation/index.md` (choose an install method and prerequisites), `Administration/index.md`, `Administration/Users_and_Access/index.md`, `Components/Loggers/index.md`, `Components/CAN_Bus_Protocols/index.md`.

### 4.2 Getting started and installation

- **Quick Start** becomes a single linear tutorial (install, load an example profile, replay a log, edit a dashboard, create a user). Branches and reference detail move out. Add the short roles discussion your notes ask for.
- **Merge** Adding_New_Components into How_To_Guides/Add_Component_to_Profile. **Merge** Profinity_Log into Administration/Logs_Config. **Merge** Visualising_Data into Customising/Dashboards/index.
- **New** Installation/Upgrade_From_2.2 (moved out of the 2.3.1 release notes, with a redirect and the existing anchor kept).
- **Split** the long install pages by job: Docker (install, update, production), Running as a service (one page per OS), Zip installation (Linux installer, archive install, options reference), Environment variables (reference, and per-platform setup absorbing the how-to and Docker production content).
- **Move** the "Hardware and Licensing" admonition out of Zip_Installation into Administration/Licensing. Add the restart note to the apply-licence steps.
- **Release notes** split: 2.3 release notes, breaking changes, known issues. Retitle 2.2.5 to "Profinity 2.2.5 release notes".

### 4.3 Components

The Components agent's full proposed layout, comparison table design, settings table design and 11-part component page template are in [audit-2-3/components.md](audit-2-3/components.md#proposed-component-catalogue). In outline:

- Category folders each with an `index.md` and one comparison table: Loggers, Historians, Publishers and Subscribers, Tag Relays, Industrial Protocols, CAN Adapters, Devices (BMS, Chargers, MPPT, WaveSculptor), Dashboards and Custom, Cloud.
- A `Common_Behaviour/` pair of concept pages (connections and reconnecting, logging modes) so about eight pages stop restating them.
- Pages holding several components are split to one component per page. Four component pages named `index.md` are renamed.
- Model pages for the component template: Tag_Relay_Sender, Webhook_Publisher, Modbus and Cloud_Dashboard.
- **Decision for you:** the `Devices/` folder is a proposal. The alternative is to keep the existing device folders and rename their pages to match the component.

### 4.4 Tags

Finish the Rules, Actions and Alerts split first (action inheritance sits in Rules, dwell and deadband in Alerts, rule state publishing in Derived Tags), then the proposed 20-page list in [audit-2-3/tags-can-ai.md](audit-2-3/tags-can-ai.md). Script-driven derived tags are already their own page.

### 4.5 Customising

Split Data_Binding, Image, Model, Menu, Troubleshooting, Examples and Dashboards/index. Extract one shared overlay page and one shared targets reference. Rewrite Hosting, Theming and Conditional_Styling as tasks. Fix F2 first.

### 4.6 Developing and integrating

- Split MCP_Server (about 1,500 words are a tool reference) and the Custom Components index (delete its DBC and Dashboard sections and link to Components, as your note says).
- The five script-type pages share one shape that fits `component`. Move their settings into tables.
- **New tutorials:** one first-success tutorial for an integrator (first authenticated REST call) and one for a developer (first script, using `profinity-script new` and `sim`). The existing How_To_Guides/Write_Your_First_Script becomes the developer tutorial and loses its cookbook examples.
- Fix three broken links on MCP_Server/index.md, the admonition on APIs/index.md, the HTML comment in Supported_Languages and the broken sentence in ServiceScripts.
- Add a build check that validates code examples (`profinity-script sim`, `profinity-component-pack validate`, the existing dashboard validator).

### 4.7 Administration

Split Licensing (about 2,270 words). Give each duplicated cluster one owner and link the rest to it: licensing, kiosk, profile creation and MFA self-service. Repeated warnings (remote access, role changes, "saving restarts Profinity" on seven pages) go to one place each.

## 5. Proposed refactor order

Each batch is checked with the mkdocs build, spellcheck, `verify-2.3-doc-urls.js` and, once it exists, the style linter, and each refactored page is read aloud by a person and stripped of structure it does not need (style guide 2.6a). Batches are proposals.

| Batch | Work | Depends on |
|---|---|---|
| 0 | Resolve F1 to F10 with the product team. | Nothing |
| 1 | Tooling: style linter, front matter and heading checks, generated `llms.txt`. Add section index pages. | Nothing |
| 2 | Getting started and installation, including the upgrade page and environment variables. | 0, 1 |
| 3 | Components catalogue and the common-behaviour pages. | 0, 1 |
| 4 | Tags split. | 1 |
| 5 | Customising and the dashboard how-tos. | 0, 1 |
| 6 | Developing and integrating, with the two tutorials and example validation. | 1 |
| 7 | Administration splits. | 0, 1 |

Release notes should wait until the pages they link to settle. Title Case headings are converted as each page is refactored, not in bulk.

## 6. Reviewer notes status

| Your note | Status |
|---|---|
| Roles discussion in Quick Start | Not done |
| Desktop licence and browser sign-in (Windows page) | Not done, see F5 |
| Complex setup duplicates Environment Variables | Not done, consolidated in 4.2 |
| Hardware and licensing out of Zip Installation | Not done |
| Restart note after applying a licence | Not done |
| M48 terminating-resistor note belongs in the M48 manual | Not done |
| InfluxDB and Prometheus logging: clear on loggers vs historians | Partly done |
| Diagrams on File, Tag, Historians | Category level only |
| Tag Relays rewrite and images | Images done, rewrite not done |
| Custom Components index: DBC and Dashboard sections | Partly done |
| Collections `version: "2.3"` and immutable id | Not done |
| Script-driven derived tags as own page | Done |
| Rules, Actions, Alerts as separate pages | Half done |
| Remove "Replay Through the API" | Done |
| Machine fingerprint and REST API in Licensing | Ambiguous, needs your confirmation |

## 7. Decisions needed from you

1. Approve, change or reject the target structure in section 4, in particular the `Devices/` folder and the 20-page Tags list.
2. Who answers F1 to F10?
3. Is the batch order in section 5 right, or should something start earlier?
4. Should the sentence-case heading change run as part of each batch, as proposed, or wait for a separate pass?
