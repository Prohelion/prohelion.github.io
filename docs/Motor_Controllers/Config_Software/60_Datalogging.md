---
title: Datalogging
description: Documentation for the Prohelion Vehicle Communications protocol
order: 6
---

# Datalogging

A system for logging data is provided under Log on the main menu. It has three options Start, Stop and Update. The Start command will start a new file name “[date] [time]” in the current operating directory. Pressing this button while a file is already open will close the open file and start a new log file. Clicking Stop will close the file and stop logging. The Update sub-menu allows three different logging speeds, 200ms, 1s and 10s. The update rate can be changed at any time.

The format of the log file is a comma delimited text file with one header row and six decimal points of accuracy on each measurement. All of the telemetry data received and drive commands sent are logged in the file. Refer to the [Users Manual](http://localhost:4000/WaveSculptor_Motor_Controllers/User_Manual/0_Overview.md) for information on decoding the limiter and error bit fields (displayed in Hex)
