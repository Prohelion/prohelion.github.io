---
title: Frequently Asked Questions
description: "Common questions and answers about creating and configuring Profinity dashboards."
---

# Frequently Asked Questions

Common questions and answers about creating Profinity dashboards.

## Table of Contents

- [General Questions](#general-questions)
- [Component Questions](#component-questions)
- [Data Binding Questions](#data-binding-questions)
- [Profile Assets Questions](#profile-assets-questions)
- [Layout Questions](#layout-questions)
- [Troubleshooting Questions](#troubleshooting-questions)
- [Best Practices Questions](#best-practices-questions)
- [Advanced Questions](#advanced-questions)
- [Still Have Questions?](#still-have-questions)

## General Questions

### What is a Profinity Dashboard?

A Profinity dashboard is a dynamic, data-driven user interface that you build in the [visual editor](./Visual_Editor.md) and that Profinity stores as a YAML configuration file. Dashboards connect to CAN bus data, system properties, and logged data to display real-time information and controls.

### How do I create a dashboard?

1. Create a Custom Component in Profinity, or open an existing component that already has a dashboard
2. Open the dashboard editor from the pencil (**Edit Dashboard**) icon on the dashboard title bar. It opens in **DESIGN** mode, the visual editor
3. Add and arrange widgets and bind tags, and the editor validates the dashboard as you work. Use the **YAML** tab if you prefer to edit the YAML directly
4. Save, and the dashboard updates on the component

A DBC file is optional and is only needed when the dashboard binds CAN signals. The steps to add the component are in [How to Create a Custom Component](../../How_To_Guides/Create_Custom_Component.md).

### Where do I put my dashboard YAML file?

You do not need to. The dashboard editor creates and saves the dashboard file for you, and the **YAML** tab shows its contents. The system manages the file storage automatically.

### Can I use existing dashboards as templates?

Yes. The source YAML of any existing dashboard can be viewed, by users with the `DashboardModify` permission, by selecting the pencil (**Edit Dashboard**) icon in the menu at the right of the dashboard title bar (see [How to View Dashboard Source](../../How_To_Guides/View_Dashboard_Source.md)), which allows the dashboard to be copied and modified.

## Component Questions

### How do I display a simple value?

Use a `readout` component:

``` yaml
dashboard:
  items:
    - row:
        items:
          - readouts:
              items:
                - readout:
                    label: "Temperature"
                    value: 25.5
                    unit: "°C"
                    precision: 1
```

### How do I show multiple related values?

Use a `pill` component for grouped values with an icon:

``` yaml
dashboard:
  items:
    - row:
        items:
          - pill:
              icon:
                image: "icon.svg"
              items:
                - pillgroup:
                    items:
                      - value:
                          label: "Value 1"
                          value: 10
                      - value:
                          label: "Value 2"
                          value: 20
```

### How do I create a chart?

Use a `chart` component with data binding. A chart plots recent history when the binding sets `seriesMode: timeSeries`:

``` yaml
dashboard:
  items:
    - row:
        items:
          - chart:
              type: line
              bind:
                - target: value
                  source: DBC/Data/Value
                  seriesMode: timeSeries
                  timeRangeStart: "-5m"
                  timeRangeStop: "0m"
```

### How do I show status indicators?

Use a `lamps` component:

``` yaml
dashboard:
  items:
    - row:
        items:
          - lamps:
              items:
                - lampgroup:
                    items:
                      - lamp:
                          color: green
                          label: "Online"
                          value: 1
                          enabled: true
```

### How do I organise components into sections?

Use `rows`, `panels` for grid layouts or `accordion` for collapsible sections:

``` yaml
dashboard:
  items:
    - row:
        items:
          - panels:
              items:
                - panel:
                    title: "System Status"
                    items:
                      - readouts:
                          items:
                            - readout:
                                label: "Status"
                                value: 0
```

## Data Binding Questions

### How do I show a value on a dashboard?

Bind the component to a tag. Find the tag in the Tag Explorer and put its path in the `source` of the binding. The tag for a CAN signal has the form `DBC/MessageName/SignalName`:

``` yaml
dashboard:
  items:
    - row:
        items:
          - readouts:
              items:
                - readout:
                    label: "Example"
                    bind:
                      - target: value
                        source: DBC/MessageName/SignalName
```

### How does a binding refer to the component that owns the dashboard?

A source that starts with `DBC/` or `Properties/` is relative to the component that owns the dashboard, so the same dashboard works for any component that has the same tags. A source that starts with `/` is absolute and names a tag in another component. Dashboards written for earlier versions with the `{COMPONENT_NAME}` placeholder still load, and Profinity converts them to the relative form (see [Binding Source Paths](./Data_Binding.md#binding-source-paths)).

### How do I access logged/historical data?

Use the `store: logged` property with time range settings:

``` yaml
dashboard:
  items:
    - row:
        items:
          - chart:
              type: line
              bind:
                - target: value
                  source: DBC/Temperature/Value
                  store: logged
                  timeRangeStart: "-10m"
                  timeRangeStop: "0m"
                  aggregationWindow: "1m"
                  aggregationFunction: "mean"
```

### How do I convert data types?

Use the `toType` property:

``` yaml
dashboard:
  items:
    - row:
        items:
          - lamps:
              items:
                - lampgroup:
                    items:
                      - lamp:
                          color: "green"
                          value: 1
                          label: "Status"
                          bind:
                            - target: enabled
                              source: DBC/Status/Online
                              toType: boolean
```

### How do I scale or transform values?

Use `gain` and `offset`:

``` yaml
dashboard:
  items:
    - row:
        items:
          - readouts:
              items:
                - readout:
                    label: "Voltage"
                    bind:
                      - target: value
                        source: DBC/Voltage/Value
                        gain: 0.001
                        offset: 0
```

## Profile Assets Questions

### Where do I put images for my dashboard?

Place images in the `/Profile/Images` directory. Reference them by filename only:

``` yaml
dashboard:
  items:
    - row:
        items:
          - icon:
              image: "my-icon.svg"
```

### How do I reference images in HTML?

Use the `/Profile/Images/` URL path:

``` yaml
dashboard:
  items:
    - row:
        items:
          - html:
              content: |
                <img src="/Profile/Images/diagram.svg" alt="Diagram" />
```

### Where do I put custom CSS styles?

Place the rules in a file named `profile.css` in the `/Profile/Styles` directory, which the web interface loads for every page when the file is present, and apply the rules with the `class` attribute. The HTML sanitiser removes a `link` element from the `content` of an HTML component, so a stylesheet cannot be linked from the HTML. The `profile.css` file can load further stylesheets from the same directory with the CSS `@import` rule:

``` css
/* /Profile/Styles/profile.css */
@import url("custom.css");

.info-box {
  border: 1px solid #0f62fe;
  padding: 1rem;
}
```

``` yaml
dashboard:
  items:
    - row:
        items:
          - html:
              class: "info-box"
              content: |
                <p>Styled by the rules in profile.css</p>
```

### What is the /Profile/Content directory for?

The `/Profile/Content` directory is for general content files like HTML templates, markdown files, or documentation snippets that you want to reference in your dashboards.

## Layout Questions

### How do I arrange components horizontally?

Use `direction: "horizontal"` on a `row` or `group`:

``` yaml
dashboard:
  items:
    - row:
        direction: horizontal
        items:
          - readouts:
              items:
                - readout:
                    label: "Temperature"
                    value: 25.5
          - chart:
              type: line
              value:
                labels: ["Jan", "Feb", "Mar"]
                datasets:
                  - label: "Data"
                    data: [10, 20, 30]
```

### How do I create a grid of panels?

Use the `panels` component:

``` yaml
dashboard:
  items:
    - row:
        items:
          - panels:
              items:
                - panel:
                    title: "Panel 1"
                    items:
                      - readouts:
                          items:
                            - readout:
                                label: "Value 1"
                                value: 10
                - panel:
                    title: "Panel 2"
                    items:
                      - readouts:
                          items:
                            - readout:
                                label: "Value 2"
                                value: 20
```

### How do I hide/show sections conditionally?

Use `accordion` for collapsible sections or bind the `visible` property:

``` yaml
dashboard:
  items:
    - row:
        items:
          - readouts:
              items:
                - readout:
                    label: "Details"
                    visible: false
                    bind:
                      - target: visible
                        source: DBC/Status/ShowDetails
                        toType: boolean
    - accordion:
        label: "Details"
        items:
          - row:
              items:
                - readouts:
                    items:
                      - readout:
                          label: "Detail"
                          value: 0
```

## Troubleshooting Questions

### Why does my dashboard not load?

Check for schema validation errors:

- Verify all property names are correct
- Ensure required properties are present
- Check that component structures match the schema
- See [Troubleshooting](./Troubleshooting.md) for common errors

### Why is my data not updating?

Check your data binding:

- Verify the `source` path is correct
- Ensure the component is connected and sending data
- Check that the tag exists in the Tag Explorer and has a current value
- For a `DBC/` tag, check that the signal name matches your DBC file
- Verify data logging is enabled when the binding uses `store: logged`
- Check that a chart binding sets `seriesMode: timeSeries`, because a chart without it shows only the latest value

### Why is my chart blank?

Check that:

- The tag has a current value in the Tag Explorer
- The time range is appropriate for logged data
- The data format matches chart requirements
- The binding is correctly configured

### Why are my images not loading?

Verify that:

- The image file exists in the `/Profile/Images` directory
- The filename matches exactly (case-sensitive)
- The filename only is used, not the full path
- The image format is supported (SVG, PNG, JPG)

## Best Practices Questions

### How do I organise a large dashboard?

- Use `accordion` for collapsible detailed sections
- Use `tabs` to organise different views
- Group related components with `group` or `panel`
- Keep the main dashboard focused on key metrics

### How do I improve dashboard performance?

- Limit the number of components
- Set `refreshInterval` (in milliseconds, minimum 1000) on charts that do not need live updates
- Hide unused sections with accordions
- Simplify data bindings where possible

### How do I make my dashboard reusable?

- Use relative tag paths such as `DBC/Message/Signal` instead of hard-coding component names
- Use the same tag names across components, for example by using generic signal names in your DBC file or a derived tag, so one dashboard fits each of them
- Reference profile assets by filename only, as described in [Profile Directories](./Profile_Directories.md)
- Document your dashboard structure

## Advanced Questions

### How do I create an interactive image?

Use the `image` component with regions, icons, and data values. Positions and sizes are percentages of the image, and each `action` is an object with an `invoke` value of `Navigate`, `Component`, `System`, or `Endpoint`:

``` yaml
dashboard:
  items:
    - row:
        items:
          - image:
              image: "diagram.png"
              regions:
                  - id: "region-1"
                    x: 10
                    y: 10
                    width: 50
                    height: 50
                    action:
                      invoke: Navigate
                      target: "/component?componentId=Component1"
              icons:
                  - id: "icon-1"
                    x: 50
                    y: 30
                    icon: "icon.svg"
              dataValues:
                  - id: "value-1"
                    x: 20
                    y: 20
                    bind:
                      - target: value
                        source: DBC/Data/Value
```

### How do I use custom HTML?

Use the `html` component:

``` yaml
dashboard:
  items:
    - row:
        items:
          - html:
              content: |
                <div class="custom-panel">
                  <h2>Custom Content</h2>
                  <p>Your HTML here</p>
                </div>
```

### How do I aggregate logged data?

Use `aggregationFunction` and `aggregationWindow`:

``` yaml
dashboard:
  items:
    - row:
        items:
          - chart:
              type: line
              bind:
                - target: value
                  source: DBC/Temperature/Value
                  store: logged
                  timeRangeStart: "-1h"
                  aggregationWindow: "5m"
                  aggregationFunction: "mean"
```

## Still Have Questions?

- Review the [Component Reference](./Component_Reference/index.md) for detailed component information
- Check [Examples](./Examples.md) and the annotated [Full Example](./Full_Example.md) for working code samples
- See [Troubleshooting](./Troubleshooting.md) for common problems and solutions
- Contact Prohelion through the [Prohelion website](https://www.prohelion.com/contact-us/) for additional assistance

