---
title: Frequently Asked Questions
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

A Profinity dashboard is a YAML configuration file that defines a dynamic, data-driven user interface. Dashboards connect to CAN bus data, system properties, and logged data to display real-time information and controls.

### How do I create a dashboard?

1. Create a Custom Component in Profinity
2. Define your DBC file with CAN messages and signals
3. Create a YAML dashboard file using the Dashboard Editor
4. The system validates your dashboard against the schema
5. Once valid, your dashboard is available for use

### Where do I put my dashboard YAML file?

Dashboard YAML files are created and edited through the Custom Component editor's Dashboard Editor. The system manages the file storage automatically.

### Can I use existing dashboards as templates?

Yes! You can view the source YAML of any existing dashboard by adding `?source` to the component URL. This allows you to copy and modify existing dashboards.

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

Use a `chart` component with data binding:

``` yaml
dashboard:
  items:
    - row:
        items:
          - chart:
              type: line
              bind:
                - target: value
                  source: "[TimeSeries].{COMPONENT_NAME}.Data.Value"
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

### How do I organize components into sections?

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

### How do I connect to CAN bus data?

Use data binding with DBC signal paths:

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
                        source: '{COMPONENT_NAME}.MessageName.SignalName'
```

### What is {COMPONENT_NAME}?

`{COMPONENT_NAME}` is a placeholder that gets replaced with the actual component name at runtime. This allows you to create reusable dashboard templates.

### How do I access logged/historical data?

Use the `store: "logged"` property with time range settings:

``` yaml
dashboard:
  items:
    - row:
        items:
          - chart:
              type: line
              bind:
                - target: value
                  source: '{COMPONENT_NAME}.Temperature.Value'
                  store: "logged"
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
                          label: "Status"
                          bind:
                            - target: enabled
                              source: '{COMPONENT_NAME}.Status.Online'
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
                        source: '{COMPONENT_NAME}.Voltage.Value'
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

Place stylesheets in the `/Profile/Styles` directory. Reference them in HTML:

``` yaml
dashboard:
  items:
    - row:
        items:
          - html:
              content: |
                <link rel="stylesheet" href="/Profile/Styles/custom.css" />
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
                        source: '{COMPONENT_NAME}.Status.ShowDetails'
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

### Why doesn't my dashboard load?

Check for schema validation errors:
- Verify all property names are correct
- Ensure required properties are present
- Check that component structures match the schema
- See [Troubleshooting](./Troubleshooting.md) for common errors

### Why isn't my data updating?

Check your data binding:
- Verify the `source` path is correct
- Ensure the component is connected and sending data
- Check that signal names match your DBC file
- Verify data logging is enabled for time series data

### Why is my chart blank?

Check:
- Data source is providing data
- Time range is appropriate for logged data
- Data format matches chart requirements
- Binding is correctly configured

### Why aren't my images loading?

Verify:
- Image file exists in `/Profile/Images` directory
- Filename matches exactly (case-sensitive)
- You're using filename only, not full path
- Image format is supported (SVG, PNG, JPG)

## Best Practices Questions

### How do I organize a large dashboard?

- Use `accordion` for collapsible detailed sections
- Use `tabs` to organize different views
- Group related components with `group` or `panel`
- Keep the main dashboard focused on key metrics

### How do I improve dashboard performance?

- Limit the number of components
- Use `refreshInterval` for charts
- Hide unused sections with accordions
- Simplify data bindings where possible

### How do I make my dashboard reusable?

- Use `{COMPONENT_NAME}` placeholder instead of hard-coding component names
- Create generic signal names in your DBC file
- Use relative paths for profile assets
- Document your dashboard structure

## Advanced Questions

### How do I create an interactive image?

Use the `image` component with regions, icons, and data values:

``` yaml
dashboard:
  items:
    - row:
        items:
          - image:
              value:
                image: "diagram.png"
                regions:
                  - id: "region-1"
                    coordinates: "xywh=10,10,50,50"
                    action: "navigate"
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
                        source: '{COMPONENT_NAME}.Data.Value'
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
                  source: '{COMPONENT_NAME}.Temperature.Value'
                  store: "logged"
                  timeRangeStart: "-1h"
                  aggregationWindow: "5m"
                  aggregationFunction: "mean"
```

## Still Have Questions?

- Review the [Component Reference](./Component_Reference/index.md) for detailed component information
- Check [Examples](./Examples.md) for working code samples
- See [Troubleshooting](./Troubleshooting.md) for common problems and solutions
- Contact Profinity support for additional assistance

