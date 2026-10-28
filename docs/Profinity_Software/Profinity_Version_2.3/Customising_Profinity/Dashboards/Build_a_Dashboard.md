---
title: Build a dashboard in the Visual Editor
description: "Open the Visual Editor, add and arrange elements, bind them to tags, then validate and save, or copy a dashboard as a starting point."
type: task
owner: Documentation
last_reviewed: 2026-10-28
---

# Build a dashboard in the Visual Editor

Use these steps to build or change a dashboard in the Visual Editor, bind its elements to tags and save it.
You need the **Modify dashboards** permission, which an administrator grants in a role as described in [Roles and permissions](../../Administration/Users_and_Access/Roles_and_Permissions.md).
Without it, the **Edit Dashboard** icon is not shown.
Every dashboard value is bound to a tag, so familiarity with the [Tag Explorer](../../Tags/index.md) helps.
A basic understanding of YAML syntax is needed only when you use the **YAML** tab or read the examples in this guide.
Dashboards created before Profinity 2.3 keep working unchanged, and one opens in the Visual Editor ready to change.
For the parts of the editor, refer to the [Visual Editor reference](./Visual_Editor.md).

## Open the Visual Editor

1. Open a component that uses a custom dashboard, or open the home page if the profile uses a home dashboard, as described in [Profile dashboard](../../Administration/Profile_Dashboard.md).
2. Select the pencil (**Edit Dashboard**) icon in the menu at the right of the dashboard title bar.

The editor opens in **DESIGN** mode, which is the Visual Editor.

<figure markdown>
![The Visual Editor with the dashboard tree on the left, the inspector on the right and the footer buttons along the bottom.](../../images/dashboard-visual-editor.png)
<figcaption>Dashboard Visual Editor</figcaption>
</figure>

## Add and arrange elements

1. In the dashboard tree, select the container to add into, such as a row, group, or pill. Leave the dashboard root selected to add at the top level.
2. Select **Add**. The **Add component** window lists the element types that fit the selection, such as Row, Group, Pill, Readout, Lamp, Chart, and Action.
3. Choose a type. The new element appears in the tree as the first child of the selected container, and it is selected. With the dashboard root selected, it appears at the top of the dashboard.
4. Drag the new element in the tree to its final position. The tree shows a drop position only where the dashboard schema permits one.
5. In the **Inspector**, set the properties of the element.

If **Add** is unavailable, the selected element cannot hold other elements.
Each property in the inspector uses the control that suits it, as listed in the [Visual Editor reference](./Visual_Editor.md#inspector).

To delete an element:

1. In the dashboard tree, select the trash (**Delete**) icon on the row of the element.
   The root row has no **Delete** icon.
2. Confirm the deletion in the **Delete element** dialog by selecting **Delete**. The dialog states how many nested elements are removed with it.

The element and its nested elements no longer appear in the tree.

## Bind an element to a tag

An element that can show live data has a **Binding** section in the inspector.
A single-value element such as a readout or lamp binds one tag, and a chart binds one or more tags.

1. Select the element in the tree, such as a readout, a lamp or a chart.
2. In the **Binding** section of the inspector, add a binding for each property that the data drives.
3. Choose the tag from the tag tree, which is the same tree as the Tag Explorer.
4. Optional: set the transform and the default value.

The binding appears in the **Binding** section, naming the tag you chose.
For how a binding names a tag and the modes it supports, refer to [Data binding](./Data_Binding/index.md).

<figure markdown>
![The Visual Editor with a lamp selected in the tree, and the inspector showing its Label, Color, Enabled and Value fields followed by a Binding section.](../../images/dashboard-bind-inspector.png)
<figcaption>Binding section of the inspector</figcaption>
</figure>

You can also start from tags.
Choosing tags to link to a dashboard opens the **Add component for selected tag(s)** window, which offers only the element types that suit the chosen tags.
Refer to [Create collections, rules, and dashboard bindings from tags](../../Tags/Create_Collections_Rules_and_Bindings_from_Tags.md).
Dashboard widgets show live alert indicators when their bound tags have active rule alerts, as described in [Alerts Log](../../Tags/Alerts.md).

## Validate and save

1. Check the **Schema validation issues** list. It shows each part of the dashboard that does not match the dashboard schema.
2. Fix each issue in the inspector or in the **YAML** tab.
3. Select **SAVE**. **SAVE** shows a message and does not save while any issue remains.

When no issues remain, **SAVE** stores the dashboard, so a saved dashboard always conforms to the schema.
The server also rejects an invalid dashboard submitted through the API.
Closing the editor with unsaved changes asks for confirmation before the changes are discarded.

## Copy a dashboard as a template

Every dashboard in Profinity uses this dashboard system, so the YAML of an existing dashboard is a useful starting point alongside the examples in the [Component reference](./Component_Reference/index.md) and the [Motor controller dashboard example](./Motor_Controller_Dashboard_Example.md).

1. Open the dashboard in the editor and select the **YAML** tab.
2. Select all the YAML and copy it.
3. Open the editor on the new dashboard, a component, or a profile, and select its **YAML** tab.
4. Paste the YAML.
5. Change the pasted YAML to suit the new dashboard.
6. Select **SAVE**.

The new dashboard appears with the copied content.
Copy a simple dashboard first and add complexity in small, tested changes, so that you can find a faulty change quickly.
For when the **YAML** tab is the better tool, refer to [YAML tab](./Visual_Editor.md#yaml-tab).
