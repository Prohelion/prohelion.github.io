---
title: Designated historian
description: "Choose which historian answers long-range tag history queries when a profile has more than one historian, and what happens if none or several are designated."
type: concept
owner: Documentation
last_reviewed: 2026-10-28
---

# Designated historian

More than one [historian](index.md) can write in the same profile, but exactly one of them answers long-range tag and history queries.
Enable **Designated tag historian reader** on that one component and leave it disabled on the others.

<figure markdown>
```mermaid
flowchart LR
    subgraph Profinity["Profinity"]
        Tags --> Historian["Designated historian"]
    end
    subgraph Store["Database"]
        History["Tag history"]
    end
    Historian --> History
    History --> Queries["History queries"]
```
<figcaption>Tag history is written by each historian, and long-range history queries are answered from the store of the historian that has Designated tag historian reader enabled</figcaption>
</figure>

If no component is designated, or more than one is, Profinity has no store to read history from and does not answer long-range queries.
An InfluxDB historian is designated only while its **Allow Retrieval** setting is also enabled.
The setting is described on the page of each historian: [InfluxDB historians](InfluxDB_Historians.md) and [TAG SQL Historian](TAG_SQL_Historian.md).

To set up logging, refer to [How to configure data logging](../../How_To_Guides/Configure_Data_Logging.md).
