---
title: Overview
tags: [ArrowPoint, Android, Overview]
keywords: ArrowPoint, Android, Overview
last_updated: November 22, 2019
permalink: ArrowPoint_Tablet/Overview.html
folder: ArrowPoint_Tablet
order: 0

# Hero section
hero:
    title: ArrowPoint Tablet
    text: Android Tablet application for managing Prohelion hardware and racing cars
    background_image: ../images/Prohelion_Battery.jpg
---

## Introduction
The ArrowPoint for Android Solution is an Android App designed to receive and display telemetry information from an WiFi access point in real time. It is a very useful tool in a race environment as every team member can have a copy installed on their own phone or tablet and get instant insights in to the performance of the vehicle.

![Example of the Arrowpoint Dashboard](../images/android_dashboard.png)

The out of the box implementation is designed for use in Solar or Electric racing cars that use technology from [Prohelion](https://www.prohelion.com) or [Tritium](https://www.tritiumcharging.com). This solution was originally developed by [TeamArrow](https://www.teamarrow.com.au/) and has been used in racing environments since 2015. [TeamArrow](https://www.teamarrow.com.au/) continue to use this application both as the in car dashboard as well as a solution for the entire fleet to communicate and monitor the car.

Examples of the software in use can be seen here - [https://www.youtube.com/watch?reload=9&v=lWkXEb8v1tk](https://www.youtube.com/watch?reload=9&v=lWkXEb8v1tk)

## Features
The application provides
* A [Driver Dashboard](Dashboard.html) showing all key information for the driver (we use this as our in car dashboard in the Arrow1)
* A [Solar Energy Dashboard](Solar.html) showing key solar data and battery information
* [Customisable Alerts](SystemDetails.html) that can be used to alert the team or driver to systems going out of range or offline
* [Private Messaging](Fleet_Messaging.html) for inter-fleet communications that does not require the radio
* A [Graphing Dashboard](Graphing.html) that can be used to graph information over time
* [Basic GPS tracking](GPS.html) system to track the car location

The application is compatible with
* Prohelion Battery Packs
* Tritium WaveSculptors
* Tritium BMUs and CMUs

The Wifi connection should be broadcasting CAN Bus data using the Prohelion and Tritium CAN Bus identifiers.

Any issues please or question, please raise them on our GitHub account at [https://github.com/Prohelion/ArrowPoint-Android](https://github.com/Prohelion/ArrowPoint-Android)
