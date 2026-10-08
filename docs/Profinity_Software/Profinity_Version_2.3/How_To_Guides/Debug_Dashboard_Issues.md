---
title: How to Debug Dashboard Issues
description: "Find and fix common dashboard problems: a dashboard that does not load, readouts that show no data, images that do not appear, and styles that are not applied."
---

# How to Debug Dashboard Issues

A dashboard problem usually shows itself in one of four ways: the dashboard does not load, a readout shows no data, an image is missing, or a style has no effect. Each is covered below with its usual cause and fix. This guide needs access to the [dashboard editor](../Customising_Profinity/Dashboards/Visual_Editor.md) and a dashboard that shows the problem.

## The Dashboard Does Not Load

A dashboard that fails to load, or that cannot be saved, has a validation error, because Profinity does not load an invalid dashboard. A dashboard whose saved layout no longer matches the schema shows the message "This dashboard no longer matches the schema" with the buttons **Reset from Template** and **View Logs**. **Reset from Template** replaces the dashboard with the latest template and loses every customisation, so use it only when the dashboard is not needed, and otherwise open **Edit Dashboard** from the title bar to repair the file. In the dashboard editor, read the **Schema validation issues** list, which names each problem, and correct each entry: the usual causes are a missing colon, wrong indentation, an invalid property name, or a required property that is absent. **SAVE** is blocked while any entry remains, so save once the list is empty, then close the editor, because the dashboard behind it shows the result.

## A Readout Shows No Data

A readout that stays empty has a binding that does not match a tag, a component that is not running, or no data arriving. Start with the [binding](../Customising_Profinity/Dashboards/Data_Binding.md), because it is the most common cause:

```yaml
bind:
  - target: value
    source: DBC/Message/Signal
```

Find the tag in the Tag Explorer and compare its path with the `source` character for character, for example `Prohelion BMU/DBC/PackStateOfCharge/SOCPercent` in the Example Profile, and confirm that the component name in the path is correct and that the tag has a current value and a good quality flag. If the tag is correct, check the component's status indicator in the sidebar: a green indicator means the component is active, and anything else means it is not receiving CAN data, in which case the fault is the CAN bus connection and [How to Connect to CAN Bus](./Connect_to_CAN_Bus.md) applies.

To separate a binding fault from a data fault, replace the binding temporarily with a static value:

```yaml
- readouts:
    items:
      - readout:
          label: "TEST"
          value: 42.5
```

A readout that shows 42.5 displays correctly, so the fault is in the binding or the data, and adding the binding back one element at a time shows which element fails.

## An Image Does Not Appear

An image that does not appear is missing from the profile's `images` folder, has a filename that differs from the one in the dashboard, or is in a format Profinity does not support. File names are case-sensitive, so `Logo.png` and `logo.png` are different files, and an image in an HTML component needs its full path:

```html
<img src="/Profile/Images/logo.png" />
```

[How to Add Images to Your Dashboard](./Add_Images_to_Dashboard.md) gives the location of the folder and lists the supported formats.

## A Style Has No Effect

A style that does not apply is usually a stylesheet that is not loaded, or a class name that differs from the CSS. The web interface loads only `profile.css` from the profile's `styles` folder, and any other stylesheet must be imported from it, because Profinity removes a `link` element from an HTML component. The class named in the dashboard must also match the one in the CSS exactly, and a `class` on a `readout` item has no effect, so it goes on the `readouts` element. See [How to Style Your Dashboard](./Style_Dashboard.md).

## When the Cause Is Still Unclear

The Profinity [logs](../Getting_Started/Profinity_Log.md) record dashboard errors, including data binding errors and missing component or tag errors, so open **ADMIN**, then **Logs**, and read the entries from the time the dashboard was opened. Comparing the dashboard with a working one also locates the difference quickly: open the working dashboard's source as described in [How to View Dashboard Source](./View_Dashboard_Source.md), compare its structure and formatting with the faulty one, and copy the working pattern.

## Related Documentation

- [Troubleshooting Guide](../Customising_Profinity/Dashboards/Troubleshooting.md) - the full dashboard troubleshooting reference
- [Dashboard FAQ](../Customising_Profinity/Dashboards/FAQ.md) - frequently asked questions about dashboards
- [Dashboard Development Guide](../Customising_Profinity/Dashboards/index.md) - schema validation information
