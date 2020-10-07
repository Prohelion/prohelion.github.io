---
title: ArrowPoint Android Overview
tags: [ArrowPoint, Android, Overview]
keywords: ArrowPoint, Android, Overview
last_updated: November 22, 2019
summary: 
sidebar: arrowpoint_sidebar
permalink: ArrowAndroid_Overview.html
folder: ArrowPoint
---

## Introduction
The ArrowPoint for Android Solution is an Android App designed to receive and display telemetry information from an WiFi access point in real time. It is a very useful tool in a race environment as every team member can have a copy installed on their own phone or tablet and get instant insights in to the performance of the vehicle.

{% include image.html file="android_dashboard.png" alt="android_dashboard" caption="Example of the Arrowpoint Dashboard" %}

The out of the box implementation is designed for use in Solar or Electric racing cars that use technology from [Prohelion](http://Prohelion.com) or [Tritium](http://Tritium.com). This solution was originally developed by [TeamArrow](http://www.teamarrow.com.au/) and has been used in racing environments since 2015. [TeamArrow](http://www.teamarrow.com.au/) continue to use this application both as the in car dashboard as well as a solution for the entire fleet to communicate and monitor the car.

Examples of the software in use can be seen here - [https://www.youtube.com/watch?reload=9&v=lWkXEb8v1tk](https://www.youtube.com/watch?reload=9&v=lWkXEb8v1tk)

If you are interested in contributing to the solution, please see our [Contribution File](https://github.com/Chrishaywood/ProhelionDocs/blob/master/CONTRIBUTING.md).

## Features
The application provides
* A [Driver Dashboard](ArrowAndroid_Dashboard.html) showing all key information for the driver (we use this as our in car dashboard in the Arrow1)
* A [Solar Energy Dashboard](ArrowAndroid_Solar.html) showing key solar data and battery information
* [Customisable Alerts](ArrowAndroid_SystemDetails) that can be used to alert the team or driver to systems going out of range or offline
* [Private Messaging](ArrowAndroid_Messaging.html) for inter-fleet communications that does not require the radio
* A [Graphing Dashboard](ArrowAndroid_Graphing.html) that can be used to graph information over time
* [Basic GPS tracking](ArrowAndroid_GPS.html) system to track the car location

The application is compatible with
* Prohelion Battery Packs
* Tritium WaveSculpters
* Tritium BMUs and CMUs

The Wifi connection should be broadcasting CANbus data using the Tritium CANbus identifiers.

Any issues please or question, please raise them on our GitHub account at [https://github.com/Prohelion/ArrowPoint-Android](https://github.com/Prohelion/ArrowPoint-Android)

{% include links.html %}