---
title: Frequently Asked Questions
description: "Short answers to common questions about creating and configuring Profinity dashboards, with links to the pages that cover each topic."
---

# Frequently Asked Questions

This page answers common questions about creating Profinity dashboards in a sentence or two and links to the page that covers each topic in full.

## General Questions

### What Is a Profinity Dashboard?

A Profinity dashboard is a user interface that you build in the [visual editor](./Visual_Editor.md) and that Profinity stores as a YAML file. Its components show tag values, such as CAN signals, component properties and logged data, and its actions and toggles control the system.

### How Do I Create a Dashboard?

Add a Custom Component to the profile, or open a component that already has a dashboard, and select the pencil (**Edit Dashboard**) icon in the menu at the right of the dashboard title bar, which needs the **Modify dashboards** permission. The editor opens in **DESIGN** mode, where you add and arrange widgets and bind tags, and **SAVE** updates the dashboard on the component. A DBC file is only needed when the dashboard binds CAN signals. [How to Create a Custom Component](../../How_To_Guides/Create_Custom_Component.md) describes adding the component, and [Visual Editor](./Visual_Editor.md) describes the editor.

### Where Do I Put My Dashboard YAML File?

The visual editor creates and saves the dashboard file for you, and its **YAML** tab shows the contents. The file is stored in the `dashboards` directory of the profile, or in the folder of the component, as listed in [Profile Directories](./Profile_Directories.md#other-profile-directories).

### Can I Use Existing Dashboards as Templates?

Yes. Select **Edit Dashboard** on any existing dashboard to see its YAML, which needs the **Modify dashboards** permission, and then copy it and modify the copy, as described in [How to View Dashboard Source](../../How_To_Guides/View_Dashboard_Source.md).

## Component Questions

### How Do I Display a Simple Value?

Use a `readout` component, as in the first of the [Examples](./Examples.md#example-1-simple-readout-with-formatting).

### How Do I Show Multiple Related Values?

Use a `pill` component, which groups values beside an icon, as in the [Hello World template](./Examples.md#example-0-hello-world-template).

### How Do I Create a Chart?

Use a `chart` component whose binding sets `seriesMode: timeSeries` with a `timeRangeStart` and `timeRangeStop` window, as in [Time Series](./Data_Binding.md#time-series) and the [chart example](./Examples.md#example-4-add-charts).

### How Do I Show Status Indicators?

Use a `lamps` component, and bind its `enabled` or `color` target to a tag, as in [Conditional Styling](./Conditional_Styling.md).

### How Do I Organise Components Into Sections?

Use `row` and `group` to arrange components, `panels` for titled panels, and `accordion` for collapsible sections, as described in [Core Elements](./Core_Elements.md).

## Data Binding Questions

### How Do I Show a Value on a Dashboard?

Bind the component to a tag. Find the tag in the Tag Explorer and put its path in the `source` of the binding, where the tag for a CAN signal has the form `DBC/MessageName/SignalName`, as described in [Data Binding](./Data_Binding.md).

### How Does a Binding Refer to the Component That Owns the Dashboard?

A source without a leading `/`, such as `DBC/...` or `Properties/...`, is relative to the component that owns the dashboard, so the same dashboard works for any component that has the same tags, and a source that starts with `/` names a tag in another component. See [Binding Source Paths](./Data_Binding.md#binding-source-paths).

### How Do I Access Logged or Historical Data?

Set `store: logged` with a time range on the binding, which needs data logging to be enabled, as described in [Logged Data](./Data_Binding.md#logged-data). Add `aggregationWindow` and `aggregationFunction` to aggregate the data into intervals.

### How Do I Convert Data Types or Scale Values?

Use `toType` to convert a type, and `gain` and `offset` to scale a value, as described under [Type Conversion](./Data_Binding.md#type-conversion) and [Scaling and Offset](./Data_Binding.md#scaling-and-offset).

## Profile Assets Questions

### Where Do I Put Images, Styles and Content Files?

Images go in the `/Profile/Images` directory and are referenced by filename only, custom CSS goes in a file named `profile.css` in `/Profile/Styles`, which the web interface loads when the file is present, and HTML snippets go in `/Profile/Content`. See [Profile Directories](./Profile_Directories.md).

## Layout Questions

### How Do I Arrange Components Horizontally?

Set `direction: horizontal` on a `row` or `group`, as shown in [Layout Directions](./Core_Elements.md#layout-directions).

### How Do I Show or Hide Sections Conditionally?

Bind the `visible` target of a readout, tab, accordion or footer, or use an `accordion` for sections that users open themselves. See [Show or Hide a Component](./Conditional_Styling.md#show-or-hide-a-component).

## Troubleshooting Questions

### Why Does My Dashboard Not Load?

The dashboard YAML does not match the schema. Open it in the visual editor, read the entries under **Schema validation issues**, and see [Troubleshooting](./Troubleshooting.md) for each error message and its fix.

### Why Is My Data Not Updating or My Chart Blank?

Check that the `source` matches the path of a tag in the Tag Explorer, that the tag has a current value, and that a chart binding sets `seriesMode: timeSeries`. See [Data Not Updating](./Troubleshooting.md#data-not-updating) and [Charts Not Rendering](./Troubleshooting.md#charts-not-rendering).

### Why Are My Images Not Loading?

See [Image Does Not Appear](./Troubleshooting.md#image-does-not-appear).

## Advanced Questions

### How Do I Create an Interactive Image?

Use the `image` component with regions, icons and data values, as in the [image example](./Examples.md#image-component-example) and the [Image](./Component_Reference/Interactive/Image.md) reference.

### How Do I Use Custom HTML?

Use the `html` component, as in the [HTML example](./Examples.md#html-component-example), and note the elements that the HTML sanitiser removes, which are listed in [Profile Directories](./Profile_Directories.md#profilecontent).

### How Do I Organise a Large Dashboard, Improve Performance or Make It Reusable?

Keep the main dashboard to key metrics, place detail in an `accordion` or in tabs, and group related components with `group` or `panel`. Set `refreshInterval` (in milliseconds, minimum 1000) on charts that do not need live updates. Use relative tag paths so that one dashboard fits every component with the same tags, and reference profile assets by filename only.

## Further Help

The [Component Reference](./Component_Reference/index.md) describes each component, [Examples](./Examples.md) and [Full Example](./Full_Example.md) hold working dashboards, and [Troubleshooting](./Troubleshooting.md) covers common problems. For anything else, contact Prohelion through the [Prohelion website](https://www.prohelion.com/contact-us/).
