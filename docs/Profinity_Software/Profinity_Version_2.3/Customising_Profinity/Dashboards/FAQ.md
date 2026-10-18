---
title: Frequently asked questions
description: "Get short answers to common questions about building Profinity dashboards, binding tags, using profile assets and fixing problems, with links to the full pages."
type: reference
owner: Documentation
last_reviewed: 2026-10-14
---

# Frequently asked questions

This page answers common questions about creating Profinity dashboards in a sentence or two and links to the page that covers each topic in full.

## General questions

### What is a Profinity dashboard?

A Profinity dashboard is a user interface that you build in the [visual editor](./Visual_Editor.md) and that Profinity stores as a YAML file.
Its components show tag values, such as CAN signals, component properties and logged data, and its actions and toggles control the system.

### How do I create a dashboard?

Add a Custom Component to the profile, or open a component that already has a dashboard, and select the pencil (**Edit Dashboard**) icon in the menu at the right of the dashboard title bar, which needs the **Modify dashboards** permission.
The editor opens in **DESIGN** mode, where you add and arrange widgets and bind tags, and **SAVE** updates the dashboard on the component.
A DBC file is only needed when the dashboard binds CAN signals.
[How to Create a Custom Component](../../How_To_Guides/Create_Custom_Component.md) describes adding the component, and [Visual Editor](./Visual_Editor.md) describes the editor.

### Where do I put my dashboard YAML file?

The visual editor creates and saves the dashboard file for you, and its **YAML** tab shows the contents.
The file is stored in the `dashboards` directory of the profile, or in the folder of the component, as listed in [Store dashboard files in a profile](./Store_Dashboard_Files.md#other-profile-directories).

### Can I use existing dashboards as templates?

Yes.
Select **Edit Dashboard** on any existing dashboard to see its YAML, which needs the **Modify dashboards** permission, and then copy it and modify the copy, as described in [How to View Dashboard Source](../../How_To_Guides/View_Dashboard_Source.md).

### Where do I put images, styles, and content files?

Images go in the `/Profile/Images` directory and are referenced by filename only, custom CSS goes in a file named `profile.css` in `/Profile/Styles`, which the web interface loads when the file is present, and HTML snippets go in `/Profile/Content`.
For more detail, refer to [Store dashboard files in a profile](./Store_Dashboard_Files.md).

## Component and layout questions

### How do I display a simple value?

Use a `readout` component, as in the first of the [Examples](./Examples/index.md#example-1-simple-readout-with-formatting).

### How do I show multiple related values?

Use a `pill` component, which groups values beside an icon, as in the [Hello World template](./Examples/index.md#example-0-hello-world-template).

### How do I create a chart?

Use a `chart` component whose binding sets `seriesMode: timeSeries` with a `timeRangeStart` and `timeRangeStop` window, as in [Time Series](./Data_Binding/index.md#time-series) and the [chart example](./Examples/index.md#example-4-add-charts).

### How do I show status indicators?

Use a `lamps` component, and bind its `enabled` or `color` target to a tag, as in [Conditional Styling](./Data_Binding/Conditional_Styling.md).

### How do I organise components into sections?

Use `row` and `group` to arrange components, `panels` for titled panels, and `accordion` for collapsible sections, as described in [Core Elements](./Core_Elements.md).

### How do I arrange components horizontally?

Set `direction: horizontal` on a `row` or `group`, as shown in [Layout Directions](./Core_Elements.md#layout-directions).

### How do I show or hide sections conditionally?

Bind the `visible` target of a readout, tab, accordion, or footer, or use an `accordion` for sections that users open themselves.
Refer to [Show or Hide a Component](./Data_Binding/Conditional_Styling.md#show-or-hide-a-component).

## Data binding questions

### How do I show a value on a dashboard?

Bind the component to a tag.
Find the tag in the Tag Explorer and put its path in the `source` of the binding, where the tag for a CAN signal has the form `DBC/MessageName/SignalName`, as described in [Data Binding](./Data_Binding/index.md).

### How does a binding refer to the component that owns the dashboard?

A source without a leading `/`, such as `DBC/...` or `Properties/...`, is relative to the component that owns the dashboard, so the same dashboard works for any component that has the same tags, and a source that starts with `/` names a tag in another component.
Refer to [Binding Source Paths](./Data_Binding/index.md#binding-source-paths).

### How do I access logged or historical data?

Set `store: logged` with a time range on the binding, which needs data logging to be enabled, as described in [Logged Data](./Data_Binding/index.md#logged-data).
Add `aggregationWindow` and `aggregationFunction` to aggregate the data into intervals.

### How do I convert data types or scale values?

Use `toType` to convert a type, and `gain` and `offset` to scale a value, as described under [Type Conversion](./Data_Binding/Transform_and_Map_Values.md#type-conversion) and [Scaling and Offset](./Data_Binding/Transform_and_Map_Values.md#scaling-and-offset).

## Troubleshooting questions

### Why does my dashboard not load?

The dashboard YAML does not match the schema.
Open it in the visual editor, read the entries under **Schema validation issues**, and refer to [Dashboard Schema Validation Errors](./Schema_Validation_Errors.md) for each error message and its fix.

### Why is my data not updating or my chart blank?

Check that the `source` matches the path of a tag in the Tag Explorer, that the tag has a current value, and that a chart binding sets `seriesMode: timeSeries`.
Refer to [Data Not Updating](./Troubleshooting.md#data-not-updating) and [Charts Not Rendering](./Troubleshooting.md#charts-not-rendering).

### Why are my images not loading?

Refer to [Image Does Not Appear](./Troubleshooting.md#image-does-not-appear).

## Advanced questions

### How do I create an interactive image?

Use the `image` component with regions, icons, and data values, as in the [image example](./Examples/Component_Examples.md#image-component-example) and the [Image](./Component_Reference/Images_and_Models/Image.md) reference.

### How do I use the `html` component?

Use the `html` component, as in the [HTML example](./Examples/Component_Examples.md#html-component-example), and note the elements that the HTML sanitiser removes, which are listed in [Store dashboard files in a profile](./Store_Dashboard_Files.md#profilecontent).

### How do I organise a large dashboard, improve performance or make it reusable?

Keep the main dashboard to key metrics, place detail in an `accordion` or in tabs, and group related components with `group` or `panel`.
Set `refreshInterval` (in milliseconds, minimum 1000) on charts that do not need live updates.
Use relative tag paths so that one dashboard fits every component with the same tags, and reference profile assets by filename only.

## Further help

The [Component Reference](./Component_Reference/index.md) describes each component, [Examples](./Examples/index.md) and [Full Example](./Examples/Full_Example.md) hold working dashboards, and [Troubleshooting](./Troubleshooting.md) covers common problems.
For anything else, contact Prohelion through the [Prohelion website](https://www.prohelion.com/contact-us/).
