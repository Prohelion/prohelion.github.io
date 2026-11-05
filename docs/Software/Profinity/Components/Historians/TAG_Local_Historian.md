---
title: TAG Local Historian
description: "Record tag history to a managed SQLite file on the Profinity host, with file-logger-simple setup and read-back through the APIs."
type: component
owner: Documentation
last_reviewed: 2026-11-01
---

# TAG Local Historian

The **TAG Local Historian** writes the values of the tags in the [collections](../../Tags/Collections/index.md) you select to a SQLite database file that Profinity manages on the host.
It also allows that history to be read back through the APIs.
It sits in the **Historians** category.

Use it for simple or embedded setups where you want queryable history without entering a connection string or running a separate database server.
For a database you already operate (SQL Server, PostgreSQL, MySQL, Oracle, or a SQLite path you choose yourself), use the [TAG SQL Historian](TAG_SQL_Historian.md) instead.
For viewable CSV or JSON Lines files rather than queryable history, use the [TAG File Logger](../Loggers/Tag_File_and_SFTP_Loggers.md).

Each row the historian writes belongs to one [tag](../../Tags/index.md), identified by its [tag tree path](../../Tags/Selecting_Tags/Tag_Tree_Path.md).

<figure markdown>
```mermaid
flowchart LR
    subgraph Profinity["Profinity"]
        Tags --> Collections["Tag collections"] --> Historian["TAG Local Historian"]
    end
    subgraph Disk["Host disk"]
        Db["tag_history database"]
    end
    Historian --> Db
```
<figcaption>The TAG Local Historian writes the tags in the selected collections to a managed SQLite file under tag_history, and the APIs read the history back</figcaption>
</figure>

!!! info "Licence required"
    The TAG Local Historian requires the **Historians** licensed feature.
    Refer to [Licensing](../../Licensing.md) for the editions that include it.

## Quick start {#adding-a-tag-local-historian}

You need the **Historians** licensed feature. Refer to [Licensing](../../Licensing.md) for the editions that include it.

1. Add a **TAG Local Historian** from the **Historians** category, as described in [How to add a component to your profile](../../How_To_Guides/Add_Component_to_Profile.md).
2. Under **Collections**, add the tag collection whose tags you want recorded. The historian does not start until a collection is configured.
3. Leave **Logging mode** as **Snapshot**, **Update Interval (Seconds)** as 10, **Retention (days)** as 30 and **Designated tag historian reader** on, unless you need other values.
4. Select **ADD COMPONENT** at the bottom of the dialog.
5. Leave **Auto Connect** on, which is its default, so the historian starts when the profile loads. If it is off, select **Start Logger**.
6. Check that the status shows **On**. Rows are written to the database file after each **Update Interval (Seconds)**.

There is no connection string, provider, or table name to configure.
Profinity creates the SQLite file under the site `tag_history/` directory when the historian starts.

If a write fails, use this table to find the cause.

| What you see | Cause | What to do |
|---|---|---|
| The status shows **Error** until a write succeeds. | The local database rejected a write, or its connection is unavailable. | Read the reason on the **Logs** page under **ADMIN**. Check that the database file is on a writable drive with free space, and that no other program holds the file. |

## Logger settings

| Setting | Type | Default | Purpose |
|---|---|---|---|
| **Collections** | List | None | One or more [tag collections](../../Tags/Collections/index.md) whose tags are recorded. The picker shows display names (and group path); the profile stores the collection id. At least one collection must be configured before the component starts. |
| **Logging mode** | Choice | `Snapshot` | Sets what is written on each interval: `Snapshot`, `On Change` or `Everything`. Refer to [Logging modes](../Logging_Modes.md) for what each mode writes. |
| **Auto Connect** | On or off | On | Starts the historian when the profile loads. When off, start it with **Start Logger**. Refer to [Connections and reconnecting](../Connections_and_Reconnecting.md). |
| **Update Interval (Seconds)** | Whole number | 10 | The seconds between writes to the database, from 1 to 86400. Refer to [Logging modes](../Logging_Modes.md) for how each mode uses it. |

## Data storage

| Setting | Type | Default | Purpose |
|---|---|---|---|
| **Retention (days)** | Whole number | 30 | Deletes stored samples older than this many days after each successful write interval. |
| **Designated tag historian reader** | On or off | On | Makes this historian the store that long-range history queries are read from. Enable it on one component only. Refer to [Designated historian](Designated_Historian.md). |

## Example

Add this item under the existing `components:` key in the `profile.yaml` file of the profile. Each profile has its own folder in the `profiles/` folder of the [artefacts directory](../../Installation/Artifacts_Directory.md).

```yaml
- component:
    type: TagLocalHistorian
    id: TagLocalHistorian1
    name: TAG Local Historian
    tagTreeParentPath: /
    intervalSec: 10
    logType: Snapshot
    retentionDays: 30
    designatedTagDataStore: true
    collections:
    - collectionName: YOUR_COLLECTION_ID
```

Replace `YOUR_COLLECTION_ID` with the id of a tag collection in the profile.

## Where the database is stored

The file path is:

`{artefacts}/tag_history/{profile name}/{component name}.db`

The artefacts root is `%LOCALAPPDATA%\Prohelion\Profinity` on Windows, `~/Library/Application Support/Prohelion/Profinity` on macOS, and `/var/lib/prohelion/profinity` on Linux, unless `PROFINITY_HOME` is set.
The profile name and component name are kept as you named them (only characters that are illegal in a file name are removed).
The table inside the file is always `TagChangeLog`.

This directory is separate from `tag_logs/`, which holds viewable CSV and JSON Lines files from the TAG File Logger.

## Deleting the component

!!! warning "Removing the component deletes its history"
    Removing the TAG Local Historian from the profile deletes its `.db` file and any SQLite sidecar files (`-wal`, `-shm`), and the history in them is lost.

To keep the history, copy the files before you remove the component:

1. Stop the component with **Stop Logger**.
2. Copy the `<component>.db` file and any `-wal` and `-shm` files from `tag_history/<profile>/` in the [artefacts directory](../../Installation/Artifacts_Directory.md).
3. Remove the component from the profile.

Unloading a profile without removing the component leaves the file in place.

## Reading history back

With **Designated tag historian reader** enabled, dashboards and integrations that ask for long-range tag history use this store.
Refer to [Designated historian](Designated_Historian.md).

The row layout matches the TAG SQL Historian and the TAG File Logger field set.
Refer to [TAG SQL Historian](TAG_SQL_Historian.md#table-layout) for the column list.

!!! warning "Moving a component starts a new history in this historian"
    This historian records history under the tag's path, so moving a component changes its tag paths.
    The history recorded under the old paths stays there, and queries for the new path return a new series that begins with its first point.
    Refer to [Change the path on a deployed component](../../Tags/Selecting_Tags/Nest_a_Component_in_the_Tag_Tree.md#change-the-path-on-a-deployed-component).

For the steps to set up data logging, refer to [How to configure data logging](../../How_To_Guides/Configure_Data_Logging.md).
