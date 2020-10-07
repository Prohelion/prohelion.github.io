---
title: ArrowPoint Telemetry Capture
tags: [ArrowPoint, Telemetry, Capture]
keywords: ArrowPoint, Telemetry, Capture
last_updated: November 22, 2019
summary: "The system captures and stores CANbus data from a configurable range of devices in the car."
sidebar: arrowpoint_sidebar
permalink: ArrowTelemetry_Capture.html
folder: ArrowPoint
---

Telemetry information is constantly captured by the Telemetry system via CANbus messages on the network.  The information is then stored in the database and via the [Integration with Splunk](ArrowTelemetry_Splunk.html) you are also able to report on it from there.

The Telemetry system filters and manages the telemetry data to balance performance vs data quality, not all data is stored, typically we store one of each CANbus packet per second as a typical vehicle is producing around 400 packets per second, which will generally exceed a HDD ability to keep up.

{% include links.html %}