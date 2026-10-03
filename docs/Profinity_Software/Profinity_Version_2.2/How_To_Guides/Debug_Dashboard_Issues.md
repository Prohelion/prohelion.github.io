---
title: How to Debug Dashboard Issues
---

# How to Debug Dashboard Issues

Troubleshoot and fix common dashboard problems.

## Prerequisites

- Profinity V2 installed and running
- A dashboard with issues
- Access to dashboard editor

## Steps

### Step 1: Check Dashboard Validation

1. Open dashboard editor
2. Check for validation errors at the bottom
3. Fix any YAML syntax errors shown
4. Common errors:
   - Missing colons or commas
   - Incorrect indentation
   - Invalid property names

### Step 2: Verify Data Bindings

1. Check data binding sources:
   ```yaml
   bind:
     - target: value
       source: '{COMPONENT_NAME}.Signal.Value'  # Verify source exists
   ```
2. Verify component name is correct
3. Verify signal path matches your DBC file
4. Check signal is receiving data

### Step 3: Check Component Status

1. Verify components are active (green status)
2. Check components are receiving CAN data
3. Verify data is available for binding
4. Check CAN bus connection

### Step 4: Test with Simple Components

1. Start with a simple readout:
   ```yaml
   - readout:
       label: "TEST"
       value: 42.5  # Static value first
   ```
2. Verify it displays correctly
3. Then add data binding

### Step 5: Check Image and Asset References

1. Verify images exist in `/Profile/Images/`
2. Check filenames match exactly (case-sensitive)
3. Verify file paths in HTML components:
   ```html
   <img src="/Profile/Images/logo.png" />  # Correct
   ```

### Step 6: Review Dashboard Logs

1. Check Profinity logs for dashboard errors
2. Look for data binding errors
3. Check for missing component or signal errors
4. Review validation messages

### Step 7: Compare with Working Dashboard

1. View source of a working dashboard
2. Compare structure with your dashboard
3. Check for differences in formatting
4. Copy working patterns

## Common Issues and Solutions

**Issue: Dashboard Not Loading**
- Check YAML syntax is valid
- Verify dashboard structure is correct
- Check for missing required properties

**Issue: No Data Displaying**
- Verify components are active
- Check data bindings are correct
- Verify CAN data is arriving

**Issue: Images Not Showing**
- Check image files exist in `/Profile/Images/`
- Verify filenames match exactly
- Check file format is supported

**Issue: Styling Not Applied**
- Verify CSS file exists in `/Profile/Styles/`
- Check CSS is linked in HTML component
- Verify class names match

## Related Documentation

- [Troubleshooting Guide](../Extending_Profinity/Dashboards/Troubleshooting.md) - Complete troubleshooting guide
- [FAQ](../Extending_Profinity/Dashboards/FAQ.md) - Frequently asked questions
- [Dashboard Validation](../Extending_Profinity/Dashboards/index.md) - Schema validation information
