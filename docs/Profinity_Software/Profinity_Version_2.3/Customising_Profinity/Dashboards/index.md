---
title: Profinity dashboard development guide
description: "Find the pages for building dashboards in the Visual Editor, binding them to tags, configuring components and working with the YAML format."
type: index
owner: Documentation
last_reviewed: 2026-10-28
---

# Profinity dashboard development guide

A Profinity dashboard is a user interface whose values come from Profinity tags.
You build and change dashboards in the Visual Editor without writing YAML, and every dashboard is stored as a YAML file that the **YAML** tab of the editor opens as a fallback.
This guide is for people who build dashboards for components, profile home pages and the Dashboard Component.

<figure markdown>
![The dashboard Visual Editor, with the dashboard tree on the left and the inspector on the right.](../../images/dashboard-visual-editor.png)
<figcaption>Dashboard Visual Editor</figcaption>
</figure>

- [Where dashboards are used](./Where_Dashboards_Are_Used.md) shows where a dashboard appears and holds the starter template.
- [Build a dashboard in the Visual Editor](./Build_a_Dashboard.md) walks through opening the editor, adding elements, binding tags, saving, and copying a dashboard as a template.
- [Visual Editor reference](./Visual_Editor.md) describes the dashboard tree, inspector, footer buttons and YAML tab.
- [Core elements](./Core_Elements.md) explains the structure of a dashboard.
- [Data binding](./Data_Binding/index.md) describes how to bind tags to components.
- [Component reference](./Component_Reference/index.md) describes each component you can include.
- [Conditional styling](./Data_Binding/Conditional_Styling.md) shows how to hide and show elements or change colour based on data.
- [Store dashboard files in a profile](./Store_Dashboard_Files.md) explains where images, stylesheets, and content files go.
- [Motor controller dashboard example](./Motor_Controller_Dashboard_Example.md) analyses a complete dashboard for a WaveSculptor22 motor controller, and includes a download of that YAML.
- [Troubleshooting guide](./Troubleshooting.md) and the [Frequently asked questions](./FAQ.md) cover validation errors, binding problems and common questions.

To build a first dashboard step by step, refer to [How to create a custom dashboard](../../How_To_Guides/Create_Custom_Dashboard.md).
