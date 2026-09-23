---
title: How to Log Data to the Cloud (InfluxDB)
---

# How to Log Data to the Cloud (InfluxDB)

Configure Profinity to log CAN bus data to InfluxDB for cloud-based data analytics and visualization.

## Prerequisites

- Profinity V2 installed and running
- An InfluxDB instance (cloud or self-hosted)
- InfluxDB database created and accessible
- Network access to your InfluxDB server
- Admin access to Profinity

## Steps

### Step 1: Set Up InfluxDB

**Option A - InfluxDB Cloud:**
1. Sign up for [InfluxDB Cloud](https://cloud2.influxdata.com/)
2. Create a new organization
3. Create a new bucket for your data
4. Generate an API token with write permissions
5. Note: Organization Name, Bucket Name, API Token, InfluxDB URL

**Option B - Self-Hosted:**
1. Install InfluxDB on your server
2. Start InfluxDB service
3. Create a bucket: `influx create bucket my-profinity-data`
4. Generate an API token: `influx auth create --org my-org --all-access`

### Step 2: Add InfluxDB Logger Component

1. Navigate to **ADMIN** → **Components**
2. Click **Add Component**
3. Select **InfluxDB Prometheus Logger**
4. Click **Add**

### Step 3: Configure InfluxDB Connection

1. Set **Component Name** (e.g., "InfluxDB Cloud Logger")
2. Set **Logger Type** to "InfluxDB"
3. Enter **InfluxDB URL**:
   - Cloud: `https://us-east-1-1.aws.cloud2.influxdata.com`
   - Self-hosted: `http://your-server:8086`
4. Enter **Organization** name
5. Enter **Bucket/Database** name
6. Enter **API Token**

### Step 4: Select Components to Log

1. Find **Components to Log** section
2. Select components to send to InfluxDB:
   - Check individual components, or
   - Select "All Components"
3. (Optional) Use filters to include/exclude specific components

### Step 5: Configure Logging Interval

1. Set **Logging Interval** (e.g., 1-5 seconds)
2. Typical values: 1-5 seconds for most applications
3. Higher frequency = more granular but more bandwidth
4. Lower frequency = less bandwidth but coarser data

### Step 6: Test Connection

1. Click **Test Connection** (if available)
2. Verify connection successful
3. Check for error messages
4. Review connection status

### Step 7: Save and Activate

1. Click **Save** to save logger configuration
2. Ensure logger is added to active profile
3. Logger starts automatically when profile is active

### Step 8: Verify Data Logging

1. Log into InfluxDB web interface
2. Navigate to Data Explorer
3. Query your data:
   ```
   from(bucket: "my-profinity-data")
     |> range(start: -1h)
     |> filter(fn: (r) => r["_measurement"] == "component_name")
   ```
4. Verify data is arriving
5. Check Profinity logs for connection errors

## Data Structure in InfluxDB

Profinity logs data with this structure:

- **Measurement**: Component name
- **Tags**: Component ID, signal names
- **Fields**: Signal values
- **Timestamp**: Data timestamp

**Example Data Point**:
```
measurement: "Prohelion BMU"
tags:
  componentId: "bmu-001"
  signal: "PackVoltage"
fields:
  value: 400.5
timestamp: 2024-01-17T10:30:00Z
```

## Tips

- **Start with One Component**: Test with a single component first
- **Monitor Bandwidth**: Cloud logging uses network bandwidth
- **Optimize Intervals**: Balance data granularity with cost
- **Use Tags Efficiently**: Tags are indexed and help with queries
- **Set Retention Policies**: Configure data retention to manage costs
- **Monitor Costs**: Cloud InfluxDB charges based on data usage

## Troubleshooting

- **Connection Failed**: 
  - Verify InfluxDB URL is correct and accessible
  - Check firewall settings
  - Verify API token is valid
  - Test network connectivity

- **No Data Arriving**:
  - Verify components are selected
  - Check that components are receiving data
  - Verify logging interval is set
  - Check InfluxDB write permissions on token

- **Authentication Errors**:
  - Verify API token is correct
  - Check token has write permissions
  - Verify organization name matches

## Related Documentation

- [InfluxDB Prometheus Logger](../Components/Loggers/InfluxDB_Prometheus_Logger.md) - Complete logger documentation
- [Data Logging Overview](./Configure_Data_Logging.md) - General data logging guide
- [InfluxDB Documentation](https://docs.influxdata.com/) - Official InfluxDB documentation
