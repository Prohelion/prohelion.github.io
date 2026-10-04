---
title: How to Replay CAN Bus Logs
description: "Replay recorded CAN bus messages from log files to test your Profinity system without live CAN hardware."
---

# How to Replay CAN Bus Logs

Replay recorded CAN bus messages to test your system without live CAN bus data.

## Prerequisites

- Profinity V2 installed and running
- A recorded CAN bus log file from a File or SFTP logger (see [File Loggers](../Components/Loggers/File_Loggers.md)), or the `Example Log.csv` supplied with Profinity
- The `CANReplay` permission, which provides the **CAN LOG REPLAY** side-menu entry
- A CAN bus adapter connected (optional for testing)

## Steps

### Step 1: Access the CAN Log Replayer

1. Select **CAN UTILITIES** in the side menu, then **CAN LOG REPLAY**
2. The CAN Data Log Replayer opens, listing the available log files

### Step 2: Upload a Log File (if needed)

Log files recorded earlier, or on other Profinity instances, can be added to this instance.

1. Use the **Upload CAN Log files** control
2. Select your log file
3. The file appears in the list of available log files

### Step 3: Start the Replay

1. Select the log file in the list
2. Click **Play** (the replay button) in the replayer to start the replay
3. Watch the CAN Activity panel to see the replayed messages

### Step 4: Monitor the Replay

1. Check the CAN Activity panel shows replayed messages
2. Verify components are receiving data
3. Check dashboards update with the replayed data
4. Monitor replay progress with the slider

### Step 5: Move Through, Pause or Delete a Log

1. Slide the slider back and forth to move to a new position in the log
2. Click **Pause** to pause the replay, and click **Play** to resume it
3. Click **Stop** to stop the replay, or enable **Loop** to replay the log continuously
4. Click the trashcan icon to delete a log file from the list

## Tips

- **Test Without Hardware**: use replay to test dashboards without CAN hardware
- **Debug Issues**: replay logs to debug component configurations
- **Record First**: use a File or SFTP logger to record logs for later replay, because logs from InfluxDB or Prometheus cannot be replayed
- **Test Custom Components**: replay recorded messages to check a [Custom Component](./Create_Custom_Component.md) against its DBC file

## Related Documentation

- [Log / Replay CAN bus Messages](../CAN_Utilities/Logging_Replaying_CAN_Bus_Messages.md) - the full logging and replay reference
- [How to Send and Receive CAN Bus Messages](./Send_Receive_CAN_Bus.md) - CAN message tools
