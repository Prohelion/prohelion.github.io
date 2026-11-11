---
title: View a dashboard at a past time
description: "Switch a dashboard from live values to values from an earlier time, and step through them, when a designated historian holds the tag history."
type: task
owner: Documentation
last_reviewed: 2026-11-04
---

# View a dashboard at a past time

Use the **Live** and **View at a time** control in the title bar of a dashboard to switch from live values to the values from an earlier time, and to step forward and back through them.
The control appears only on a dashboard that has a title bar, and only when the profile has a designated historian that holds history for the tags on the dashboard.
Set up the historian with [Designated historian](../Components/Historians/Designated_Historian.md), and record the history with [How to configure data logging](./Configure_Data_Logging.md).

1. Select **View at a time** in the title bar. The time picker opens.
2. Select a day in the calendar. Days with no stored values for the tags on the dashboard are unavailable.
3. Set the time with the **Hour** and **Minute** lists, or with the step buttons on either side of them. The outer step buttons, **-1h** and **+1h**, move the time by an hour. The inner step buttons, **-15m** and **+15m**, move it by 15 minutes.
4. Select **View**. The dashboard shows the values at the chosen time, and playback starts from that time.
5. Optional: Select the step back or step forward button to move through the values by the jump size. The jump size list runs from 15 seconds to 1 day, and its default is 15 minutes.
6. Optional: Select the play or pause button to start or stop playback. The speed list sets the playback speed from 1x to 3600x.
7. Select **Live** to return the dashboard to live values.

The check worked when the time appears in the title bar in place of **View at a time**, and the values change as you step through them.
Selecting **Live** returns the control to **Live**, and the values update as new values arrive.

## When past values are not available

| What you see | Cause | What to do |
|--------------|-------|------------|
| The **Live** and **View at a time** control does not appear | The profile has no designated historian, more than one, or the Historians feature is not licensed. | Refer to [Designated historian](../Components/Historians/Designated_Historian.md) and [Licensing](../Licensing.md). |
| **View at a time** is greyed out, or the picker shows "No stored samples for the tags on this dashboard yet." | The historian holds no values for the tags on the dashboard. | Check that the tags are recorded, as described in [How to configure data logging](./Configure_Data_Logging.md), and wait until values are stored. |
| A text value, such as a message or a status, stays empty at the chosen time while numbers show | The designated historian is an InfluxDB historian, which stores only tags that hold a number. | Make a TAG Local Historian or TAG SQL Historian the [designated historian](../Components/Historians/Designated_Historian.md). |
| A chart is empty or has gaps at the chosen time | A chart window reaches further back than the stored values. | Choose a later time, or refer to [Live and past data](../Customising_Profinity/Dashboards/Data_Binding/index.md#live-and-past-data) to see how a window fills. |

To set the window that a chart shows, refer to [Data binding](../Customising_Profinity/Dashboards/Data_Binding/index.md).
