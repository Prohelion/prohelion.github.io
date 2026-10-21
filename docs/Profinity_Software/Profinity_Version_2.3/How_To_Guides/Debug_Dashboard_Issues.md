---
title: How to debug dashboard issues
description: "Find the cause of a dashboard that does not load, a readout with no data, a missing image, or a style that has no effect, and the usual fix for each."
type: reference
owner: Documentation
last_reviewed: 2026-10-14
---

# How to debug dashboard issues

A dashboard problem usually shows itself in one of four ways: the dashboard does not load, a readout shows no data, an image is missing, or a style has no effect.
This guide gives the usual cause and fix for each.
You need access to the [dashboard visual editor](../Customising_Profinity/Dashboards/Visual_Editor.md) and a dashboard that shows the problem.

## The dashboard does not load

A dashboard that fails to load, or that cannot be saved, has a validation error, because Profinity does not load an invalid dashboard.
A dashboard whose saved layout no longer matches the schema shows the message "This dashboard no longer matches the schema" with the buttons **Reset from Template** and **View Logs**.

!!! warning
    **Reset from Template** replaces the dashboard with the latest template and loses every customisation, so use it only when the dashboard is not needed.

Otherwise, open **Edit Dashboard** from the title bar to repair the file.

In the dashboard visual editor, read the **Schema validation issues** list, which names each problem, and correct each entry.
The usual causes are a missing colon, wrong indentation, an invalid property name, or an absent required property.
The editor blocks **SAVE** while any entry remains.
Save once the list is empty, then close the editor to see the result on the dashboard.

## A readout shows no data

A readout that stays empty has a binding that does not match a tag, a component that is not running, or no data arriving.
Start with the [binding](../Customising_Profinity/Dashboards/Data_Binding/index.md), because it is the most common cause.
A binding looks like this:

```yaml
bind:
  - target: value
    source: DBC/Message/Signal
```

Find the tag in the Tag Explorer and compare its path with the `source`, character for character.
In the Example Profile, a path is `Prohelion BMU/DBC/PackStateOfCharge/SOCPercent`.
Confirm that the component name in the path is correct, and that the tag has a current value and a good quality flag.
If the tag is correct, check the component's status indicator in the sidebar.
A green indicator means the component is active.
Any other colour means the component is not receiving CAN data, so the fault is the CAN bus connection, and [How to connect to CAN bus](./Connect_to_CAN_Bus.md) applies.

To separate a binding fault from a data fault, temporarily replace the binding with a static value:

```yaml
- readouts:
    items:
      - readout:
          label: "TEST"
          value: 42.5
```

If the readout shows 42.5, the readout displays correctly, so the fault is in the binding or the data.
Add the binding back one element at a time to find the element that fails.

## An image does not appear

An image that does not appear has one of these causes:

- It is missing from the profile's `images` folder.
- Its filename differs from the one in the dashboard.
- It is in a format Profinity does not support.

File names are case-sensitive, so `Logo.png` and `logo.png` are different files.
An image in an HTML component needs its full path:

```html
<img src="/Profile/Images/logo.png" />
```

[How to add images to your dashboard](./Add_Images_to_Dashboard.md) gives the location of the folder and lists the supported formats.

## A style has no effect

A style that does not apply is usually a stylesheet that is not loaded, or a class name that differs from the CSS.
The web interface loads only `profile.css` from the profile's `styles` folder.
Import any other stylesheet from `profile.css`, because Profinity removes a `link` element from an HTML component.
The class named in the dashboard must also match the one in the CSS exactly.
A `class` on a `readout` item has no effect, so put it on the `readouts` element.
Refer to [How to style your dashboard](./Style_Dashboard.md).

## When the cause is still unclear

The Profinity [logs](../Administration/Logs_Config.md) record dashboard errors, including data binding errors and missing component or tag errors.
Open **ADMIN**, then **Logs**, and read the entries from the time the dashboard was opened.

Comparing the dashboard with a working one also locates the difference quickly.
Open the working dashboard's source as [How to view dashboard source](./View_Dashboard_Source.md) describes.
Compare its structure and formatting with the faulty dashboard, and copy the working pattern.

For more, refer to the [Troubleshooting guide](../Customising_Profinity/Dashboards/Troubleshooting.md) and the [Frequently asked questions](../Customising_Profinity/Dashboards/FAQ.md).
The [Profinity dashboard development guide](../Customising_Profinity/Dashboards/index.md) has schema validation information.
