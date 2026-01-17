---
title: How to Build Dashboards of Remote Data (InfluxDB)
---

# How to Build Dashboards of Remote Data (InfluxDB)

Create dashboards that display data from remote sources using InfluxDB and the `store: "logged"` binding option.

## Prerequisites

- Profinity V2 installed and running
- Data logged to InfluxDB (see [How to Log Data to Cloud](./Log_Data_to_Cloud_Influx.md))
- Understanding of dashboard data binding
- At least one InfluxDB logger component configured in your profile

## Steps

### Step 1: Ensure InfluxDB Logger is Configured

1. Verify you have an InfluxDB logger component configured in your profile
2. Verify data is being logged to InfluxDB
3. The logger will be automatically detected - you don't need to specify its name

### Step 2: Add Remote Data Binding

Use the `store: "logged"` property in your bind configuration to access data from InfluxDB:

```yaml
- readout:
    label: REMOTE VOLTAGE
    bind:
      - target: value
        source: 'Prohelion BMU.PackMeasurement.PackVoltage'
        store: "logged"
```

**Note:** When using `store: "logged"` without time range parameters, you get the most recent value from InfluxDB.

### Step 3: Add Time Range for Historical Data

Set time range for historical queries using `timeRangeStart` and `timeRangeStop`:

```yaml
- readout:
    label: REMOTE VOLTAGE (1H AGO)
    bind:
      - target: value
        source: 'Prohelion BMU.PackMeasurement.PackVoltage'
        store: "logged"
        timeRangeStart: "-1h"  # 1 hour ago
        timeRangeStop: "0m"    # Current time (now)
```

**Time Range Examples:**
- `"-10m"` - 10 minutes ago
- `"-1h"` - 1 hour ago
- `"-24h"` - 24 hours ago
- `"0m"` - Current time (now)
- `"-5m"` - 5 minutes ago (for stop time)

### Step 4: Add Time Series Data for Charts

For historical data and charts, use `store: "logged"` with time ranges. The logged data automatically returns time series data for charts:

```yaml
- chart:
    type: line
    bind:
      - target: value
        source: 'Prohelion BMU.PackMeasurement.PackVoltage'
        store: "logged"
        timeRangeStart: "-24h"
        timeRangeStop: "0m"
        aggregationWindow: "10s"
        aggregationFunction: "mean"
```

### Step 5: Use Aggregate Functions

For statistical analysis, use `aggregationWindow` and `aggregationFunction`:

```yaml
- readout:
    label: AVERAGE (24H)
    bind:
      - target: value
        source: 'Prohelion BMU.PackMeasurement.PackVoltage'
        store: "logged"
        timeRangeStart: "-24h"
        timeRangeStop: "0m"
        aggregationWindow: "1m"
        aggregationFunction: "mean"
```

**Available Aggregation Functions:** `max`, `mean`, `min`, `last`, `first`, `sum`, `count`

**Aggregation Window Examples:**
- `"1s"` - 1 second windows
- `"10s"` - 10 second windows
- `"1m"` - 1 minute windows
- `"5m"` - 5 minute windows
- `"1h"` - 1 hour windows

### Step 6: Combine Local and Remote Data

Mix local component data with remote InfluxDB data:

```yaml
- readouts:
    items:
      # Local real-time data
      - readout:
          label: LOCAL TEMP
          bind:
            - target: value
              source: '{COMPONENT_NAME}.Temperature.Value'
      
      # Remote historical data
      - readout:
          label: REMOTE AVG (1H)
          bind:
            - target: value
              source: 'Prohelion BMU.Temperature.Value'
              store: "logged"
              timeRangeStart: "-1h"
              timeRangeStop: "0m"
              aggregationWindow: "1m"
              aggregationFunction: "mean"
```

### Step 7: Test Remote Data Bindings

1. Save your dashboard
2. Verify data appears in readouts and charts
3. Check time ranges work correctly
4. Verify aggregates calculate properly

## Complete Examples

### Example 1: Single Readout with Most Recent Value

```yaml
- readout:
    label: LATEST VOLTAGE
    bind:
      - target: value
        source: 'Prohelion BMU.PackMeasurement.PackVoltage'
        store: "logged"
```

### Example 2: Chart with Historical Time Series

```yaml
- chart:
    type: line
    showControls: true
    bind:
      - target: value
        source: 'Prohelion BMU.PackMeasurement.PackVoltage'
        store: "logged"
        timeRangeStart: "-1h"
        timeRangeStop: "0m"
        aggregationWindow: "10s"
        aggregationFunction: "mean"
```

### Example 3: Average Over Time Range

```yaml
- readout:
    label: AVERAGE TEMP (LAST 10 MINUTES)
    bind:
      - target: value
        source: 'Prohelion BMU.TemperatureMeasurement.Value'
        store: "logged"
        timeRangeStart: "-10m"
        timeRangeStop: "0m"
        aggregationWindow: "1m"
        aggregationFunction: "mean"
```

## Tips

- **Start Simple**: Begin with basic remote data bindings (most recent value) before using time ranges and aggregates
- **Optimize Queries**: Use appropriate time ranges to balance performance and data detail
- **Aggregation Windows**: Use larger aggregation windows for longer time ranges to improve performance
- **Error Handling**: Configure fallback values for when remote data is unavailable
- **Performance**: Monitor dashboard performance with large time ranges - consider using aggregation to reduce data points

## Troubleshooting

- **No Data Displaying**:
  - Verify an InfluxDB logger is configured in your profile
  - Check that data exists in InfluxDB for the time range
  - Verify component, message, and signal names match exactly (including spaces)
  - Check InfluxDB connection status
  - Verify data has been logged to InfluxDB

- **Slow Dashboard**:
  - Reduce time range for queries
  - Use larger aggregation windows to reduce data points
  - Limit number of remote data bindings
  - Check InfluxDB server performance

- **Incorrect Data**:
  - Verify signal names match exactly (case-sensitive)
  - Check time range is appropriate
  - Verify aggregation functions are correct
  - Check timezone settings on InfluxDB server

## Related Documentation

- [Data Binding](../Extending_Profinity/Dashboards/Data_Binding.md) - Complete data binding guide
- [Log Data to InfluxDB](./Log_Data_to_Cloud_Influx.md) - Setting up InfluxDB logging
- [InfluxDB Logger](../Components/Loggers/InfluxDB_Prometheus_Logger.md) - Logger component reference
- [Dashboard Development Guide](../Extending_Profinity/Dashboards/index.md) - Complete dashboard guide
