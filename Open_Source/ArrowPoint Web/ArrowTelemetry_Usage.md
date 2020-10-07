---
title: ArrowPoint Telemetry Usage
tags: [ArrowPoint, Telemetry, Usage]
keywords: ArrowPoint, Telemetry, Usage
last_updated: November 22, 2019
summary:
sidebar: arrowpoint_sidebar
permalink: ArrowTelemetry_Usage.html
folder: ArrowPoint
---

## Telemetry System 
The core telemetry system can be accessed by going to [http://localhost:9000](http://localhost:9000), if the system is running you will see a page that looks like this.

{% include image.html file="telemetry_login.png" alt="telemetry_login" caption="Telemetry Login" %}

If you see the screen then you will able to log in with the default account

**Username**: admin

**Password**: passw0rd!



At which point you should be presented with the dashboard that looks like this.

{% include image.html file="telemetry_dashboard.png" alt="telemetry_dashboard" caption="Telemetry Dashboard" %}

## Splunk 
Complex reporting is handled in the Telemetry system by splunk, which can be accessed by going to the url [http://localhost:8000](http://localhost:8000)

If everything is running correctly, you should see a screen that looks like this

{% include image.html file="telemetry_splunklogin.png" alt="telemetry_splunklogin" caption="Splunk Login" %}

If you see the screen then you will able to log in with the default account

**Username**: admin

**Password**: passw0rd!

{% include image.html file="telemetry_splunkdashboard.png" alt="telemetry_splunkdashboard" caption="Splunk Dashboard" %}

Click on the Prohelion Telemetry Application and then the Dashboards menu item to see that available reporting dashboards

{% include image.html file="telemetry_splunkreport.png" alt="telemetry_splunkreport" caption="Splunk Report" %}


## PgAdmin 
PgAdmin allows you direct access to the underlying TimescaleDB (Postgres) database that runs the Telemetry System. You can access it on the URL [http://localhost:5080](http://localhost:5080), click the menu on the left to display the available connections and then use the default accounts to connect to the database.

**Username**: admin@prohelion.com

**Password**: passw0rd!

{% include image.html file="telemetry_pgadminlogin.png" alt="telemetry_pgadminlogin" caption="PgAdmin login" %}

Once you have logged in, connect to the database instance in the menu on the left and reenter the database password.

**Password**: passw0rd!

{% include image.html file="telemetry_pgadmindatabase.png" alt="telemetry_pgadmindatabase" caption="PgAdmin Database" %}

You are now connected to the database instance, the tables for the application are stored in the public schema.



{% include links.html %}