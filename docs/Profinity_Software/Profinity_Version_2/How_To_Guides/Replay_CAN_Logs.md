---
title: How to Replay CAN Bus Logs
---

# How to Replay CAN Bus Logs

Replay recorded CAN bus messages to test your system without live CAN bus data.

## Prerequisites

- Profinity V2 installed and running
- A recorded CAN bus log file (.csv format)
- CAN bus adapter connected (optional for testing)

## Steps

### Step 1: Access CAN Replay Tool

1. Navigate to **CAN Utilities** → **Replay CAN Logs**
2. Or click **Replay** in the CAN Activity window
3. CAN Replay window opens

### Step 2: Load Your CAN Log File

1. Click **Load Log File** or **Browse**
2. Select your `.csv` log file
3. File loads into the replay tool

### Step 3: Configure Replay Settings

1. **Replay Speed**: Select replay speed:
   - **Real-time**: Replay at original speed
   - **Faster**: Speed up replay (2x, 5x, 10x)
   - **Slower**: Slow down replay (0.5x, 0.25x)

2. **Loop**: Enable to loop replay continuously
3. **Filter**: (Optional) Filter specific CAN IDs or time ranges

### Step 4: Start Replay

1. Click **Start Replay** or **Play** button
2. Messages are sent to the CAN bus network
3. Watch the CAN Activity panel to see messages being replayed

### Step 5: Monitor Replay

1. Check CAN Activity panel shows replayed messages
2. Verify components are receiving data
3. Check dashboards update with replayed data
4. Monitor replay progress

### Step 6: Stop or Pause Replay

1. Click **Stop** to stop replay
2. Click **Pause** to pause (resume with **Play**)
3. Use **Seek** to jump to specific time in log

## Tips

- **Test Without Hardware**: Use replay to test dashboards without CAN hardware
- **Debug Issues**: Replay logs to debug component configurations
- **Record First**: Use CAN logging to record logs for later replay
- **Filter Messages**: Filter replay to focus on specific CAN IDs

## Related Documentation

- [Logging and Replaying CAN Bus Messages](../CAN_Utilities/Logging_Replaying_CAN_Bus_Messages.md) - Complete CAN logging guide
- [Send/Receive CAN Messages](./Send_Receive_CAN_Bus.md) - CAN message tools
