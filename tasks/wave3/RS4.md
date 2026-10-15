# Review RS4: InfluxDB_Historians.md and Historians/index.md

Verdict: InfluxDB_Historians.md PASS (one medium and two low polish points). index.md PASS (one low point).
No high severity finding. Nothing is lost and no version-specific statement has become wrong for the other version.

Method: I diffed the two old pages first. They differ only in the title and description, the version names in the body, the "Use this component if" sentence, step 1 and step 2, the Bucket and Organisation rows (v2) versus the Database row (v3), the diagram labels, and the cross-link sentence. Every other line is identical. The ledger below therefore covers the shared lines once and the differing lines separately.

## 1. Fact ledger

Shared lines (identical in v2 and v3), with the merged line number:

| Old fact | Merged location |
|---|---|
| Writes the values of the tags in the selected collections to InfluxDB, and allows read-back through the APIs, with the Collections link | line 11 (plural, both components named) |
| Sits in the Historians category | line 12 |
| Each value belongs to a tag, identified by its tag tree path, with both links | line 13 |
| Authenticates with a token | line 17 ("Both authenticate with a token") |
| InfluxDB Cloud supported, enter the Cloud URL and a token in the same way | line 18 |
| Diagram, with the licence admonition (Historians licensed feature, Licensing link) | lines 20-32 and 34-35 |
| "Component type must match the InfluxDB version, a mismatch causes connection failures" | line 38 (unchanged) |
| Choose-link to index.md#which-influxdb-component-do-i-need | line 39 |
| "To start recording, install InfluxDB ... and confirm that it is running" | line 43 |
| Step 1 (add from the Historians category), step 3 (Collections, "does not start until one is configured"), step 4 (Influx Server URL, default `http://localhost:8086/`) | lines 45, 47, 48 |
| "Settings cannot be saved while a required field is empty" | line 50 |
| Token row: None, security token of the InfluxDB user, Required, stored encrypted | line 64 (byte identical) |
| Server URL, Dashboard URL (Blank, optional, no link when blank), Health Check (On, turn off for Cloud), Collections, Logging Interval (10, minimum 1), Logging mode (`Snapshot`, `On Change`, `Everything`, Logging Modes link), Allow Retrieval (On), Designated tag historian reader (Off, one component only, effective only while Allow Retrieval is on, link to index.md#designating-the-historian-that-is-read-from) | lines 65-72 (byte identical to old rows) |
| Cloud does not support the Health Check API, turn the check off, and the Cloud how-to link | lines 74-75 |
| "If data does not arrive": System Logs link and the three messages `Credential validation failed` (likely invalid token), `Health check failed`, `Failed to start the InfluxDB logger`, each with its meaning, including "Check the Influx Server URL first" | lines 77-85 (identical) |
| Configure Data Logging link | line 87 |
| v1 servers use the InfluxDB v1 Logger, with the link to InfluxDB and Prometheus Logging | line 88 |

Lines that differ between v2 and v3:

| Old fact | Merged location |
|---|---|
| v2 "buckets that belong to an organisation"; v3 "single database" | lines 15-16, one sentence each, correctly attributed |
| v2 step 2 (Bucket, Organisation, Token); v3 step 2 (Database, Token) | line 46, each tied to its own historian |
| v2 Bucket row ("The InfluxDB bucket that the data is stored in. Required.", default None) | line 56, applies to the v2 historian |
| v2 Organisation row ("The InfluxDB organisation that owns the bucket. Required.", default None) | line 57, applies to the v2 historian |
| v3 Database row ("The InfluxDB v3 database that the data is stored in. Required.", default None) | line 58, applies to the v3 historian |
| Defaults that differ between versions | None found. All defaults are identical on both old pages. |
| Version-match rule | line 37-38 (see finding 2) |
| Cross-link between the two old pages ("is documented separately") | dropped, see section 5 |

Missing items: none.

## 2. The "generalised" sentences

| Sentence | Old | New | Same meaning for both versions? |
|---|---|---|---|
| Licence note | v2: "The InfluxDB v2 Historian requires the Historians licensed feature. Refer to Licensing for the editions that include it." The v3 page says the same for v3. | "The InfluxDB v2 Historian and the InfluxDB v3 Historian require the Historians licensed feature. Refer to Licensing for the editions that include them." | Yes. Both old pages said the same, so the merged statement is true for each. |
| Use only with | "Use the component only with an InfluxDB v2 server." and the same for v3. | "Use the component only with an InfluxDB server of the same version." | The meaning is preserved but weaker. See finding 2. |
| Step 1 and install line | "Add an InfluxDB v2 Historian to your profile..." and "install InfluxDB v2" (v3 the same with v3). | "Add an InfluxDB v2 Historian or an InfluxDB v3 Historian..." and "install InfluxDB v2 or v3". | Yes. Step 1 is true for each and each version is still named. The "install" line could be read as "either version will do", which is low risk because the next sentences and the match rule cover it. |
| Intro | "Use this component if your server stores data in buckets that belong to an organisation" (v2) and "...in a single database" (v3). | Two sentences, each naming its own historian. | Yes. Each condition is attached to the right historian. |

No statement that is true for only one version is now stated for both.

## 3. Diagram

Nodes and arrows: Tags, then Tag collections, then InfluxDB historian, inside Profinity, with an arrow to InfluxDB inside an InfluxDB server. The structure is identical to both old diagrams. The text supports it: line 11 says the historians write the tags in the selected collections to an InfluxDB server. The "APIs read back" element appears only in the caption, as on the old pages, and the text states it. The generic labels are correct for v2 and for v3. PASS.

## 4. Quick start

Steps 1 to 4 come from the old pages in the original order. Step 2 combines the v2 and v3 variants in one list item. Nothing is invented. PASS.

## 5. Dropped cross-link

Correct to drop it. Both old pages linked only to each other, and the merged page covers both. The choose-link to the Historians index is kept. PASS.

## 6. index.md

Compared with the old index, the only changes are the two table links and the version-choice section. The version-choice section still tells the reader which version to use and why: v2 uses buckets and an organisation, v3 uses a single database, v1 needs the logger, and the components must match the server version. All the old facts are present. The names are now bold text where they were links, and one link to the merged page was added ("Both are documented in InfluxDB historians"). This is fine.

The two table rows linking to the same page read fine, because the "Stores data in" column distinguishes them and both links go to the page where the choice is explained. A small improvement would be to put the version in the link text, for example "InfluxDB historians (v2 settings)".

## 7. Lint, type, anchors and inbound links

- `node scripts/lint-docs.js` on both files, with `--details`: 0 errors, 0 warnings, 0 notes, both enforced.
- Type: `component` on the merged page. This is acceptable, because the page documents two sibling components with a shared procedure. It is a slight stretch of the single-component type but it does not mix two jobs.
- Headings: "Adding an InfluxDB v2/v3 Historian" became "Adding an InfluxDB historian". "If data does not arrive" is unchanged.
- A search of docs and mkdocs.yml for `adding-an-influxdb-v` and `influxdb-v[23]-historian` fragments found none. No inbound link to either old page uses a fragment.
- Inbound links to the old pages, which match the writer's list exactly: Configure_Data_Logging.md:28, Loggers/InfluxDB_Prometheus_Logger.md:38, Administration/Licensing.md:39, Historians/.pages:4-5, docs/llms-full.txt:79-80. There are no others, and mkdocs.yml has no reference. The lead must also add redirects.

## Findings

1. Low. index.md has `last_reviewed: 2026-10-14` although it was edited on 2026-10-15. Suggest updating it.
2. Medium (the wording is safe but loses a little precision). InfluxDB_Historians.md line 37: "Use the component only with an InfluxDB server of the same version." The old text named the version explicitly. Suggest: "Use the InfluxDB v2 Historian only with an InfluxDB v2 server, and the InfluxDB v3 Historian only with an InfluxDB v3 server." Line 38 then follows on without change.
3. Low. Line 43, "install InfluxDB v2 or v3": the old pages said to install the version that matches the component. Suggest "install the InfluxDB version that matches the historian".

## Carried questions

- The writer's note about the `Failed to start the InfluxDB logger` wording, and about the Health Check being described differently here and on the v1 logger, are both fair and are not new defects.

## High severity findings

None.
