---
title: MQTT Subscriber Sparkplug behaviour
description: "Look up which Sparkplug B messages and metric types the MQTT Subscriber applies, how it announces itself, and how it handles sequence gaps and metric death."
type: reference
owner: Documentation
last_reviewed: 2026-10-14
---

# MQTT Subscriber Sparkplug behaviour

This page lists how the [MQTT Subscriber](index.md) treats the [Sparkplug](https://sparkplug.eclipse.org/) B messages and metrics that it receives from a Message Queuing Telemetry Transport (MQTT) broker.
Sparkplug B is an MQTT payload format for industrial data.
For the settings that control the subscription, and for the paths where the tags appear, refer to [MQTT Subscriber](index.md).

The subscriber applies data from both node-level and device-level publishers.
It never writes command or state messages to a tag, even under the default `spBv1.0/#` filter.

## Messages the subscriber applies

| Message | What the subscriber does |
|---|---|
| `NBIRTH` | Starts the node session, which must begin at sequence 0, and makes the node's metrics known. Metrics from an earlier session that are missing from it become **Stale**. |
| `NDATA` | Writes the metric values to their tags. |
| `DBIRTH` | Makes the device's metrics known. Metrics of that device that are missing from it become **Stale**. |
| `DDATA` | Writes the device's metric values to their tags. |
| `NDEATH` | Marks every metric of that node **Stale** and ends the node session. |
| `DDEATH` | Marks every metric of that device **Stale**. |

The subscriber ignores `NCMD`, `DCMD` and `STATE` messages.
A broker disconnect marks all subscriber tags **Stale**.

## Host state

While connected, the subscriber announces itself to the broker as online under its **Host ID**.
It publishes an offline state when the subscriber stops.
The state message is retained on the broker, so a Sparkplug-aware consumer can see the last known state.

## Sequence gaps and metric death {#sequence-gaps-and-rebirth}

When a message arrives out of sequence, the subscriber asks the edge node to republish its data.
It does not apply the out-of-sequence values as current values.

When a metric dies, or a later announcement from the edge node omits a metric that was known before, the tag is kept and its quality is set to **Stale**.
History and dashboard bindings against that tag path keep working and show the value as no longer live.
Refer to [Tags](../../../Tags/index.md) for how data quality is shown.

## Data types and malformed payloads {#data-types}

The subscriber supports scalar metric types only: boolean, string, the integer widths, float, double, and DateTime.
It skips dataset, template, bytes, and property-set values.
It also skips a metric whose name is not yet known, because the edge node has not announced it.
A payload that cannot be decoded is logged and dropped, and the subscriber stays connected.
