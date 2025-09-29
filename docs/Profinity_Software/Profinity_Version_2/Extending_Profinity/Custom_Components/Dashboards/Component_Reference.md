---
title: Component Reference
---

# Component Reference

This reference provides detailed information about all available dashboard components in Profinity. Components are organized into three main categories: **Layout Components**, **Data Components**, and **Interactive Components**.

## How to Use This Reference

- **Layout Components** - Containers and structural elements for organizing your dashboard
- **Data Components** - Display and visualize data from your CAN bus and system properties
- **Interactive Components** - User interface elements for interaction and control

Each component entry includes:
- **Description** - What the component does and when to use it
- **Parameters** - All available configuration options
- **Example** - Working YAML code showing the component in action

## Component Categories

### Layout Components
Essential building blocks for dashboard structure:
- [Row](#row) - Basic layout container
- [Group](#group) - Organizes related components
- [Panels](#panels) - Grid layout system
- [Panel](#panel) - Individual panel within a grid
- [Accordion](#accordion) - Collapsible content sections
- [Titlebar](#titlebar) - Dashboard header
- [Footer](#footer) - Dashboard footer

### Data Components
Display and visualize information:
- [Lamps](#lamps) - Status indicators
- [Readouts](#readouts) - Numerical and text displays
- [Charts](#charts) - Data visualization
- [Tables](#tables) - Tabular data display
- [State](#state) - State machine visualization

### Interactive Components
User interface and control elements:
- [Tabs](#tabs) - Tabbed interface
- [Actions](#actions) - Buttons and controls
- [Toggles](#toggles) - Switch components

## Layout Components

## Row

A row is a layout container that can hold multiple components. Rows are the fundamental building blocks of dashboard layout, allowing you to organize components horizontally or vertically.

**Best for:** Creating logical sections, organizing related components, controlling layout direction

**Parameters:**

- `id`  (string, optional): Unique identifier for the row
- `class`  (string, optional): CSS class for styling
- `direction`  (string, optional): Layout direction - &quot;vertical&quot; or &quot;horizontal&quot; (default: &quot;vertical&quot;)
- `items`  (array, required): Array of components to display in the row

**Example:**

``` yaml
row:
  id: "status-row"
  class: "status-container"
  direction: "horizontal"
  items:
    - lamps:
        groups:
          - items:
              - color: "green"
                label: "Online"
                value: 1
                enabled: true
    - readouts:
        items:
          - label: "Temperature"
            value: 25.5
            unit: "°C"

```

## Group

A group is a container that organizes related components. Groups help create visual and logical groupings within rows, making dashboards more organized and easier to understand.

**Best for:** Grouping related data displays, creating visual sections, organizing components with similar functions

**Parameters:**

- `class`  (string, optional): CSS class for styling
- `items`  (array, required): Array of components within the group

``` yaml
group:
  class: "sensor-panel"
  items:
    - readouts:
        items:
          - label: "Pressure"
            value: 1013.25
            unit: "hPa"
            precision: 2
    - chart:
        type: "line"
        value:
          labels: ["00:00", "06:00", "12:00", "18:00"]
          datasets:
            - label: "Pressure Trend"
              data: [1010, 1012, 1015, 1013]

```

## Panels

Panels create a grid layout of individual panel components. This creates a flexible grid system where each panel can contain different types of content and data visualizations.

**Best for:** Creating dashboard sections with multiple data views, organizing complex information into digestible panels

**Parameters:**

- `items`  (array, required): Array of panel objects

``` yaml
panels:
  items:
    - title: "System Status"
      items:
        - lamps:
            groups:
              - items:
                  - color: "green"
                    label: "CPU"
                    value: 1
                    enabled: true
    - title: "Performance"
      items:
        - chart:
            type: "bar"
            value:
              labels: ["CPU", "Memory", "Disk"]
              datasets:
                - label: "Usage %"
                  data: [45, 67, 23]

```

## Pill

Status pill component with grouped readouts and icon. Pills provide a compact way to display multiple related values with a central icon, perfect for showing component status and key metrics.

**Best for:** Component status displays, key metric summaries, compact data presentation

**Parameters:**

- `icon`  (object, required): Icon configuration
- `image`  (string, required): Icon image path
- `recess`  (boolean, optional): Whether icon is recessed
- `value`  (number, required): Icon value
- `bind`  (array, optional): Data binding for icon
- `groups`  (array, required): Array of pill groups

**Example:**

``` yaml
pill:
  icon:
    image: nav_motorcontrollers_active.svg
    recess: false
    value: 0
  groups:
    - items:
        - label: BUS VOLTAGE
          openHyperLinkInNewWindow: false
          enabled: true
          precision: 1
          bind:
            - target: value
              source: '{COMPONENT_NAME}.BusMeasurement.BusVoltage'
        - label: BUS CURRENT
          openHyperLinkInNewWindow: false
          enabled: true
          precision: 1
          bind:
            - target: value
              source: '{COMPONENT_NAME}.BusMeasurement.BusCurrent'
    - items:
        - label: DSP TEMP
          openHyperLinkInNewWindow: false
          enabled: true
          precision: 1
          bind:
            - target: value
              source: '{COMPONENT_NAME}.DspBoardTempMeasurement.DspBoardTemp'

```

## Panel

Individual panel within a panels grid. Each panel can contain various components and provides a titled container for organizing related content.

**Best for:** Individual data sections, titled content areas, organized information display

**Parameters:**

- `title`  (string, required): Panel title
- `menu`  (object, optional): Menu configuration for the panel
- `items`  (array, required): Components within the panel (chart, lamps, state, group, readouts, table)

**Example:**

``` yaml
panel:
  title: "Temperature Sensors"
  items:
    - readouts:
        items:
          - label: "Sensor 1"
            value: 22.5
            unit: "°C"
            precision: 1
          - label: "Sensor 2"
            value: 24.2
            unit: "°C"
            precision: 1
```

## Accordion

Collapsible sections for organizing content. Accordions help keep dashboards clean by allowing users to expand and collapse sections of information as needed.

**Best for:** Detailed information that's not always needed, settings panels, secondary data, keeping dashboards uncluttered

**Parameters:**

- `label`  (string, required): Section label
- `items`  (array, required): Array of row objects within the accordion

**Example:**

``` yaml
accordion:
  label: "System Details"
  items:
    - row:
        items:
          - readouts:
              items:
                - label: "Uptime"
                  value: "72:15:30"
                - label: "Version"
                  value: "2.1.0"
```

## Titlebar

Header section with status lamps and navigation. The titlebar provides dashboard identification, status information, and navigation controls.

**Best for:** Dashboard identification, status indicators, navigation menus, component-specific actions

**Parameters:**

- `lamp`  (object, optional): Status lamp configuration
- `menu`  (object, optional): Navigation menu

**Example:**

``` yaml
titlebar:
  lamp:
    color: grey
    value: 1
    label: Prohelion BMU
    enabled: true
    bind:
      - target: color
        source: Prohelion BMU.[Property].StatusColourText
        toType: string
  menu:
    items:
      - menuitem:
          image: nav_custom_active.svg
          imageAlt: Messages and Signals
          navigate: dbc?view=messages&componentIdFilter=Prohelion+BMU
      - modal:
          id: default
          image: dash_config.svg
          imageAlt: Change Settings
          settings:
            create: false
            update: true
            delete: true
            send: false
            reload: true
            showTabs: true
            refreshOnClose: false
            navigateOnClose: /
            urlSettings: /api/v2/ActiveProfile/Component/Prohelion%20BMU/settings
            urlDelete: /api/v2/ActiveProfile/Component/Prohelion%20BMU
```

## Footer

Bottom section with navigation menus. The footer provides additional navigation options and system information.

**Best for:** Additional navigation, system information, help links, secondary actions

**Parameters:**

- `menu`  (object, optional): Navigation menu

**Example:**

``` yaml
footer:
  menu:
    items:
      - menuitem:
          label: "About"
          navigate: "/about"
      - menuitem:
          label: "Contact"
          navigate: "/contact"

```

# Data Components

Data components display and visualize information from your CAN bus and system properties.

## Lamps

Grid of status indicators. Lamps provide visual status information using colours and states to quickly communicate system status.

**Best for:** Status indicators, error/warning displays, system state visualization, quick status overview

**Parameters:**

- `groups`  (array, required): Array of lamp groups

**Lamp Item Parameters:**

- `color`  (string, required): Lamp color (&quot;green&quot;, &quot;red&quot;, &quot;amber&quot;, &quot;disabled&quot;, etc.)
- `label`  (string, required): Display label
- `value`  (number, required): Lamp value (typically 0 or 1)
- `enabled`  (boolean, required): Whether the lamp is enabled
- `bind`  (array, optional): Data binding configuration

**Example:**

``` yaml
lamps:
  groups:
    - items:
        - color: "green"
          label: "Online"
          value: 1
          enabled: true
          bind:
            - target: enabled
              source: '{COMPONENT_NAME}.Status.Online'
              toType: boolean
        - color: "red"
          label: "Error"
          value: 1
          enabled: false
          bind:
            - target: enabled
              source: '{COMPONENT_NAME}.Status.Error'
              toType: boolean
        - color: "amber"
          label: "Warning"
          value: 1
          enabled: false
          bind:
            - target: enabled
              source: '{COMPONENT_NAME}.Status.Warning'
              toType: boolean
```
            
## Readouts

Display of numerical or text values. Readouts are the primary way to show sensor data, measurements, and other numerical information from your system.

**Best for:** Sensor readings, measurements, numerical data display, text information, real-time values

**Parameters:**

- `items`  (array, required): Array of readout items

**Readout Item Parameters:**

- `label`  (string, required): Display label
- `value`  (number/string, optional): Static value
- `unit`  (string, optional): Unit of measurement
- `precision`  (number, optional): Decimal precision for numerical values
- `alarm`  (boolean, optional): Whether to show alarm styling
- `openHyperLinkInNewWindow`  (boolean, optional): Whether links open in new window
- `enabled`  (boolean, optional): Whether the readout is enabled
- `bind`  (array, optional): Data binding configuration
- `action`  (string, optional): Action to perform on click
- `param`  (string, optional): Parameter for the action

**Example:**

``` yaml
readouts:
  items:
    - label: "Temperature"
      value: 25.5
      unit: "°C"
      precision: 1
      openHyperLinkInNewWindow: false
      enabled: true
      bind:
        - target: value
          source: '{COMPONENT_NAME}.TemperatureMeasurement.Value'
    - label: "Pressure"
      value: 1013.25
      unit: "hPa"
      precision: 2
      openHyperLinkInNewWindow: false
      enabled: true
      bind:
        - target: value
          source: '{COMPONENT_NAME}.PressureMeasurement.Value'
```

## Charts

Data visualization components. Charts provide graphical representation of data trends, making it easy to understand patterns and changes over time.

**Best for:** Data trends, historical analysis, performance monitoring, visual data representation, time-series data

**Parameters:**

- `type`  (string, required): Chart type - &quot;bar&quot; or &quot;line&quot;
- `value`  (object/array, required): Chart data
- `legend`  (boolean, optional): Show legend (default: false)
- `bind`  (array, optional): Data binding configuration

**Example:**

``` yaml
chart:
  type: bar
  legend: false
  bind:
    - target: value
      source: Prohelion BMU.[Property].PackData.CellTempsSummaryGraph   
```

**Static Chart Example:**

``` yaml
chart:
  type: line
  legend: true
  value:
    labels: ["Jan", "Feb", "Mar", "Apr"]
    datasets:
      - label: "Sales"
        data: [65, 59, 80, 81]
      - label: "Revenue"
        data: [28, 48, 40, 19]
```

## Tabs

Tabbed interface with header lamps and body content. Tabs organize information into separate views, allowing users to switch between different data sets or views.

**Best for:** Organizing multiple data views, separating different information types, creating multi-page interfaces within a single dashboard

**Parameters:**

- `items`  (array, required): Array of tab objects

**Tab Object Parameters:**

- `enabled`  (boolean, optional): Whether the tab is enabled
- `header`  (array, required): Tab header items (typically lamps)
- `body`  (array, required): Tab body content (typically panels)

**Example:**

``` yaml
tabs:
  items:
    - enabled: true
      header:
        - lamp:
            color: disabled
            value: 1
            label: INFO
      body:
        - panels:
            items:
              - title: Low Voltage
                items:
                  - readouts:
                      items:
                        - label: 15v RAIL
                          precision: 1
                          bind:
                            - target: value
                              source: '{COMPONENT_NAME}.VoltageRail15VMeasurement.Supply15V'
                        - label: 1.9v RAIL
                          precision: 1
                          bind:
                            - target: value
                              source: '{COMPONENT_NAME}.VoltageRail3V31V9Measurement.Supply1V9'
```

## State

State machine visualization component. State components display the current state of a system using Mermaid flowcharts, showing state transitions and current position.

**Best for:** System state visualization, process flow display, state machine representation, complex system status

**Parameters:**

- `model`  (string, required): Mermaid flowchart definition
- `value`  (string, optional): Current state value
- `bind`  (array, optional): Data binding configuration

**Example:**

``` yaml
state:
  model: "flowchart LR\r\n\tERROR(Error)\r\n\tIDLE(Idle)\r\n\tENABLE(Enable)\r\n\tDISCOVERY(Discovery)\r\n\tMEASURE(Measure)\r\n\tPRECHARGE(Precharge)\r\n\tRUN(Run)\r\n\tIDLE --> ENABLE\r\n\tIDLE --> DISCOVERY\r\n\tENABLE --> MEASURE\r\n\tMEASURE --> PRECHARGE\r\n\tPRECHARGE --> RUN\r\n"
  bind:
    - target: value
      source: Prohelion BMU.[Property].State.Controller.CurrentState.Name
      toType: string
```

## Tables

Data table display. Tables present structured data in rows and columns, with advanced features like heatmaps and highlighting for better data analysis.

**Best for:** Structured data display, multi-dimensional data, data analysis, large datasets, comparative data

**Parameters:**

- `headersInfo`  (array, required): Column header configuration
- `value`  (array, optional): Table data
- `selectColumns`  (boolean, optional): Allow column selection
- `heatmap`  (boolean, optional): Enable heatmap visualization
- `highlightMin`  (boolean, optional): Highlight minimum values
- `highlightMax`  (boolean, optional): Highlight maximum values
- `highlightIfEqualTo`  (number, optional): Highlight specific values
- `displayPositive`  (boolean, optional): Display positive values only

**Example:**

``` yaml
table:
  headersInfo:
    - accessorkey: name
      value: Node Number
    - accessorkey: cell1mV
      value: Cell 1 mv
    - accessorkey: cell2mV
      value: Cell 2 mv
  minValueToDisplay: 0
  heatmap: true
  highlightMin: true
  highlightMax: true
  highlightIfEqualTo: -32768
  displayPositive: true
  bind:
    - target: value
      source: Prohelion BMU.[Property].PackData.Nodes.Values
```

# Interactive Components

Interactive components provide user interface elements for control and interaction with the dashboard and underlying systems.

## Actions

Interactive buttons. Actions provide clickable buttons that can trigger system actions, navigation, or other interactive behaviours.

**Best for:** System controls, navigation buttons, data refresh actions, user interactions, command execution

**Parameters:**

- `label`  (string, required): Button text
- `actionId`  (string, required): Action identifier
- `mode`  (string, required): Action mode
- `class`  (string, optional): CSS class
- `image`  (string, optional): Button icon
- `imageAlt`  (string, optional): Icon alt text
- `systemAction`  (boolean, optional): System-level action

**Example:**

``` yaml
action:
  label: "Refresh Data"
  actionId: "refresh"
  mode: "click"
  class: "btn-primary"
  image: "refresh-icon.svg"
```

## Toggles

Switch components. Toggles provide on/off controls for system settings and features, allowing users to enable or disable functionality.

**Best for:** Settings controls, feature toggles, enable/disable switches, user preferences, system configuration

**Parameters:**

- `label`  (string, required): Toggle label
- `actionId`  (string, required): Action identifier
- `class`  (string, optional): CSS class
- `value`  (object, optional): Toggle state

**Example:**

``` yaml
toggle:
  label: "Auto Refresh"
  actionId: "auto-refresh"
  class: "toggle-switch"
```

## Next Steps

Now that you understand the available components, you can:
- Learn about [Data Binding](./Data_Binding.md) to connect components to your data
- Explore [Core Elements](./Core_Elements.md) to understand dashboard structure
- See [Conditional Styling](./Conditional_Styling.md) for dynamic visual effects
- Review [Example](./Example.md) for complete dashboard implementations
