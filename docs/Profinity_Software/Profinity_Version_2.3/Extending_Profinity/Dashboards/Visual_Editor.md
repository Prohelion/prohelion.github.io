---
title: Dashboard Visual Editor
description: "Editable visual dashboard editor for arranging widgets and binding tags without hand-editing YAML."
---

# Dashboard Visual Editor

Profinity 2.3 adds an **editable dashboard visual editor** for component dashboards. Authors with **`DashboardModify`** can arrange widgets, bind tags, and preview layout without hand-editing YAML for every change.

The editor validates the dashboard against the dashboard schema while it is edited, lists any schema validation issues, and does not save a dashboard that has them.

## Open the visual editor

1. Open a component that uses a custom dashboard.
2. Select the pencil (**Edit Dashboard**) icon in the menu at the right of the dashboard title bar, which is shown to users with the `DashboardModify` permission.
3. The editor opens in **DESIGN** mode, which is the visual editor. Select **YAML** to edit the YAML source directly.

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
| **`HtmlContent` map bindings** | Latitude and longitude tags (`latSource` and `lonSource` in the `map` property) display an OpenStreetMap embed |
| **Interactive image** | The background image is the top-level `image:` filename string of the `image` component, without a nested `value:` wrapper |

## Profile home dashboard vs component dashboard

| Concept | Description |
|---------|-------------|
| **Component dashboard** | YAML in the component folder; edited with the **Edit Dashboard** icon on the component |
| **Profile home dashboard** | `UseCustomProfileDashboard` on profile — replaces profile home screen |
| **Dashboard Component** | Separate built-in component type — YAML-only, no DBC |

See [Component Types](../Components/Component_Types.md) and [Profile Dashboard](../../Administration/Profile_Dashboard.md).

## Related documentation

- [Dashboard Development Guide](./index.md)
- [Data Binding](./Data_Binding.md)
- [Examples](./Examples.md)
- [Troubleshooting](./Troubleshooting.md)
