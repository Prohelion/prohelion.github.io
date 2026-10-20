---
title: Dashboard Component
description: "Add a built-in profile component that renders a YAML dashboard bound to existing tags, with no DBC file, and learn how to bind tags with absolute paths."
type: component
owner: Documentation
last_reviewed: 2026-10-15
---

# Dashboard Component

A Dashboard Component is a built-in profile component that renders a dashboard defined entirely in YAML and can be edited using the visual dashboard editor.

Use it for human-machine interface (HMI) style screens that bind only to [tags](../../Tags/index.md) that already exist.

It is included in every edition, and it differs from a [Custom Component](../Custom_Components/Using_a_Custom_Component.md) in that it has no DBC, script, or pack files, so there is nothing to upload except the dashboard itself.

## Add the component {#add-a-dashboard-component}

Add the component from **ADD COMPONENT** (refer to [Add a Component to a Profile](../../How_To_Guides/Add_Component_to_Profile.md)), where it is listed under **Dashboards**.
Its only setting besides the name is **Upload Dashboard (Optional)**, which takes a `.yaml` dashboard file.
When no file is uploaded, Profinity creates a template dashboard named after the component, and the dashboard editor on the component opens that file so it can be edited into the finished dashboard.
A component name that matches an existing dashboard file in the profile is rejected with the message "There is already a component in this profile with that name".

## Building the dashboard

Dashboards are written in YAML and can be edited in the [Visual Editor](../../Customising_Profinity/Dashboards/Visual_Editor.md), with the same layout, data, and interactive components available as on any other dashboard.

<figure markdown>
![Dashboard editor in Design mode, with an outline tree of rows, groups, panels and a chart on the left and an Inspector on the right showing Id, Description, CSS class, Width and Direction fields.](../../images/dashboard-visual-editor.png)
<figcaption>Dashboard visual editor</figcaption>
</figure>

A relative tag path in a Dashboard Component starts at the Dashboard Component itself, which has no DBC, so a path such as `DBC/BusMeasurement/BusVoltage` finds no tag there.
Bind to the tags of another component with an absolute path that starts with `/`, such as `/Prohelion BMU/DBC/PackStateOfCharge/SOCPercent`.

Refer to [Data Binding](../../Customising_Profinity/Dashboards/Data_Binding/index.md) to connect the dashboard to tags and the [Component Reference](../../Customising_Profinity/Dashboards/Component_Reference/index.md) for each element.
Worked guides are [How to Create a Custom Dashboard](../../How_To_Guides/Create_Custom_Dashboard.md) and [How to Create a Profile Dashboard](../../How_To_Guides/Create_Profile_Dashboard.md).
