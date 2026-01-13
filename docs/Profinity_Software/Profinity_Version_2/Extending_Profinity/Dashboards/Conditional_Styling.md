---
title: Conditional Styling
---

# Conditional Styling

Conditional styling allows your dashboard components to dynamically change their appearance, visibility, and behaviour based on real-time data values. This creates responsive dashboards that adapt to system state, providing immediate visual feedback to users.

## What is Conditional Styling?

Conditional styling uses data binding to apply different styles, classes, or visibility states to components based on the current value of data sources. This enables:

- **Visual Status Indicators** - Components change colour or style based on system state
- **Dynamic Visibility** - Show or hide components based on data conditions
- **Real-time Feedback** - Immediate visual response to data changes
- **Enhanced User Experience** - Clear visual cues for system status and alerts

## How Conditional Styling Works

Conditional styling uses the same data binding system as other dashboard components, but targets styling properties instead of content. The system evaluates data values and applies appropriate styling based on your configuration.

### Key Concepts

- **Data Binding** - Connect styling properties to data sources
- **Value Mapping** - Map data values to specific styles or classes
- **Real-time Updates** - Styling changes automatically as data updates
- **CSS Integration** - Works with your existing CSS classes and styles

## Types of Conditional Styling

### 1. Conditional Display

Show or hide components based on data values. This is useful for displaying information only when relevant.

**Use Cases:**
- Show error messages only when errors occur
- Display maintenance information when systems are offline
- Hide advanced settings for basic users
- Show detailed data only when expanded

## Conditional Display Examples

``` yaml
dashboard:
  items:
    - row:
        items:
          - group:
              class: "conditional-panel"
              items:
                - readouts:
                    items:
                      - readout:
                          label: "Special Value"
                          value: 0
                          bind:
                            - target: "value"
                              source: "data.special_value"
                              toType: "number"
```

### 2. Dynamic Styling

Change CSS classes and styling properties based on data values. This allows components to visually adapt to system state.

**Use Cases:**
- Change component colours based on status
- Apply different styles for different data ranges
- Highlight components when values exceed thresholds
- Show different themes based on system mode

## Dynamic Styling Examples

``` yaml
dashboard:
  items:
    - row:
        class: "status-row"
        items:
          - readouts:
              items:
                - readout:
                    label: "Status"
                    class: "status-panel"
                    bind:
                      - target: "class"
                        source: "data.status"
                        mapToText:
                          trueValue: "status-panel online"
                          falseValue: "status-panel offline"
```

### 3. Conditional Visibility

Control component visibility using the `enabled` property. This is more efficient than conditional display as it doesn't render hidden components.

**Use Cases:**
- Show/hide entire sections based on user permissions
- Display components only when relevant data is available
- Hide advanced features for basic users
- Show maintenance information when systems are offline

### 4. Value-Based Styling

Apply different styles based on data value ranges or conditions. This is particularly useful for status indicators and alerts.

**Use Cases:**
- Change lamp colours based on temperature ranges
- Highlight values that exceed safe limits
- Show different styles for different error types
- Apply visual indicators for system states

## Best Practices

### Design Guidelines

- **Consistent Visual Language** - Use the same colours and styles for similar conditions across your dashboard
- **Clear Status Indication** - Make it obvious what different styles mean
- **Progressive Enhancement** - Start with basic styling and add complexity gradually
- **Accessibility** - Ensure colour changes are not the only way to convey information

### Common Patterns

- **Status Indicators** - Use colour changes to show system status
- **Threshold Alerts** - Highlight values that exceed safe limits
- **Progressive Disclosure** - Show more information as system issues occur
- **Contextual Information** - Display relevant information based on current system state

## Next Steps

Now that you understand conditional styling, you can:
- Learn about [Data Binding](./Data_Binding.md) to connect styling to your data sources
- Explore [Component Reference](./Component_Reference.md) for styling options available on each component
- See [Core Elements](./Core_Elements.md) to understand how conditional styling works with dashboard structure
- Review [Examples](./Examples.md) for complete dashboard implementations with conditional styling