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
