---
title: GPS & Google Earth
tags: [ArrowPoint, Telemetry, Google Earth]
keywords: ArrowPoint, Telemetry, Google Earth
last_updated: November 22, 2019
summary: "Output your location and strategy on to Google Earth maps. This is super useful when plotting strategy and trying to figure out where you are going to camp at 5pm or when you are going to hit a checkpoint."
permalink: ArrowPoint_Telemetry/GPS_GoogleEarth.html
folder: ArrowPoint_Telemetry
order: 9
---

## GPS and Google Earth Integration

The Telemetry system can track your current location which can then be displayed on Google Maps.

We us the iPhone app GPS2IP to capture the GPS data and push it to the telemetry system

[https://itunes.apple.com/us/app/gps-2-ip/id408625926?mt=8](https://itunes.apple.com/us/app/gps-2-ip/id408625926?mt=8)

![Iphone GPS Coordinate example]({{site.dox.baseurl}}/images/telemetry_GPS.png)

The reason we use an iPhone app is simply redundancy and ease of development. The iPhone is typically mounted on the dash of the chase car and connected to the in car Wifi network. It captures GPS data and then transmits it to the Telemetry application which is listening on a socket for the GPS data. The Telemetry application then broadcasts the GPS data as CAN Bus packets for other devices to receive.

The Telemetry system integrates with Google Earth to allow you to visualize your strategy and plan landing spots later in the day. For this feature to work you need to have Google Earth installed and then go to the Fleet Management page in the telemetry system ([http://localhost:9000/fleet.html](http://localhost:9000/fleet.html)) and click the strategy speed predictions link. The system will then produce a KML file and Google Earth (or whatever KML visualization tool you use will load).

The route is created based on the \config\route\routedata.csv file and the displayed strategies are taken from the \config\Strategy Drop Folder directory. Note that the telemetry tool does not actually create a strategy for you, it simply visualizes your current strategy. You will need to produce your own tool to create a strategy file in the correct format (information on the format is below).

![Example of the Google Earth Pro interface]({{site.dox.baseurl}}/images/telemetry_googleearth.png)

Selecting current speed on the menu shows where the car will be on the road using your current speed. By selecting current speed (+1) you will see where you will be if you were to go 1kph faster etc.

When GPS Integration is enabled, the car itself will appear on the map showing your current location.

However, as the vehicle is not currently on the route, it’s not showing in the image above.

Strategy files should be generated from your strategy system and be placed in the \config\Strategy Drop Folder in your Telemetry system configuration. The strategy file is a CSV file and should have a format as follows.

|Time|Velocity|km_From_Start|km_Remaining|Lat|Long|Altd_m|SOC|SOC_Wh|
|Array_Power_W|Irradiance_W|Power_Usage_W|

An example strategy file is included with the code called, strategy.csv you can find it in the \config\Strategy Drop Folder

 
