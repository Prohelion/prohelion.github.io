---
title: Bulk Importing
tags: [ArrowPoint, Telemetry, Bulk Importing]
keywords: ArrowPoint, Telemetry, Bulk Importing
last_updated: November 22, 2019
summary: "CAN Bus logs that have been recorded via the Prohelion or Tritium CAN Bus tools can be bulk loaded in to the solution"
permalink: ArrowPoint_Telemetry/Bulk_Importing.html
folder: ArrowPoint_Telemetry
order: 15
---

## Bulk Importing

The system provides the ability for CAN Bus files that have been recorded by either [Profinity](../../Profinity/Overview.html) the [ArrowPoint CAN Bus Tools](../ArrowPoint_CAN Bus_Tools/Overview.html) or the Tritium Can Logger to be bulk loaded in to the telemetry system.

This is particularly useful if you want to analyse previously recorded CAN Bus files in the reporting tools such as Splunk.  An example canlog.csv file can be found in the root directory of the source code for the Telemetry system.

To load a file place it in the 

```
[Install Dir]/CAN Bus_bulkloaddirectory.
```

