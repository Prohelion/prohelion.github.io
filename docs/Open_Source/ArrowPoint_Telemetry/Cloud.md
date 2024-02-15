---
title: Cloud Configuration
---

A single Telemetry instance can forward data on a regular basis to other Telemetry instances, this allows you to create Hybrid configurations with a Primary Instance forwarding to a Secondary Instance for backup and redundancy or to enable offsite management and monitoring.

For the European Solar Challenge in 2018, TeamArrow used this feature to enable a Hybrid Cloud Architecture where a local instance of the Telemetry system at the track was used to store and manage data before it was forwarded to a second instance running in the Amazon Elastic Cloud (EC2) in Europe.  This cloud based instance was used by a second team based in Australia to under take strategy planning and system monitoring.

The forwarding feature is enabled by setting the enable.data.forward option inside the application.properties file.  Information on setting this file up can be found on the Configuration page.

The telemetry solution also runs using Docker which means that it can be simply and easily configured in to new environments as required.

