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

A Profinity dashboard is a user interface that you build in the [Visual Editor](./Build_a_Dashboard.md) and that Profinity stores as a YAML file.
Its components show tag values, such as CAN signals, component properties and logged data, and its actions and toggles control the system.

### How do I create a dashboard?

Add a Custom Component to the profile, or open a component that already has a dashboard, then open the Visual Editor.
The steps are in [Build a dashboard in the Visual Editor](./Build_a_Dashboard.md).
A CAN database (DBC) file is only needed when the dashboard binds CAN signals.
For adding the component, refer to [Using a Custom Component](../../Components/Custom_Components/Using_a_Custom_Component.md#add-a-custom-component).

### Where do I put my dashboard YAML file?

The Visual Editor creates and saves the dashboard file for you, and its **YAML** tab shows the contents.
The file is stored in the `dashboards` directory of the profile, or in the folder of the component, as described in [Profiles](../../Administration/Profiles.md).

### Can I use existing dashboards as templates?

Yes.
Copy the YAML of any existing dashboard and modify the copy, as described in [Copy a dashboard as a template](./Build_a_Dashboard.md#copy-a-dashboard-as-a-template).

### Where do I put images, styles, and content files?

Store them in these folders of the profile:

- Images go in `images` and are referenced by filename only.
- Custom CSS goes in a file named `profile.css` in `styles`.
- HTML snippets go in `content`.

For more detail, refer to [Store dashboard files in a profile](./Store_Dashboard_Files.md).

## Component and layout questions

### How do I display a simple value?

Use a `readout` component, as in the [Readouts](./Component_Reference/Data/Readouts.md#example) reference example.

### How do I show multiple related values?

Use a `pill` component, which groups values beside an icon, as in the [starter template](./Where_Dashboards_Are_Used.md#starter-template) and the [Pill](./Component_Reference/Layout/Pill.md#example) reference example.

### How do I create a chart?

Use a `chart` component whose binding sets `seriesMode: timeSeries` with a `timeRangeStart` and `timeRangeStop` window.
For examples, refer to [Time series](./Data_Binding/index.md#time-series) and the [Charts](./Component_Reference/Data/Charts.md#example) reference example.

### How do I show status indicators?

Use a `lamps` component, and bind its `enabled` or `color` target to a tag, as in [Conditional styling](./Data_Binding/Conditional_Styling.md).

### How do I organise components into sections?

Use `row` and `group` to arrange components, `panels` for titled panels, and `accordion` for collapsible sections, as described in [Core elements](./Core_Elements.md).

### How do I arrange components horizontally?

Set `direction: horizontal` on a `row` or `group`, as shown in [Layout directions](./Core_Elements.md#layout-directions).

### How do I show or hide sections conditionally?

Bind the `visible` target of a readout, tab, accordion, or footer, or use an `accordion` for sections that users open themselves.
Refer to [Show or hide a component](./Data_Binding/Conditional_Styling.md#show-or-hide-a-component).

## Data binding questions

### How do I show a value on a dashboard?

Bind the component to a tag.
Find the tag in the Tag Explorer and put its path in the `source` of the binding.
The tag for a CAN signal has the form `DBC/MessageName/SignalName`, as described in [Data binding](./Data_Binding/index.md).

### How does a binding refer to the component that owns the dashboard?

A source without a leading `/`, such as `DBC/...` or `Properties/...`, is relative to the component that owns the dashboard.
The same dashboard therefore works for any component that has the same tags.
A source that starts with `/` names a tag in another component.
Refer to [Binding source paths](./Data_Binding/index.md#binding-source-paths).

### How do I access logged or historical data?

Set `store: logged` with a time range on the binding.
This needs data logging to be enabled, as described in [Logged data](./Data_Binding/index.md#logged-data).
Add `aggregationWindow` and `aggregationFunction` to aggregate the data into intervals.

### How do I convert data types or scale values?

Use `toType` to convert a type, and `gain` and `offset` to scale a value, as described under [Type conversion](./Data_Binding/Transform_and_Map_Values.md#type-conversion) and [Scaling and offset](./Data_Binding/Transform_and_Map_Values.md#scaling-and-offset).

## Troubleshooting questions

### Why does my dashboard not load?

The dashboard YAML does not match the schema.
Open it in the Visual Editor and read the entries under **Schema validation issues**.

### Why is my data not updating or my chart blank?

Check that the `source` matches the path of a tag in the Tag Explorer, that the tag has a current value, and that a chart binding sets `seriesMode: timeSeries`.
Refer to [Data not updating](./Troubleshooting.md#data-not-updating) and [Charts not rendering](./Troubleshooting.md#charts-not-rendering).

### Why are my images not loading?

Refer to [Image does not appear](./Troubleshooting.md#image-does-not-appear).

## Advanced questions

### How do I create an interactive image?

Use the `image` component with regions, icons, and data values, as in the [Image](./Component_Reference/Images_and_Models/Image.md#example) reference example.

### How do I use the `html` component?

Use the `html` component, as in the [HTML](./Component_Reference/Content/HTML.md#example) reference example, and note the elements that the HTML sanitiser removes, which are listed in [Store dashboard files in a profile](./Store_Dashboard_Files.md#content).

### How do I organise a large dashboard, improve performance or make it reusable?

Keep the main dashboard to key metrics, place detail in an `accordion` or in tabs, and group related components with `group` or `panel`.
Set `refreshInterval` (in milliseconds, minimum 1000) on charts that do not need live updates.
Use relative tag paths so that one dashboard fits every component with the same tags, and reference profile assets by filename only.

## Further help

The [Component reference](./Component_Reference/index.md) describes each component, the [Motor controller dashboard example](./Motor_Controller_Dashboard_Example.md) holds a working dashboard, and [Troubleshooting guide](./Troubleshooting.md) covers common problems.
For anything else, contact Prohelion through the [Prohelion website](https://www.prohelion.com/contact-us/).
