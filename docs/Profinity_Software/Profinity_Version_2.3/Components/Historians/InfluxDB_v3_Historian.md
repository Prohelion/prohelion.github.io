---
title: InfluxDB v3 Historian
description: "Record tag history to an InfluxDB v3 server and read it back through the APIs."
---

# InfluxDB v3 Historian

The **InfluxDB v3 Historian** writes the values of the tags in the [collections](../../Tags/Collections.md) you select to an InfluxDB v3 server, and allows that history to be read back out through the APIs. It sits in the **Historians** category and requires the **Historians** licensed feature. Each recorded value belongs to a [tag](../../Tags/index.md), identified by its [tag tree path](../../Tags/Tag_Tree_Path.md).

!!! warning "Match the Component to Your InfluxDB Version"
    Use this component only with an InfluxDB v3 server. The component type must match the InfluxDB version, and a mismatch causes connection failures. The [InfluxDB v2 Historian](InfluxDB_v2_Historian.md) is documented separately, and [Historians](index.md#which-influxdb-component-do-i-need) explains how to choose.

Use this component if your InfluxDB server stores data in a single database. It authenticates with a token.

## Adding an InfluxDB v3 Historian

Install InfluxDB v3 and confirm that it is running, then add an **InfluxDB v3 Historian** to your profile from the **Historians** category and configure the following options:

| Setting | Purpose | Default |
|---|---|---|
| **InfluxDB Database** | The InfluxDB v3 database that the data is stored in. Required. | None |
| **InfluxDB Token** | The security token of the InfluxDB user that Profinity connects as. Required, and stored encrypted. | None |
| **Influx Server URL** | The endpoint URL that InfluxDB is running on. | `http://localhost:8086/` |
| **Dashboard URL** | The URL of the InfluxDB dashboard. Optional, and leaving it blank shows no dashboard link. | Blank |
| **InfluxDB Health Check** | Checks the health of the InfluxDB server when the component connects. Turn it off for InfluxDB Cloud. | On |
| **Collections** | The tag collections whose tags are recorded. At least one collection must be configured before the component starts. | None |
| **Logging Interval (Sec)** | The interval, in seconds, at which data is sent. The minimum is 1. | 10 |
| **Logging mode** | Sets what is sent on each interval: `Snapshot`, `On Change` or `Everything`. See [Logging Modes](../Loggers/InfluxDB_Prometheus_Logger.md#logging-modes). | `Snapshot` |
| **Allow Retrieval** | Allows data to be retrieved through this historian using the APIs. | On |
| **Designated tag historian reader** | Makes this historian the store that long-range tag and history queries are read from. Enable it on one component in the profile only, and it takes effect only while **Allow Retrieval** is on. See [Historians](index.md#designating-the-historian-that-is-read-from). | Off |

If data does not arrive, the [Log](../../Getting_Started/Profinity_Log.md) names the cause. `Credential validation failed` (likely invalid token) means the token is wrong or lacks access, `Health check failed` means the server did not answer the health endpoint (switch **InfluxDB Health Check** off for InfluxDB Cloud), and `Failed to start the InfluxDB logger` means the connection failed for another reason, so check the **Influx Server URL** first. Settings cannot be saved while a required field is empty.

!!! warning "Turn Off Health Check for InfluxDB Cloud"
    InfluxDB Cloud does not support the InfluxDB Health Check API, so turn off **InfluxDB Health Check** when InfluxDB Cloud stores your data. See [Log Data to InfluxDB Cloud](../../How_To_Guides/Log_Data_to_Cloud_Influx.md).

## Related Documentation

- [Historians](index.md)
- [InfluxDB v2 Historian](InfluxDB_v2_Historian.md)
- [InfluxDB and Prometheus Logging](../Loggers/InfluxDB_Prometheus_Logger.md)
- [Configure Data Logging](../../How_To_Guides/Configure_Data_Logging.md)
- [Log Data to InfluxDB Cloud](../../How_To_Guides/Log_Data_to_Cloud_Influx.md)
