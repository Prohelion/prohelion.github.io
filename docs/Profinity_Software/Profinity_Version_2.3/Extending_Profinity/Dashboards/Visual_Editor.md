---
title: Dashboard Visual Editor
description: "Editable visual dashboard editor for arranging widgets and binding tags without hand-editing YAML."
---

# Dashboard Visual Editor

Profinity 2.3 adds an **editable dashboard visual editor** for component dashboards. Authors with **`DashboardModify`** can arrange widgets, bind tags, and preview layout without hand-editing YAML for every change.

Schema source of truth: `ui-schema.json` in the Profinity engine (validated by `npm run validate-dashboards` in this documentation repo).

## Open the visual editor

1. Open a component that uses a custom dashboard.
2. Open **Settings** → dashboard section.
3. Launch the **visual editor**.

<figure markdown>
![Dashboard visual editor canvas and component tree](../../../../assets/images/2.3/2.3-dashboard-visual-editor.png)
<figcaption>Dashboard visual editor (screenshot placeholder — provide SS-33)</figcaption>
</figure>

## Bind inspector

Select a widget to open the **bind inspector** — list and edit tag bindings for each target property.

<figure markdown>
![Bind inspector for a selected dashboard widget](../../../../assets/images/2.3/2.3-dashboard-bind-inspector.png)
<figcaption>Bind inspector (screenshot placeholder — provide SS-34)</figcaption>
</figure>

Dashboard widgets show live **alert indicators** when bound tags have active rule alerts, as described in [ALL ALERTS](../Rules/Alerts.md).

## Schema changes in 2.3

| Feature | Notes |
|---------|-------|
| **Editable layout** | Drag-and-drop and tree editing with live preview |
| **Chart multi-source** | Charts can bind multiple tag sources per schema |
| **`HtmlContent` map bindings** | Latitude/longitude → OpenStreetMap iframe via `map` binding type |
| **Interactive image** | Top-level `image:` string per schema — not a nested `value:` wrapper |

Example profile dashboard YAML ships under the Profinity **Example Profile** — validate after editing:

```bash
cd Profinity-Docs/scripts
npm run validate-dashboards
```

Must report **Invalid: 0**.

## Profile home dashboard vs component dashboard

| Concept | Description |
|---------|-------------|
| **Component dashboard** | YAML in component folder; edited via component settings |
| **Profile home dashboard** | `UseCustomProfileDashboard` on profile — replaces profile home screen |
| **Dashboard Component** | Separate built-in component type — YAML-only, no DBC |

See [Component Types](../Components/Component_Types.md) and [Profile Dashboard](../../Administration/Profile_Dashboard.md).

## Related documentation

- [Dashboard Development Guide](./index.md)
- [Data Binding](./Data_Binding.md)
- [Examples](./Examples.md)
- [Troubleshooting](./Troubleshooting.md)
