---
title: Telemetry Capture
---

Telemetry information is constantly captured by the Telemetry system via CAN Bus messages on the network.  The information is then stored in the database and via the [Integration with Splunk](Splunk.md) you are also able to report on it from there.

The Telemetry system filters and manages the telemetry data to balance performance vs data quality, not all data is stored, typically we store one of each CAN Bus packet per second as a typical vehicle is producing around 400 packets per second, which will generally exceed a HDD ability to keep up.

