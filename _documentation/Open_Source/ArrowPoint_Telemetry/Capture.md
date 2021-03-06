---
title: Telemetry Capture
tags: [ArrowPoint, Telemetry, Capture]
keywords: ArrowPoint, Telemetry, Capture
last_updated: November 22, 2019
summary: "The system captures and stores CAN Bus data from a configurable range of devices in the car."
permalink: ArrowPoint_Telemetry/Capture.html
folder: ArrowPoint_Telemetry
order: 4
---

## Telemetry Capture

Telemetry information is constantly captured by the Telemetry system via CAN Bus messages on the network.  The information is then stored in the database and via the [Integration with Splunk](Splunk.html) you are also able to report on it from there.

The Telemetry system filters and manages the telemetry data to balance performance vs data quality, not all data is stored, typically we store one of each CAN Bus packet per second as a typical vehicle is producing around 400 packets per second, which will generally exceed a HDD ability to keep up.

