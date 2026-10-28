---
title: Visual Editor reference
description: "Look up the Visual Editor areas: dashboard tree, inspector, footer buttons, schema validation issues and the YAML tab."
type: reference
owner: Documentation
last_reviewed: 2026-10-28
---

# Visual Editor reference

The *Visual Editor* is the primary way to build and change a dashboard, with no YAML to write.
The **YAML** tab is a fallback for anything the Visual Editor does not cover, and the reference format when a dashboard is shared or reviewed.
For the steps, refer to [Build a dashboard in the Visual Editor](./Build_a_Dashboard.md).

## Editor layout

| Area | What it does |
|------|--------------|
| **Dashboard tree** | Shows every element, nested as it is in the dashboard. |
| **Inspector** | Shows the properties of the selected element. |
| **Schema validation issues** | Lists anything that does not match the dashboard schema. |
| **Footer buttons** | **NEW FROM TEMPLATE**, **RELOAD** and **SAVE**, and **DELETE** for a home dashboard. |

## Dashboard tree

- **Search dashboard** finds an element by name or type.
- **Add** inserts a new element as the first child of the selected container, or at the top of the dashboard when the root is selected. It is unavailable when the selected element cannot hold other elements.
- Dragging an element reorders it within its parent, or moves it onto another container. The tree allows only drops that the dashboard schema permits.
- The **Delete** icon on an element removes it. A confirmation lists how many nested elements are removed with it.

## Inspector

The inspector shows the properties of the selected element.
Each property uses the control that suits it, such as a drop-down for fixed choices, a check box for on/off values, and pickers for icons and action IDs.
A property that the Visual Editor cannot edit shows a hint to use the **YAML** tab.
An element that can show live data has a **Binding** section, as described in [Build a dashboard in the Visual Editor](./Build_a_Dashboard.md#bind-an-element-to-a-tag).

With nothing selected, the inspector shows the dashboard switches:

| Switch | Effect |
|--------|--------|
| **Show header** | Adds the title bar. |
| **Show actions** | Adds the action buttons to the title bar. With **Show header** off and **Show actions** on, the title bar is transparent and shows only the actions. |
| **Show footer** | Adds the footer, except on a dashboard that contains an accordion. |

## Footer buttons

| Button | Effect |
|--------|--------|
| **NEW FROM TEMPLATE** | Replaces the dashboard with the template after a confirmation prompt. |
| **RELOAD** | Loads the saved dashboard again and discards the changes made since it was saved. |
| **SAVE** | Stores the dashboard. It is refused while any schema validation issue remains. |
| **DELETE** | A red button that appears only when you edit an existing home dashboard. It asks for confirmation, then removes the dashboard file, clears it from the profile settings and returns to the home page. Component dashboards do not offer it. |

For the template, refer to [Where dashboards are used](./Where_Dashboards_Are_Used.md#starter-template).

## Schema validation issues

The editor checks the dashboard against the dashboard schema while it is edited, and lists each problem under **Schema validation issues**.
The YAML tab provides syntax highlighting and auto-complete.

## YAML tab

Use the Visual Editor first.
Use the **YAML** tab in these cases:

- To edit a property that the inspector marks as "use the YAML tab".
- To copy a dashboard or paste in an example from the [Component reference](./Component_Reference/index.md) or the [Motor controller dashboard example](./Motor_Controller_Dashboard_Example.md).
- To review a whole dashboard at once or make the same change in many places.
- To repair a dashboard that the Visual Editor cannot open.

Switching tabs keeps the changes made.
Switching to **DESIGN** needs valid YAML, and if the YAML cannot be parsed the editor shows an error and stays on the **YAML** tab.
To copy a dashboard as a starting point, refer to [Copy a dashboard as a template](./Build_a_Dashboard.md#copy-a-dashboard-as-a-template).
For the YAML structure, refer to [Core elements](./Core_Elements.md).
