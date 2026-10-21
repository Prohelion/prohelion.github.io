---
title: Profinity dashboard development guide
description: "View a component's dashboard, and find the pages for building dashboards in the visual editor, binding them to tags, and working with the YAML format."
type: index
owner: Documentation
last_reviewed: 2026-10-15
---

# Profinity dashboard development guide

A Profinity dashboard is a user interface whose values come from Profinity tags.
You build and change dashboards in the [visual editor](./Visual_Editor.md), where you add widgets, arrange them and bind them to tags without writing YAML.
Every dashboard is stored as a YAML file, and the **YAML** tab of the editor gives direct access to it as a fallback.
This guide explains the YAML structure, how to configure components, and how to implement data bindings.

<figure markdown>
![The dashboard visual editor, with the dashboard tree on the left and the inspector on the right.](../../images/dashboard-visual-editor.png)
<figcaption>Dashboard visual editor</figcaption>
</figure>

- [Dashboard visual editor](./Visual_Editor.md) is the main way to build dashboards, with YAML as the fallback.
- [Core elements](./Core_Elements.md) explains the structure of a dashboard.
- [Data binding](./Data_Binding/index.md) describes how to bind tags to components.
- [Component reference](./Component_Reference/index.md) describes each component you can include.
- [Conditional styling](./Data_Binding/Conditional_Styling.md) shows how to hide and show elements or change colour based on data.
- [Store dashboard files in a profile](./Store_Dashboard_Files.md) explains where images, stylesheets, and content files go.
- [Motor controller dashboard example](./Motor_Controller_Dashboard_Example.md) analyses a complete dashboard for a WaveSculptor22 motor controller, and includes a download of that YAML.
- [Troubleshooting guide](./Troubleshooting.md) and the [Frequently asked questions](./FAQ.md) cover validation errors, binding problems and common questions.

Dashboards written in YAML before Profinity 2.3 keep working and open in the visual editor.
To build a first dashboard step by step, refer to [How to create a custom dashboard](../../How_To_Guides/Create_Custom_Dashboard.md).

## View data on a dashboard

Each configured component has a dashboard, opened by selecting the component in the sidebar, that shows the data for that component type.

<figure markdown>
![A WaveSculptor22 dashboard with a summary strip of bus voltage, power, temperatures and speed, two line charts for bus power and velocity, and status lights for controller limits and errors.](../../images/wavesculptor.png)
<figcaption>Example of a dashboard visualising data</figcaption>
</figure>

A dashboard stays empty until data arrives.
[How to connect to CAN bus](../../How_To_Guides/Connect_to_CAN_Bus.md) brings in live data from a CAN bus adapter, and [How to replay CAN bus logs](../../How_To_Guides/Replay_CAN_Logs.md) supplies recorded data when no hardware is connected.
The [Tag Explorer](../../Tags/index.md), opened from **TAG UTILITIES** in the side menu, shows the tags and their current values.

## Prerequisites

Editing a dashboard needs the **Modify dashboards** permission, which an administrator grants in a role as described in [Roles and Permissions](../../Administration/Users_and_Access/Roles_and_Permissions.md).
Every dashboard value is bound to a tag, so familiarity with the [Tag Explorer](../../Tags/index.md) helps.
A basic understanding of YAML syntax is only needed when you use the **YAML** tab or read the examples in this guide.
A Custom Component that publishes CAN tags also needs the CAN database (DBC) messages and signals of the device it reads.

## Where dashboards are used

A dashboard can be the page of a [Custom Component](../../Developing_with_Profinity/Custom_Components/index.md), the home page of a profile, or the content of a standalone [Dashboard Component](../../Components/Dashboard/Dashboard_Component.md).
The editor, data binding and component reference in this guide apply to all three.

### Custom Components {#custom-components}

A Custom Component dashboard is that component's page in the profile.
Profinity writes a starter dashboard named after the component when none is uploaded, and the visual editor replaces it.
A DBC file is optional, and is only required when the component needs to publish CAN signals as tags.
To add the component, refer to [How to create a Custom Component](../../How_To_Guides/Create_Custom_Component.md).
For the files around the dashboard, such as scripts, actions and maps, refer to [Custom Components](../../Developing_with_Profinity/Custom_Components/index.md).

### Profile dashboards {#profile-dashboards}

A home dashboard replaces the standard home page while its profile is active.
For the full description, refer to [Profile Dashboard](../../Administration/Profile_Dashboard.md).
To create one:

1. In the profile settings, turn on the **Custom Home Dashboard** option and save. Profinity creates a starter dashboard.
2. On the home page, select the **Edit Dashboard** icon to change the dashboard in the visual editor.
3. Optional: to use an existing dashboard, select its YAML file in the **Dashboard YAML file (Optional)** field instead.

### Dashboard Component {#dashboard-component}

The [Dashboard Component](../../Components/Dashboard/Dashboard_Component.md) is a built-in component that renders a YAML-only dashboard with no DBC file.
It binds to existing tags, such as tags published by other components.
The Tag Explorer shows the path of each tag to bind, and [Binding source paths](./Data_Binding/index.md#binding-source-paths) describes the path forms.

## The starter template

A component that has no dashboard of its own starts from the Hello World template, which is a vertical row holding a styled group with one pill.
The pill has an icon and two values, one labelled `CUSTOM DASHBOARD` and one that points to the Profinity documentation.
In the visual editor, **NEW FROM TEMPLATE** replaces the dashboard with this template after a confirmation prompt.
A component can supply its own template, which loads instead.
The YAML of the template is:

``` yaml
version: "2.3"
dashboard:
    items:
        - row:
            direction: vertical
            items:
            - group:
                class: statscontainer
                items:
                    - pill:
                        icon:
                            image: IbmWatsonKnowledgeStudio
                        items:
                        - pillgroup:
                            items:
                            - value:
                                label: CUSTOM DASHBOARD
                            - value:
                                label: For more information on how to configure dashboard files, see the Profinity documentation at https://docs.prohelion.com
```

In the visual editor the template appears as a tree of rows, groups, pills, and values.
To add a binding, select a value and use the **Binding** section of the inspector.
The **YAML** tab shows the same dashboard as text, which is the format the rest of this guide describes.
A source such as `DBC/YourMessage/YourSignal` in a binding is the tag of a CAN signal of the component that owns the dashboard, as described in [Binding source paths](./Data_Binding/index.md#binding-source-paths).
Replace the message and signal names with those from the DBC file, or copy the path of the tag from the Tag Explorer.

## Schema validation

The visual editor validates the dashboard against the dashboard schema as it is edited, and lists each problem under **Schema validation issues**.
The YAML tab provides syntax highlighting and auto-complete.
**SAVE** is refused while any issue remains, and the server also rejects an invalid dashboard that is submitted through the API, so a saved dashboard conforms to the schema.

## Viewing dashboard source

Every dashboard in Profinity is built with this dashboard system, so the YAML of an existing dashboard is a useful starting point alongside the examples in this guide.
Users with the **Modify dashboards** permission can open it with the pencil (**Edit Dashboard**) icon in the menu at the right of the dashboard title bar, as described in [How to view dashboard source](../../How_To_Guides/View_Dashboard_Source.md).
