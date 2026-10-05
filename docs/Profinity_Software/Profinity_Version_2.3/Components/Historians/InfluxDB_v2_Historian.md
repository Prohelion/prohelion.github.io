---
title: InfluxDB v2 Historian
description: "Record tag history to an InfluxDB V2 server and read it back through the APIs."
---

# InfluxDB v2 Historian

The **InfluxDB v2 Historian** writes the values of the tags in the [collections](../../Tags/Collections.md) you select to an InfluxDB V2 server, and allows that history to be read back out through the APIs. It sits in the **Historians** category and requires the **Historians** licensed feature. Each recorded value belongs to a [tag](../../Tags/index.md), identified by its [tag tree path](../../Tags/Tag_Tree_Path.md).

!!! danger "InfluxDB V1, V2, and V3 are Separate, Incompatible Products"
    InfluxDB V1, V2, and V3 are **separate, incompatible products** with different APIs, authentication methods, and configuration requirements. The component type selected in Profinity must match the InfluxDB version installed, and using the wrong component type results in connection failures. This page covers V2 only, and the [InfluxDB v3 Historian](InfluxDB_v3_Historian.md) is documented separately.

InfluxDB V2 uses token-based authentication and introduces the concepts of buckets and organisations, replacing the database and retention policy concepts from V1.

## Adding an InfluxDB v2 Historian

Install InfluxDB V2 and confirm that it is running, then add an **InfluxDB v2 Historian** to your profile from the **Historians** category and configure the following options:

| Setting | Purpose |
|---|---|
| InfluxDB Bucket | The InfluxDB bucket that the data is stored in. |
| InfluxDB Organisation | The InfluxDB organisation that owns the bucket. |
| InfluxDB Token | The security token of the user that Profinity connects to InfluxDB as. |
| Influx Server URL | The endpoint URL that InfluxDB is running on. |
| Dashboard URL | The URL of the InfluxDB dashboard. Optional, and leaving it blank shows no dashboard link. |
| InfluxDB Health Check | Performs a health check on the connection at regular intervals. |
| Collections | The tag collections whose tags are recorded. At least one collection must be configured before the component starts. |
| Logging Interval (Sec) | The interval, in seconds, at which data is sent. |
| Logging mode | Sets what is sent on each interval: `Snapshot`, `On Change` or `Everything`. See [Logging modes](../Loggers/InfluxDB_Prometheus_Logger.md#logging-modes). |
| Allow Retrieval | Allows data to be retrieved through this historian using the APIs. |
| Designated tag historian reader | Makes this historian the store that long-range tag and history queries are read from. Exactly one historian or logger in the profile should enable this. See [Historians](index.md#designating-the-historian-that-is-read-from). |

When these settings are correct, data flows into InfluxDB V2. If it does not, check the [Logs](../../Getting_Started/Profinity_Log.md) for more details.

!!! warning "InfluxDB Cloud HealthCheck Warning"
    InfluxDB Cloud does not support the InfluxDB Health Check API, so the InfluxDB Health Check setting must be set to false when InfluxDB Cloud is used to store your data.

## Related documentation

- [Historians](index.md)
- [InfluxDB v3 Historian](InfluxDB_v3_Historian.md)
- [InfluxDB and Prometheus logging](../Loggers/InfluxDB_Prometheus_Logger.md)
- [Configure data logging](../../How_To_Guides/Configure_Data_Logging.md)
- [Log data to InfluxDB Cloud](../../How_To_Guides/Log_Data_to_Cloud_Influx.md)
