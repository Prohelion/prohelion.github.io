---
title: Prometheus Logger
description: "Serve selected tag collections to a Prometheus server, with the endpoint settings, the default data URL, and what to check if Prometheus shows no data."
type: component
owner: Documentation
last_reviewed: 2026-10-15
---

# Prometheus Logger

The **Prometheus Logger** serves the values of the [tags](../../Tags/index.md) in selected [tag collections](../../Tags/Collections/index.md) to [Prometheus](https://prometheus.io).
A logger only writes data out. It sits in the **Loggers** category.

<figure markdown>
```mermaid
flowchart LR
    subgraph Profinity["Profinity"]
        Collections["Tag collections"] --> Prom["Prometheus Logger"]
    end
    Prometheus["Prometheus server"] --> Prom
```
<figcaption>The Prometheus Logger serves the selected tag collections to a Prometheus server that calls Profinity to request the latest values</figcaption>
</figure>

Prometheus logging works differently from [InfluxDB logging](InfluxDB_v1_Logger.md).
InfluxDB expects its data to be pushed to it.
Prometheus treats Profinity as a source of data and calls it to request the latest values.
Prometheus stores data only and has no graphing capability out of the box, so it is usually coupled with a tool such as [Grafana](https://grafana.com) for visualisation.

## Quick start

1. Select **ADD COMPONENT**, then select **Prometheus Logger** in the **Loggers** category.
2. Under **Collections**, select at least one tag collection. The logger does not start without one.
3. Keep **Server Hostname** as `localhost`, **Server Port** as `7065` and **Data endpoint URL** as `metrics/` to serve the data to a scraper on this computer.
4. Select **ADD COMPONENT** at the bottom of the dialog. **Auto Connect** is on by default, so the logger starts when the profile loads. If it is off, select **Start Logger** from the component's menu.
5. Check that **STATUS** shows **On**.
6. Open `http://localhost:7065/metrics` in a browser on this computer, or point Prometheus at that address, and check that each tag in the selected collections appears as a gauge.

Adding a **Prometheus Logger** to Profinity is all that Prometheus logging needs on the Profinity side.
The **Collections** setting selects one or more [tag collections](../../Tags/Collections/index.md) that are served (display names in the picker, id stored), and you must select at least one before the component starts.
You can also set the following connection values.

| Setting | Type | Default | Purpose |
|---|---|---|---|
| **Collections** | Choice | None | The tag collections that are served. Select at least one before the logger starts. |
| **Data endpoint URL** | Text | `metrics/` | The URL path, within the hostname and port, that the Prometheus data is served on. |
| **Server Hostname** | Text | `localhost` | The host name or IP address that the Prometheus endpoint answers to. Refer to [Let another computer read the data](#let-another-computer-read-the-data). |
| **Server Port** | Whole number | 7065 | The port that the endpoint runs on, from 1 to 65535. |
| **Dashboard URL** | Text | Blank | The full URL of the Prometheus dashboard. Optional, and leaving it blank shows no dashboard link. |
| **Update Interval (Seconds)** | Time | 10 | The seconds between samples, from 1 to 86400. |
| **Auto Connect** | On or off | On | Starts the logger when the profile loads. Refer to [Connections and reconnecting](../Connections_and_Reconnecting.md). |

A tag that is not Good quality is reported as NaN.

Once the Prometheus Logger is active, Prometheus can call Profinity on the data endpoint URL to receive data.
With all settings left at their defaults, the data is served at:

```text
http://localhost:7065/metrics
```

Configuring Prometheus to receive and display this data is covered in the Prometheus documentation.

## Example

This example shows a Prometheus Logger in the `components` list of the `profile.yaml` file in the profile folder.
Refer to [Profile folders](../../Administration/Profile_Folders.md) for where that file sits.
It is an example only, so replace the placeholders with your own values.

```yaml
components:
- component:
    type: PrometheusLogger
    id: PrometheusLogger1
    name: Prometheus Logger
    tagTreeParentPath: /
    hostname: localhost
    port: 7065
    url: metrics/
    intervalSec: 10
    collections:
    - collectionName: YOUR_COLLECTION_ID
```

`YOUR_COLLECTION_ID` is the id of a tag collection in the profile.
With these values, Prometheus reads the data from `http://localhost:7065/metrics`.

## Let another computer read the data {#let-another-computer-read-the-data}

With **Server Hostname** set to `localhost`, only a scraper on the same computer can read the data.
To let a scraper on another computer connect, enter the host name or IP address of the Profinity computer, or `+` to answer on every address.
On Windows, listening on anything other than `localhost` needs a URL reservation or administrator rights. This section covers Windows only.
For example, run this command to reserve the URL:

```text
netsh http add urlacl url=http://+:7065/metrics user=DOMAIN\user
```

Replace `7065` with your **Server Port**, and `DOMAIN\user` with the account that runs Profinity.
Alternatively, run Profinity with administrator rights.

## What Prometheus receives

Each tag in the selected collections is served as one gauge.
The name is the profile, component, message and signal joined with underscores, and the labels identify the tag.
For example, a motor speed signal on a component called `Inverter` is served like this:

```text
# HELP MyProfile_Inverter_Status_Speed Inverter/DBC/Status/Speed
# TYPE MyProfile_Inverter_Status_Speed gauge
MyProfile_Inverter_Status_Speed{profile="MyProfile",component="Inverter",transmitter="",message="Status",signal="Speed",full_tag_id="Inverter_DBC_Status_Speed"} 23.4
```

Characters other than letters and digits in names and labels are replaced with underscores, which is why the `full_tag_id` label shows underscores where the tag's path has slashes.
The value is the latest reading, or `NaN` when the tag is not Good quality.

## If Prometheus shows no data

If the logger cannot open its Prometheus endpoint, for example because the port is in use, it shows **Error**.
It writes the reason to the Profinity system logs once, and retries every 5 seconds until the problem clears.
Refer to [Logs](../../Administration/Logs_Config.md) for where to read them.

If Prometheus shows no data, check three things:

- The logger is running.
- The scraper uses the same hostname, port and endpoint path as the logger.
- At least one collection with tags is selected.

To add the logger and start it, refer to [How to configure data logging](../../How_To_Guides/Configure_Data_Logging.md).
