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
- [HTML](#html) - HTML content display
- [Image](#image) - Interactive image with regions, icons, and data values

### Interactive Components
User interface and control elements:
- [Tabs](#tabs) - Tabbed interface
- [Actions](#actions) - Buttons and controls
- [Toggles](#toggles) - Switch components
- [Icon](#icon) - Icon display component

## Layout Components

## Row

A row is a layout container that can hold multiple components. Rows are the fundamental building blocks of dashboard layout, allowing you to organize components horizontally or vertically.

**Best for:** Creating logical sections, organizing related components, controlling layout direction

**Parameters:**

- `id`  (string, optional): Unique identifier for the row
- `class`  (string, optional): CSS class for styling
- `direction`  (string, optional): Layout direction - &quot;vertical&quot; or &quot;horizontal&quot; (default: &quot;vertical&quot;)
- `height`  (string, optional): Height value in CSS format (e.g., '100px', '50vh', 'auto')
- `items`  (array, required): Array of components to display in the row

**Example:**

``` yaml
dashboard:
  items:
    - row:
        id: "status-row"
        class: "status-container"
        direction: "horizontal"
        height: "auto"
        items:
          - lamps:
              items:
                - lampgroup:
                    items:
                      - lamp:
                          color: "green"
                          label: "Online"
                          value: 1
                          enabled: true
          - readouts:
              items:
                - readout:
                    label: "Temperature"
                    value: 25.5
                    unit: "°C"
```

## Group

A group is a container that organizes related components. Groups help create visual and logical groupings within rows, making dashboards more organized and easier to understand.

**Best for:** Grouping related data displays, creating visual sections, organizing components with similar functions

**Parameters:**

- `id`  (string, optional): Unique identifier for the group
- `class`  (string, optional): CSS class for styling
- `direction`  (string, optional): Layout direction - &quot;vertical&quot; or &quot;horizontal&quot; (default: &quot;vertical&quot;)
- `items`  (array, required): Array of components within the group

``` yaml
dashboard:
  items:
    - row:
        items:
          - group:
              class: "sensor-panel"
              direction: "vertical"
              items:
                - readouts:
                    items:
                      - readout:
                          label: "Pressure"
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
dashboard:
  items:
    - row:
        items:
          - panels:
              items:
                - panel:
                    title: "System Status"
                    items:
                      - lamps:
                          items:
                            - lampgroup:
                                items:
                                  - lamp:
                                      color: "green"
                                      label: "CPU"
                                      value: 1
                                      enabled: true
                - panel:
                    title: "Performance"
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

**When not to use:** When you need individual readouts without grouping, or when you don't need an icon

**Parameters:**

- `id`  (string, optional): Unique identifier for the pill
- `class`  (string, optional): CSS class for styling
- `icon`  (object, optional): Icon configuration
  - `image`  (string, required): Icon image filename from /Profile/Images directory
  - `recess`  (boolean, optional): Whether icon is recessed
  - `value`  (number, optional): Icon value
  - `bind`  (array, optional): Data binding for icon
- `items`  (array, required): Array of pill groups

**Pill Group Structure:**

Each item in `items` must contain a `pillgroup` object with:
- `id`  (string, optional): Unique identifier for the pill group
- `class`  (string, optional): CSS class for styling
- `items`  (array, required): Array of value items

Each value item must contain a `value` object (pill_item) with:
- `label`  (string, required): Display label
- `value`  (number/string, optional): Static value
- `unit`  (string, optional): Unit of measurement
- `precision`  (number, optional): Decimal precision
- `enabled`  (boolean, optional): Whether the readout is enabled
- `visible`  (boolean, optional): Whether the readout is visible
- `bind`  (array, optional): Data binding configuration

**Example:**

``` yaml
dashboard:
  items:
    - row:
        items:
          - pill:
              icon:
                image: nav_motorcontrollers_active.svg
                recess: false
                value: 0
              items:
                - pillgroup:
                    items:
                      - value:
                          label: BUS VOLTAGE
                          openHyperLinkInNewWindow: false
                          enabled: true
                          precision: 1
                          bind:
                            - target: value
                              source: '{COMPONENT_NAME}.BusMeasurement.BusVoltage'
                      - value:
                          label: BUS CURRENT
                          openHyperLinkInNewWindow: false
                          enabled: true
                          precision: 1
                          bind:
                            - target: value
                              source: '{COMPONENT_NAME}.BusMeasurement.BusCurrent'
                - pillgroup:
                    items:
                      - value:
                          label: DSP TEMP
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

- `id`  (string, optional): Unique identifier for the panel
- `class`  (string, optional): CSS class for styling
- `title`  (string, required): Panel title
- `menu`  (object, optional): Menu configuration for the panel
- `height`  (string, optional): Height value in CSS format (e.g., '100px', '50vh', 'auto')
- `items`  (array, required): Components within the panel (chart, lamps, state, group, readouts, table, html)

**Example:**

``` yaml
dashboard:
  items:
    - row:
        items:
          - panels:
              items:
                - panel:
                    title: "Temperature Sensors"
                    height: "auto"
                    items:
                      - readouts:
                          items:
                            - readout:
                                label: "Sensor 1"
                                value: 22.5
                                unit: "°C"
                                precision: 1
                            - readout:
                                label: "Sensor 2"
                                value: 24.2
                                unit: "°C"
                                precision: 1
```

## Accordion

Collapsible sections for organizing content. Accordions help keep dashboards clean by allowing users to expand and collapse sections of information as needed.

**Best for:** Detailed information that's not always needed, settings panels, secondary data, keeping dashboards uncluttered

**Parameters:**

- `id`  (string, optional): Unique identifier for the accordion
- `class`  (string, optional): CSS class for styling
- `label`  (string, required): Section label
- `visible`  (boolean, optional): Whether the accordion is visible
- `bind`  (array, optional): Data binding configuration
- `items`  (array, required): Array of row objects within the accordion

**Example:**

``` yaml
dashboard:
  items:
    - accordion:
        label: "System Details"
        items:
          - row:
              items:
                - readouts:
                    items:
                      - readout:
                          label: "Uptime"
                          value: "72:15:30"
                      - readout:
                          label: "Version"
                          value: "2.1.0"
```

## Titlebar

Header section with status lamps and navigation. The titlebar provides dashboard identification, status information, and navigation controls.

**Best for:** Dashboard identification, status indicators, navigation menus, component-specific actions

**Parameters:**

- `id`  (string, optional): Unique identifier for the titlebar
- `class`  (string, optional): CSS class for styling
- `lamp`  (object, optional): Status lamp configuration
- `menu`  (object, optional): Navigation menu
- `showTitlebar`  (boolean, optional): Show the titlebar background (default: true)
- `showActions`  (boolean, optional): Show actions in the titlebar (default: true)

**Example:**

``` yaml
dashboard:
  items:
    - titlebar:
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

- `id`  (string, optional): Unique identifier for the footer
- `class`  (string, optional): CSS class for styling
- `visible`  (boolean, optional): Whether the footer is visible
- `menu`  (object, optional): Navigation menu
- `bind`  (array, optional): Data binding configuration

**Example:**

``` yaml
dashboard:
  items:
    - footer:
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

- `id`  (string, optional): Unique identifier for the lamps component
- `class`  (string, optional): CSS class for styling
- `items`  (array, required): Array of lamp groups

**Lamp Group Structure:**

Each item in `items` must contain a `lampgroup` object with:
- `id`  (string, optional): Unique identifier for the lamp group
- `class`  (string, optional): CSS class for styling
- `items`  (array, required): Array of lamps

Each lamp item must contain a `lamp` object with:
- `id`  (string, optional): Unique identifier for the lamp
- `class`  (string, optional): CSS class for styling
- `color`  (string, required): Lamp color (&quot;green&quot;, &quot;red&quot;, &quot;amber&quot;, &quot;disabled&quot;, &quot;grey&quot;, etc.)
- `label`  (string, optional): Display label
- `value`  (number, optional): Lamp value (typically 0 or 1)
- `enabled`  (boolean, optional): Whether the lamp is enabled
- `visible`  (boolean, optional): Whether the lamp is visible
- `bind`  (array, optional): Data binding configuration

**Example:**

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
                          label: "Online"
                          value: 1
                          enabled: true
                          bind:
                            - target: enabled
                              source: '{COMPONENT_NAME}.Status.Online'
                              toType: boolean
                      - lamp:
                          color: "red"
                          label: "Error"
                          value: 1
                          enabled: false
                          bind:
                            - target: enabled
                              source: '{COMPONENT_NAME}.Status.Error'
                              toType: boolean
                      - lamp:
                          color: "amber"
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

- `id`  (string, optional): Unique identifier for the readouts component
- `class`  (string, optional): CSS class for styling
- `items`  (array, required): Array of readout items

**Readout Item Structure:**

Each item in `items` must contain a `readout` object with:
- `id`  (string, optional): Unique identifier for the readout
- `class`  (string, optional): CSS class for styling
- `label`  (string, required): Display label
- `value`  (number/string, optional): Static value
- `unit`  (string, optional): Unit of measurement
- `precision`  (number, optional): Decimal precision for numerical values
- `min`  (number, optional): Minimum value
- `max`  (number, optional): Maximum value
- `enabled`  (boolean, optional): Whether the readout is enabled
- `visible`  (boolean, optional): Whether the readout is visible
- `bind`  (array, optional): Data binding configuration
- `action`  (string, optional): Action to perform on click
- `param`  (string, optional): Parameter for the action

**Example:**

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
                    enabled: true
                    bind:
                      - target: value
                        source: '{COMPONENT_NAME}.TemperatureMeasurement.Value'
                - readout:
                    label: "Pressure"
                    value: 1013.25
                    unit: "hPa"
                    precision: 2
                    enabled: true
                    bind:
                      - target: value
                        source: '{COMPONENT_NAME}.PressureMeasurement.Value'
```

## Charts

Data visualization components. Charts provide graphical representation of data trends, making it easy to understand patterns and changes over time.

**Best for:** Data trends, historical analysis, performance monitoring, visual data representation, time-series data

**Parameters:**

- `id`  (string, optional): Unique identifier for the chart
- `class`  (string, optional): CSS class for styling
- `type`  (string, required): Chart type - &quot;bar&quot;, &quot;line&quot;, &quot;radar&quot;, &quot;doughnut&quot;, &quot;pie&quot;, &quot;polarArea&quot;, &quot;bubble&quot;, or &quot;scatter&quot;
- `value`  (object/array, required): Chart data (structured object with labels/datasets, or time series array)
- `legend`  (boolean, optional): Show legend (default: false)
- `refreshInterval`  (number, optional): Auto refresh interval in milliseconds (minimum: 0)
- `showControls`  (boolean, optional): Show time range and refresh controls
- `min`  (number, optional): Minimum value for chart scale (auto-calculated if not specified)
- `max`  (number, optional): Maximum value for chart scale (auto-calculated if not specified)
- `label`  (string, optional): Chart label
- `enabled`  (boolean, optional): Whether the chart is enabled
- `visible`  (boolean, optional): Whether the chart is visible
- `bind`  (array, optional): Data binding configuration

**Example with Data Binding:**

``` yaml
dashboard:
  items:
    - row:
        items:
          - chart:
              type: bar
              legend: false
              bind:
                - target: value
                  source: Prohelion BMU.[Property].PackData.CellTempsSummaryGraph   
```

**Static Chart Example:**

``` yaml
dashboard:
  items:
    - row:
        items:
          - chart:
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

**Time Series Chart Example:**

``` yaml
dashboard:
  items:
    - row:
        items:
          - chart:
              type: line
              legend: false
              showControls: true
              refreshInterval: 1000
              bind:
                - target: value
                  source: "[TimeSeries].{COMPONENT_NAME}.BusMeasurement.BusCurrent"
```

## Tabs

Tabbed interface with header lamps and body content. Tabs organize information into separate views, allowing users to switch between different data sets or views.

**Best for:** Organizing multiple data views, separating different information types, creating multi-page interfaces within a single dashboard

**Parameters:**

- `items`  (array, required): Array of tab objects

**Tab Object Parameters:**

- `id`  (string, optional): Unique identifier for the tab
- `class`  (string, optional): CSS class for styling
- `enabled`  (boolean, optional): Whether the tab is enabled
- `visible`  (boolean, optional): Whether the tab is visible
- `bind`  (array, optional): Data binding configuration
- `header`  (array, required): Tab header items (typically lamps)
- `body`  (array, required): Tab body content (typically panels)

**Example:**

``` yaml
dashboard:
  items:
    - row:
        items:
          - tabs:
              items:
                - tab:
                    enabled: true
                    visible: true
                    header:
                      - lamp:
                          color: disabled
                          value: 1
                          label: INFO
                    body:
                      - panels:
                          items:
                            - panel:
                                title: Low Voltage
                                items:
                                  - readouts:
                                      items:
                                        - readout:
                                            label: 15v RAIL
                                            precision: 1
                                            bind:
                                              - target: value
                                                source: '{COMPONENT_NAME}.VoltageRail15VMeasurement.Supply15V'
                                        - readout:
                                            label: 1.9v RAIL
                                            precision: 1
                                            bind:
                                              - target: value
                                                source: '{COMPONENT_NAME}.VoltageRail3V31V9Measurement.Supply1V9'
```

## State

State machine visualization component. State components display the current state of a system using Mermaid flowcharts, showing state transitions and current position.

**Best for:** System state visualization, process flow display, state machine representation, complex system status

**Parameters:**

- `id`  (string, optional): Unique identifier for the state component
- `class`  (string, optional): CSS class for styling
- `label`  (string, optional): Display label
- `model`  (string, required): Mermaid flowchart definition
- `value`  (string, optional): Current state value
- `enabled`  (boolean, optional): Whether the state component is enabled
- `visible`  (boolean, optional): Whether the state component is visible
- `bind`  (array, optional): Data binding configuration

**Example:**

``` yaml
dashboard:
  items:
    - row:
        items:
          - state:
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

- `id`  (string, optional): Unique identifier for the table
- `class`  (string, optional): CSS class for styling
- `label`  (string, optional): Display label
- `tableHeaders`  (array, required): Column header configuration
- `value`  (array, optional): Table data
- `selectColumns`  (boolean, optional): Allow column selection
- `minValueToDisplay`  (number, optional): Minimum value to display
- `maxValueToDisplay`  (number, optional): Maximum value to display
- `heatmap`  (boolean, optional): Enable heatmap visualization
- `highlightMin`  (boolean, optional): Highlight minimum values
- `highlightMax`  (boolean, optional): Highlight maximum values
- `highlightAtOrBelow`  (number, optional): Highlight values at or below this threshold
- `highlightAtOrAbove`  (number, optional): Highlight values at or above this threshold
- `highlightIfEqualTo`  (number, optional): Highlight specific values
- `alertAtOrBelow`  (number, optional): Alert for values at or below this threshold
- `alertAtOrAbove`  (number, optional): Alert for values at or above this threshold
- `alertIfEqualTo`  (number, optional): Alert for specific values
- `displayPositive`  (boolean, optional): Display positive values only
- `conversionFactor`  (number, optional): Conversion factor to apply to values
- `precision`  (number, optional): Decimal precision for numerical values
- `rowNames`  (array, optional): Optional array of row names for series data
- `columnNames`  (array, optional): Optional array of column names for series data
- `enabled`  (boolean, optional): Whether the table is enabled
- `visible`  (boolean, optional): Whether the table is visible
- `bind`  (array, optional): Data binding configuration

**Table Header Structure:**

Each item in `tableHeaders` must contain a `header` object with:
- `accessorKey`  (string, required): Key to access data in table rows
- `value`  (string, required): Display label for the column header

**Example:**

``` yaml
dashboard:
  items:
    - row:
        items:
          - table:
              tableHeaders:
                - header:
                    accessorKey: name
                    value: Node Number
                - header:
                    accessorKey: cell1mV
                    value: Cell 1 mv
                - header:
                    accessorKey: cell2mV
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

- `id`  (string, optional): Unique identifier for the action
- `class`  (string, optional): CSS class
- `label`  (string, required if mode is "button"): Button text
- `actionId`  (string, required): Action identifier
- `mode`  (string, required): Action mode - &quot;icon&quot;, &quot;button&quot;, or &quot;auto&quot;
- `image`  (string, optional): Button icon filename from /Profile/Images directory
- `imageAlt`  (string, optional): Icon alt text
- `value`  (object, optional): Action value
- `systemAction`  (boolean, optional): System-level action
- `trackProgress`  (boolean, optional): Track action progress
- `hyperlink`  (string, optional): Hyperlink URL
- `openHyperLinkInNewWindow`  (boolean, optional): Whether links open in new window
- `enabled`  (boolean, optional): Whether the action is enabled
- `visible`  (boolean, optional): Whether the action is visible
- `bind`  (array, optional): Data binding configuration

**Example:**

``` yaml
dashboard:
  items:
    - row:
        items:
          - action:
              label: "Refresh Data"
              actionId: "refresh"
              mode: "button"
              class: "btn-primary"
              image: "refresh-icon.svg"
              imageAlt: "Refresh"
```

**Icon-Only Action Example:**

``` yaml
dashboard:
  items:
    - row:
        items:
          - action:
              actionId: "settings"
              mode: "icon"
              image: "settings-icon.svg"
              imageAlt: "Settings"
```

## Toggles

Switch components. Toggles provide on/off controls for system settings and features, allowing users to enable or disable functionality.

**Best for:** Settings controls, feature toggles, enable/disable switches, user preferences, system configuration

**Parameters:**

- `id`  (string, optional): Unique identifier for the toggle
- `class`  (string, optional): CSS class
- `label`  (string, required): Toggle label
- `actionId`  (string, required): Action identifier
- `value`  (object, optional): Toggle state
- `enabled`  (boolean, optional): Whether the toggle is enabled
- `visible`  (boolean, optional): Whether the toggle is visible
- `bind`  (array, optional): Data binding configuration

**Example:**

``` yaml
dashboard:
  items:
    - row:
        items:
          - toggle:
              label: "Auto Refresh"
              actionId: "auto-refresh"
              class: "toggle-switch"
              enabled: true
```

## Icon

Icon component for displaying icons from the /Profile/Images directory.

**Best for:** Displaying icons, status indicators, visual elements

**When not to use:** When you need interactive buttons (use Action instead) or when you need icons within other components (use component-specific icon properties)

**Parameters:**

- `id`  (string, optional): Unique identifier for the icon
- `class`  (string, optional): CSS class for styling
- `label`  (string, optional): Display label
- `image`  (string, required): Icon image filename from /Profile/Images directory
- `recess`  (boolean, optional): Whether icon is recessed
- `enabled`  (boolean, optional): Whether the icon is enabled
- `visible`  (boolean, optional): Whether the icon is visible
- `bind`  (array, optional): Data binding configuration

**Example:**

``` yaml
dashboard:
  items:
    - row:
        items:
          - icon:
              image: nav_motorcontrollers_active.svg
              recess: false
              label: "Motor Controller"
              enabled: true
```

## HTML

HTML content component for displaying raw HTML content. This component allows you to embed custom HTML, including references to content from /Profile/Content, images from /Profile/Images, and styles from /Profile/Styles.

**Best for:** Custom content display, rich text formatting, embedded content, documentation snippets

**When not to use:** For structured data display (use Readouts, Tables, etc.), for interactive elements (use Actions, Toggles, etc.)

**Parameters:**

- `id`  (string, optional): Unique identifier for the HTML component
- `class`  (string, optional): CSS class for styling
- `content`  (string, required): HTML content to display

**Referencing Profile Assets in HTML:**

- **Images**: Use `/Profile/Images/{filename}` in img src attributes
- **Styles**: Link to stylesheets using `/Profile/Styles/{filename}`
- **Content**: Reference content files using `/Profile/Content/{filename}`

**Example:**

``` yaml
dashboard:
  items:
    - row:
        items:
          - html:
              class: "info-box"
              content: |
                <div class="info-box__header">System Information</div>
                <div class="info-box__content">
                  <p>This dashboard monitors system status.</p>
                  <img src="/Profile/Images/system-diagram.svg" alt="System Diagram" />
                </div>
```

**Example with External Stylesheet:**

``` yaml
dashboard:
  items:
    - row:
        items:
          - html:
              content: |
                <link rel="stylesheet" href="/Profile/Styles/custom-dashboard.css" />
                <div class="custom-panel">
                  <h2>Custom Content</h2>
                  <p>Styled with custom CSS from /Profile/Styles</p>
                </div>
```

## Image

Interactive image component with clickable regions, icons, data values, points, and annotation lines. Images are loaded from the /Profile/Images directory.

**Best for:** Device diagrams, system layouts, interactive schematics, visual data overlays

**When not to use:** For simple static images (use HTML component with img tag), for charts (use Chart component)

**Parameters:**

- `id`  (string, optional): Unique identifier for the image component
- `class`  (string, optional): CSS class for styling
- `label`  (string, optional): Display label
- `value`  (object, required): Interactive image data structure
- `bind`  (array, optional): Data binding configuration
- `enabled`  (boolean, optional): Whether the image is enabled
- `unit`  (string, optional): Unit for data values
- `min`  (number, optional): Minimum value
- `max`  (number, optional): Maximum value
- `precision`  (number, optional): Decimal precision

**Image Data Structure (`value` object):**

- `image`  (string, required): Filename of the image in /Profile/Images directory
- `regions`  (array, optional): Array of clickable regions
- `icons`  (array, optional): Array of icons to display on the image
- `dataValues`  (array, optional): Array of data values to display
- `points`  (array, optional): Array of anchor points for annotation lines
- `annotationLines`  (array, optional): Array of annotation lines connecting elements

**Region Parameters:**

- `id`  (string, required): Unique identifier for the region
- `coordinates`  (string, required): Annotation coordinates in xywh format (e.g., 'xywh=200,150,100,80')
- `action`  (string, required): Action type - &quot;navigate&quot; or &quot;action&quot;
- `target`  (string, optional): URL for navigation (when action === 'navigate')
- `actionId`  (string, optional): Action ID for API action (when action === 'action')
- `label`  (string, optional): Optional label/tooltip
- `visibleBorder`  (boolean, optional): Whether to show the border (default: true)

**Icon Parameters:**

- `id`  (string, required): Unique identifier for the icon
- `x`  (number, required): X coordinate (percentage or pixels)
- `y`  (number, required): Y coordinate (percentage or pixels)
- `icon`  (string, required): Icon name/type, SVG path, or image filename from /Profile/Images
- `size`  (number, optional): Optional icon size
- `color`  (string, optional): Optional icon color (for SVG paths only)
- `label`  (string, optional): Optional label/tooltip
- `action`  (string, optional): Action type - &quot;navigate&quot; or &quot;action&quot;
- `target`  (string, optional): URL for navigation
- `actionId`  (string, optional): Action ID for API action

**Data Value Parameters:**

- `id`  (string, required): Unique identifier for the data value
- `x`  (number, required): X coordinate for data display position
- `y`  (number, required): Y coordinate for data display position
- `label`  (string, optional): Optional label to display
- `bind`  (string/array, required): Binding to data source
- `displayType`  (string, optional): How to display - &quot;text&quot; (default), &quot;graph&quot; (bar chart), or &quot;status&quot; (lamp)
- `maxValue`  (number, optional): Maximum value for bar chart (required if displayType is 'graph')
- `lampColor`  (string, optional): Lamp color when displayType is 'status'
- `value`  (string/number, optional): Mock value (ignored when using real bindings)
- `unit`  (string, optional): Unit for the value
- `precision`  (number, optional): Number of decimal places
- `enabled`  (boolean, optional): Whether the data value is enabled
- `min`  (number, optional): Minimum value
- `max`  (number, optional): Maximum value

**Point Parameters:**

- `id`  (string, required): Unique identifier for the point
- `x`  (number, required): X coordinate (percentage or pixels)
- `y`  (number, required): Y coordinate (percentage or pixels)
- `size`  (number, optional): Optional point size (if > 0, the point will be displayed)
- `color`  (string, optional): Optional point color (defaults to grey)

**Annotation Line Parameters:**

- `id`  (string, required): Unique identifier for the annotation line
- `fromId`  (string, required): ID of element to connect from (icon, dataValue, region, or point)
- `toId`  (string, required): ID of element to connect to (icon, dataValue, region, or point)
- `elbows`  (array, optional): Optional elbow points for bent lines (relative to image, 0-100%)

**Example:**

``` yaml
image:
  value:
    image: "Prohelion-STF.png"
    icons:
      - id: "component-icon"
        x: 50
        y: 30
        icon: "SolarPanel.svg"
        size: 32
        action: "navigate"
        target: "/component?componentId=Solar Panel"
        label: "Solar Panel"
    regions:
      - id: "battery-region"
        coordinates: "xywh=70,30,20,15"
        action: "navigate"
        target: "/component?componentId=Battery"
        label: "Battery"
        visibleBorder: true
    dataValues:
      - id: "soc-display"
        x: 50
        y: 0
        label: "State of Charge"
        displayType: "graph"
        maxValue: 100
        bind:
          - target: value
            source: "Battery.[Property].StateOfCharge"
        unit: "%"
        precision: 1
    points:
      - id: "connection-point"
        x: 60
        y: 40
        size: 8
        color: "transparent"
    annotationLines:
      - id: "connection-line"
        fromId: "component-icon"
        toId: "connection-point"
        elbows:
          - x: 55
            y: 35
```

## Next Steps

Now that you understand the available components, you can:
- Learn about [Data Binding](./Data_Binding.md) to connect components to your data
- Explore [Core Elements](./Core_Elements.md) to understand dashboard structure
- See [Conditional Styling](./Conditional_Styling.md) for dynamic visual effects
- Review [Examples](./Examples.md) for complete dashboard implementations
