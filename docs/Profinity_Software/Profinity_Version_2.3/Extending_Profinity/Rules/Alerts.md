---
title: ALL ALERTS
description: "Surface rule-generated alerts across the UI with active/history tabs and live alert indicators."
---

# ALL ALERTS

Profinity 2.3 surfaces rule-generated alerts in **ALL ALERTS**, live indicators across the UI, and the `/api/v2/Alerts` API. Operators with **`AlertsView`** permission can view, acknowledge, unacknowledge, and silence alerts.

<figure markdown>
![The ALL ALERTS page with Active and History tabs, and an alert detail panel showing what to do, related documentation, related tags, and acknowledge/silence controls](../../../../assets/images/2.3/2.3-diagram-alerts.png)
<figcaption>Nothing gets missed in a log file</figcaption>
</figure>

## Open ALL ALERTS

- Side menu → **ALL ALERTS** (route `/tags?view=alerts`), or
- Navigate directly to `/tags?view=alerts` in the browser.

<figure markdown>
![Side menu with ALL ALERTS entry](../../../../assets/images/2.3/2.3-side-menu-all-alerts.png)
<figcaption>ALL ALERTS in the side menu (screenshot placeholder — provide SS-21)</figcaption>
</figure>

The side menu icon uses the Carbon alert style — not the legacy `dash_alerts_active.svg` asset.

## Active and History tabs

| Tab | Content |
|-----|---------|
| **Active** | Rule alerts currently firing |
| **History** | Paginated history (newest first) |

<figure markdown>
![ALL ALERTS Active tab with alert table](../../../../assets/images/2.3/2.3-alerts-active-tab.png)
<figcaption>Active alerts table (screenshot placeholder — provide SS-22)</figcaption>
</figure>

<figure markdown>
![ALL ALERTS History tab with pagination](../../../../assets/images/2.3/2.3-alerts-history-tab.png)
<figcaption>Alert history (screenshot placeholder — provide SS-23)</figcaption>
</figure>

Typical columns include time, rule name, tag, and **description** (from the rule's `description` field).

## Alert levels

Every rule and threshold step carries a `level`, and the six permitted values in ascending severity are `Trace`, `Debug`, `Info`, `Warning`, `Error` and `Fatal`. A rule that omits `level` defaults to `Info`, and an unrecognised value is rejected when the rules file loads. The `triggerLevel` of a parent action uses the same values and fires for alerts at that level or above. The `level` filter on the Active and History queries, and on the MCP alert tools, is case-insensitive.

## Live indicators

The web client polls active alerts every **four seconds** and shows indicators in:

- **Dashboard widgets** bound to alerting tags — yellow alert triangle on the bottom-right of the widget.
- **Tag Explorer** — alert icon on leaf tags (and branch rollup where configured).
- **Side menu** — ALL ALERTS entry when alerts are active.

<figure markdown>
![Dashboard widget with yellow alert triangle indicator](../../../../assets/images/2.3/2.3-dashboard-alert-indicator.png)
<figcaption>Dashboard alert indicator on a bound widget (screenshot placeholder — provide SS-24)</figcaption>
</figure>

<figure markdown>
![Tag Explorer with rule alert icon on a leaf tag](../../../../assets/images/2.3/2.3-tag-explorer-alert-indicator.png)
<figcaption>Rule alert on a tag in Tag Explorer (screenshot placeholder — provide SS-25)</figcaption>
</figure>

!!! info "Alert vs stale data quality"
    **Rule alerts** use a **yellow triangle**. **Stale tag data quality** on Tag Explorer uses a separate **Carbon** icon — not the alert triangle. If both appear, they indicate different conditions.

## Acknowledge, unacknowledge, and silence

From ALL ALERTS (requires `AlertsView` — same permission for mutations):

| Action | Effect |
|--------|--------|
| **Acknowledge** | Marks alert as seen/handled |
| **Unacknowledge** | Reverts acknowledgement |
| **Silence** | Suppresses notifications for the number of minutes given in `durationMinutes` on the request |

### REST API

| Method | Route |
|--------|-------|
| GET | `/api/v2/Alerts/Active` |
| GET | `/api/v2/Alerts/History` |
| POST | `/api/v2/Alerts/Ack` |
| POST | `/api/v2/Alerts/Unack` |
| POST | `/api/v2/Alerts/Silence` |

## Rule evaluation: dwell and deadband

<figure markdown>
![A rule evaluated continuously over time, with dwell and deadband shown against a rising value, severity tiers from Warning through Fatal, and the same rule fanning out to raise one alert per tag in a collection](../../../../assets/images/2.3/2.3-diagram-rules.png)
<figcaption>Monitoring logic that scales with the fleet</figcaption>
</figure>

Rules support **dwell** (the condition must hold for a duration, set with `dwellSeconds` or `dwellMinutes`) and **deadband** (hysteresis, set on a threshold step with `clearValue` or `clearExpression`), configured in the rules visual editor or in `rules.yaml`. Engine evaluation interval is controlled by **`evaluationTickSeconds`** in rule configuration.

Conditions use the same `tag` expression language as collections. Numeric trip and clear conditions:

```text
tag.Value > 4.2
tag.Value < 4.0
```

A no-data or stale sensor condition (preferred over sample age):

```text
tag.IsStale
```

How to write conditions: [Tag expressions](./Tag_Expressions.md). Also see [Rule actions and scripts](./Rule_Actions_And_Scripts.md) and [Tag layer](../Tag_Layer/index.md).

## Related documentation

- [Tag expressions](./Tag_Expressions.md)
- [Tag layer](../Tag_Layer/index.md)
- [Collections](./Collections.md)
- [RBAC and permissions](../../Administration/Security/RBAC_Permissions.md)
