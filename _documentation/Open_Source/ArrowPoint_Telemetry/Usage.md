---
title: Basic Usage
tags: [ArrowPoint, Telemetry, Usage]
keywords: ArrowPoint, Telemetry, Usage
last_updated: November 22, 2019
permalink: ArrowPoint_Telemetry/Basic_Usage.html
folder: ArrowPoint_Telemetry
order: 3
---

## Telemetry System Usage
The core telemetry system can be accessed by going to [http://localhost:9000](http://localhost:9000), if the system is running you will see a page that looks like this.

![Telemetry Login](/images/telemetry_login.png)

If you see the screen then you will able to log in with the default account

**Username**: admin

**Password**: passw0rd!



At which point you should be presented with the dashboard that looks like this.

![Telemetry Dashboard](/images/telemetry_dashboard.png)


## Splunk 
Complex reporting is handled in the Telemetry system by splunk, which can be accessed by going to the url [http://localhost:8000](http://localhost:8000)

If everything is running correctly, you should see a screen that looks like this

![Splunk Login](/images/telemetry_splunklogin.png)


If you see the screen then you will able to log in with the default account

**Username**: admin

**Password**: passw0rd!



![Splunk Dashboard](/images/telemetry_splunkdashboard.png)

Click on the Prohelion Telemetry Application and then the Dashboards menu item to see that available reporting dashboards

![Splunk Report](/images/telemetry_splunkreport.png)


## PgAdmin 
PgAdmin allows you direct access to the underlying TimescaleDB (Postgres) database that runs the Telemetry System. You can access it on the URL [http://localhost:5080](http://localhost:5080), click the menu on the left to display the available connections and then use the default accounts to connect to the database.

**Username**: admin@prohelion.com

**Password**: passw0rd!



![PgAdmin login](/images/telemetry_pgadminlogin.png)

Once you have logged in, connect to the database instance in the menu on the left and reenter the database password.

**Password**: passw0rd!



![PgAdmin Database](/images/telemetry_pgadmindatabase.png)

You are now connected to the database instance, the tables for the application are stored in the public schema.



