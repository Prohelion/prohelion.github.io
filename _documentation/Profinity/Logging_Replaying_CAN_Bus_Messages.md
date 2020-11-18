---
title: Log / Replay CAN Messages
tags: [Profinity, CanBUS, CanBUS DBC, DBC, Overview]
keywords: Profinity, CanBUS, CanBUS DBC, DBC, Overview
last_updated: November 3, 2020
permalink: Profinity/Logging_Replaying_CAN_Bus_Messages.html
folder: Profinity
order: 5
---

# Log / Replay CAN Bus Messages

Profinity provides the ability to both log and replay messages off your CAN Bus network.

To log a set of CAN Bus messages first add an adapter to your [Profile](Profiles.html) and then connect to the adapter.  

It's always worth checking that you are actually receiving CAN Bus messages by using the [Receive CAN Bus](Send_Receive_CAN_Bus_Messages.html) window first.  Once you have got CAN Bus messages coming in to Profinity you are read to log.

## Logging CAN Bus

The CAN Bus logger has three main modes of operation, you can either

| Log Mode              | Details                                                                             |
| --------------------- | ----------------------------------------------------------------------------------- |
| Log Locally to Disk   | Writes the log files to your local file system.                                     |
| Log Remotely via FTP  | As well as logging locally this option takes the log file and places it on a remote FTP server for off site analysis.        |
| Log Remotely via SFTP | As per FTP, but this time a Secure FTP (SFTP) end point is used as the destination. | 

Depending on the mode you select, Profinity will present you with different destination options.  For FTP and SFTP it is necessary to provide the destination server, username and password.  For local logging only a directory is required.

The logger also gives you the ability to manage Archive and Compression settings, if you wish to archive your messages you must provide an archive directory.

| Setting               | Purpose                                           |
| --------------------- | ------------------------------------------------- |
| Compress Logs         | Once a log file has reached the size limit, then it is compressed.
| Archive Old Logs      | Older log files are rotated to an archive directory based on a rotation policy |
| Limit Archive Size To | Maintains a maximum number of log files at this number, older logs are deleted |

Finally the logger allows you to set the frequency of rotation.  Rotation means that the old log file is closed and a new one is created and Profinity allows you to define a minute based log rotation or a size base log rotation depending on your preference.

![Data Logger]({{site.dox.baseurl}}/images/Profinity/data_logger.png)

Logging configurations are currently stored separately to the profile and you can also load and existing config or save a new logging config on this screen.

## Data Validation

Profinity uses data entry validation to ensure the information you provide is valid.  

When an invalid value is entered in this screen the field will turn to an orange colour, indicating an issue.  If the field is white then the data is fine.

![Data Logger Error]({{site.dox.baseurl}}/images/Profinity/data_logger_error.png)

## Data Log Replayer

The Profinity data log replayer allows you to replay log files that have previously been recorded in Profinity.

To use this tool simply select the log file and it will start replaying.  There are also a number of options available that can change the way the log file is replayed.

| Setting               | Purpose                                           |
| --------------------- | ------------------------------------------------- |
| Include / Exclude IDs | Instruct the log replayer to only include or exclude values between these two CAN Bus IDs |
| Loop log file replay  | When the log file reaches the end, automatically loop back to the start |
| Transmit CAN Bus over Network | Normally the log file is only replayed locally, by selecting the Transmit option the log file is transmitted over any active CAN Bus adapters |

Sliding the slider back and forth allows you to easily move to new locations in the CAN Bus replay file.

![Data Log Replayer]({{site.dox.baseurl}}/images/Profinity/log_replayer.png)